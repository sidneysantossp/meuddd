import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");

describe("configuração de publicação Vercel", () => {
  it("mantém uma aplicação Express e inclui os artefactos necessários para SSR", () => {
    const config = JSON.parse(fs.readFileSync(path.join(projectRoot, "vercel.json"), "utf8"));
    const serverEntry = fs.readFileSync(path.join(projectRoot, "server.ts"), "utf8");

    expect(config.framework).toBe("express");
    expect(config.buildCommand).toBe("pnpm run build:vercel");
    expect(config.functions["server.ts"].includeFiles).toContain("public/**");
    expect(config.functions["server.ts"].includeFiles).toContain("dist/server/**");
    expect(serverEntry).toContain("export default app");
  });
});
