import { beforeEach, describe, expect, it } from "vitest";
import { installAnalytics } from "./analytics";

describe("installAnalytics", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("não insere script quando a configuração não está disponível", () => {
    expect(installAnalytics(document, undefined, undefined)).toBe(false);
    expect(document.head.querySelector("script")).toBeNull();
  });

  it("insere apenas uma vez o script com a configuração completa", () => {
    expect(installAnalytics(document, "https://analytics.example/", "site-123")).toBe(true);
    expect(installAnalytics(document, "https://analytics.example/", "site-123")).toBe(false);

    const script = document.head.querySelector('script[data-ddd-analytics="umami"]') as HTMLScriptElement;
    expect(script.src).toBe("https://analytics.example/umami");
    expect(script.dataset.websiteId).toBe("site-123");
  });
});
