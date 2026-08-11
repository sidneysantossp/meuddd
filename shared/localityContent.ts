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
};

export function getLocalityContent(uf: string, slug: string) {
  return localityContent[`${uf.toLowerCase()}:${slug.toLowerCase()}`];
}

export function mapSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
