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
    const response = {
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
        response.statusCode = status;
        headers.location = url;
        response.end();
      },
      status(code: number) {
        response.statusCode = code;
        return response;
      },
      type() {
        return response;
      },
      send() {
        response.end();
      },
      end() {
        resolve({ status: response.statusCode, headers });
      },
    } as unknown as express.Response;
    app(req, response, (err?: unknown) =>
      reject(err ?? new Error("next called"))
    );
  });
  return {
    status: res.status,
    location: res.headers.location as string | undefined,
  };
}

describe("recuperação prioritária de URLs com histórico no GSC", () => {
  const app = makeApp();

  it("mantém 301 para os estados históricos de maior visibilidade", async () => {
    const cases = [
      ["/estado/tocantins", "/estado/to"],
      ["/estado/alagoas", "/estado/al"],
      ["/estado/acre", "/estado/ac"],
      ["/estado/espirito-santo", "/estado/es"],
      ["/estado/distrito-federal", "/estado/df"],
      ["/estado/amapa", "/estado/ap"],
      ["/estado/sao-paulo", "/estado/sp"],
    ] as const;

    for (const [legacy, canonical] of cases) {
      const res = await get(app, legacy);
      expect(res.status, legacy).toBe(301);
      expect(res.location, legacy).toBe(canonical);
    }
  });

  it("mantém 301 para cidades antigas que concentravam milhares de impressões", async () => {
    const cases = [
      ["/cidade/teresina", "/cidade/pi/teresina"],
      ["/cidade/macapa", "/cidade/ap/macapa"],
      ["/cidade/ribeirao-preto", "/cidade/sp/ribeirao-preto"],
      ["/cidade/porto-velho", "/cidade/ro/porto-velho"],
      ["/cidade/uberlandia", "/cidade/mg/uberlandia"],
      ["/cidade/uberaba", "/cidade/mg/uberaba"],
      ["/cidade/piraquara", "/cidade/pr/piraquara"],
      ["/cidade/santarem", "/cidade/pa/santarem"],
      ["/cidade/jequie", "/cidade/ba/jequie"],
      ["/cidade/foz-do-iguacu", "/cidade/pr/foz-do-iguacu"],
      ["/cidade/recife", "/cidade/pe/recife"],
    ] as const;

    for (const [legacy, canonical] of cases) {
      const res = await get(app, legacy);
      expect(res.status, legacy).toBe(301);
      expect(res.location, legacy).toBe(canonical);
    }
  });

  it("mantém a principal ferramenta histórica ligada à equivalente atual", async () => {
    const res = await get(app, "/gerador-numeros");
    expect(res.status).toBe(301);
    expect(res.location).toBe("/gerador");
  });
});
