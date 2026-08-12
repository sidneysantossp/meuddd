export type LocalSource = {
  label: string;
  url: string;
  verifiedOn: string;
};

export type LocalityContent = {
  history?: { body: string; source: LocalSource };
  heritage?: { title: string; description: string; href: string; source: LocalSource }[];
  parks?: { title: string; description: string; href: string; source: LocalSource }[];
  mobility?: { body: string; href: string; source: LocalSource };
  municipalServices?: { title: string; href: string; source: LocalSource }[];
};

export const LOCALITY_EDITORIAL_REVIEW_DATE = "12 de agosto de 2026";

const barueriHistory: LocalSource = {
  label: "História de Barueri — Prefeitura de Barueri",
  url: "https://portal.barueri.sp.gov.br/cidadao/conheca-barueri/historia-de-barueri/",
  verifiedOn: "11 de agosto de 2026",
};

const barueriParks: LocalSource = {
  label: "Parques Municipais — Prefeitura de Barueri",
  url: "https://portal.barueri.sp.gov.br/cidadao/esporte-lazer/parques-municipais",
  verifiedOn: "11 de agosto de 2026",
};

const barueriMobility: LocalSource = {
  label: "Transporte Coletivo — Secretaria de Mobilidade Urbana de Barueri",
  url: "https://portal.barueri.sp.gov.br/secretarias/mobilidade-urbana/transporte",
  verifiedOn: "11 de agosto de 2026",
};

const barueriPhones: LocalSource = {
  label: "Telefones úteis — Prefeitura de Barueri",
  url: "https://portal.barueri.sp.gov.br/cidadao/conheca-barueri/telefones-da-prefeitura",
  verifiedOn: "11 de agosto de 2026",
};

const beloHorizonteTourism: LocalSource = {
  label: "Portal Oficial de Belo Horizonte (Belotur)",
  url: "https://portalbelohorizonte.com.br/",
  verifiedOn: "11 de agosto de 2026",
};

const curitibaCity: LocalSource = {
  label: "BRT e parques — Prefeitura de Curitiba",
  url: "https://www.curitiba.pr.gov.br/noticias/do-brt-a-profusao-de-parques-legados-de-curitiba-se-espalham-pelo-brasil-e-mundo/67570",
  verifiedOn: "11 de agosto de 2026",
};

const portoAlegreTourism: LocalSource = {
  label: "Destino POA — Portal Oficial de Turismo de Porto Alegre",
  url: "https://destinopoa.com.br/",
  verifiedOn: "11 de agosto de 2026",
};

const portoAlegreMobility: LocalSource = {
  label: "Secretaria Municipal de Mobilidade Urbana de Porto Alegre",
  url: "https://prefeitura.poa.br/smmu",
  verifiedOn: "11 de agosto de 2026",
};

const salvadorCulture: LocalSource = {
  label: "Secretaria de Cultura e Turismo de Salvador (Secult)",
  url: "https://secult.salvador.ba.gov.br/",
  verifiedOn: "11 de agosto de 2026",
};

const salvadorMobility: LocalSource = {
  label: "Secretaria Municipal de Mobilidade de Salvador (Semob)",
  url: "https://mobilidade.salvador.ba.gov.br/",
  verifiedOn: "11 de agosto de 2026",
};

const recifeTourism: LocalSource = {
  label: "Secretaria de Turismo e Lazer do Recife",
  url: "https://www2.recife.pe.gov.br/pagina/secretaria-de-turismo-e-lazer",
  verifiedOn: "11 de agosto de 2026",
};

const recifeMobility: LocalSource = {
  label: "Grande Recife Consórcio de Transporte",
  url: "https://www.granderecife.pe.gov.br/",
  verifiedOn: "11 de agosto de 2026",
};

const fortalezaTourism: LocalSource = {
  label: "Canal Turismo — Prefeitura de Fortaleza",
  url: "https://turismo.fortaleza.ce.gov.br/programas/pontos-turisticos",
  verifiedOn: "11 de agosto de 2026",
};

const fortalezaMobility: LocalSource = {
  label: "Rede Vamos Juntos — Prefeitura de Fortaleza",
  url: "https://www.fortaleza.ce.gov.br/noticias/prefeitura-de-fortaleza-testa-novo-modelo-de-transporte-gratuito-para-viagens-curtas-na-periferia",
  verifiedOn: "11 de agosto de 2026",
};

const saoPauloTourism: LocalSource = {
  label: "Cidade de São Paulo — turismo oficial",
  url: "https://cidadedesaopaulo.com/",
  verifiedOn: "11 de agosto de 2026",
};

