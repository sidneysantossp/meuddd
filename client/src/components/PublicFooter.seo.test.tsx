import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PublicFooter, SEO_PRIORITY_LINKS } from "./PublicFooter";

vi.mock("wouter", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("links internos de recuperação SEO no rodapé", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(async () => {
    await act(async () => root?.unmount());
    container.remove();
  });

  it("renderiza destinos prioritários como anchors rastreáveis", async () => {
    await act(async () => {
      root = createRoot(container);
      root.render(<PublicFooter />);
    });

    const hrefs = Array.from(container.querySelectorAll("a")).map(anchor =>
      anchor.getAttribute("href")
    );

    for (const link of SEO_PRIORITY_LINKS) {
      expect(hrefs).toContain(link.href);
    }
    expect(hrefs).toContain("/gerador");
  });

  it("usa somente URLs canônicas de estado e DDD no bloco prioritário", () => {
    const hrefs = SEO_PRIORITY_LINKS.map(link => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);

    for (const href of hrefs) {
      expect(href).toMatch(/^\/(?:estado\/[a-z]{2}|ddd\/\d{2})$/);
    }
  });
});
