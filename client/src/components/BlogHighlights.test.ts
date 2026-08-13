import { describe, expect, it } from "vitest";
import { featuredArticles } from "./BlogHighlights";

describe("imagens dos destaques do Blog", () => {
  it("utiliza três ativos estáticos publicados e não referencia as chaves quebradas da auditoria", () => {
    const images = featuredArticles.map(article => article.image);

    expect(images).toEqual([
      "/manus-storage/blog-ddd-mapa-brasil_ab2cdf6e.png",
      "/manus-storage/blog-consultar-ddd-cidade_5b64333e.png",
      "/manus-storage/blog-ligacao-entre-estados_dcca6a6d.png",
    ]);
    expect(images.join(" ")).not.toMatch(/57876089|0819cb9e|42079c98/);
  });
});
