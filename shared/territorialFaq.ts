export type TerritorialFaq = {
  question: string;
  answer: string;
};

type DddCoverage = {
  code: string;
  cityCount: number;
  sampleCities?: string[];
};

const pluralize = (count: number, singular: string, plural: string) => count === 1 ? singular : plural;

const dddList = (ddds: DddCoverage[]) => ddds.map(ddd => ddd.code).join(", ");

export function buildStateFaq(input: {
  stateName: string;
  uf: string;
  cityCount: number;
  ddds: DddCoverage[];
}): TerritorialFaq[] {
  const primaryDdd = input.ddds[0];
  const codes = dddList(input.ddds);
  const primaryCoverage = primaryDdd ? `${primaryDdd.cityCount} ${pluralize(primaryDdd.cityCount, "município", "municípios")}` : "os municípios listados nesta página";
  const sampleCities = primaryDdd?.sampleCities?.slice(0, 3).join(", ");

  return [
    {
      question: `Qual é o DDD de ${input.stateName}?`,
      answer: input.ddds.length === 1
        ? `${input.stateName} utiliza o DDD ${primaryDdd?.code}.`
        : `${input.stateName} possui ${input.ddds.length} códigos de área: ${codes}. Confirme o município de destino antes de ligar.`,
    },
    {
      question: `Quantas cidades usam DDDs em ${input.stateName}?`,
      answer: `O inventário territorial desta página reúne ${input.cityCount} ${pluralize(input.cityCount, "município", "municípios")} de ${input.stateName}, distribuídos pelos DDDs indicados acima.`,
    },
    {
      question: `Quais cidades usam o DDD ${primaryDdd?.code ?? "deste estado"} em ${input.stateName}?`,
      answer: `O DDD ${primaryDdd?.code ?? "selecionado"} abrange ${primaryCoverage} em ${input.stateName}${sampleCities ? `, incluindo ${sampleCities}` : ""}. Abra o cartão do código para consultar a lista completa.`,
    },
    {
      question: `Como encontrar o DDD de uma cidade de ${input.stateName}?`,
      answer: `Use o índice de municípios de ${input.stateName} nesta página e abra a ficha da cidade. A pesquisa confirma o código de área associado à localidade.`,
    },
    {
      question: `Como ligar de outro estado para ${input.stateName}?`,
      answer: `Primeiro confirme a cidade de destino e o respetivo DDD. Quando a sua prestadora solicitar discagem interurbana, siga a sequência 0 + código da prestadora + DDD + número; o plano e o serviço podem alterar regras e tarifas.`,
    },
    {
      question: `Como ligar para ${input.stateName} do exterior?`,
      answer: `Para uma chamada internacional para uma localidade de ${input.stateName}, use o código do Brasil (+55), o DDD da cidade e o número completo. Consulte a operadora de origem sobre a sequência de saída e possíveis custos.`,
    },
    {
      question: `Como saber se um número é de ${input.stateName}?`,
      answer: `Os dois primeiros dígitos do telefone, antes do número do assinante, correspondem ao DDD. Compare esse código com a lista de ${input.stateName}; o DDD indica a área de numeração, não a localização atual da pessoa.`,
    },
    {
      question: `O DDD ${primaryDdd?.code ?? "deste estado"} é de qual cidade?`,
      answer: `Um DDD não identifica apenas uma cidade. O código ${primaryDdd?.code ?? "selecionado"} cobre ${primaryCoverage}; consulte a página específica do DDD para verificar cada município atendido.`,
    },
    {
      question: `Posso manter o DDD ${primaryDdd?.code ?? "da minha cidade"} se me mudar dentro ou para fora de ${input.stateName}?`,
      answer: `A portabilidade permite manter o número em situações definidas pela regulamentação e pela prestadora, mas não garante a manutenção do DDD em toda mudança de área. Confirme a viabilidade diretamente com a operadora antes da mudança.`,
    },
    {
      question: `Qual é a diferença entre DDD e DDI em ${input.stateName}?`,
      answer: `DDD é o código de área de dois dígitos usado para identificar cidades em ${input.stateName}. DDI é o código internacional de um país; o código do Brasil é +55.`,
    },
  ];
}

