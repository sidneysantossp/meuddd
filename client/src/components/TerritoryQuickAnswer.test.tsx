import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TerritoryQuickAnswer } from "./TerritoryQuickAnswer";

describe("TerritoryQuickAnswer", () => {
  it("apresenta uma resposta factual e o respetivo contexto", () => {
    const markup = renderToStaticMarkup(<TerritoryQuickAnswer question="Qual é o DDD?" answer="O DDD é 11." context="A consulta considera a área de numeração." />);
    expect(markup).toContain("Qual é o DDD?");
    expect(markup).toContain("O DDD é 11.");
    expect(markup).toContain("A consulta considera a área de numeração.");
  });
});
