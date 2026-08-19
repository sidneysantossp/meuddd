import { describe, expect, it } from "vitest";
import express from "express";
import http from "http";
import { registerPublicApi } from "./publicApi";

function buildApp() {
  const app = express();
  registerPublicApi(app);
  return app;
}

async function request(
  app: express.Express,
  path: string,
  method: "GET" | "OPTIONS" = "GET",
): Promise<{ status: number; text: string; cors: string | null }> {
  const server = http.createServer(app);
  return new Promise(resolve => {
    server.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      const req = http.request({ host: "127.0.0.1", port, path, method }, r => {
        let data = "";
        r.on("data", c => (data += c));
        r.on("end", () => {
          server.close();
          resolve({ status: r.statusCode ?? 0, text: data, cors: r.headers["access-control-allow-origin"] ?? null });
        });
      });
      req.end();
    });
  });
}

describe("API pública /api/public", () => {
  it("GET /api/public/ddds lista todos os DDDs", async () => {
    const { status, text } = await request(buildApp(), "/api/public/ddds");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { count: number; ddds: unknown[] };
    expect(body.count).toBeGreaterThan(60);
    expect(body.ddds.length).toBeGreaterThan(60);
  });

  it("GET /api/public/ddds/:code devolve detalhes do DDD 11", async () => {
    const { status, text } = await request(buildApp(), "/api/public/ddds/11");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { code: string; municipalities: unknown[] };
    expect(body.code).toBe("11");
    expect(Array.isArray(body.municipalities)).toBe(true);
    expect(body.municipalities.length).toBeGreaterThan(0);
  });

  it("GET /api/public/ddds/:code rejeita código inválido", async () => {
    const { status } = await request(buildApp(), "/api/public/ddds/1");
    expect(status).toBe(404);
  });

  it("GET /api/public/estados lista os 27 estados", async () => {
    const { status, text } = await request(buildApp(), "/api/public/estados");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { count: number; states: unknown[] };
    expect(body.count).toBe(27);
  });

  it("GET /api/public/estados/:uf devolve detalhes do estado SP", async () => {
    const { status, text } = await request(buildApp(), "/api/public/estados/sp");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { state: { uf: string } };
    expect(body.state.uf).toBe("SP");
  });

  it("GET /api/public/estados/:uf rejeita UF inválida", async () => {
    const { status } = await request(buildApp(), "/api/public/estados/XY");
    expect(status).toBe(404);
  });

  it("GET /api/public/cidade/:uf/:slug devolve cidade existente", async () => {
    const { status, text } = await request(buildApp(), "/api/public/cidade/sp/sao-paulo");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { municipality: { uf: string; name: string } };
    expect(body.municipality.uf).toBe("SP");
    expect(body.municipality.name).toBe("São Paulo");
  });

  it("GET /api/public/cidade/:uf/:slug rejeita UF inválida", async () => {
    const { status } = await request(buildApp(), "/api/public/cidade/XY/foo");
    expect(status).toBe(404);
  });

  it("GET /api/public/regioes lista os hubs regionais", async () => {
    const { status, text } = await request(buildApp(), "/api/public/regioes");
    expect(status).toBe(200);
    const body = JSON.parse(text) as { count: number; regions: unknown[] };
    expect(body.count).toBeGreaterThan(0);
  });

  it("GET rota inexistente devolve 404", async () => {
    const { status } = await request(buildApp(), "/api/public/inexistente");
    expect(status).toBe(404);
  });

  it("OPTIONS aplica CORS de leitura", async () => {
    const { status, cors } = await request(buildApp(), "/api/public/ddds", "OPTIONS");
    expect(status).toBe(204);
    expect(cors).toBe("*");
  });
});