export function buildMunicipalityFaq(input: {
  municipalityName: string;
  stateName: string;
  stateUf: string;
  ddd: DddCoverage;
}): TerritorialFaq[] {
  const municipalityCount = input.ddd.cityCount;

  return [
    {
      question: `Qual é o DDD de ${input.municipalityName}?`,
      answer: `O DDD de ${input.municipalityName}, em ${input.stateName}, é ${input.ddd.code}.`,
    },
    {
      question: `Quais cidades usam o DDD ${input.ddd.code}?`,
      answer: `O DDD ${input.ddd.code} abrange ${municipalityCount} ${pluralize(municipalityCount, "município", "municípios")} no inventário territorial do Meu DDD. Abra a página do código para consultar a cobertura completa.`,
    },
    {
      question: `O DDD ${input.ddd.code} é só de ${input.municipalityName} ou de outras cidades também?`,
      answer: `Não é exclusivo de ${input.municipalityName}. O código ${input.ddd.code} integra uma área de numeração com ${municipalityCount} ${pluralize(municipalityCount, "município", "municípios")} listados na plataforma.`,
    },
    {
      question: `Como ligar para ${input.municipalityName} de outro estado?`,
      answer: `Confirme o DDD ${input.ddd.code} e o número completo. Quando a prestadora solicitar discagem interurbana, utilize 0 + código da prestadora + ${input.ddd.code} + número; confirme no seu plano as regras de cobrança.`,
    },
    {
      question: `Qual é o código de área de ${input.municipalityName}?`,
      answer: `O código de área, também chamado de DDD, de ${input.municipalityName} é ${input.ddd.code}. Ele deve ser confirmado antes de chamadas para a cidade a partir de outra área de numeração.`,
    },
    {
      question: `Como ligar para ${input.municipalityName} do exterior?`,
      answer: `Para ligar do exterior, use o código do Brasil (+55), seguido do DDD ${input.ddd.code} e do número completo da pessoa ou empresa em ${input.municipalityName}. A sequência de saída e a tarifa dependem da operadora de origem.`,
    },
    {
      question: `Como formatar um número de telefone de ${input.municipalityName}?`,
      answer: `Com o DDD, escreva ${input.ddd.code} antes do número do assinante: (${input.ddd.code}) XXXX-XXXX para telefone fixo ou (${input.ddd.code}) 9XXXX-XXXX para celular. O DDD não faz parte dos oito ou nove dígitos do assinante.`,
    },
    {
      question: `Como saber se um número é de ${input.municipalityName}?`,
      answer: `Um telefone com o DDD ${input.ddd.code} pertence à área de numeração que inclui ${input.municipalityName}. Como a área atende outras cidades e as pessoas podem se deslocar, o DDD não confirma a localização atual de quem usa o número.`,
    },
    {
      question: `Posso manter o DDD ${input.ddd.code} se me mudar de ${input.municipalityName}?`,
      answer: `A possibilidade depende da área de numeração, da modalidade do serviço e das regras aplicáveis à portabilidade. Antes de mudar, solicite à sua operadora a confirmação para o novo endereço ou município.`,
    },
    {
      question: `O DDD de ${input.municipalityName} identifica a operadora do número?`,
      answer: `Não. O DDD ${input.ddd.code} informa a área de numeração de ${input.municipalityName}; ele não identifica com segurança a operadora atual, pois a portabilidade pode manter o número quando a prestadora é trocada.`,
    },
  ];
}

