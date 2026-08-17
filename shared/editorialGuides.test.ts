import { describe, expect, it } from "vitest";
import { editorialGuides, getRelatedEditorialGuides } from "./editorialGuides";

describe("guias editoriais relacionados", () => {
  it("oferece leitura relacionada válida para cada guia publicado", () => {
    for (const guide of editorialGuides) {
      const related = getRelatedEditorialGuides(guide.slug);
      expect(related.length).toBeGreaterThan(0);
      expect(related.length).toBeLessThanOrEqual(3);
      expect(related.every(item => item.slug !== guide.slug)).toBe(true);
    }
  });

  it("não devolve sugestões para um slug inexistente", () => {
    expect(getRelatedEditorialGuides("guia-inexistente")).toEqual([]);
  });

  it("serve cada guia com imagem editorial em ativo estático e texto alternativo", () => {
    for (const guide of editorialGuides) {
      expect(guide.image).toMatch(/^\/assets\/.+\.(jpg|png|webp)$/);
      expect(guide.image).not.toMatch(/manus-storage/);
      expect(guide.imageAlt).toBeTruthy();
    }
    // todas as imagens citadas existem como ativos estáticos publicados
    const images = new Set(editorialGuides.map(g => g.image));
    expect(images.size).toBeGreaterThan(0);
    for (const image of images) {
      expect(
        [
          "/assets/guia-o-que-e-ddd.jpg",
          "/assets/guia-como-descobrir-ddd-de-uma-cidade.jpg",
          "/assets/guia-como-ligar-para-outro-estado.jpg",
          "/assets/guia-como-ligar-de-celular-para-fixo.jpg",
          "/assets/guia-como-ligar-para-celular-em-outro-estado.jpg",
          "/assets/guia-codigo-de-operadora-csp.jpg",
          "/assets/guia-como-ligar-para-outro-pais-ddi.jpg",
          "/assets/guia-diferenca-entre-ddd-e-ddi.jpg",
          "/assets/guia-portabilidade-numerica.jpg",
          "/assets/guia-numeros-de-emergencia.jpg",
          "/assets/guia-numero-fixo-tem-quantos-digitos.jpg",
          "/assets/guia-numero-de-celular-tem-quantos-digitos.jpg",
        ].includes(image)
      ).toBe(true);
    }
  });
});
