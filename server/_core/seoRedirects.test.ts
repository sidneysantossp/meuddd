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
        const url = typeof statusOrUrl === "string" ? statusOrUrl : (maybeUrl ?? "");
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

  it("redireciona /blog para /guias com 301", async () => {
    const res = await get(app, "/blog");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/guias");
  });

  it("redireciona qualquer /blog/* para /guias com 301", async () => {
    const res = await get(
      app,
      "/blog/bahia/iuiu/melhor-internet-fibra-iuiu"
    );
    expect(res.status).toBe(301);
    expect(res.location).toBe("/guias");
  });

  it("redireciona formato antigo sem UF para /cidade/<uf>/<slug>", async () => {
    const res = await get(app, "/cidade/corumba");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/ms/corumba");
  });

  it("redireciona /cidade/araraquara para /cidade/sp/araraquara", async () => {
    const res = await get(app, "/cidade/araraquara");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/cidade/sp/araraquara");
  });

  it("devolve 404 para /cidade/undefined", async () => {
    const res = await get(app, "/cidade/undefined");
    expect(res.status).toBe(404);
  });

  it("não redireciona slug inexistente sem UF (segue para o SSR, que devolve 404 noindex)", async () => {
    const res = await get(app, "/cidade/cidade-inexistente-xyz");
    expect(res.location).toBeUndefined();
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
});
