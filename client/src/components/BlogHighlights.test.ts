import { describe, expect, it } from "vitest";
import { featuredArticles } from "./BlogHighlights";

describe("imagens dos destaques do Blog", () => {
  it("utiliza três ativos estáticos publicados e não referencia as chaves quebradas da auditoria", () => {
    const images = featuredArticles.map(article => article.image);

    expect(images).toEqual([
      "/assets/blog-ddd-mapa-brasil.jpg",
      "/assets/blog-consultar-ddd-cidade.jpg",
      "/assets/blog-ligacao-entre-estados.jpg",
    ]);
    expect(images.join(" ")).not.toMatch(/manus-storage/);
  });
});