const saoPauloCulture: LocalSource = {
  label: "Secretaria Municipal de Cultura e Economia Criativa de São Paulo",
  url: "https://prefeitura.sp.gov.br/web/cultura",
  verifiedOn: "11 de agosto de 2026",
};

const rioTourism: LocalSource = {
  label: "Riotur — turismo oficial do Rio de Janeiro",
  url: "https://riotur.rio/",
  verifiedOn: "11 de agosto de 2026",
};

const rioMemory: LocalSource = {
  label: "Aqui Tem Memória — Secretaria Municipal de Turismo do Rio",
  url: "https://turismo.prefeitura.rio/aqui-tem-memoria/",
  verifiedOn: "11 de agosto de 2026",
};

const rioMobility: LocalSource = {
  label: "Secretaria Municipal de Transportes do Rio de Janeiro",
  url: "https://transportes.prefeitura.rio/",
  verifiedOn: "11 de agosto de 2026",
};

const brasiliaTourism: LocalSource = {
  label: "Secretaria de Turismo do Distrito Federal",
  url: "https://www.turismo.df.gov.br/",
  verifiedOn: "11 de agosto de 2026",
};

const brasiliaHeritage: LocalSource = {
  label: "Património Cultural — Secretaria de Cultura e Economia Criativa do DF",
  url: "https://www.cultura.df.gov.br/patrimonio-cultural",
  verifiedOn: "11 de agosto de 2026",
};

const brasiliaMobility: LocalSource = {
  label: "Secretaria de Transporte e Mobilidade do Distrito Federal",
  url: "https://www.semob.df.gov.br/",
  verifiedOn: "11 de agosto de 2026",
};

const manausTourism: LocalSource = {
  label: "Parque Encontro das Águas Rosa Almeida — Prefeitura de Manaus",
  url: "https://www.manaus.am.gov.br/noticia/turismo/prefeitura-implurb-obras-parqueencontrodasaguas/",
  verifiedOn: "11 de agosto de 2026",
};

const belemTourism: LocalSource = {
  label: "SETUR — Secretaria Municipal de Cultura e Turismo de Belém",
  url: "https://prefeitura.belem.pa.gov.br/secretarias/semcult-secretaria-municipal-de-cultura-e-turismo/",
  verifiedOn: "11 de agosto de 2026",
};

const goianiaTourism: LocalSource = {
  label: "GoiâniaTur — Agência Municipal de Turismo e Eventos",
  url: "https://www.goiania.go.gov.br/goianiatur/",
  verifiedOn: "11 de agosto de 2026",
};

const florianopolisMunicipal: LocalSource = {
  label: "Prefeitura de Florianópolis — serviços e notícias municipais",
  url: "https://www.pmf.sc.gov.br/",
  verifiedOn: LOCALITY_EDITORIAL_REVIEW_DATE,
};

const florianopolisHeritage: LocalSource = {
  label: "Ponte Viva — Prefeitura de Florianópolis",
  url: "http://ponteviva.pmf.sc.gov.br/",
  verifiedOn: LOCALITY_EDITORIAL_REVIEW_DATE,
};

const vitoriaTourism: LocalSource = {
  label: "Turista — Prefeitura de Vitória",
  url: "https://www.vitoria.es.gov.br/turista/saiba-mais-sobre-vitoria",
  verifiedOn: LOCALITY_EDITORIAL_REVIEW_DATE,
};

const campoGrandeTourism: LocalSource = {
  label: "Turismo de Negócios e Eventos — Prefeitura de Campo Grande",
  url: "https://www.campogrande.ms.gov.br/turismo-de-negocios-e-eventos/",
  verifiedOn: LOCALITY_EDITORIAL_REVIEW_DATE,
};

const campoGrandeMobility: LocalSource = {
  label: "Transporte público — Prefeitura de Campo Grande",
  url: "https://www.campogrande.ms.gov.br/cgnoticias/noticia/intervencao-apresenta-primeiro-relatorio-sobre-transporte-publico-da-capital/",
  verifiedOn: LOCALITY_EDITORIAL_REVIEW_DATE,
};

