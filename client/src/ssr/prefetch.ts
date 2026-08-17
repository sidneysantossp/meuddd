import type { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";
import { trpc } from "@/lib/trpc";
import {
  editorialGuides,
  editorialSources,
  findEditorialGuide,
} from "@shared/editorialGuides";
import { findRegionHub, regionSlug } from "@shared/territorialSeo";
import {
  buildDddFaq,
  buildMunicipalityFaq,
  buildStateFaq,
  faqPageJsonLd,
} from "@shared/territorialFaq";
import {
  getMunicipalityTabsKey,
  loadMunicipalityTabs,
  mapPointUrl,
} from "@shared/localityTabs";

type Outputs = inferRouterOutputs<AppRouter>;
export type HeadMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  noindex?: boolean;
  notFound?: boolean;
  ogType?: "website" | "article";
  jsonLd?: Record<string, unknown>[];
  ogImage?: string;
  ogImageAlt?: string;
};
export type SsrPrefetch = {
  states: () => Promise<Outputs["ddd"]["states"]>;
  search: (input: {
    query?: string;
    uf?: string;
  }) => Promise<Outputs["ddd"]["search"]>;
  byCode: (input: { code: string }) => Promise<Outputs["ddd"]["byCode"]>;
  byState: (input: { uf: string }) => Promise<Outputs["ddd"]["byState"]>;
  byMunicipality: (input: {
    uf: string;
    slug: string;
  }) => Promise<Outputs["ddd"]["byMunicipality"]>;
  capitals: () => Promise<Outputs["ddd"]["capitals"]>;
};

const site = "Meu DDD";
const description =
  "Consulte o DDD de qualquer cidade ou estado do Brasil em uma base territorial completa.";
const breadcrumbs = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((entry, position) => ({
    "@type": "ListItem",
    position: position + 1,
    name: entry.name,
    item: entry.item,
  })),
});
const seed = (queryClient: QueryClient, key: unknown, data: unknown) =>
  queryClient.setQueryData(key as never, data as never);
const institutionalPages: Record<
  string,
  { name: string; description: string }
> = {
  "/sobre": {
    name: "Sobre o Meu DDD",
    description:
      "Conheça o Meu DDD, uma plataforma de consulta de códigos de área brasileiros por cidade, estado e DDD.",
  },
  "/contato": {
    name: "Fale sobre o Meu DDD",
    description:
      "Saiba como enviar correções locais e encaminhar assuntos institucionais relacionados ao Meu DDD.",
  },
  "/politica-de-privacidade": {
    name: "Política de privacidade",
    description:
      "Entenda, de forma resumida, como o Meu DDD trata dados de navegação e sugestões de conteúdo.",
  },
  "/termos-de-uso": {
    name: "Termos de uso",
    description: "Consulte os termos de uso informativo da plataforma Meu DDD.",
  },
  "/lgpd": {
    name: "LGPD e transparência",
    description:
      "Conheça os princípios de proteção de dados pessoais e transparência aplicados pelo Meu DDD.",
  },
  "/imprensa": {
    name: "Informações para imprensa",
    description:
      "Apresentação institucional do Meu DDD para imprensa e parceiros editoriais.",
  },
};

