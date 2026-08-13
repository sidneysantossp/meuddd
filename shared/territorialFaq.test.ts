import { describe, expect, it } from "vitest";
import { buildMunicipalityFaq, buildStateFaq, faqPageJsonLd } from "./territorialFaq";

describe("FAQs territoriais", () => {
  it("cria dez perguntas dinâmicas para cada página de estado", () => {
    const faqs = buildStateFaq({
      stateName: "São Paulo",
      uf: "SP",
      cityCount: 645,
      ddds: [
        { code: "11", cityCount: 39, sampleCities: ["São Paulo", "Guarulhos", "Osasco"] },
        { code: "12", cityCount: 49, sampleCities: ["São José dos Campos"] },
      ],
    });

    expect(faqs).toHaveLength(10);
    expect(faqs.map(faq => faq.question)).toEqual(expect.arrayContaining([
      "Qual é o DDD de São Paulo?",
      "Como ligar de outro estado para São Paulo?",
      "Qual é a diferença entre DDD e DDI em São Paulo?",
    ]));
    expect(faqs.map(faq => faq.answer).join(" ")).toContain("11, 12");
  });

  it("cria dez perguntas dinâmicas para cada página de município", () => {
    const faqs = buildMunicipalityFaq({
      municipalityName: "São Paulo",
      stateName: "São Paulo",
      stateUf: "SP",
      ddd: { code: "11", cityCount: 39 },
    });

    expect(faqs).toHaveLength(10);
    expect(faqs.map(faq => faq.question)).toEqual(expect.arrayContaining([
      "Qual é o DDD de São Paulo?",
      "Como ligar para São Paulo de outro estado?",
      "Como formatar um número de telefone de São Paulo?",
      "O DDD de São Paulo identifica a operadora do número?",
    ]));
    expect(faqs.map(faq => faq.answer).join(" ")).toContain("DDD 11");
  });

  it("espelha as dez perguntas visíveis no FAQPage Schema.org", () => {
    const faqs = buildMunicipalityFaq({
      municipalityName: "Recife",
      stateName: "Pernambuco",
      stateUf: "PE",
      ddd: { code: "81", cityCount: 81 },
    });
    const schema = faqPageJsonLd(faqs);

    expect(schema).toMatchObject({ "@type": "FAQPage" });
    expect(schema.mainEntity).toHaveLength(10);
    expect(schema.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "Qual é o DDD de Recife?",
      acceptedAnswer: { "@type": "Answer" },
    });
  });
});
