import { newGuides } from "./newGuides";

export type EditorialSourceId =
  | "numeracao"
  | "portabilidade"
  | "emergencia"
  | "chamadasAbusivas";

export const editorialSources: Record<
  EditorialSourceId,
  { name: string; url: string }
> = {
  numeracao: {
    name: "Plano de Numeração Brasileiro — Anatel",
    url: "https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro",
  },
  portabilidade: {
    name: "Portabilidade — Anatel",
    url: "https://www.gov.br/anatel/pt-br/consumidor/conheca-seus-direitos-2/telefonia-fixa/portabilidade",
  },
  emergencia: {
    name: "Serviços de Utilidade Pública e de Emergência — Anatel",
    url: "https://www.gov.br/anatel/pt-br/regulado/numeracao/codigos-nacionais/servicos-de-utilidade-publica-e-de-emergencia",
  },
  chamadasAbusivas: {
    name: "Chamadas abusivas — Anatel",
    url: "https://www.gov.br/anatel/pt-br/consumidor/chamadas-abusivas",
  },
};

export type EditorialGuide = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  intro: string;
  /** Imagem editorial em ativo estático (não depende do proxy de armazenamento). */
  image: string;
  /** Texto alternativo da imagem editorial. */
  imageAlt: string;
  sections: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  sources: EditorialSourceId[];
  territoryLinks: { label: string; href: string }[];
  relatedSlugs: string[];
};

/** Imagens editoriais em ativos estáticos estáveis, por slug. */
export const editorialGuideImages: Record<
  string,
  { image: string; imageAlt: string }
> = {
  "o-que-e-ddd": {
    image: "/assets/guia-o-que-e-ddd.jpg",
    imageAlt:
      "Ilustração editorial de teclado de telefone com códigos de dois dígitos sobre mapa do Brasil.",
  },
  "como-descobrir-ddd-de-uma-cidade": {
    image: "/assets/guia-como-descobrir-ddd-de-uma-cidade.jpg",
    imageAlt:
      "Ilustração editorial de um mapa urbano dobrado com marcador de localização.",
  },
  "como-ligar-para-outro-estado": {
    image: "/assets/guia-como-ligar-para-outro-estado.jpg",
    imageAlt:
      "Ilustração editorial de duas regiões ligadas por uma linha de telefone.",
  },
  "como-ligar-de-celular-para-fixo": {
    image: "/assets/guia-como-ligar-de-celular-para-fixo.jpg",
    imageAlt:
      "Ilustração editorial de um smartphone conectado a um telefone fixo.",
  },
  "como-ligar-para-celular-em-outro-estado": {
    image: "/assets/guia-como-ligar-para-celular-em-outro-estado.jpg",
    imageAlt: "Ilustração editorial de um celular a contactar outro estado.",
  },
  "codigo-de-operadora-csp": {
    image: "/assets/guia-codigo-de-operadora-csp.jpg",
    imageAlt:
      "Ilustração editorial de dígitos a seguir uma rota até uma torre de operadora.",
  },
  "como-ligar-para-outro-pais-ddi": {
    image: "/assets/guia-como-ligar-para-outro-pais-ddi.jpg",
    imageAlt:
      "Ilustração editorial de um globo com rota aérea de chamada internacional.",
  },
  "diferenca-entre-ddd-e-ddi": {
    image: "/assets/guia-diferenca-entre-ddd-e-ddi.jpg",
    imageAlt:
      "Ilustração editorial de dois cartões comparando mapa do Brasil e globo.",
  },
  "portabilidade-numerica": {
    image: "/assets/guia-portabilidade-numerica.jpg",
    imageAlt:
      "Ilustração editorial de um telefone em migração entre torres de operadoras.",
  },
  "numeros-de-emergencia": {
    image: "/assets/guia-numeros-de-emergencia.jpg",
    imageAlt:
      "Ilustração editorial de um telefone de emergência com radar de atenção.",
  },
  "como-bloquear-chamadas-indesejadas": {
    image: "/assets/guia-como-bloquear-chamadas-indesejadas.jpg",
    imageAlt:
      "Ilustração editorial de um mapa do Brasil com sinal de bloqueio sobre chamadas indesejadas.",
  },
  "numero-fixo-tem-quantos-digitos": {
    image: "/assets/guia-numero-fixo-tem-quantos-digitos.jpg",
    imageAlt:
      "Ilustração editorial de um telefone fixo com sequência de dígitos.",
  },
  "numero-de-celular-tem-quantos-digitos": {
    image: "/assets/guia-numero-de-celular-tem-quantos-digitos.jpg",
    imageAlt:
      "Ilustração editorial de um smartphone com sequência de nove dígitos.",
  },
  "o-que-e-codigo-nacional": {
    image: "/assets/guia-como-ligar-para-outro-pais-ddi.jpg",
    imageAlt:
      "Ilustração editorial de dígitos a percorrer um arco internacional sobre o mapa.",
  },
  "como-ligar-a-cobrar": {
    image: "/assets/guia-como-ligar-a-cobrar.jpg",
    imageAlt: "Ilustração editorial de dois telefones unidos por uma chamada a cobrar.",
  },
  "ddd-de-capitais-do-brasil": {
    image: "/assets/guia-ddd-de-capitais-do-brasil.jpg",
    imageAlt:
      "Ilustração editorial de capitais brasileiras marcadas num mapa do Brasil.",
  },
  "como-telefonar-para-sao-paulo": {
    image: "/assets/guia-como-telefonar-para-sao-paulo.jpg",
    imageAlt: "Ilustração editorial de um smartphone a contactar São Paulo.",
  },
  "como-telefonar-para-rio-de-janeiro": {
    image: "/assets/guia-como-telefonar-para-rio-de-janeiro.jpg",
    imageAlt:
      "Ilustração editorial de um smartphone a contactar o Rio de Janeiro.",
  },
  "como-telefonar-para-brasilia": {
    image: "/assets/guia-como-telefonar-para-brasilia.jpg",
    imageAlt: "Ilustração editorial de um smartphone a contactar Brasília.",
  },
};
const commonTerritoryLinks = [
  { label: "Consultar DDD por estado", href: "/#explorar" },
  { label: "DDD de São Paulo", href: "/ddd/11" },
  { label: "DDD do Rio de Janeiro", href: "/ddd/21" },
];