export function faqPageJsonLd(faqs: TerritorialFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function buildDddFaq(input: {
  dddCode: string;
  cityCount: number;
  stateNames: string[];
}): TerritorialFaq[] {
  const coverage = `${input.cityCount} ${pluralize(input.cityCount, "município", "municípios")}`;
  const inStates = input.stateNames.length
    ? input.stateNames.length === 1 ? `no estado de ${input.stateNames[0]}` : `nos estados de ${input.stateNames.slice(0, -1).join(", ")}${input.stateNames.length > 2 ? "," : ""} ${input.stateNames[input.stateNames.length - 1]}` : "no território nacional"
  ;
  const statesText = input.stateNames.length ? ` em ${input.stateNames.join(" e ")}` : "";

  return [
    {
      question: `Qual estado é o DDD ${input.dddCode}?`,
      answer: input.stateNames.length
        ? input.stateNames.length === 1
          ? `O DDD ${input.dddCode} é o código de área do estado de ${input.stateNames[0]}. Ele cobre ${coverage}, distribuídos por todo o território estadual. Para confirmar a localidade de uma ligação, consulte a lista completa de municípios na página deste código.`
          : `O DDD ${input.dddCode} é atendido nos estados de ${input.stateNames.join(", ")}. Ele cobre ${coverage} do inventário territorial do Meu DDD. Para confirmar a localidade de uma ligação, consulte a lista completa de municípios na página deste código.`
        : `O DDD ${input.dddCode} cobre ${coverage} do inventário territorial do Meu DDD. Para identificar os estados atendidos, consulte a lista completa de municípios na página deste código.`,
    },
    {
      question: `Qual cidade usa o DDD ${input.dddCode}?`,
      answer: `O DDD ${input.dddCode} abrange ${coverage} do inventário territorial do Meu DDD${inStates}. Consulte a lista completa de municípios na página do código.`,
    },
    {
      question: `Quantas cidades usam o DDD ${input.dddCode}?`,
      answer: `O inventário desta página reúne ${coverage} atendidas pelo DDD ${input.dddCode}${statesText}. O número real de assinaturas é muito maior, pois cada município possui milhares de linhas telefônicas.`,
    },
    {
      question: `Como ligar para o DDD ${input.dddCode} de outro estado?`,
      answer: `Confirme o número completo do destino e, quando a sua prestadora solicitar discagem interurbana, disque 0 + código da prestadora + ${input.dddCode} + número. As regras e tarifas dependem do plano contratado.`,
    },
    {
      question: `Como ligar para o DDD ${input.dddCode} do exterior?`,
      answer: `Use o código do Brasil (+55), seguido do DDD ${input.dddCode} e do número completo. A sequência de saída e o custo dependem da operadora de origem.`,
    },
    {
      question: `Como descobrir em qual cidade está o DDD ${input.dddCode}?`,
      answer: `Digite o código na busca do Meu DDD ou abra a página /ddd/${input.dddCode}: a lista completa de municípios atendidos, com o respetivo estado e a região, aparece logo abaixo do cartão do código.`,
    },
    {
      question: `Um número com DDD ${input.dddCode} pertence a qual operadora?`,
      answer: `O DDD ${input.dddCode} identifica apenas a área de numeração, não a operadora. Com a portabilidade numérica, um número dessa área pode ser de qualquer prestadora; confirme diretamente com a operadora em caso de dúvida.`,
    },
    {
      question: `Como formatar um número do DDD ${input.dddCode}?`,
      answer: `Escreva (${input.dddCode}) XXXX-XXXX para telefone fixo ou (${input.dddCode}) 9XXXX-XXXX para celular. O DDD fica fora dos parênteses e não conta nos oito ou nove dígitos do assinante.`,
    },
    {
      question: `Posso manter o DDD ${input.dddCode} se me mudar de cidade?`,
      answer: `A portabilidade numérica permite manter o número em situações definidas pela regulamentação e pela operadora, mas não garante a permanência do DDD em toda mudança de área. Confirme com a sua prestadora antes da mudança.`,
    },
    {
      question: `Qual é a diferença entre DDD ${input.dddCode} e DDI?`,
      answer: `O DDD ${input.dddCode} é um código de área interno do Brasil, com dois dígitos, que identifica a localidade do assinante. O DDI é o código internacional de cada país; o do Brasil é +55.`,
    },
    {
      question: `O DDD ${input.dddCode} está relacionado ao CEP de alguma cidade da área?`,
      answer: `Não. O DDD organiza a numeração telefônica por área geográfica definida pela ANATEL, enquanto o CEP organiza a malha postal nos Correios. Um mesmo município pode ter CEPs diferentes dentro da mesma área ${input.dddCode}.`,
    },
  ];
}
