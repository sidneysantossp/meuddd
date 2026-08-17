import type { EditorialGuide, EditorialSourceId } from "./editorialGuides";

export type NewGuideId =
  | "qual-o-ddd-da-claro-vivo-e-tim"
  | "codigos-internacionais-ddi";

const operadoraSource: Record<string, { name: string; url: string }> = {
  portabilidade: {
    name: "Portabilidade — Anatel",
    url: "https://www.gov.br/anatel/pt-br/consumidor/conheca-seus-direitos-2/telefonia-fixa/portabilidade",
  },
  numeracao: {
    name: "Plano de Numeração Brasileiro — Anatel",
    url: "https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro",
  },
  chamadasAbusivas: {
    name: "Chamadas abusivas — Anatel",
    url: "https://www.gov.br/anatel/pt-br/consumidor/chamadas-abusivas",
  },
  emergencia: {
    name: "Serviços de Utilidade Pública e de Emergência — Anatel",
    url: "https://www.gov.br/anatel/pt-br/regulado/numeracao/codigos-nacionais/servicos-de-utilidade-publica-e-de-emergencia",
  },
};

export const newGuides: Record<NewGuideId, EditorialGuide> = {
  "qual-o-ddd-da-claro-vivo-e-tim": {
    slug: "qual-o-ddd-da-claro-vivo-e-tim",
    title:
      "Qual o DDD da Claro, Vivo e TIM? DDD depende da cidade, não da operadora",
    description:
      "O DDD não identifica a operadora: Claro, Vivo e TIM usam os mesmos códigos de área. Descubra como reconhecer a operadora de um número com portabilidade e qual DDD usar ao ligar.",
    eyebrow: "Operadoras e DDD",
    summary:
      "Muitas pessoas pesquisam \u201cqual o DDD da Claro\u201d, \u201cqual o DDD da Vivo\u201d ou \u201cqual o DDD da TIM\u201d esperando um código de área próprio de cada prestadora. A resposta é simples: o DDD não pertence à operadora. Ele é um código de área territorial definido pela ANATEL para o Plano de Numeração Brasileiro, e todas as operadoras do país — Claro, Vivo, TIM e demais — utilizam os mesmos códigos, definidos pela localização do assinante.",
    intro:
      "Esta confusão é muito comum. Ao procurar \u201cqual o DDD da Claro\u201d, por exemplo, a pessoa geralmente quer saber se existe um código que identifique números dessa operadora — ou se precisa discar algo diferente ao ligar para clientes Claro, Vivo ou TIM. Nesta página explicamos a relação real entre DDD e operadora, como funciona a portabilidade numérica e o que realmente identifica uma linha telefónica no Brasil.",
    image: "/assets/guia-codigo-de-operadora-csp.jpg",
    imageAlt:
      "Ilustração editorial de dígitos de DDD seguindo uma rota até torres de operadoras de telefonia.",
    sections: [
      {
        title: "Por que o DDD não pertence à Claro, Vivo ou TIM?",
        body: "O [DDD](/guia/o-que-e-ddd) é um código de área com dois dígitos atribuído a uma região geográfica do Brasil, e não a uma prestadora de serviço. A ANATEL distribui as faixas de numeração por localidade no âmbito do [Plano de Numeração Brasileiro](https://www.gov.br/anatel/pt-br/regulado/numeracao/plano-de-numeracao-brasileiro): quem escolhe o código é o regulador, e a atribuição considera a malha territorial — estados, regiões e municípios — e não o mercado de operadoras. Por isso, em São Paulo o DDD 11 é usado simultaneamente por linhas da Claro, da Vivo, da TIM e de qualquer outra prestadora que atue na região.",
      },
      {
        title: "Existe um código que identifica a operadora?",
        body: "Não há um código de dois dígitos que identifique a operadora, mas a resposta ao questionamento \u201cqual o DDD da operadora\u201d existe em outra camada: o Código de Seleção de Prestadora (CSP). São dígitos de dois a quatro algarismos inseridos entre o 0 e o DDD numa discagem interurbana (0 + CSP + DDD + número). Cada prestadora tem o seu CSP — por exemplo, 041 e 21 para a TIM, 015 e 15 para a Claro, 031 e 31 para a Vivo — e a escolha define por qual rede a chamada será completada. O CSP, contudo, indica apenas a prestadora escolhida para aquela ligação, e não a operadora de origem do número discado.",
      },
      {
        title: "Como saber a operadora de um número?",
        body: "Desde 2006, a [portabilidade numérica](https://www.gov.br/anatel/pt-br/consumidor/conheca-seus-direitos-2/telefonia-fixa/portabilidade) permite que o assinante troque de operadora mantendo o mesmo número. Por isso, o DDD e o prefixo deixaram de ser indicadores confiáveis da prestadora atual: um número com prefixo que nasceu na Vivo pode hoje estar na TIM. Para saber com segurança a operadora de um número, utilize os canais oficiais de consulta das próprias prestadoras ou verifique a fatura do titular. Ao ligar, o CSP resolve a escolha da rede sem que seja preciso adivinhar a origem.",
      },
      {
        title: "Como discar para números Claro, Vivo e TIM",
        body: "O processo de discagem é idêntico para qualquer operadora. Para chamadas locais, basta discar o número completo (com o DDD fora da mesma área). Para chamadas interurbanas, disque 0 + código da prestadora (CSP) + DDD + número. Para ligações internacionais, o formato é 00 + CSP + 55 + DDD + número — ou, partindo de outros países, use o código do Brasil (+55) seguido do DDD e do número do assinante. O [guia de discagem interurbana](/guia/como-ligar-para-outro-estado) detalha cada caso, e as tarifas dependem exclusivamente do plano contratado com a sua prestadora.",
      },
      {
        title: "DDD por estado: confira o código da sua região",
        body: "Como o DDD depende da localidade e não da operadora, o caminho mais rápido é identificar o código de área da cidade desejada. A tabela do [atlas do Meu DDD](/) lista todos os códigos por estado e município: São Paulo capital e região metropolitana usam o DDD 11, o Rio de Janeiro usa o 21, Brasília o 61, Belo Horizonte o 31, Curitiba o 41, Salvador o 71, e assim por diante até os 67 códigos do território nacional. Depois de identificar o DDD da localidade, complete a discagem conforme a operadora de destino — a rede de saída fica a seu critério.",
      },
    ],
    faqs: [
      {
        question: "Qual o DDD da Claro?",
        answer:
          "Não existe DDD exclusivo da Claro. O DDD é um código de área territorial definido pela ANATEL e usado por todas as operadoras. O que identifica a Claro na discagem é o Código de Seleção de Prestadora (CSP), como 015 e 15, inserido entre o 0 e o DDD em ligações interurbanas.",
      },
      {
        question: "Qual o DDD da Vivo?",
        answer:
          "Não existe DDD exclusivo da Vivo. As linhas Vivo usam os mesmos códigos de área das demais prestadoras, definidos pela localidade do assinante. Para ligações interurbanas pela rede da Vivo, use o CSP correspondente (031 ou 31) entre o 0 e o DDD.",
      },
      {
        question: "Qual o DDD da TIM?",
        answer:
          "Não existe DDD exclusivo da TIM. Como todas as operadoras, a TIM utiliza os códigos de área definidos pela ANATEL para cada região do país. Na discagem interurbana pela rede da TIM, o identificador é o CSP 041 ou 21, colocado entre o 0 e o DDD.",
      },
      {
        question: "Como descobrir a operadora de um número de celular?",
        answer:
          "Com a portabilidade numérica, o DDD e o prefixo não garantem mais a identificação da operadora. Para confirmar, utilize os canais oficiais de consulta da operadora, verifique a fatura do titular ou peça a informação diretamente à pessoa. Ao ligar, você escolhe a rede de saída pelo CSP, independentemente da origem do número.",
      },
      {
        question: "O que é o código 015, 021, 031, 041 antes do DDD?",
        answer:
          "São códigos de seleção de prestadora (CSP), que indicam por qual operadora a chamada interurbana será completada. 015/15 é Claro, 021/21 é TIM, 031/31 é Vivo. Eles não identificam a operadora do número de destino — apenas a rede escolhida para transportar a ligação.",
      },
      {
        question:
          "Preciso discar diferente para ligar para um número da Claro, Vivo ou TIM?",
        answer:
          "Não. A forma de discar é a mesma para qualquer operadora: número local com DDD na mesma região, ou 0 + CSP + DDD + número em chamadas interurbanas. A operadora de destino não altera o formato da discagem.",
      },
      {
        question: "Qual DDD usar para ligar para um número Claro?",
        answer:
          "O DDD da localidade onde o número foi contratado, como se fosse de qualquer outra operadora. Descubra o código da cidade no Meu DDD e complete a discagem normalmente.",
      },
      {
        question: "O DDD muda se eu trocar de operadora?",
        answer:
          "Não. Na portabilidade numérica, o assinante mantém o número completo — DDD e prefixo incluídos — ao migrar entre Claro, Vivo, TIM e demais prestadoras. O código de área está ligado à localidade, não à operadora.",
      },
      {
        question: "Existe um DDD de celular e outro de fixo?",
        answer:
          "Não. O DDD identifica a área de numeração, e não o tipo de linha. Dentro da mesma região, telefones fixos e celulares compartilham o mesmo código de área; o que diferencia o número é a quantidade de dígitos (oito nos fixos, nove nos celulares, iniciados por 9).",
      },
      {
        question: "Como ligar de outra operadora para um número local?",
        answer:
          "Para chamadas locais dentro da mesma área de numeração, disque apenas o número completo com DDD, independentemente da operadora de origem e de destino. Para outras regiões, use 0 + CSP + DDD + número; o CSP é o que define a sua operadora de saída.",
      },
    ],
    sources: [
      "numeracao",
      "portabilidade",
      "chamadasAbusivas",
    ] as EditorialSourceId[],
    territoryLinks: [
      { label: "Consultar DDD por estado", href: "/#explorar" },
      { label: "DDD de São Paulo (11)", href: "/ddd/11" },
      { label: "DDD do Rio de Janeiro (21)", href: "/ddd/21" },
      {
        label: "Guia de discagem interurbana",
        href: "/guia/como-ligar-para-outro-estado",
      },
      {
        label: "Código de operadora CSP",
        href: "/guia/codigo-de-operadora-csp",
      },
      { label: "Portabilidade numérica", href: "/guia/portabilidade-numerica" },
    ],
    relatedSlugs: [
      "codigo-de-operadora-csp",
      "portabilidade-numerica",
      "o-que-e-ddd",
      "como-ligar-para-outro-estado",
      "diferenca-entre-ddd-e-ddi",
    ],
  },
  "codigos-internacionais-ddi": {
    slug: "codigos-internacionais-ddi",
    title:
      "Códigos internacionais de telefonia (DDI): Brasil +55, EUA +1, Portugal +351 e tabela completa",
    description:
      "Tabela dos códigos internacionais de telefone (DDI) dos principais países: Brasil +55, Estados Unidos e Canadá +1, Portugal +351, Argentina +54. Como discar do exterior para o Brasil e vice-versa.",
    eyebrow: "Discagem internacional",
    summary:
      "O código internacional de cada país — conhecido como DDI, do inglês Direct Dialing International — é o prefixo que identifica a nação numa chamada transfronteiriça. O Brasil usa o +55; os Estados Unidos e o Canadá compartilham o +1; Portugal usa o +351; e a Argentina usa o +54. Esta página reúne a tabela dos principais códigos e o formato completo de discagem em cada sentido.",
    intro:
      "Quem pesquisa \u201ccódigo do Brasil no exterior\u201d, \u201ccomo ligar para os Estados Unidos\u201d ou \u201cqual o código de Portugal\u201d precisa de uma referência rápida e confiável. O DDI é atribuído pela União Internacional de Telecomunicações (UIT) e é a primeira camada da discagem internacional — antes do DDD local e do número do assinante. Abaixo, a tabela de referência e os formatos exatos de discagem.",
    image: "/assets/guia-como-ligar-para-outro-pais-ddi.jpg",
    imageAlt:
      "Ilustração editorial de um globo com uma rota aérea de chamada internacional ligando continentes.",
    sections: [
      {
        title: "Tabela de códigos internacionais (DDI) dos principais países",
        body: "A tabela reúne os códigos atribuídos pela UIT aos países com maior volume de chamadas para e do Brasil. Note que alguns países partilham o mesmo código (Estados Unidos e Canadá no +1; Reino Unido e dependências) e que o formato pode variar conforme o território. Para confirmar o código de um país não listado, consulte os registos oficiais da UIT ou o site do Ministério das Relações Exteriores.\n\n| País | DDI | Observação |\n|---|---|---|\n| Brasil | +55 | Fixo: 8 dígitos; celular: 9 dígitos (inicia com 9) |\n| Estados Unidos | +1 | Partilhado com Canadá, Alasca, Havaí e territórios |\n| Canadá | +1 | Mesmo plano de numeração dos EUA |\n| Portugal | +351 | Números de 9 dígitos, iniciados por 9, 2 ou 3 |\n| Argentina | +54 | Celulares com 10 dígitos iniciados por 9 |\n| Alemanha | +49 | — |\n| Espanha | +34 | — |\n| França | +33 | — |\n| Itália | +39 | — |\n| Reino Unido | +44 | — |\n| Japão | +81 | — |\n| China | +86 | — |\n| Austrália | +61 | — |\n| México | +52 | — |\n| Chile | +56 | — |\n| Paraguai | +595 | — |\n| Uruguai | +598 | — |\n| Peru | +51 | — |\n| Bolívia | +591 | — |\n| Colômbia | +57 | — |",
      },
      {
        title: "Como ligar do exterior para o Brasil",
        body: "A sequência a partir de qualquer país é: código de saída internacional do país de origem (00 na Europa, 011 nos EUA/Canadá, 0011 na Austrália) + 55 + DDD com dois dígitos + número do assinante. Exemplo prático: para ligar de Lisboa para um celular de São Paulo, disca-se 00 55 11 9XXXX-XXXX; de Nova Iorque para o mesmo número, 011 55 11 9XXXX-XXXX. No formato internacional, escreve-se +55 11 9XXXX-XXXX — o sinal + substitui o código de saída de qualquer origem. O DDD permanece obrigatório: sem ele, a chamada não localiza a área de destino.",
      },
      {
        title: "Como ligar do Brasil para o exterior",
        body: "A partir de uma linha brasileira, a sequência é: 00 + CSP (código da prestadora de saída internacional, como 15 da Claro ou 31 da Vivo) + DDI do país de destino + número local. Exemplo: para Lisboa, 00 31 351 XXXXXXXX; para Nova Iorque, 00 15 1 XXXXXXXX. As tarifas são definidas pelo plano internacional contratado com a sua operadora, e várias prestadoras oferecem pacotes com tarifas reduzidas para destinos fixos. O WhatsApp e outras aplicações de voz sobre dados são alternativas sem custo de chamada internacional quando ambos os lados têm internet.",
      },
      {
        title: "A diferença entre DDD e DDI",
        body: "O [DDD](/guia/o-que-e-ddd) organiza a numeração dentro do Brasil: dois dígitos que identificam a área geográfica de uma linha. O DDI identifica o país e é a camada externa da discagem. A [diferença entre DDD e DDI](/guia/diferenca-entre-ddd-e-ddi) é essencial para quem faz chamadas internacionais com frequência: um erro na camada do país faz a chamada falhar antes mesmo de considerar a área local, e o sentido inverso exige o código de saída correto do país de origem.",
      },
      {
        title: "Dúvidas com números brasileiros no exterior",
        body: "Ao partilhar o seu número com contactos internacionais, o formato canónico é +55 seguido do DDD e do número: +55 11 91234-5678, por exemplo. Esse formato funciona para qualquer destino, pois o sinal + resolve automaticamente o código de saída local. Para [portabilidade](/guia/portabilidade-numerica) e mudanças de operadora, o número completo — incluindo o DDD — permanece o mesmo. Em viagens ao exterior, ative o roaming na sua operadora antes de partir e verifique os custos; as tarifas de roaming diferem das ligações internacionais feitas a partir do Brasil.",
      },
    ],
    faqs: [
      {
        question: "Qual é o código internacional do Brasil?",
        answer:
          "O código internacional do Brasil é +55. Para receber chamadas do exterior, partilhe o número no formato +55 seguido do DDD e do número do assinante, como +55 11 91234-5678.",
      },
      {
        question: "Qual é o código internacional dos Estados Unidos?",
        answer:
          "Os Estados Unidos usam o código +1, partilhado com o Canadá, o Alasca, o Havaí e diversos territórios norte-americanos. Do Brasil, disca-se 00 + CSP + 1 + número local de dez dígitos.",
      },
      {
        question: "Qual é o código internacional de Portugal?",
        answer:
          "Portugal usa o código +351. Para ligar do Brasil, disque 00 + CSP + 351 + número de nove dígitos. Os números portugueses começam por 9 (móvel), 2 (fixo) ou 3 (serviços).",
      },
      {
        question: "Como ligar do Brasil para os Estados Unidos?",
        answer:
          "Disque 00 + código da sua operadora de saída internacional (CSP, como 15 ou 31) + 1 + número americano de dez dígitos (código de área de três dígitos + número de sete). Exemplo: 00 15 1 212 555 0199 para Nova Iorque.",
      },
      {
        question: "Como ligar dos Estados Unidos para o Brasil?",
        answer:
          "A partir dos EUA, disque 011 (código de saída americano) + 55 + DDD brasileiro de dois dígitos + número. Exemplo para um celular de São Paulo: 011 55 11 9XXXX-XXXX. No formato internacional: +55 11 9XXXX-XXXX.",
      },
      {
        question: "Como ligar do Brasil para Portugal?",
        answer:
          "Disque 00 + CSP da sua operadora (15 para Claro, 31 para Vivo, por exemplo) + 351 + número português de nove dígitos. Exemplo: 00 31 351 912 345 678.",
      },
      {
        question: "O Brasil e a Argentina têm o mesmo código internacional?",
        answer:
          "Não. O Brasil usa +55 e a Argentina usa +54. Embora sejam vizinhos, cada país tem um código próprio atribuído pela UIT. Disque 00 + CSP + 54 + número argentino para ligações do Brasil.",
      },
      {
        question: "O código de saída do Brasil é 00 ou 011?",
        answer:
          "No Brasil, o código de saída internacional é 00 (seguido do CSP da operadora). O 011 é o código de saída dos Estados Unidos, Canadá e parte da América do Norte — no sentido contrário, ao ligar para esses países, você usa 00 a partir do Brasil.",
      },
      {
        question: "Preciso discar o DDD ao ligar para o Brasil do exterior?",
        answer:
          "Sim, sempre. A sequência completa do exterior é: código de saída do país de origem + 55 + DDD de dois dígitos + número do assinante. Sem o DDD, a chamada não localiza a área brasileira de destino.",
      },
      {
        question: "Existe código internacional para celular diferente de fixo?",
        answer:
          "Não. O código internacional (DDI) é o mesmo para celulares e fixos de um país. O que muda é o formato do número: no Brasil, fixos têm oito dígitos e celulares nove, iniciados por 9.",
      },
    ],
    sources: ["numeracao"] as EditorialSourceId[],
    territoryLinks: [
      { label: "Consultar DDD por estado", href: "/#explorar" },
      { label: "DDD de São Paulo (11)", href: "/ddd/11" },
      { label: "DDD de Brasília (61)", href: "/ddd/61" },
      {
        label: "Diferença entre DDD e DDI",
        href: "/guia/diferenca-entre-ddd-e-ddi",
      },
      {
        label: "Como ligar para outro país",
        href: "/guia/como-ligar-para-outro-pais-ddi",
      },
      {
        label: "Código de operadora CSP",
        href: "/guia/codigo-de-operadora-csp",
      },
    ],
    relatedSlugs: [
      "diferenca-entre-ddd-e-ddi",
      "como-ligar-para-outro-pais-ddi",
      "codigo-de-operadora-csp",
      "o-que-e-ddd",
      "como-ligar-para-outro-estado",
    ],
  },
};