const localityContent: Record<string, LocalityContent> = {
  "sp:barueri": {
    history: {
      body: "Segundo a Prefeitura de Barueri, a origem da cidade está ligada ao aldeamento fundado por José de Anchieta em 11 de novembro de 1560, junto à Capela de Nossa Senhora da Escada. O município foi criado em 24 de dezembro de 1948.",
      source: barueriHistory,
    },
    heritage: [{
      title: "Capela de Nossa Senhora da Escada",
      description: "A capela é citada pela Prefeitura como parte da origem do aldeamento de Barueri.",
      href: "https://www.google.com/maps/search/?api=1&query=Capela%20Nossa%20Senhora%20da%20Escada%2C%20Barueri%20SP",
      source: barueriHistory,
    }],
    parks: [
      {
        title: "Parque Municipal Dom José",
        description: "Espaço municipal de lazer com áreas de caminhada, atividades e instalações desportivas, conforme a Prefeitura.",
        href: "https://www.google.com/maps/search/?api=1&query=Parque%20Municipal%20Dom%20Jos%C3%A9%2C%20Barueri%20SP",
        source: barueriParks,
      },
      {
        title: "Parque Ecológico (Tietê / Barueri)",
        description: "Parque municipal com área de lazer e recuperação ambiental, trilhas, lagos e equipamentos de uso público.",
        href: "https://www.google.com/maps/search/?api=1&query=Parque%20Ecol%C3%B3gico%20Tiet%C3%AA%2C%20Barueri%20SP",
        source: barueriParks,
      },
      {
        title: "Parque Taddeo Cananéia",
        description: "Parque municipal no Parque Imperial com pista de caminhada, playground e áreas para atividades.",
        href: "https://www.google.com/maps/search/?api=1&query=Parque%20Taddeo%20Canan%C3%A9ia%2C%20Barueri%20SP",
        source: barueriParks,
      },
    ],
    mobility: {
      body: "A Secretaria de Mobilidade Urbana informa que os Terminais Barueri e Jardim Silveira têm integração modal com os trens da Linha 8-Diamante. Consulte o portal municipal para linhas, horários e condições atuais.",
      href: barueriMobility.url,
      source: barueriMobility,
    },
    municipalServices: [{
      title: "Telefones úteis e serviços municipais de Barueri",
      href: barueriPhones.url,
      source: barueriPhones,
    }],
  },
  "mg:belo-horizonte": {
    history: {
      body: "O Portal Oficial de Belo Horizonte organiza percursos para conhecer a cidade, a sua cultura e os seus lugares de interesse. Use a secção institucional para aprofundar o contexto histórico antes de visitar ou planear uma rota.",
      source: beloHorizonteTourism,
    },
    heritage: [{
      title: "Museus, cultura e memória de Belo Horizonte",
      description: "A Belotur reúne museus, centros culturais e percursos de cidade; abra o portal oficial para informação actualizada e, em seguida, planeie a visita no mapa.",
      href: mapSearchUrl("museus e centros culturais Belo Horizonte MG"),
      source: beloHorizonteTourism,
    }],
    parks: [{
      title: "Parques e praças de Belo Horizonte",
      description: "O portal oficial possui uma secção própria de parques e praças. Verifique horários e regras no canal indicado antes da visita.",
      href: mapSearchUrl("parques e praças Belo Horizonte MG"),
      source: beloHorizonteTourism,
    }],
    mobility: {
      body: "O Portal Oficial de Belo Horizonte disponibiliza informações úteis de transporte para visitantes. Consulte a fonte para rotas, aeroportos e condições actualizadas antes de se deslocar.",
      href: "https://portalbelohorizonte.com.br/informacoes-uteis/aeroportos",
      source: beloHorizonteTourism,
    },
    municipalServices: [
      { title: "Informações úteis de saúde em Belo Horizonte", href: "https://portalbelohorizonte.com.br/informacoes-uteis/pronto-socorro-hospitais", source: beloHorizonteTourism },
      { title: "Segurança e serviços públicos em Belo Horizonte", href: "https://portalbelohorizonte.com.br/informacoes-uteis/policia-militar-do-estado-de-minas-gerais", source: beloHorizonteTourism },
      { title: "Bares e restaurantes: descoberta no portal oficial", href: "https://portalbelohorizonte.com.br/o-que-fazer/comer-e-beber", source: beloHorizonteTourism },
    ],
  },
  "pr:curitiba": {
    history: {
      body: "A Prefeitura de Curitiba apresenta os seus legados urbanos por meio de cultura, parques e mobilidade. Consulte a publicação institucional para contextualizar estes temas e ver actualizações do município.",
      source: curitibaCity,
    },
    heritage: [{
      title: "Memoriais e cultura em Curitiba",
      description: "A página institucional apresenta equipamentos culturais e percursos urbanos. Utilize o mapa para abrir a pesquisa da região desejada.",
      href: mapSearchUrl("memoriais e centros culturais Curitiba PR"),
      source: curitibaCity,
    }],
    parks: [
      { title: "Parque Tanguá", description: "O Parque Tanguá é referenciado pela Prefeitura entre os parques da cidade. Verifique condições de acesso no portal municipal.", href: mapSearchUrl("Parque Tanguá Curitiba PR"), source: curitibaCity },
      { title: "Parque Tingui", description: "O Parque Tingui é citado pela Prefeitura no contexto de parques urbanos. Abra a pesquisa no mapa para planear o trajeto.", href: mapSearchUrl("Parque Tingui Curitiba PR"), source: curitibaCity },
    ],
    mobility: {
      body: "A Prefeitura descreve a operação de corredores exclusivos e a integração de terminais do transporte coletivo. Consulte a publicação oficial para evolução do sistema e opções actuais de deslocação.",
      href: curitibaCity.url,
      source: curitibaCity,
    },
    municipalServices: [
      { title: "Portal de serviços de Curitiba", href: "https://www.curitiba.pr.gov.br/", source: curitibaCity },
      { title: "Bares e restaurantes em Curitiba: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Curitiba PR"), source: curitibaCity },
    ],
  },
  "rs:porto-alegre": {
    history: {
      body: "O Destino POA apresenta percursos de cultura, cidade, orla e ar livre para explorar Porto Alegre. Utilize a curadoria institucional como ponto de partida e consulte a agenda antes de sair.",
      source: portoAlegreTourism,
    },
    heritage: [{
      title: "Cultura e património de Porto Alegre",
      description: "O portal oficial possui uma secção dedicada à cultura e a locais para visitar. Abra o mapa para localizar museus e pontos históricos próximos.",
      href: mapSearchUrl("museus e pontos históricos Porto Alegre RS"),
      source: portoAlegreTourism,
    }],
    parks: [{
      title: "Parque Moinhos de Vento (Parcão)",
      description: "O Parque Moinhos de Vento integra os locais apresentados pelo portal oficial de turismo. Confirme a programação e os serviços antes da visita.",
      href: mapSearchUrl("Parque Moinhos de Vento Porto Alegre RS"),
      source: portoAlegreTourism,
    }],
    mobility: {
      body: "A Secretaria Municipal de Mobilidade Urbana coordena as políticas do Sistema Municipal de Transporte Público e de Circulação. Consulte o canal oficial para linhas, tarifas, alterações e condições de viagem.",
      href: portoAlegreMobility.url,
      source: portoAlegreMobility,
    },
    municipalServices: [
      { title: "Informações úteis para visitantes de Porto Alegre", href: "https://destinopoa.com.br/", source: portoAlegreTourism },
      { title: "Gastronomia e bares: descoberta no portal oficial", href: "https://destinopoa.com.br/secao/poa-da-gastronomia/", source: portoAlegreTourism },
    ],
  },
  "ba:salvador": {
    history: {
      body: "A Secretaria de Cultura e Turismo de Salvador organiza informações de património cultural, museus e agenda. Utilize o canal institucional para aprofundar a história local e confirmar programação de visita.",
      source: salvadorCulture,
    },
    heritage: [
      { title: "Casa do Carnaval da Bahia", description: "O equipamento é apresentado pela Secult entre as referências culturais da cidade. Consulte a fonte oficial para informação de visitação.", href: mapSearchUrl("Casa do Carnaval da Bahia Salvador BA"), source: salvadorCulture },
      { title: "Espaços Carybé e Pierre Verger", description: "A Secult apresenta estes espaços no seu portal de património e cultura. Abra o mapa para localizar o conjunto cultural.", href: mapSearchUrl("Espaço Carybé e Pierre Verger Salvador BA"), source: salvadorCulture },
    ],
    parks: [{ title: "Parques e áreas ao ar livre em Salvador", description: "Use a pesquisa cartográfica para explorar parques e praças; confirme regras, acesso e programação junto aos canais públicos responsáveis.", href: mapSearchUrl("parques e praças Salvador BA"), source: salvadorCulture }],
    mobility: { body: "A Semob é o canal municipal de referência para actualizações de mobilidade. Consulte a fonte oficial antes de viajar, pois linhas, horários e intervenções podem mudar.", href: salvadorMobility.url, source: salvadorMobility },
    municipalServices: [
      { title: "Agenda e cultura de Salvador", href: salvadorCulture.url, source: salvadorCulture },
      { title: "Bares e restaurantes em Salvador: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Salvador BA"), source: salvadorCulture },
    ],
  },
  "pe:recife": {
    history: {
      body: "A Secretaria de Turismo e Lazer do Recife coordena políticas de valorização cultural, lazer e roteiros turísticos. Consulte o canal municipal para programas, património e agenda actualizada.",
      source: recifeTourism,
    },
    heritage: [{ title: "Cultura e roteiros do Recife", description: "A secretaria municipal promove roteiros turísticos e a valorização do património local. Abra a pesquisa no mapa para planear uma visita no território escolhido.", href: mapSearchUrl("centro histórico e museus Recife PE"), source: recifeTourism }],
    parks: [{ title: "Parques e lazer no Recife", description: "O município mantém políticas e acções de lazer em espaços públicos. Confirme as informações específicas do parque no canal público antes de sair.", href: mapSearchUrl("parques e praças Recife PE"), source: recifeTourism }],
    mobility: { body: "O Grande Recife disponibiliza notícias e serviços do transporte metropolitano. Consulte o portal para rotas, tarifas, alterações operacionais e planeamento da viagem.", href: recifeMobility.url, source: recifeMobility },
    municipalServices: [
      { title: "Turismo, lazer e contacto institucional do Recife", href: recifeTourism.url, source: recifeTourism },
      { title: "Gastronomia do Recife: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Recife PE"), source: recifeTourism },
    ],
  },
  "ce:fortaleza": {
    history: { body: "O Canal Turismo da Prefeitura de Fortaleza reúne referências de arte, cultura, lazer e património. Consulte o portal institucional para aprofundar a história dos equipamentos e confirmar visitações.", source: fortalezaTourism },
    heritage: [{ title: "Theatro José de Alencar", description: "Segundo o Canal Turismo municipal, o teatro foi inaugurado em 1910, recebe programação cultural e é reconhecido como Património Histórico Nacional pelo Iphan.", href: mapSearchUrl("Theatro José de Alencar Fortaleza CE"), source: fortalezaTourism }],
    parks: [
      { title: "Parque do Cocó", description: "O portal turístico municipal apresenta o parque como área urbana de natureza, trilhas e actividades ao ar livre. Consulte a fonte para condições e programação.", href: mapSearchUrl("Parque Estadual do Cocó Fortaleza CE"), source: fortalezaTourism },
      { title: "Parque Rachel de Queiroz", description: "O Canal Turismo apresenta o parque como espaço de áreas verdes, ciclovias, pistas e manifestações culturais. Verifique a informação oficial antes de visitar.", href: mapSearchUrl("Parque Rachel de Queiroz Fortaleza CE"), source: fortalezaTourism },
    ],
    mobility: { body: "A Prefeitura publicou um projecto-piloto de transporte de curta distância em bairros específicos da cidade. Como a iniciativa é experimental e limitada, consulte a fonte original para elegibilidade e condições vigentes.", href: fortalezaMobility.url, source: fortalezaMobility },
    municipalServices: [
      { title: "Pontos turísticos e agenda oficial de Fortaleza", href: fortalezaTourism.url, source: fortalezaTourism },
      { title: "Gastronomia em Fortaleza: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Fortaleza CE"), source: fortalezaTourism },
    ],
  },
  "sp:sao-paulo": {
    history: {
      body: "A Secretaria Municipal de Cultura e Economia Criativa mantém canais públicos dedicados a cultura, memória e património. Consulte a fonte institucional para aprofundar a história da cidade e confirmar a programação cultural.",
      source: saoPauloCulture,
    },
    heritage: [{
      title: "Cultura, museus e memória em São Paulo",
      description: "Os canais oficiais de cultura e turismo reúnem percursos de cidade, museus e espaços culturais. Abra o mapa para localizar equipamentos próximos e confirme horários no canal responsável.",
      href: mapSearchUrl("museus e centros culturais São Paulo SP"),
      source: saoPauloCulture,
    }],
    parks: [{
      title: "Parques e áreas verdes de São Paulo",
      description: "O portal turístico oficial organiza referências para explorar a cidade. Consulte o canal público e as regras do parque escolhido antes da visita.",
      href: mapSearchUrl("parques e áreas verdes São Paulo SP"),
      source: saoPauloTourism,
    }],
    mobility: {
      body: "A rede de transporte de São Paulo é extensa e as condições operacionais podem mudar. Utilize o portal de serviços municipal e os canais dos operadores para planear deslocações, verificar linhas e consultar acessibilidade em tempo real.",
      href: "https://sp156.prefeitura.sp.gov.br/portal/servicos",
      source: saoPauloTourism,
    },
    municipalServices: [
      { title: "Serviços e telefones úteis de São Paulo", href: "https://sp156.prefeitura.sp.gov.br/portal/servicos", source: saoPauloTourism },
      { title: "Roteiros e agenda oficial de São Paulo", href: saoPauloTourism.url, source: saoPauloTourism },
      { title: "Bares e restaurantes em São Paulo: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes São Paulo SP"), source: saoPauloTourism },
    ],
  },
  "rj:rio-de-janeiro": {
    history: {
      body: "O projecto municipal Aqui Tem Memória identifica monumentos, estátuas e pontos históricos e culturais com informação acessível. Consulte os circuitos oficiais para explorar a memória urbana e confirmar os locais disponíveis.",
      source: rioMemory,
    },
    heritage: [{
      title: "Circuitos Aqui Tem Memória",
      description: "A Secretaria Municipal de Turismo apresenta circuitos de património em zonas como Centro, Lapa, Glória e Zona Sul. Aceda à fonte para mapas, contexto e actualizações.",
      href: rioMemory.url,
      source: rioMemory,
    }],
    parks: [{
      title: "Parques, praias e áreas ao ar livre do Rio",
      description: "A Riotur reúne informações oficiais para explorar atrações ao ar livre. Confirme condições de acesso e programação antes de sair.",
      href: mapSearchUrl("parques e áreas ao ar livre Rio de Janeiro RJ"),
      source: rioTourism,
    }],
    mobility: {
      body: "A Secretaria Municipal de Transportes é o canal público para informações sobre mobilidade urbana. Consulte a fonte antes de viajar, pois linhas, horários, operação e intervenções podem mudar.",
      href: rioMobility.url,
      source: rioMobility,
    },
    municipalServices: [
      { title: "Informações turísticas oficiais do Rio de Janeiro", href: rioTourism.url, source: rioTourism },
      { title: "Serviços e mobilidade do Rio de Janeiro", href: rioMobility.url, source: rioMobility },
      { title: "Bares e restaurantes no Rio: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Rio de Janeiro RJ"), source: rioTourism },
    ],
  },
  "df:brasilia": {
    history: {
      body: "A Secretaria de Cultura do DF documenta a formação de Brasília e do Distrito Federal, incluindo referências do Conjunto Urbanístico e outras memórias do território. Consulte a fonte para aprofundar o enquadramento histórico e patrimonial.",
      source: brasiliaHeritage,
    },
    heritage: [{
      title: "Conjunto Urbanístico e património cultural de Brasília",
      description: "A política cultural do DF apresenta referências materiais e imateriais do território, incluindo a preservação urbanística de Brasília. Aceda ao canal institucional para contexto e normas de visitação.",
      href: brasiliaHeritage.url,
      source: brasiliaHeritage,
    }],
    parks: [{
      title: "Parques e espaços públicos de Brasília",
      description: "O portal de turismo do Distrito Federal reúne informação para visitantes. Planeie percursos e confirme serviços, acesso e programação no canal público responsável.",
      href: mapSearchUrl("parques e espaços públicos Brasília DF"),
      source: brasiliaTourism,
    }],
    mobility: {
      body: "A Secretaria de Transporte e Mobilidade do DF é a referência institucional para linhas, terminais, horários e serviços de mobilidade. Consulte o portal oficial para condições actualizadas antes da deslocação.",
      href: brasiliaMobility.url,
      source: brasiliaMobility,
    },
    municipalServices: [
      { title: "Informações turísticas e roteiros oficiais de Brasília", href: brasiliaTourism.url, source: brasiliaTourism },
      { title: "Mobilidade e serviços de transporte do Distrito Federal", href: brasiliaMobility.url, source: brasiliaMobility },
      { title: "Bares e restaurantes em Brasília: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Brasília DF"), source: brasiliaTourism },
    ],
  },
  "am:manaus": {
    history: {
      body: "A Prefeitura de Manaus apresenta equipamentos e espaços públicos ligados ao encontro entre cultura, paisagem e visitação. Consulte o canal institucional para aprofundar o contexto local e confirmar condições de acesso antes de planear a visita.",
      source: manausTourism,
    },
    heritage: [{
      title: "Cultura e património em Manaus",
      description: "Utilize o mapa para localizar museus, mercados e referências históricas da cidade. Para informações de visitação e programação, confirme sempre o canal público responsável.",
      href: mapSearchUrl("museus e património histórico Manaus AM"),
      source: manausTourism,
    }],
    parks: [{
      title: "Parque Encontro das Águas Rosa Almeida",
      description: "A Prefeitura descreve o equipamento como complexo turístico e cultural com jardins e infraestrutura de uso público. Consulte a fonte institucional para o estado das obras, abertura e serviços disponíveis.",
      href: mapSearchUrl("Parque Encontro das Águas Rosa Almeida Manaus AM"),
      source: manausTourism,
    }],
    mobility: {
      body: "Os serviços e condições de mobilidade urbana podem variar. Antes de se deslocar, consulte os canais públicos de Manaus para percursos, horários e orientações atualizadas.",
      href: "https://www.manaus.am.gov.br/",
      source: manausTourism,
    },
    municipalServices: [
      { title: "Serviços e canais da Prefeitura de Manaus", href: "https://www.manaus.am.gov.br/", source: manausTourism },
      { title: "Bares e restaurantes em Manaus: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Manaus AM"), source: manausTourism },
    ],
  },
  "pa:belem": {
    history: {
      body: "A Secretaria Municipal de Cultura e Turismo de Belém organiza informação turística, cultural e de apoio ao visitante. Utilize os canais institucionais para conhecer percursos, serviços e referências da cidade.",
      source: belemTourism,
    },
    heritage: [{
      title: "Cultura, mercados e património de Belém",
      description: "A secretaria mantém recursos de orientação turística para visitantes. Abra o mapa para localizar referências culturais e confirme informações práticas nos canais públicos.",
      href: mapSearchUrl("museus mercados e património Belém PA"),
      source: belemTourism,
    }],
    parks: [{
      title: "Parques e áreas ao ar livre em Belém",
      description: "Explore espaços verdes e áreas públicas no mapa; confirme acesso, programação e regras junto às fontes oficiais antes da visita.",
      href: mapSearchUrl("parques e praças Belém PA"),
      source: belemTourism,
    }],
    mobility: {
      body: "Para planeamento de deslocações, recorra aos canais públicos do município e dos operadores responsáveis. Linhas, horários e condições de circulação exigem consulta atualizada.",
      href: "https://prefeitura.belem.pa.gov.br/",
      source: belemTourism,
    },
    municipalServices: [
      { title: "Turismo e Centro de Informações ao Turista de Belém", href: belemTourism.url, source: belemTourism },
      { title: "Bares e restaurantes em Belém: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Belém PA"), source: belemTourism },
    ],
  },
  "go:goiania": {
    history: {
      body: "A GoiâniaTur disponibiliza roteiros oficiais para explorar cultura, lazer, parques e a identidade Art Déco da cidade. Consulte o canal institucional para aprofundar o contexto histórico e organizar uma visita.",
      source: goianiaTourism,
    },
    heritage: [{
      title: "Roteiro Art Déco — cultura e lazer",
      description: "A GoiâniaTur publica um roteiro dedicado a cultura e lazer com enfoque Art Déco. Abra a fonte oficial para o percurso e confirme os pontos de interesse antes de sair.",
      href: "https://www.goiania.go.gov.br/goianiatur/caminho-dos-bougainvilles/o-percurso/roteiro-art-deco-cultura-e-lazer/",
      source: goianiaTourism,
    }],
    parks: [{
      title: "Roteiros de parques de Goiânia",
      description: "O portal municipal apresenta roteiros entre parques, incluindo percursos que passam pelo Lago das Rosas e Jardim Botânico. Consulte a fonte para detalhes e condições de visitação.",
      href: "https://www.goiania.go.gov.br/goianiatur/caminho-dos-bougainvilles/o-percurso/roteiro-parques-i-do-lago-das-rosas-ao-jardim-botanico-2/",
      source: goianiaTourism,
    }],
    mobility: {
      body: "A GoiâniaTur mantém uma secção institucional sobre mobilidade e transporte. Consulte o canal oficial para informação atualizada antes de escolher o percurso e o meio de deslocação.",
      href: "https://www.goiania.go.gov.br/goianiatur/dti/mobilidade-e-transporte/",
      source: goianiaTourism,
    },
    municipalServices: [
      { title: "Centros de Atendimento ao Turista e telefones úteis de Goiânia", href: "https://www.goiania.go.gov.br/goianiatur/turismo/cats/", source: goianiaTourism },
      { title: "Bares e restaurantes em Goiânia: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Goiânia GO"), source: goianiaTourism },
    ],
  },
  "sc:florianopolis": {
    history: {
      body: "O portal da Prefeitura de Florianópolis concentra serviços, notícias e orientações do município. Consulte os canais institucionais para aprofundar o contexto histórico, cultural e territorial antes de montar o seu roteiro.",
      source: florianopolisMunicipal,
    },
    heritage: [{
      title: "Ponte Hercílio Luz e património urbano",
      description: "O projecto municipal Ponte Viva relaciona mobilidade, turismo e património. Abra a fonte para conhecer o enquadramento institucional e confirme as condições de visitação antes de sair.",
      href: mapSearchUrl("Ponte Hercílio Luz Florianópolis SC"),
      source: florianopolisHeritage,
    }],
    parks: [{
      title: "Parque da Luz",
      description: "A Prefeitura mantém informações públicas sobre intervenções e uso dos espaços urbanos. Consulte o canal municipal para atualizações e abra o mapa para planear o acesso.",
      href: mapSearchUrl("Parque da Luz Florianópolis SC"),
      source: florianopolisMunicipal,
    }],
    mobility: {
      body: "O município disponibiliza serviços relacionados à mobilidade e ao transporte coletivo. Antes da viagem, confirme linhas, horários, acessibilidade e alterações operacionais nos canais públicos responsáveis.",
      href: "https://www.pmf.sc.gov.br/servicos/index.php?pagina=servpagina&acao=open&id=4430",
      source: florianopolisMunicipal,
    },
    municipalServices: [
      { title: "Serviços e atendimento da Prefeitura de Florianópolis", href: florianopolisMunicipal.url, source: florianopolisMunicipal },
      { title: "Bares e restaurantes em Florianópolis: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Florianópolis SC"), source: florianopolisMunicipal },
    ],
  },
  "es:vitoria": {
    history: {
      body: "A Prefeitura de Vitória informa que a Ilha de Vitória integra um arquipélago de 33 ilhas e uma porção continental. Segundo o mesmo canal, o nome Ilha de Vitória remonta a 1551; a emancipação política do município é datada de 24 de fevereiro de 1823.",
      source: vitoriaTourism,
    },
    heritage: [{
      title: "Centro histórico, museus e monumentos de Vitória",
      description: "O guia turístico municipal reúne referências para o centro histórico, património cultural, museus e monumentos. Consulte a fonte para contexto e condições práticas antes da visita.",
      href: "https://www.vitoria.es.gov.br/turista/centro-historico-concentra-capelas-fortes-e-outros-monumentos",
      source: vitoriaTourism,
    }],
    parks: [{
      title: "Parques e trilhas urbanas de Vitória",
      description: "O portal turístico da cidade mantém secções dedicadas a parques e às trilhas da Gruta da Onça. Confirme acesso, programação e recomendações no canal municipal antes de visitar.",
      href: "https://www.vitoria.es.gov.br/turista/parques",
      source: vitoriaTourism,
    }],
    mobility: {
      body: "O portal municipal reúne informação para visitantes sobre autocarro turístico, táxis e Táxi Vix. Para deslocações do dia a dia, confirme percursos e condições atualizadas diretamente com os operadores e serviços públicos competentes.",
      href: "https://www.vitoria.es.gov.br/turista/onibus-turistico",
      source: vitoriaTourism,
    },
    municipalServices: [
      { title: "Informações turísticas e serviços de Vitória", href: "https://www.vitoria.es.gov.br/turista/informacoes-turisticas", source: vitoriaTourism },
      { title: "Bares e restaurantes em Vitória: guia municipal", href: "https://www.vitoria.es.gov.br/turista/bares-e-restaurantes", source: vitoriaTourism },
    ],
  },
  "ms:campo-grande": {
    history: {
      body: "A Prefeitura de Campo Grande mantém iniciativas municipais voltadas à história, à identidade e à promoção turística da capital. Utilize a publicação institucional para aprofundar o contexto local e confirme a programação antes de visitar equipamentos culturais.",
      source: campoGrandeTourism,
    },
    heritage: [{
      title: "Cultura e turismo de negócios em Campo Grande",
      description: "O canal municipal de turismo reúne referências para eventos, cultura e serviços ao visitante. Abra a fonte institucional para detalhes e use o mapa para localizar os equipamentos de interesse.",
      href: campoGrandeTourism.url,
      source: campoGrandeTourism,
    }],
    parks: [{
      title: "Horto Florestal",
      description: "A Prefeitura publica atualizações sobre o Horto Florestal e as suas atividades públicas. Verifique o canal municipal antes da visita, pois acesso e programação podem mudar.",
      href: mapSearchUrl("Horto Florestal Campo Grande MS"),
      source: campoGrandeTourism,
    }],
    mobility: {
      body: "A Prefeitura divulga atualizações institucionais sobre o sistema de transporte público da capital. Consulte o relatório mais recente e os canais dos operadores antes de definir linhas, horários ou integrações.",
      href: campoGrandeMobility.url,
      source: campoGrandeMobility,
    },
    municipalServices: [
      { title: "Turismo de negócios e eventos em Campo Grande", href: campoGrandeTourism.url, source: campoGrandeTourism },
      { title: "Bares e restaurantes em Campo Grande: pesquisa no mapa", href: mapSearchUrl("bares e restaurantes Campo Grande MS"), source: campoGrandeTourism },
    ],
  },
};

export function getLocalityContent(uf: string, slug: string) {
  return localityContent[`${uf.toLowerCase()}:${slug.toLowerCase()}`];
}

export function mapSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
