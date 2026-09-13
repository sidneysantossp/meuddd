import { describe, expect, it } from "vitest";
import type { Express } from "express";
import express from "express";
import { registerSeoRedirects } from "./seoRedirects";

function makeApp(): Express {
  const app = express();
  registerSeoRedirects(app);
  return app;
}

async function get(
  app: Express,
  path: string
): Promise<{ status: number; location?: string }> {
  const res = await new Promise<{
    status: number;
    headers: Record<string, string | string[] | undefined>;
  }>((resolve, reject) => {
    const req = {
      method: "GET",
      url: path,
      path: path.split("?")[0],
      headers: { host: "localhost" },
      originalUrl: path,
      params: {},
      query: {},
      get: (header: string) =>
        header === "host" ? "localhost" : undefined,
    } as unknown as express.Request;
    const headers = {} as Record<string, string | string[] | undefined>;
    const res = {
      statusCode: 200,
      setHeader(name: string, value: string | string[]) {
        headers[name.toLowerCase()] = value;
      },
      getHeader(name: string) {
        return headers[name.toLowerCase()];
      },
      redirect(statusOrUrl: number | string, maybeUrl?: string) {
        const status = typeof statusOrUrl === "number" ? statusOrUrl : 302;
        const url =
          typeof statusOrUrl === "string" ? statusOrUrl : (maybeUrl ?? "");
        res.statusCode = status;
        headers["location"] = url;
        res.end();
      },
      status(code: number) {
        res.statusCode = code;
        return res;
      },
      type() {
        return res;
      },
      send() {
        res.end();
      },
      end() {
        resolve({ status: res.statusCode, headers });
      },
    } as unknown as express.Response;
    app(req, res, (err?: unknown) => reject(err ?? new Error("next called")));
  });
  return { status: res.status, location: res.headers["location"] as string };
}

describe("redirects SEO", () => {
  const app = makeApp();

  it("redireciona /index.html para a home com 301", async () => {
    const res = await get(app, "/index.html");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/");
  });

  it("recupera /gerador-numeros para /gerador com 301", async () => {
    const res = await get(app, "/gerador-numeros");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/gerador");
  });

  it("preserva query string no redirect do gerador legado", async () => {
    const res = await get(app, "/gerador-numeros?utm_source=google");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/gerador?utm_source=google");
  });

  it("redireciona nome antigo de estado para UF: São Paulo", async () => {
    const res = await get(app, "/estado/sao-paulo");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/estado/sp");
  });

  it("redireciona nome antigo de estado para UF: Tocantins", async () => {
    const res = await get(app, "/estado/tocantins");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/estado/to");
  });

  it("preserva query string no redirect de estado legado", async () => {
    const res = await get(app, "/estado/minas-gerais?x=1");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/estado/mg?x=1");
  });

  it("não interfere na rota canónica atual de estado por UF", async () => {
    await expect(get(app, "/estado/sp")).rejects.toThrow("next called");
  });

  it("redireciona /blog para /guias com 301", async () => {
    const res = await get(app, "/blog");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/guias");
  });

  it("redireciona artigo editorial legado /blog/<slug> para /guia/<slug>", async () => {
    const res = await get(app, "/blog/o-que-e-ddd");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/guia/o-que-e-ddd");
  });

  it("devolve 410 para páginas programáticas antigas sem equivalente semântico", async () => {
    const res = await get(
      app,
      "/blog/bahia/iuiu/melhor-internet-fibra-iuiu"
    );
    expect(res.status).toBe(410);
    expect(res.location).toBeUndefined();
  });

  it("redireciona formato antigo sem UF quando o slug é nacionalmente único", async () => {
    const res = await get(app, "/cidade/corumba");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ms/corumba");
  });

  it("redireciona /cidade/araraquara para /cidade/sp/araraquara", async () => {
    const res = await get(app, "/cidade/araraquara");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/sp/araraquara");
  });

  it("usa evidência histórica do GSC para o slug ambíguo cascavel", async () => {
    const res = await get(app, "/cidade/cascavel");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ce/cascavel");
  });

  it("usa evidência histórica do GSC para o slug ambíguo campo-grande", async () => {
    const res = await get(app, "/cidade/campo-grande");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ms/campo-grande");
  });

  it("usa evidência histórica do GSC para o slug ambíguo valenca", async () => {
    const res = await get(app, "/cidade/valenca");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ba/valenca");
  });

  it("não atribui slug ambíguo sem evidência a uma UF arbitrária", async () => {
    const res = await get(app, "/cidade/bom-jesus");
    expect(res.status).toBe(404);
    expect(res.location).toBeUndefined();
  });

  it("devolve 404 para /cidade/undefined", async () => {
    const res = await get(app, "/cidade/undefined");
    expect(res.status).toBe(404);
  });

  it("não redireciona slug inexistente sem UF", async () => {
    const res = await get(app, "/cidade/cidade-inexistente-xyz");
    expect(res.status).toBe(404);
    expect(res.location).toBeUndefined();
  });

  it("não atribui /cidade/undefined/<slug> ambíguo a uma UF arbitrária", async () => {
    const res = await get(app, "/cidade/undefined/bom-jesus");
    expect(res.status).toBe(404);
    expect(res.location).toBeUndefined();
  });

  it("redireciona /cidade/undefined/<slug> quando há resolução segura", async () => {
    const res = await get(app, "/cidade/undefined/corumba");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ms/corumba");
  });

  it("redireciona nome de estado no lugar da UF: /cidade/goias/goias → /cidade/go/goias", async () => {
    const res = await get(app, "/cidade/goias/goias");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/go/goias");
  });

  it("redireciona /cidade/minas-gerais/janauba para /cidade/mg/janauba", async () => {
    const res = await get(app, "/cidade/minas-gerais/janauba");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/mg/janauba");
  });

  it("redireciona nome acentuado: /cidade/são-paulo/campinas → /cidade/sp/campinas", async () => {
    const res = await get(app, "/cidade/são-paulo/campinas");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/sp/campinas");
  });

  it("preserva query string nos redirecionamentos", async () => {
    const res = await get(app, "/cidade/goias/goias?q=ddd");
    expect(res.status).toBe(301);
    expect(res.location).toContain("/cidade/go/goias");
    expect(res.location).toContain("q=ddd");
  });

  it("não redireciona pares UF/slug válidos (seguem para o SSR)", async () => {
    await expect(get(app, "/cidade/go/goias")).rejects.toThrow("next called");
  });

  it("devolve 404 para primeiro segmento inválido no formato /cidade/<a>/<b>", async () => {
    const res = await get(app, "/cidade/abcdef/slug");
    expect(res.status).toBe(404);
  });

  it("redireciona região administrativa do DF: /cidade/df/taguatinga → /estado/df", async () => {
    const res = await get(app, "/cidade/df/taguatinga");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/estado/df");
  });

  it("redireciona região administrativa do DF com acento: /cidade/df/ceilândia → /estado/df", async () => {
    const res = await get(app, "/cidade/df/ceilândia");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/estado/df");
  });

  it("não redireciona município real do DF: /cidade/df/brasilia segue para o SSR", async () => {
    await expect(get(app, "/cidade/df/brasilia")).rejects.toThrow("next called");
  });
});