export async function prefetchForPath(
  url: string,
  queryClient: QueryClient,
  prefetch: SsrPrefetch
): Promise<HeadMeta> {
  const queryIndex = url.indexOf("?");
  const rawPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const rawSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  let path = rawPath || "/";
  try {
    path = decodeURI(path);
  } catch {
    /* mantém a rota original */
  }
  path = path.replace(/\/+$/, "") || "/";
  const states = await prefetch.states();
  await seed(
    queryClient,
    getQueryKey(trpc.ddd.states, undefined, "query"),
    states
  );
  if (path === "/admin/pesquisas" || path === "/admin/sugestoes") {
    const title =
      path === "/admin/pesquisas"
        ? "Pesquisas sem resultado"
        : "Moderação de sugestões";
    return {
      title: `${title} | ${site}`,
      description: "Área privada de gestão editorial.",
      canonicalPath: path,
      noindex: true,
      ogType: "website",
    };
  }
  if (path === "/") {
    const params = new URLSearchParams(rawSearch);
    const input = {
      query: params.get("q")?.trim() || undefined,
      uf: params.get("uf")?.toUpperCase() || undefined,
    };
    if (input.query || input.uf) {
      const results = await prefetch.search(input);
      await seed(
        queryClient,
        getQueryKey(trpc.ddd.search, input, "query"),
        results
      );
    }
    return {
      title: `${site} — Consulte DDDs de todo o Brasil`,
      description,
      canonicalPath: "/",
      ogType: "website",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site,
          url: "/",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        },
      ],
    };
  }
  if (path === "/gerador") {
    const title = `Gerador de número de celular por DDD | ${site}`;
    const generatorDescription =
      "Simule um número de celular brasileiro por estado e DDD, em formato móvel de nove dígitos.";
    return {
      title,
      description: generatorDescription,
      canonicalPath: path,
      ogType: "website",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: "Gerador de número de celular", item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Gerador de número de celular por DDD",
          url: path,
          description: generatorDescription,
          about: {
            "@type": "Thing",
            name: "Simulação de número de celular brasileiro por DDD",
          },
          isPartOf: { "@type": "WebSite", name: site, url: "/" },
        },
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Gerador de número de celular por DDD",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          url: path,
          description: generatorDescription,
          isAccessibleForFree: true,
          provider: { "@type": "Organization", name: site, url: "/" },
          offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
          featureList: [
            "Seleção de estado e DDD",
            "Formatação móvel brasileira com nove dígitos",
            "Geração exclusivamente simulada para testes",
          ],
          disclaimer:
            "A ferramenta não verifica disponibilidade, titularidade ou existência de linhas de telefone.",
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "O número gerado é real ou está disponível?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não. A ferramenta constrói apenas um exemplo de formato e não verifica se existe uma linha, se está ativa ou se pertence a alguém.",
              },
            },
            {
              "@type": "Question",
              name: "Posso usar o número em WhatsApp ou num cadastro?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Não é recomendado. Um exemplo simulado não deve ser usado para contacto, mensagens, validação por SMS, recuperação de conta ou qualquer cadastro externo.",
              },
            },
            {
              "@type": "Question",
              name: "Por que escolher o estado e o DDD?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "O DDD dá contexto territorial ao exemplo. A seleção usa a base de DDDs do Meu DDD para apresentar os códigos associados ao estado escolhido.",
              },
            },
            {
              "@type": "Question",
              name: "Onde encontro um DDD de verdade?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pesquise uma cidade, estado ou código no Meu DDD. As páginas territoriais mostram a cobertura do DDD e ajudam a identificar a área correta.",
              },
            },
          ],
        },
      ],
    };
  }
  const institutionalPage = institutionalPages[path];
  if (institutionalPage) {
    return {
      title: `${institutionalPage.name} | ${site}`,
      description: institutionalPage.description,
      canonicalPath: path,
      ogType: "website",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: institutionalPage.name, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: institutionalPage.name,
          url: path,
          description: institutionalPage.description,
          isPartOf: { "@type": "WebSite", name: site, url: "/" },
        },
      ],
    };
  }
  if (path === "/guias")
    return {
      title: `Guias de telefonia: DDD, chamadas e direitos | ${site}`,
      description:
        "Guias práticos sobre DDD, numeração, chamadas, portabilidade e direitos do consumidor na telefonia brasileira.",
      canonicalPath: path,
      ogType: "website",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: "Guias de telefonia", item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guias de telefonia",
          url: path,
          hasPart: editorialGuides.map(guide => ({
            "@type": "Article",
            headline: guide.title,
            url: `/guia/${guide.slug}`,
          })),
        },
      ],
    };
  if (path === "/capitais") {
    const capitals = await prefetch.capitals();
    await seed(
      queryClient,
      getQueryKey(trpc.ddd.capitals, undefined, "query"),
      capitals
    );
    const capitalsDescription =
      "Consulte o DDD das capitais brasileiras, filtre por região e aceda à ficha local de cada município.";
    return {
      title: `DDD das capitais do Brasil | ${site}`,
      description: capitalsDescription,
      canonicalPath: path,
      ogType: "website",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: "Capitais do Brasil", item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "DDD das capitais do Brasil",
          url: path,
          description: capitalsDescription,
          hasPart: capitals.map(capital => ({
            "@type": "WebPage",
            name: `DDD de ${capital.name}`,
            url: `/cidade/${capital.uf.toLowerCase()}/${capital.slug}`,
          })),
        },
      ],
    };
  }
  const guideMatch = path.match(/^\/guia\/([^/]+)$/);
  if (guideMatch) {
    const guide = findEditorialGuide(guideMatch[1]);
    if (!guide)
      return {
        title: "Guia não encontrado | Meu DDD",
        description,
        canonicalPath: path,
        notFound: true,
        noindex: true,
      };
    return {
      title: `${guide.title} | ${site}`,
      description: guide.description,
      canonicalPath: path,
      ogType: "article",
      ogImage: guide.image,
      ogImageAlt: guide.imageAlt,
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: "Guias de telefonia", item: "/guias" },
          { name: guide.title, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "pt-BR",
          mainEntityOfPage: path,
          url: path,
          image: guide.image,
          author: { "@type": "Organization", name: site },
          publisher: { "@type": "Organization", name: site },
          citation: guide.sources.map(
            sourceId => editorialSources[sourceId].url
          ),
          about: { "@type": "Thing", name: guide.eyebrow },
        },
        ...(guide.faqs && guide.faqs.length ? [faqPageJsonLd(guide.faqs)] : []),
      ],
    };
  }
  const regionMatch = path.match(/^\/regiao\/([^/]+)$/);
  if (regionMatch) {
    const region = findRegionHub(regionMatch[1]);
    if (!region)
      return {
        title: "Região não encontrada | Meu DDD",
        description,
        canonicalPath: path,
        notFound: true,
        noindex: true,
      };
    const regionStates = states.filter(
      state => regionSlug(state.region) === region.slug
    );
    const regionDescription = `Consulte os DDDs, estados e municípios da região ${region.name} em um hub territorial do Meu DDD.`;
    return {
      title: `DDDs da região ${region.name} | ${site}`,
      description: regionDescription,
      canonicalPath: path,
      ogType: "article",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: `DDD do ${region.name}`, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": path,
          url: path,
          name: `DDDs do ${region.name}`,
          description: regionDescription,
          about: {
            "@type": "AdministrativeArea",
            name: `Região ${region.name}, Brasil`,
            containedInPlace: { "@type": "Country", name: "Brasil" },
          },
          hasPart: regionStates.map(state => ({
            "@type": "WebPage",
            name: `DDD de ${state.name}`,
            url: `/estado/${state.uf.toLowerCase()}`,
          })),
        },
      ],
    };
  }
  const dddMatch = path.match(/^\/ddd\/(\d{2})$/);
  if (dddMatch) {
    const code = dddMatch[1];
    const data = await prefetch.byCode({ code });
    await seed(
      queryClient,
      getQueryKey(trpc.ddd.byCode, { code }, "query"),
      data
    );
    if (!data)
      return {
        title: "DDD não encontrado | Meu DDD",
        description,
        canonicalPath: path,
        notFound: true,
        noindex: true,
      };
    const stateNames = data.states.map(state => state.name).join(", ");
    const dddFaqs = buildDddFaq({
      dddCode: data.code,
      cityCount: data.cityCount,
      stateNames: data.states.map(state => state.name),
    });
    const statePrefix = data.states[0] ? `${data.states[0].name} — ` : "";
    const dddTitle = `DDD ${code} é de qual estado? ${statePrefix}${data.cityCount} cidades | ${site}`;
    const dddDesc = `O DDD ${code} é atendido em ${stateNames}. Veja as ${data.cityCount} cidades cobertas pelo código de área e navegue pelas fichas municipais.`;
    return {
      title: dddTitle,
      description: dddDesc,
      canonicalPath: path,
      ogType: "article",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: `DDD ${code}`, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${path}#article`,
          url: path,
          headline: `DDD ${code} é de qual estado? ${statePrefix}${data.cityCount} cidades`,
          description: dddDesc,
          inLanguage: "pt-BR",
          mainEntityOfPage: path,
          datePublished: "2026-08-01",
          dateModified: "2026-08-01",
          author: { "@type": "Organization", name: site },
          publisher: { "@type": "Organization", name: site },
          about: {
            "@type": "DefinedTermSet",
            name: "Códigos DDD do Brasil",
            hasDefinedTerm: {
              "@type": "DefinedTerm",
              name: `DDD ${code}`,
              description: `Código de área com ${data.cityCount} municípios abrangidos.`,
            },
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": path,
          url: path,
          name: `DDD ${code}: cidades e estados atendidos`,
          mainEntity: {
            "@type": "DefinedTerm",
            name: `DDD ${code}`,
            description: `Código de área com ${data.cityCount} municípios abrangidos.`,
            inDefinedTermSet: "Códigos DDD do Brasil",
          },
        },
        faqPageJsonLd(dddFaqs),
      ],
    };
  }
  const stateMatch = path.match(/^\/estado\/([a-zA-Z]{2})$/);
  if (stateMatch) {
    const uf = stateMatch[1].toUpperCase();
    const data = await prefetch.byState({ uf });
    await seed(
      queryClient,
      getQueryKey(trpc.ddd.byState, { uf }, "query"),
      data
    );
    if (!data)
      return {
        title: "Estado não encontrado | Meu DDD",
        description,
        canonicalPath: path,
        notFound: true,
        noindex: true,
      };
    const faqs = buildStateFaq({
      stateName: data.state.name,
      uf: data.state.uf,
      cityCount: data.cityCount,
      ddds: data.ddds,
    });
    return {
      title: `DDD de ${data.state.name}: cidades e códigos | ${site}`,
      description: `Consulte os DDDs e os ${data.cityCount} municípios de ${data.state.name}, na região ${data.state.region}.`,
      canonicalPath: path,
      ogType: "article",
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          { name: data.state.name, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": path,
          url: path,
          name: `DDD de ${data.state.name}`,
          about: {
            "@type": "AdministrativeArea",
            name: data.state.name,
            identifier: data.state.uf,
            containedInPlace: { "@type": "Country", name: "Brasil" },
            population: data.state.populationEstimated ?? undefined,
          },
        },
        faqPageJsonLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${path}#article`,
          url: path,
          headline: `DDD de ${data.state.name}: cidades e códigos`,
          description: `Consulte os DDDs e os ${data.cityCount} municípios de ${data.state.name}, na região ${data.state.region}.`,
          inLanguage: "pt-BR",
          mainEntityOfPage: path,
          datePublished: "2026-08-01",
          dateModified: "2026-08-01",
          author: { "@type": "Organization", name: site },
          publisher: { "@type": "Organization", name: site },
          about: {
            "@type": "AdministrativeArea",
            name: data.state.name,
            identifier: data.state.uf,
            containedInPlace: { "@type": "Country", name: "Brasil" },
          },
        },
      ],
    };
  }
  const cityMatch = path.match(/^\/cidade\/([a-zA-Z]{2})\/([^/]+)$/);
  if (cityMatch) {
    const uf = cityMatch[1].toUpperCase();
    const slug = cityMatch[2];
    const data = await prefetch.byMunicipality({ uf, slug });
    await seed(
      queryClient,
      getQueryKey(trpc.ddd.byMunicipality, { uf, slug }, "query"),
      data
    );
    // Conteúdo editorial em tabs do município: pré-carrega o catálogo da UF e
    // seedeia no React Query para que a hidratação do cliente encontre os dados.
    const tabsCatalog = await loadMunicipalityTabs(uf);
    if (Object.keys(tabsCatalog).length > 0) {
      await seed(queryClient, ["localityTabs", uf.toLowerCase()], tabsCatalog);
    }
    if (!data)
      return {
        title: "Município não encontrado | Meu DDD",
        description,
        canonicalPath: path,
        notFound: true,
        noindex: true,
      };
    const faqs = buildMunicipalityFaq({
      municipalityName: data.municipality.name,
      stateName: data.state.name,
      stateUf: data.state.uf,
      ddd: data.ddd,
    });
    const meta = {
      title: `DDD de ${data.municipality.name} (${data.state.uf}) | ${site}`,
      description: `Confira o DDD de ${data.municipality.name}, em ${data.state.name}, e navegue por municípios relacionados.`,
      canonicalPath: path,
      ogType: "article" as const,
      jsonLd: [
        breadcrumbs([
          { name: site, item: "/" },
          {
            name: data.state.name,
            item: `/estado/${data.state.uf.toLowerCase()}`,
          },
          { name: data.municipality.name, item: path },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": path,
          url: path,
          name: `DDD de ${data.municipality.name}`,
          about: {
            "@type": "City",
            name: data.municipality.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: data.state.name,
              identifier: data.state.uf,
            },
            population: data.municipality.populationEstimated ?? undefined,
            geo: {
              "@type": "GeoCoordinates",
              latitude: data.municipality.latitude,
              longitude: data.municipality.longitude,
            },
          },
        },
        faqPageJsonLd(faqs),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${path}#article`,
          url: path,
          headline: `DDD de ${data.municipality.name} (${data.state.uf})`,
          description: `Confira o DDD de ${data.municipality.name}, em ${data.state.name}, e navegue por municípios relacionados.`,
          inLanguage: "pt-BR",
          mainEntityOfPage: path,
          datePublished: "2026-08-01",
          dateModified: "2026-08-01",
          author: { "@type": "Organization", name: site },
          publisher: { "@type": "Organization", name: site },
          about: {
            "@type": "City",
            name: data.municipality.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: data.state.name,
              identifier: data.state.uf,
            },
          },
        },
      ] as Record<string, unknown>[],
    };
    const tabsAvailable = Boolean(getMunicipalityTabsKey(uf, slug));
    if (tabsAvailable) {
      meta.jsonLd.push({
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "conteúdo-editorial-local",
        hasDefinedTerm: [
          {
            "@type": "DefinedTerm",
            termCode: "turismo",
            name: "Pontos turísticos",
          },
          {
            "@type": "DefinedTerm",
            termCode: "gastronomia",
            name: "Bares e restaurantes",
          },
          {
            "@type": "DefinedTerm",
            termCode: "transporte",
            name: "Transporte",
          },
          { "@type": "DefinedTerm", termCode: "clima", name: "Clima e região" },
        ],
      });
    }
    return meta;
  }
  if (path === "/blog")
    return {
      title: "Blog → Guias de telefonia | " + site,
      description:
        "A secção de blog do Meu DDD agora integra os guias de telefonia.",
      canonicalPath: "/guias",
      ogType: "website",
    };
  return {
    title: "Página não encontrada | Meu DDD",
    description,
    canonicalPath: path,
    notFound: true,
    noindex: true,
  };
}