export const editorialGuides: EditorialGuide[] = [
  {
    slug: "o-que-e-ddd",
    image: editorialGuideImages["o-que-e-ddd"].image,
    imageAlt: editorialGuideImages["o-que-e-ddd"].imageAlt,
    title: "O que é DDD? Entenda os códigos de área do Brasil",
    description:
      "Saiba o que significa DDD, por que o código tem dois dígitos e como localizar a área de numeração de uma cidade brasileira.",
    eyebrow: "Telefonia / guia essencial",
    summary:
      "O DDD é a referência territorial que ajuda a encaminhar chamadas entre áreas de numeração no Brasil.",
    intro:
      "DDD significa Discagem Direta à Distância. No Plano de Numeração Brasileiro, o código de área possui dois dígitos e identifica uma área de numeração — não apenas uma única cidade.",
    sections: [
      {
        title: "DDD é um código de área",
        body: "Uma mesma área pode reunir vários municípios. Por isso, a forma mais segura de confirmar um código é pesquisar a cidade e verificar a página de cobertura correspondente.",
      },
      {
        title: "DDD, DDI e número do assinante",
        body: "O DDD é usado dentro do Brasil. O DDI identifica o país em chamadas internacionais; para o Brasil, o código de país é 55. O restante é o número do assinante.",
      },
      {
        title: "Como encontrar o código certo",
        body: "Pesquise o município, a UF ou os dois dígitos no DDD Brasil. A ficha da cidade mostra o código associado e permite navegar até o estado e aos municípios próximos.",
      },
    ],
    faqs: [
      {
        question: "DDD identifica uma cidade específica?",
        answer:
          "Não necessariamente. Um DDD identifica uma área de numeração e pode abranger diversos municípios.",
      },
      {
        question: "Quantos dígitos tem um DDD?",
        answer: "O código de área no Brasil tem dois dígitos.",
      },
      {
        question: "Como descubro o DDD de uma cidade?",
        answer:
          "Use a busca por nome de município, estado, UF ou código nesta plataforma.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "como-descobrir-ddd-de-uma-cidade",
      "diferenca-entre-ddd-e-ddi",
    ],
  },
  {
    slug: "como-descobrir-ddd-de-uma-cidade",
    image: editorialGuideImages["como-descobrir-ddd-de-uma-cidade"].image,
    imageAlt: editorialGuideImages["como-descobrir-ddd-de-uma-cidade"].imageAlt,
    title: "Como descobrir o DDD de uma cidade brasileira",
    description:
      "Veja como encontrar o DDD de qualquer cidade por nome, UF ou estado e como confirmar a área de numeração correta.",
    eyebrow: "Consulta / cidades",
    summary:
      "Uma consulta por cidade evita confundir localidades de nomes semelhantes e mostra o DDD associado ao município.",
    intro:
      "Para descobrir o DDD de uma cidade, pesquise o nome do município e, se necessário, acrescente a sigla do estado. O resultado territorial permite confirmar o código antes de fazer uma ligação ou partilhar a informação.",
    sections: [
      {
        title: "Pesquise pelo nome e pela UF",
        body: "Quando existem cidades com o mesmo nome em estados diferentes, a UF é o melhor filtro. Escreva, por exemplo, o município seguido da sigla estadual.",
      },
      {
        title: "Aceite variações de escrita",
        body: "A busca do DDD Brasil reconhece acentos e erros ortográficos pequenos. Assim, uma procura por São Paulo também pode encontrar a forma sem acento.",
      },
      {
        title: "Confirme na ficha territorial",
        body: "Depois de abrir a cidade, verifique o DDD, o estado e os municípios relacionados. A página possui uma URL direta para guardar ou enviar.",
      },
    ],
    faqs: [
      {
        question: "Posso pesquisar somente pela UF?",
        answer:
          "Sim. A busca permite filtrar o atlas por estado e explorar os códigos associados.",
      },
      {
        question: "Cidades próximas sempre têm o mesmo DDD?",
        answer:
          "Não. A proximidade geográfica não substitui a confirmação por município.",
      },
      {
        question: "A consulta exige cadastro?",
        answer: "Não. A pesquisa territorial é pública.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["o-que-e-ddd", "ddd-de-capitais-do-brasil"],
  },
  {
    slug: "como-ligar-para-outro-estado",
    image: editorialGuideImages["como-ligar-para-outro-estado"].image,
    imageAlt: editorialGuideImages["como-ligar-para-outro-estado"].imageAlt,
    title: "Como ligar para outro estado: DDD e número de destino",
    description:
      "Entenda o papel do DDD nas chamadas entre estados e como confirmar a forma de discagem aplicável ao seu serviço.",
    eyebrow: "Chamadas / interurbanas",
    summary:
      "Numa chamada para outra área de numeração, identifique o DDD do destino e confirme as regras do seu plano ou prestadora.",
    intro:
      "O DDD do destino é a informação territorial central numa chamada entre áreas de numeração diferentes. A forma de discagem e a cobrança podem variar conforme serviço, plano, tecnologia e prestadora.",
    sections: [
      {
        title: "Encontre primeiro o DDD do destino",
        body: "Confirme o município para evitar usar um código da cidade vizinha. O DDD Brasil permite abrir uma ficha municipal com o código correspondente.",
      },
      {
        title: "Use o número completo",
        body: "Depois de identificar a área, confirme se o destino é fixo ou móvel e use o número completo. A Anatel informa que números fixos têm oito dígitos e móveis têm nove.",
      },
      {
        title: "Confira condições da prestadora",
        body: "Regras de discagem, seleção de prestadora, franquias e tarifas dependem do contrato. Consulte os canais oficiais da sua operadora antes de uma chamada que possa gerar cobrança.",
      },
    ],
    faqs: [
      {
        question: "Preciso saber o estado para ligar?",
        answer:
          "O DDD é associado à área de numeração; identificar a cidade e a UF ajuda a confirmar o código correto.",
      },
      {
        question: "Toda chamada entre estados tem a mesma cobrança?",
        answer: "Não. A cobrança depende do serviço e do plano contratado.",
      },
      {
        question: "Como encontro o DDD de destino?",
        answer: "Pesquise o município ou navegue pelo estado no DDD Brasil.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "codigo-de-operadora-csp",
      "como-ligar-para-celular-em-outro-estado",
    ],
  },
  {
    slug: "como-ligar-de-celular-para-fixo",
    image: editorialGuideImages["como-ligar-de-celular-para-fixo"].image,
    imageAlt: editorialGuideImages["como-ligar-de-celular-para-fixo"].imageAlt,
    title: "Como ligar de celular para telefone fixo",
    description:
      "Saiba o que verificar antes de ligar de um celular para um telefone fixo em outra cidade ou área de numeração.",
    eyebrow: "Chamadas / celular e fixo",
    summary:
      "A confirmação do DDD do destino e do número fixo completo reduz erros de ligação.",
    intro:
      "Para ligar de um celular para um telefone fixo, confirme a cidade de destino, o DDD associado a ela e os oito dígitos do número fixo. As condições de discagem e cobrança são definidas pelo seu serviço contratado.",
    sections: [
      {
        title: "Identifique a cidade do telefone",
        body: "O prefixo não basta para confirmar a localização. Procure o município no atlas e consulte o DDD ligado àquela ficha territorial.",
      },
      {
        title: "Verifique a quantidade de dígitos",
        body: "Segundo o Plano de Numeração Brasileiro, o número do assinante de telefonia fixa tem oito dígitos.",
      },
      {
        title: "Confirme o plano antes de ligar",
        body: "Chamadas entre áreas podem estar incluídas ou tarifadas conforme o contrato. A prestadora é a fonte adequada para a regra aplicável ao seu plano.",
      },
    ],
    faqs: [
      {
        question: "Telefone fixo tem nove dígitos?",
        answer:
          "No Plano de Numeração, o número de telefonia fixa tem oito dígitos.",
      },
      {
        question: "Preciso do DDD para todo telefone fixo?",
        answer:
          "A necessidade de discagem depende da origem e do serviço. Confirme as instruções da sua prestadora.",
      },
      {
        question: "Posso buscar pelo número completo?",
        answer:
          "A plataforma organiza a consulta por cidade, estado, UF e DDD.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "numero-fixo-tem-quantos-digitos",
      "como-ligar-para-outro-estado",
    ],
  },
  {
    slug: "como-ligar-para-celular-em-outro-estado",
    image:
      editorialGuideImages["como-ligar-para-celular-em-outro-estado"].image,
    imageAlt:
      editorialGuideImages["como-ligar-para-celular-em-outro-estado"].imageAlt,
    title: "Como ligar para celular em outro estado",
    description:
      "Veja como confirmar o DDD e o formato de um número de celular antes de uma chamada para outra área de numeração.",
    eyebrow: "Chamadas / celular",
    summary:
      "O código de área do município e os nove dígitos do número móvel são as verificações essenciais antes de ligar.",
    intro:
      "Em chamadas para celulares de outra área de numeração, confirme o DDD associado ao destino e os nove dígitos do número móvel. Tarifas e regras operacionais podem depender do plano contratado.",
    sections: [
      {
        title: "Localize o DDD pela cidade",
        body: "O DDD é uma referência da área de numeração. Use o município informado pela pessoa ou empresa para confirmar o código no atlas.",
      },
      {
        title: "Confira os nove dígitos",
        body: "A Anatel indica nove dígitos para números do Serviço Móvel Pessoal. Um número incompleto pode impedir a conclusão da chamada.",
      },
      {
        title: "Evite suposições por prefixo",
        body: "Portabilidade pode permitir a troca de prestadora mantendo o número. Por isso, o prefixo não é uma forma segura de identificar a operadora atual.",
      },
    ],
    faqs: [
      {
        question: "Celular sempre tem nove dígitos?",
        answer:
          "O Plano de Numeração informa nove dígitos para o Serviço Móvel Pessoal.",
      },
      {
        question: "O DDD revela a operadora do celular?",
        answer:
          "Não. O DDD refere-se à área de numeração e a portabilidade pode alterar a prestadora mantendo o número.",
      },
      {
        question: "Como confirmar o DDD?",
        answer:
          "Pesquise o município ou use a página do estado correspondente.",
      },
    ],
    sources: ["numeracao", "portabilidade"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "numero-de-celular-tem-quantos-digitos",
      "portabilidade-numerica",
    ],
  },
  {
    slug: "codigo-de-operadora-csp",
    image: editorialGuideImages["codigo-de-operadora-csp"].image,
    imageAlt: editorialGuideImages["codigo-de-operadora-csp"].imageAlt,
    title: "O que é código de operadora (CSP) e quando confirmar",
    description:
      "Entenda o que significa CSP na telefonia e por que as instruções de discagem devem ser confirmadas no seu plano e prestadora.",
    eyebrow: "Chamadas / prestadoras",
    summary:
      "O CSP é um elemento ligado à seleção de prestadora; a aplicação prática pode variar conforme a modalidade do serviço.",
    intro:
      "Código de seleção de prestadora, frequentemente chamado de CSP, é uma expressão usada em instruções de chamadas de longa distância. Como a forma de discagem pode variar por serviço e plano, a orientação vigente da prestadora deve prevalecer.",
    sections: [
      {
        title: "Por que o CSP aparece em instruções",
        body: "A referência à prestadora ajuda a explicar como determinados serviços encaminham chamadas. Ela não substitui a consulta ao contrato ou ao atendimento da operadora.",
      },
      {
        title: "DDD continua a identificar a área",
        body: "Mesmo quando há uma regra operacional de prestadora, o DDD serve para identificar a área de numeração do destino.",
      },
      {
        title: "Confirme antes de completar",
        body: "Ao seguir uma sequência de discagem, confira fontes atualizadas da sua prestadora. Isto é especialmente importante em chamadas com possível tarifação.",
      },
    ],
    faqs: [
      {
        question: "CSP é o mesmo que DDD?",
        answer:
          "Não. DDD identifica a área de numeração; CSP refere-se à seleção de prestadora em determinados contextos.",
      },
      {
        question: "Todo plano usa CSP?",
        answer:
          "A operação depende da tecnologia, do serviço e do contrato. Consulte a prestadora.",
      },
      {
        question: "Onde encontro o DDD correto?",
        answer: "No atlas por município, estado ou código.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["como-ligar-para-outro-estado", "diferenca-entre-ddd-e-ddi"],
  },
  {
    slug: "como-ligar-para-outro-pais-ddi",
    image: editorialGuideImages["como-ligar-para-outro-pais-ddi"].image,
    imageAlt: editorialGuideImages["como-ligar-para-outro-pais-ddi"].imageAlt,
    title: "Como ligar para outro país: para que serve o DDI",
    description:
      "Entenda a diferença entre DDI, DDD e número do assinante antes de realizar uma chamada internacional.",
    eyebrow: "Chamadas / internacionais",
    summary:
      "O DDI identifica o país, enquanto o DDD identifica uma área de numeração dentro do Brasil.",
    intro:
      "Em chamadas internacionais, o DDI identifica o país de destino. O código de país atribuído ao Brasil é 55; já o DDD é usado para áreas de numeração dentro do território brasileiro.",
    sections: [
      {
        title: "DDI identifica o país",
        body: "O código de país faz parte da estrutura internacional de numeração. Antes de ligar, confirme o código do país e as instruções do seu serviço.",
      },
      {
        title: "DDD é uma referência brasileira",
        body: "Dentro do Brasil, o DDD possui dois dígitos e aponta uma área de numeração. Não o confunda com o DDI internacional.",
      },
      {
        title: "Confira tarifas e alternativas",
        body: "Chamadas internacionais podem ter regras e custos específicos. Consulte a prestadora e considere canais de comunicação disponíveis no seu plano.",
      },
    ],
    faqs: [
      {
        question: "Qual é o DDI do Brasil?",
        answer:
          "O código de país do Brasil é 55, conforme o Plano de Numeração Brasileiro.",
      },
      {
        question: "DDD e DDI são iguais?",
        answer:
          "Não. DDI identifica o país; DDD identifica uma área de numeração no Brasil.",
      },
      {
        question: "O DDD é usado para ligar do exterior?",
        answer:
          "A sequência depende do serviço internacional. Confirme a orientação da sua prestadora.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["diferenca-entre-ddd-e-ddi", "o-que-e-ddd"],
  },
  {
    slug: "diferenca-entre-ddd-e-ddi",
    image: editorialGuideImages["diferenca-entre-ddd-e-ddi"].image,
    imageAlt: editorialGuideImages["diferenca-entre-ddd-e-ddi"].imageAlt,
    title: "Diferença entre DDD e DDI: guia rápido",
    description:
      "Compare DDD e DDI, saiba o que cada código identifica e em que situações consultar cada um.",
    eyebrow: "Telefonia / conceitos",
    summary:
      "DDD aponta uma área de numeração brasileira; DDI identifica um país em comunicações internacionais.",
    intro:
      "A sigla DDD está associada à Discagem Direta à Distância dentro do Brasil. DDI é a referência de discagem direta internacional. Os dois códigos participam de contextos diferentes e não devem ser trocados.",
    sections: [
      {
        title: "Quando usar o DDD",
        body: "Use o DDD para localizar uma área de numeração brasileira. A busca por município é o caminho mais confiável para confirmar o código.",
      },
      {
        title: "Quando aparece o DDI",
        body: "O DDI é usado para identificar o país em uma chamada internacional. O Brasil possui código de país 55.",
      },
      {
        title: "Confira sempre o destino",
        body: "Antes de discar, confirme país, cidade e formato completo do número. Regras de discagem podem variar conforme a prestadora.",
      },
    ],
    faqs: [
      {
        question: "DDD do Brasil é 55?",
        answer:
          "Não. 55 é o código de país do Brasil; DDD é o código de área de dois dígitos.",
      },
      {
        question: "Todo país tem DDI?",
        answer:
          "A numeração internacional utiliza códigos de país, atribuídos no âmbito internacional.",
      },
      {
        question: "Onde encontro o DDD da cidade?",
        answer: "Pesquise a cidade ou a UF nesta plataforma.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["como-ligar-para-outro-pais-ddi", "o-que-e-ddd"],
  },
  {
    slug: "portabilidade-numerica",
    image: editorialGuideImages["portabilidade-numerica"].image,
    imageAlt: editorialGuideImages["portabilidade-numerica"].imageAlt,
    title: "Portabilidade numérica: como manter o número ao mudar de operadora",
    description:
      "Conheça o direito à portabilidade numérica, o prazo informado pela Anatel e os cuidados para iniciar o pedido.",
    eyebrow: "Consumidor / direitos",
    summary:
      "A portabilidade permite migrar o número para outro plano ou prestadora, sem presumir que o prefixo revele a operadora atual.",
    intro:
      "A Anatel informa que o consumidor tem direito à portabilidade do seu número para outro plano de serviço ou outra prestadora. A página oficial indica que a migração deve ocorrer em até três dias úteis.",
    sections: [
      {
        title: "O que a portabilidade preserva",
        body: "A portabilidade procura manter o número de acesso durante a mudança. Isto significa que o DDD e o número não indicam, por si só, qual é a prestadora atual.",
      },
      {
        title: "Como iniciar o pedido",
        body: "Procure a prestadora para a qual pretende migrar e confirme os documentos, condições e etapas. Guarde os protocolos de atendimento.",
      },
      {
        title: "Acompanhe o prazo informado",
        body: "A Anatel informa prazo de até três dias úteis para a migração. Regras e situações específicas devem ser confirmadas diretamente com a prestadora.",
      },
    ],
    faqs: [
      {
        question: "Posso mudar de operadora e manter o número?",
        answer:
          "A Anatel reconhece o direito à portabilidade para outro plano ou prestadora.",
      },
      {
        question: "Quanto tempo demora a portabilidade?",
        answer:
          "A página oficial consultada informa migração em até três dias úteis.",
      },
      {
        question: "O DDD muda quando faço portabilidade?",
        answer:
          "A portabilidade trata da manutenção do número; confirme os limites aplicáveis ao seu caso com a prestadora.",
      },
    ],
    sources: ["portabilidade"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "como-ligar-para-celular-em-outro-estado",
      "codigo-de-operadora-csp",
    ],
  },
  {
    slug: "numeros-de-emergencia",
    image: editorialGuideImages["numeros-de-emergencia"].image,
    imageAlt: editorialGuideImages["numeros-de-emergencia"].imageAlt,
    title: "Números de emergência no Brasil: quando usar códigos tridígitos",
    description:
      "Entenda o que são os códigos telefónicos tridígitos de emergência e utilidade pública e onde confirmar a lista oficial.",
    eyebrow: "Serviços / emergência",
    summary:
      "Serviços de emergência e utilidade pública utilizam códigos de fácil memorização; as chamadas para emergências públicas são gratuitas.",
    intro:
      "A Anatel descreve os serviços de utilidade pública e de emergência como serviços acessíveis, entre outras formas, por códigos telefónicos tridígitos. A agência informa que as chamadas para serviços públicos de emergência são gratuitas.",
    sections: [
      {
        title: "Códigos de três dígitos",
        body: "Os códigos de fácil memorização tornam o acesso a serviços públicos mais direto. Consulte a lista oficial para identificar o serviço adequado à situação.",
      },
      {
        title: "Use apenas em situações necessárias",
        body: "Os serviços de emergência devem ser acionados de forma responsável. Informações falsas ou ligações indevidas podem prejudicar o atendimento de quem precisa.",
      },
      {
        title: "Diferença para uma chamada comum",
        body: "Códigos de emergência não dependem de consultar DDD. Para contactos de pessoas, empresas e serviços locais, a busca por município continua a ser útil.",
      },
    ],
    faqs: [
      {
        question: "Chamadas de emergência são gratuitas?",
        answer:
          "A Anatel informa que chamadas para serviços públicos de emergência são gratuitas.",
      },
      {
        question: "Esses números usam DDD?",
        answer:
          "Os serviços de utilidade pública e emergência usam códigos próprios, frequentemente tridígitos.",
      },
      {
        question: "Onde consultar a lista oficial?",
        answer: "A referência da Anatel está indicada nas fontes desta página.",
      },
    ],
    sources: ["emergencia"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["o-que-e-ddd", "como-descobrir-ddd-de-uma-cidade"],
  },
  {
    slug: "como-bloquear-chamadas-indesejadas",
    image: editorialGuideImages["como-bloquear-chamadas-indesejadas"].image,
    imageAlt:
      editorialGuideImages["como-bloquear-chamadas-indesejadas"].imageAlt,
    title: "Como bloquear chamadas indesejadas e telemarketing",
    description:
      "Conheça medidas indicadas pela Anatel para reduzir chamadas indesejadas, bloquear números e utilizar o Não Me Perturbe.",
    eyebrow: "Consumidor / proteção",
    summary:
      "Ferramentas do aparelho, aplicações e o serviço Não Me Perturbe ajudam a reduzir chamadas de telemarketing e números específicos.",
    intro:
      "A Anatel orienta utilizar recursos do próprio celular para bloquear números específicos ou chamadas fora da lista de contactos. A agência também informa que o Não Me Perturbe é gratuito para bloquear telemarketing de participantes elegíveis.",
    sections: [
      {
        title: "Comece pelas ferramentas do aparelho",
        body: "Bloqueie números específicos ou use filtros de chamadas desconhecidas quando o seu telefone oferecer esse recurso. As opções variam por sistema e fabricante.",
      },
      {
        title: "Use serviços oficiais quando aplicável",
        body: "O Não Me Perturbe cobre telemarketing das operadoras de telecomunicações participantes e bancos que oferecem crédito consignado, nos termos explicados pela Anatel.",
      },
      {
        title: "Mantenha atenção a golpes",
        body: "Bloquear uma chamada não substitui cuidados de segurança. Não partilhe códigos, senhas ou dados pessoais em contactos não solicitados.",
      },
    ],
    faqs: [
      {
        question: "O Não Me Perturbe bloqueia toda chamada?",
        answer:
          "Não. A Anatel descreve limites e exceções; consulte o serviço antes de se cadastrar.",
      },
      {
        question: "Posso bloquear um número específico?",
        answer:
          "Sim. A Anatel recomenda usar as ferramentas do aparelho para bloquear números específicos.",
      },
      {
        question: "DDD identifica se a chamada é fraude?",
        answer:
          "Não. O DDD identifica uma área de numeração e não confirma a legitimidade de uma chamada.",
      },
    ],
    sources: ["chamadasAbusivas"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["portabilidade-numerica", "o-que-e-ddd"],
  },
  {
    slug: "numero-fixo-tem-quantos-digitos",
    image: editorialGuideImages["numero-fixo-tem-quantos-digitos"].image,
    imageAlt: editorialGuideImages["numero-fixo-tem-quantos-digitos"].imageAlt,
    title: "Número fixo tem quantos dígitos no Brasil?",
    description:
      "Confira o formato de oito dígitos da telefonia fixa segundo o Plano de Numeração Brasileiro.",
    eyebrow: "Telefonia / formatos",
    summary:
      "No Plano de Numeração Brasileiro, o número do assinante na telefonia fixa possui oito dígitos.",
    intro:
      "A Anatel indica oito dígitos para o número do assinante do Serviço Telefônico Fixo Comutado. Essa informação ajuda a identificar números incompletos, mas não substitui a confirmação do DDD quando a chamada exige área de numeração.",
    sections: [
      {
        title: "Oito dígitos no número do assinante",
        body: "O formato de oito dígitos refere-se ao número do assinante de telefonia fixa. O DDD é um elemento separado, utilizado para identificar a área de numeração.",
      },
      {
        title: "Não confunda com celular",
        body: "Números móveis possuem nove dígitos no Plano de Numeração. Verificar o tipo de contacto evita tentativas com um dígito ausente ou a mais.",
      },
      {
        title: "Confirme cidade e área",
        body: "Quando o DDD for necessário, pesquise o município de destino. A ficha territorial mostra o código associado à cidade.",
      },
    ],
    faqs: [
      {
        question: "Telefone fixo tem 8 ou 9 dígitos?",
        answer:
          "A Anatel informa oito dígitos para o número do assinante de telefonia fixa.",
      },
      {
        question: "O DDD conta nesses oito dígitos?",
        answer:
          "Não. O DDD é o código de área, separado do número do assinante.",
      },
      {
        question: "Celular usa o mesmo formato?",
        answer: "Não. O número móvel possui nove dígitos.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: [
      "numero-de-celular-tem-quantos-digitos",
      "como-ligar-de-celular-para-fixo",
    ],
  },
  {
    slug: "numero-de-celular-tem-quantos-digitos",
    image: editorialGuideImages["numero-de-celular-tem-quantos-digitos"].image,
    imageAlt:
      editorialGuideImages["numero-de-celular-tem-quantos-digitos"].imageAlt,
    title: "Número de celular tem quantos dígitos no Brasil?",
    description:
      "Veja o formato de nove dígitos do celular no Brasil e como distinguir o número móvel do telefone fixo.",
    eyebrow: "Telefonia / formatos",
    summary:
      "No Plano de Numeração Brasileiro, o número do Serviço Móvel Pessoal possui nove dígitos.",
    intro:
      "Para o Serviço Móvel Pessoal, a Anatel indica um número de assinante com nove dígitos. Essa referência é útil para conferir se o contacto foi anotado de forma completa.",
    sections: [
      {
        title: "Nove dígitos para móvel",
        body: "O formato de nove dígitos corresponde ao número do assinante de celular. O DDD, quando aplicável, continua a ser o código de área separado.",
      },
      {
        title: "Diferença em relação ao fixo",
        body: "Números de telefonia fixa possuem oito dígitos. A distinção ajuda a evitar erros ao guardar ou informar um contacto.",
      },
      {
        title: "Não infira a prestadora",
        body: "O número e o DDD não são confirmação da operadora atual, pois existe portabilidade numérica.",
      },
    ],
    faqs: [
      {
        question: "Celular tem 9 dígitos?",
        answer:
          "Sim. A Anatel informa nove dígitos para o Serviço Móvel Pessoal.",
      },
      {
        question: "DDD está incluído nos nove dígitos?",
        answer:
          "Não. O DDD é o código de área e é separado do número do assinante.",
      },
      {
        question: "O número indica a operadora?",
        answer:
          "Não com segurança, pois a portabilidade permite manter o número ao mudar de prestadora.",
      },
    ],
    sources: ["numeracao", "portabilidade"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["numero-fixo-tem-quantos-digitos", "portabilidade-numerica"],
  },
  {
    slug: "o-que-e-codigo-nacional",
    image: editorialGuideImages["o-que-e-codigo-nacional"].image,
    imageAlt: editorialGuideImages["o-que-e-codigo-nacional"].imageAlt,
    title: "O que é código nacional na telefonia brasileira?",
    description:
      "Entenda a relação entre código nacional, área de numeração e DDD no Plano de Numeração Brasileiro.",
    eyebrow: "Telefonia / numeração",
    summary:
      "Código nacional é uma forma técnica de referir-se ao elemento de área de numeração conhecido pelo público como DDD.",
    intro:
      "Em materiais de numeração, o código de área também pode aparecer como código nacional. Para a consulta do dia a dia, o termo mais comum é DDD: o código de dois dígitos ligado a uma área de numeração.",
    sections: [
      {
        title: "Termo técnico e uso cotidiano",
        body: "DDD é a expressão popular para o código de área. A nomenclatura técnica ajuda a situar esse elemento dentro do Plano de Numeração Brasileiro.",
      },
      {
        title: "Área, não município isolado",
        body: "O código organiza uma área de numeração e pode abranger muitas cidades. Consulte sempre a página do município antes de atribuir um DDD.",
      },
      {
        title: "Consulta territorial",
        body: "O atlas conecta cidade, estado e código para permitir uma verificação contextual e partilhável.",
      },
    ],
    faqs: [
      {
        question: "Código nacional é igual a DDD?",
        answer:
          "No contexto da área de numeração, refere-se ao código de dois dígitos conhecido como DDD.",
      },
      {
        question: "Um código nacional vale para uma cidade?",
        answer: "Pode abranger diversos municípios numa área de numeração.",
      },
      {
        question: "Como consultar uma área?",
        answer: "Pesquise o DDD, o município ou o estado nesta plataforma.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["o-que-e-ddd", "como-descobrir-ddd-de-uma-cidade"],
  },
  {
    slug: "como-ligar-a-cobrar",
    image: editorialGuideImages["como-ligar-a-cobrar"].image,
    imageAlt: editorialGuideImages["como-ligar-a-cobrar"].imageAlt,
    title: "Como ligar a cobrar: o que confirmar antes da chamada",
    description:
      "Veja os cuidados para procurar instruções atualizadas sobre chamadas a cobrar e confirmar disponibilidade com a prestadora.",
    eyebrow: "Chamadas / orientações",
    summary:
      "A disponibilidade e a sequência de uma chamada a cobrar dependem do serviço contratado e devem ser confirmadas com a prestadora.",
    intro:
      "Chamadas a cobrar podem ter regras específicas de disponibilidade, sequência de discagem e tarifação. Para evitar instruções desatualizadas, confirme o procedimento diretamente nos canais oficiais da sua prestadora.",
    sections: [
      {
        title: "Confirme a disponibilidade",
        body: "Nem todos os planos, redes ou destinos seguem a mesma regra operacional. A prestadora pode informar se o recurso está disponível no seu serviço.",
      },
      {
        title: "Verifique o DDD do destino",
        body: "Quando a chamada envolver outra área de numeração, confirme o DDD do município antes de seguir instruções fornecidas pela operadora.",
      },
      {
        title: "Peça consentimento ao destinatário",
        body: "Uma chamada a cobrar depende da aceitação de quem a recebe. Prefira informar previamente quando possível.",
      },
    ],
    faqs: [
      {
        question: "Toda operadora oferece chamada a cobrar?",
        answer:
          "A disponibilidade depende do serviço e da prestadora. Confirme nos canais oficiais.",
      },
      {
        question: "A chamada a cobrar precisa de DDD?",
        answer:
          "A necessidade depende da origem, do destino e da regra informada pela prestadora.",
      },
      {
        question: "O DDD Brasil informa tarifas?",
        answer:
          "A plataforma organiza áreas de numeração; condições comerciais devem ser confirmadas com a operadora.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: commonTerritoryLinks,
    relatedSlugs: ["como-ligar-para-outro-estado", "codigo-de-operadora-csp"],
  },
  {
    slug: "ddd-de-capitais-do-brasil",
    image: editorialGuideImages["ddd-de-capitais-do-brasil"].image,
    imageAlt: editorialGuideImages["ddd-de-capitais-do-brasil"].imageAlt,
    title: "DDD das capitais do Brasil: como consultar por cidade",
    description:
      "Aprenda a encontrar o DDD das capitais brasileiras pela ficha municipal e a confirmar o código de cada área de numeração.",
    eyebrow: "Consulta / capitais",
    summary:
      "A página de cada capital permite confirmar o DDD local, o estado e os municípios que compartilham a mesma área de numeração.",
    intro:
      "Capitais concentram muitas buscas por código de área, mas o caminho mais confiável é consultar a ficha municipal de cada uma. Assim, o DDD é apresentado junto do estado e da área territorial que cobre.",
    sections: [
      {
        title: "Consulte uma capital pelo nome",
        body: "Pesquise a cidade e a UF. Isto é útil para nomes que possam ter variações de escrita ou referências semelhantes.",
      },
      {
        title: "Veja a cobertura do DDD",
        body: "A página do código mostra os municípios abrangidos. Uma capital pode compartilhar a área de numeração com outras localidades.",
      },
      {
        title: "Use links diretos",
        body: "Cada ficha possui uma URL partilhável. Guarde a página certa em vez de depender de listas sem contexto.",
      },
    ],
    faqs: [
      {
        question: "Toda capital tem um DDD exclusivo?",
        answer:
          "Não necessariamente. Um DDD pode abranger outros municípios além da capital.",
      },
      {
        question: "Como encontrar Brasília, São Paulo ou Rio?",
        answer:
          "Pesquise a cidade ou use os atalhos territoriais desta página.",
      },
      {
        question: "Posso partilhar a consulta?",
        answer:
          "Sim. As páginas de cidades e DDDs possuem URLs diretas e ações de partilha.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      { label: "DDD de São Paulo (11)", href: "/cidade/sp/sao-paulo" },
      {
        label: "DDD do Rio de Janeiro (21)",
        href: "/cidade/rj/rio-de-janeiro",
      },
      { label: "DDD de Brasília (61)", href: "/cidade/df/brasilia" },
    ],
    relatedSlugs: [
      "como-descobrir-ddd-de-uma-cidade",
      "como-telefonar-para-sao-paulo",
    ],
  },
  {
    slug: "como-telefonar-para-sao-paulo",
    image: editorialGuideImages["como-telefonar-para-sao-paulo"].image,
    imageAlt: editorialGuideImages["como-telefonar-para-sao-paulo"].imageAlt,
    title: "Como telefonar para São Paulo: encontre o DDD da cidade",
    description:
      "Consulte o DDD de São Paulo, confirme a ficha da cidade e navegue pela cobertura territorial do código 11.",
    eyebrow: "Cidades / São Paulo",
    summary:
      "A ficha de São Paulo permite confirmar o DDD da cidade e explorar os municípios relacionados à mesma área de numeração.",
    intro:
      "Para telefonar para São Paulo, comece pela confirmação do código de área do município. A página territorial reúne o DDD, a UF e os caminhos para a cobertura completa do código.",
    sections: [
      {
        title: "Abra a ficha de São Paulo",
        body: "A ficha municipal mostra o DDD associado à cidade e a ligação para a página do código. Ela evita confundir a capital com outros municípios do estado.",
      },
      {
        title: "Use o número completo",
        body: "Verifique se o destino é fixo ou móvel e use o formato de número correspondente. A Anatel indica oito dígitos para fixo e nove para móvel.",
      },
      {
        title: "Confira o seu plano",
        body: "A forma de discagem e condições de cobrança dependem da origem, do serviço e da prestadora.",
      },
    ],
    faqs: [
      {
        question: "Qual é o DDD de São Paulo?",
        answer:
          "A ficha territorial de São Paulo apresenta o código de área associado à cidade.",
      },
      {
        question: "DDD 11 atende só a capital?",
        answer:
          "Consulte a página do DDD para ver os municípios abrangidos pela área de numeração.",
      },
      {
        question: "Como ligar para um celular em São Paulo?",
        answer:
          "Confirme o DDD e utilize o número móvel completo, com nove dígitos.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      { label: "Ficha: São Paulo", href: "/cidade/sp/sao-paulo" },
      { label: "Cobertura do DDD 11", href: "/ddd/11" },
      { label: "Pilar: São Paulo", href: "/estado/sp" },
    ],
    relatedSlugs: ["como-ligar-para-outro-estado", "ddd-de-capitais-do-brasil"],
  },
  {
    slug: "como-telefonar-para-rio-de-janeiro",
    image: editorialGuideImages["como-telefonar-para-rio-de-janeiro"].image,
    imageAlt:
      editorialGuideImages["como-telefonar-para-rio-de-janeiro"].imageAlt,
    title: "Como telefonar para o Rio de Janeiro: encontre o DDD da cidade",
    description:
      "Consulte o DDD do Rio de Janeiro, confirme a ficha municipal e navegue pela área de numeração associada ao código 21.",
    eyebrow: "Cidades / Rio de Janeiro",
    summary:
      "A ficha do Rio de Janeiro confirma o DDD da cidade e liga diretamente à cobertura territorial do código.",
    intro:
      "Para telefonar para a cidade do Rio de Janeiro, confirme primeiro o DDD na ficha municipal. O atlas liga a cidade ao estado e à página que reúne a cobertura do código de área.",
    sections: [
      {
        title: "Confirme o município",
        body: "O estado do Rio de Janeiro possui diversos municípios e áreas de numeração. Pesquisar a cidade evita usar um código associado a outra localidade.",
      },
      {
        title: "Verifique o formato do contacto",
        body: "Telefones fixos possuem oito dígitos e números móveis possuem nove, segundo o Plano de Numeração Brasileiro.",
      },
      {
        title: "Consulte o seu serviço",
        body: "Instruções e tarifas de chamadas podem variar conforme plano, origem e prestadora.",
      },
    ],
    faqs: [
      {
        question: "Qual é o DDD do Rio de Janeiro?",
        answer:
          "Abra a ficha municipal do Rio de Janeiro para consultar o código de área da cidade.",
      },
      {
        question: "O estado inteiro usa o mesmo DDD?",
        answer:
          "A confirmação deve ser feita por município; uma área de numeração pode não abranger todo o estado.",
      },
      {
        question: "A ligação para celular usa outro DDD?",
        answer:
          "O DDD está associado à área de numeração; confirme o município de destino e o número móvel completo.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      { label: "Ficha: Rio de Janeiro", href: "/cidade/rj/rio-de-janeiro" },
      { label: "Cobertura do DDD 21", href: "/ddd/21" },
      { label: "Pilar: Rio de Janeiro", href: "/estado/rj" },
    ],
    relatedSlugs: ["como-ligar-para-outro-estado", "ddd-de-capitais-do-brasil"],
  },
  {
    slug: "como-telefonar-para-brasilia",
    image: editorialGuideImages["como-telefonar-para-brasilia"].image,
    imageAlt: editorialGuideImages["como-telefonar-para-brasilia"].imageAlt,
    title: "Como telefonar para Brasília: encontre o DDD da cidade",
    description:
      "Consulte o DDD de Brasília, confirme o município e explore a página territorial associada ao código 61.",
    eyebrow: "Cidades / Brasília",
    summary:
      "A ficha de Brasília reúne o DDD da cidade, a UF e o acesso à cobertura da área de numeração.",
    intro:
      "Para telefonar para Brasília, consulte a ficha municipal antes de discar. A página territorial permite confirmar o DDD, diferenciar a cidade de outras localidades da área e partilhar a consulta correta.",
    sections: [
      {
        title: "Use a ficha da cidade",
        body: "A pesquisa por Brasília abre a página municipal, onde o DDD é apresentado no contexto do Distrito Federal e da cobertura territorial.",
      },
      {
        title: "Confira fixo ou celular",
        body: "Use o número completo de acordo com o serviço: oito dígitos para telefone fixo e nove para móvel, conforme a Anatel.",
      },
      {
        title: "Valide com a prestadora",
        body: "Planos e modalidades podem alterar a forma de completar a chamada e as condições de cobrança.",
      },
    ],
    faqs: [
      {
        question: "Qual é o DDD de Brasília?",
        answer:
          "A ficha municipal de Brasília apresenta o código de área associado à cidade.",
      },
      {
        question: "Brasília e Distrito Federal são a mesma consulta?",
        answer:
          "Use a ficha da cidade para a confirmação mais específica e a página territorial para explorar a UF.",
      },
      {
        question: "Onde vejo os municípios do DDD?",
        answer:
          "Abra a página da cobertura do código de área a partir da ficha municipal.",
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      { label: "Ficha: Brasília", href: "/cidade/df/brasilia" },
      { label: "Cobertura do DDD 61", href: "/ddd/61" },
      { label: "Pilar: Distrito Federal", href: "/estado/df" },
    ],
    relatedSlugs: ["como-ligar-para-outro-estado", "ddd-de-capitais-do-brasil"],
  },
];

function createCapitalGuide(input: {
  slug: string;
  city: string;
  state: string;
  uf: string;
  ddd: string;
}): EditorialGuide {
  const image = editorialGuideImages[input.slug];
  return {
    slug: input.slug,
    image: image?.image ?? "/assets/guia-como-descobrir-ddd-de-uma-cidade.jpg",
    imageAlt:
      image?.imageAlt ??
      `Ilustração editorial de um mapa urbano representando ${input.city}.`,
    title: `Como telefonar para ${input.city}: DDD ${input.ddd}`,
    description: `Consulte o DDD de ${input.city}, confirme a ficha municipal e navegue pela cobertura territorial do código ${input.ddd}.`,
    eyebrow: `Cidades / ${input.city}`,
    summary: `A ficha de ${input.city} permite confirmar o DDD ${input.ddd} no contexto da área de numeração e dos municípios relacionados.`,
    intro: `Antes de telefonar para ${input.city}, confirme a cidade, a UF e o código de área na ficha territorial. Depois, use a página do DDD para explorar a cobertura completa.`,
    sections: [
      {
        title: `Confirme ${input.city}`,
        body: "Use a ficha municipal para validar o destino e evitar confundir referências territoriais semelhantes.",
      },
      {
        title: `Abra a cobertura do DDD ${input.ddd}`,
        body: "O código de área pode abranger outros municípios. A página de cobertura mostra a lista ligada à mesma numeração.",
      },
      {
        title: "Use o número completo",
        body: "Confirme se o destino é fixo ou móvel e verifique regras de cobrança e discagem com a sua prestadora.",
      },
    ],
    faqs: [
      {
        question: `Qual é o DDD de ${input.city}?`,
        answer: `A ficha territorial de ${input.city} apresenta o código de área associado à cidade.`,
      },
      {
        question: `O DDD ${input.ddd} atende só ${input.city}?`,
        answer:
          "Não necessariamente. Consulte a página de cobertura territorial do código para verificar os municípios abrangidos.",
      },
      {
        question: `Como encontro outros DDDs de ${input.state}?`,
        answer: `Abra o pilar de ${input.state} ou pesquise outro município pela busca do DDD Brasil.`,
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      {
        label: `Ficha: ${input.city}`,
        href: `/cidade/${input.uf}/${input.slug.replace("como-telefonar-para-", "")}`,
      },
      { label: `Cobertura do DDD ${input.ddd}`, href: `/ddd/${input.ddd}` },
      { label: `Pilar: ${input.state}`, href: `/estado/${input.uf}` },
    ],
    relatedSlugs: [
      "ddd-de-capitais-do-brasil",
      "como-ligar-para-outro-estado",
      "como-descobrir-ddd-de-uma-cidade",
    ],
  };
}

function createDddGuide(input: {
  code: string;
  cities: string;
  state: string;
  uf: string;
  anchorCity: string;
  citySlug: string;
}): EditorialGuide {
  const image = editorialGuideImages[`ddd-${input.code}-cidades-e-cobertura`];
  return {
    slug: `ddd-${input.code}-cidades-e-cobertura`,
    image: image?.image ?? "/assets/guia-o-que-e-ddd.jpg",
    imageAlt:
      image?.imageAlt ??
      `Ilustração editorial da área de numeração do DDD ${input.code}.`,
    title: `DDD ${input.code}: cidades e cobertura da área de numeração`,
    description: `Consulte o DDD ${input.code}, confirme cidades atendidas e navegue pela cobertura territorial ligada a ${input.anchorCity}.`,
    eyebrow: `DDD / ${input.code}`,
    summary: `O DDD ${input.code} organiza uma área de numeração. A página de cobertura mostra os municípios associados ao código.`,
    intro: `A forma mais segura de confirmar o DDD ${input.code} é abrir a página de cobertura e depois verificar o município de destino. Este guia reúne os caminhos para ${input.anchorCity}, ${input.state} e a lista atual de cidades do código.`,
    sections: [
      {
        title: `Consulte o DDD ${input.code}`,
        body: "A página territorial do código mostra os municípios associados à área de numeração e deve ser a referência para confirmar um destino.",
      },
      {
        title: "Confirme a cidade",
        body: `Pesquise a cidade, especialmente se o nome for parecido com o de outra localidade. Para iniciar, consulte ${input.anchorCity}.`,
      },
      {
        title: "Complete a chamada",
        body: "Depois de validar o DDD, use o número completo e confirme regras de discagem e tarifação com a prestadora.",
      },
    ],
    faqs: [
      {
        question: `Quais cidades usam o DDD ${input.code}?`,
        answer:
          "Abra a página de cobertura do código para consultar a lista territorial atual.",
      },
      {
        question: `O DDD ${input.code} atende somente ${input.anchorCity}?`,
        answer:
          "Não. A área de numeração pode abranger outros municípios; confirme no inventário territorial da plataforma.",
      },
      {
        question: `Como encontro outros DDDs de ${input.state}?`,
        answer: `Abra o pilar de ${input.state} para navegar por códigos e municípios do estado.`,
      },
    ],
    sources: ["numeracao"],
    territoryLinks: [
      { label: `Cobertura do DDD ${input.code}`, href: `/ddd/${input.code}` },
      {
        label: `Ficha: ${input.anchorCity}`,
        href: `/cidade/${input.uf}/${input.citySlug}`,
      },
      { label: `Pilar: ${input.state}`, href: `/estado/${input.uf}` },
    ],
    relatedSlugs: [
      `como-telefonar-para-${input.citySlug}`,
      "como-ligar-para-outro-estado",
      "o-que-e-ddd",
    ],
  };
}

editorialGuides.push(
  createCapitalGuide({
    slug: "como-telefonar-para-belo-horizonte",
    city: "Belo Horizonte",
    state: "Minas Gerais",
    uf: "mg",
    ddd: "31",
  }),
  createCapitalGuide({
    slug: "como-telefonar-para-curitiba",
    city: "Curitiba",
    state: "Paraná",
    uf: "pr",
    ddd: "41",
  }),
  createCapitalGuide({
    slug: "como-telefonar-para-porto-alegre",
    city: "Porto Alegre",
    state: "Rio Grande do Sul",
    uf: "rs",
    ddd: "51",
  }),
  createCapitalGuide({
    slug: "como-telefonar-para-salvador",
    city: "Salvador",
    state: "Bahia",
    uf: "ba",
    ddd: "71",
  }),
  createCapitalGuide({
    slug: "como-telefonar-para-recife",
    city: "Recife",
    state: "Pernambuco",
    uf: "pe",
    ddd: "81",
  }),
  createCapitalGuide({
    slug: "como-telefonar-para-fortaleza",
    city: "Fortaleza",
    state: "Ceará",
    uf: "ce",
    ddd: "85",
  }),
  createDddGuide({
    code: "11",
    cities: "São Paulo",
    state: "São Paulo",
    uf: "sp",
    anchorCity: "São Paulo",
    citySlug: "sao-paulo",
  }),
  createDddGuide({
    code: "21",
    cities: "Rio de Janeiro",
    state: "Rio de Janeiro",
    uf: "rj",
    anchorCity: "Rio de Janeiro",
    citySlug: "rio-de-janeiro",
  }),
  createDddGuide({
    code: "31",
    cities: "Belo Horizonte",
    state: "Minas Gerais",
    uf: "mg",
    anchorCity: "Belo Horizonte",
    citySlug: "belo-horizonte",
  }),
  createDddGuide({
    code: "41",
    cities: "Curitiba",
    state: "Paraná",
    uf: "pr",
    anchorCity: "Curitiba",
    citySlug: "curitiba",
  }),
  createDddGuide({
    code: "51",
    cities: "Porto Alegre",
    state: "Rio Grande do Sul",
    uf: "rs",
    anchorCity: "Porto Alegre",
    citySlug: "porto-alegre",
  })
);
// Guias complementares de keywords de operadoras e discagem internacional.
for (const guide of Object.values(newGuides)) editorialGuides.push(guide);

export const guideSlugs = editorialGuides.map(guide => guide.slug);

export function findEditorialGuide(slug: string | undefined) {
  return editorialGuides.find(guide => guide.slug === slug);
}

export function getRelatedEditorialGuides(slug: string, limit = 3) {
  const guide = findEditorialGuide(slug);
  if (!guide) return [];
  const preferred = guide.relatedSlugs.length
    ? guide.relatedSlugs
    : editorialGuides
        .filter(item => item.slug !== guide.slug)
        .map(item => item.slug);
  return preferred
    .map(relatedSlug => findEditorialGuide(relatedSlug))
    .filter(
      (item): item is EditorialGuide =>
        item !== undefined && item.slug !== guide.slug
    )
    .slice(0, limit);
}
