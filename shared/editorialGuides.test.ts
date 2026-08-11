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
});
