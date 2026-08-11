import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");

describe("configuração de publicação Vercel", () => {
  it("mantém uma aplicação Express e inclui os artefactos necessários para SSR", () => {
    const config = JSON.parse(fs.readFileSync(path.join(projectRoot, "vercel.json"), "utf8"));
    const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));
    const serverEntry = fs.readFileSync(path.join(projectRoot, "server.ts"), "utf8");
    const coreEntry = fs.readFileSync(path.join(projectRoot, "server/_core/index.ts"), "utf8");
    const runtimeVerification = fs.readFileSync(path.join(projectRoot, "scripts/verify-vercel-runtime.mjs"), "utf8");

    expect(config.framework).toBe("express");
    expect(config.buildCommand).toBe("pnpm run build:vercel");
    expect(packageJson.scripts.build).toContain("--outDir ../dist/server");
    expect(packageJson.scripts.build).toContain("esbuild server/vercel.handler.ts");
    expect(packageJson.scripts.build).toContain("dist/vercel/handler.js");
    expect(config.functions["server.ts"].includeFiles).toBe("dist/**");
    expect(serverEntry).toContain('import express from "express"');
    expect(serverEntry).toContain('import productionHandler from "./dist/vercel/handler.js"');
    expect(serverEntry).not.toContain('"./server/_core/');
    expect(serverEntry).toContain("const app = express()");
    expect(serverEntry).toContain("export default app");
    expect(coreEntry).not.toContain('from "./vite"');
    expect(coreEntry).toContain('await import("./vite")');
    expect(runtimeVerification).toContain("window.__RQ_STATE__");
    expect(runtimeVerification).toContain("homeResponse");
    expect(runtimeVerification).toContain("dist/vercel/handler.js");
  });
});
