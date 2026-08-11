import type { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";
import { trpc } from "@/lib/trpc";

type Outputs = inferRouterOutputs<AppRouter>;
export type HeadMeta = { title: string; description: string; canonicalPath: string; noindex?: boolean; notFound?: boolean; ogType?: "website" | "article"; jsonLd?: Record<string, unknown>[] };
export type SsrPrefetch = {
  states: () => Promise<Outputs["ddd"]["states"]>;
  search: (input: { query?: string; uf?: string }) => Promise<Outputs["ddd"]["search"]>;
  byCode: (input: { code: string }) => Promise<Outputs["ddd"]["byCode"]>;
  byState: (input: { uf: string }) => Promise<Outputs["ddd"]["byState"]>;
  byMunicipality: (input: { uf: string; slug: string }) => Promise<Outputs["ddd"]["byMunicipality"]>;
};

const site = "DDD Brasil";
const description = "Consulte o DDD de qualquer cidade ou estado do Brasil em uma base territorial completa.";
const faq = (questions: [string, string][]) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) });
const breadcrumbs = (items: { name: string; item: string }[]) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((entry, position) => ({ "@type": "ListItem", position: position + 1, name: entry.name, item: entry.item })) });
const seed = (queryClient: QueryClient, key: unknown, data: unknown) => queryClient.setQueryData(key as never, data as never);

export async function prefetchForPath(url: string, queryClient: QueryClient, prefetch: SsrPrefetch): Promise<HeadMeta> {
  const queryIndex = url.indexOf("?");
  const rawPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const rawSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  let path = rawPath || "/";
  try { path = decodeURI(path); } catch { /* mantém a rota original */ }
  path = path.replace(/\/+$/, "") || "/";
  const states = await prefetch.states();
  await seed(queryClient, getQueryKey(trpc.ddd.states, undefined, "query"), states);
  if (path === "/") {
    const params = new URLSearchParams(rawSearch);
    const input = { query: params.get("q")?.trim() || undefined, uf: params.get("uf")?.toUpperCase() || undefined };
    const results = await prefetch.search(input);
    await seed(queryClient, getQueryKey(trpc.ddd.search, input, "query"), results);
    return { title: `${site} — Consulte DDDs de todo o Brasil`, description, canonicalPath: "/", ogType: "website", jsonLd: [{ "@context": "https://schema.org", "@type": "WebSite", name: site, url: "/", potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "/?q={search_term_string}" }, "query-input": "required name=search_term_string" } }] };
  }
  if (path === "/guia/o-que-e-ddd") {
    const questions: [string, string][] = [["O que significa DDD?", "DDD significa Discagem Direta à Distância. É o código de dois algarismos que identifica uma área de numeração telefónica no Brasil."], ["Como usar o DDD numa chamada interurbana?", "Para uma ligação interurbana, informe o código da operadora, o DDD de destino e o número de telefone."], ["Como descobrir o DDD de uma cidade?", "Pesquise o nome da cidade no DDD Brasil ou abra a página do respetivo estado."]];
    return { title: `O que é DDD? Como funcionam os códigos de área | ${site}`, description: "Entenda o que é DDD, como os códigos de área funcionam no Brasil e como consultar a cidade certa.", canonicalPath: path, ogType: "article", jsonLd: [breadcrumbs([{ name: site, item: "/" }, { name: "O que é DDD", item: path }]), { "@context": "https://schema.org", "@type": "Article", headline: "O que é DDD?", description: "Guia para entender os códigos de área no Brasil.", inLanguage: "pt-BR", mainEntityOfPage: path }, faq(questions)] };
  }
  const dddMatch = path.match(/^\/ddd\/(\d{2})$/);
  if (dddMatch) {
    const code = dddMatch[1]; const data = await prefetch.byCode({ code });
    await seed(queryClient, getQueryKey(trpc.ddd.byCode, { code }, "query"), data);
    if (!data) return { title: "DDD não encontrado | DDD Brasil", description, canonicalPath: path, notFound: true, noindex: true };
    const stateNames = data.states.map(state => state.name).join(", ");
    return { title: `DDD ${code}: cidades e estados atendidos | ${site}`, description: `Veja as ${data.cityCount} cidades atendidas pelo DDD ${code}${stateNames ? ` em ${stateNames}` : ""}.`, canonicalPath: path, ogType: "article", jsonLd: [breadcrumbs([{ name: site, item: "/" }, { name: `DDD ${code}`, item: path }]), { "@context": "https://schema.org", "@type": "DefinedTerm", name: `DDD ${code}`, description: `Código de área com ${data.cityCount} municípios abrangidos.`, inDefinedTermSet: "Códigos DDD do Brasil" }, faq([[`Quais cidades usam o DDD ${code}?`, `O DDD ${code} abrange ${data.cityCount} municípios listados nesta página.`], [`Como ligar para um número com DDD ${code}?`, `Use o código da operadora, o DDD ${code} e o número de telefone em ligações interurbanas.`]])] };
  }
  const stateMatch = path.match(/^\/estado\/([a-zA-Z]{2})$/);
  if (stateMatch) {
    const uf = stateMatch[1].toUpperCase(); const data = await prefetch.byState({ uf });
    await seed(queryClient, getQueryKey(trpc.ddd.byState, { uf }, "query"), data);
    if (!data) return { title: "Estado não encontrado | DDD Brasil", description, canonicalPath: path, notFound: true, noindex: true };
    const questions: [string, string][] = [[`Qual é o DDD de ${data.state.name}?`, `O estado possui ${data.ddds.length} códigos de área apresentados nesta página.`], [`Como encontrar o DDD de uma cidade de ${data.state.name}?`, `O índice desta página apresenta os ${data.cityCount} municípios do estado com links para as páginas locais.`]];
    return { title: `DDD de ${data.state.name}: cidades e códigos | ${site}`, description: `Consulte os DDDs e os ${data.cityCount} municípios de ${data.state.name}, na região ${data.state.region}.`, canonicalPath: path, ogType: "article", jsonLd: [breadcrumbs([{ name: site, item: "/" }, { name: data.state.name, item: path }]), { "@context": "https://schema.org", "@type": "AdministrativeArea", name: data.state.name, identifier: data.state.uf, containedInPlace: { "@type": "Country", name: "Brasil" }, population: data.state.populationEstimated ?? undefined }, faq(questions)] };
  }
  const cityMatch = path.match(/^\/cidade\/([a-zA-Z]{2})\/([^/]+)$/);
  if (cityMatch) {
    const uf = cityMatch[1].toUpperCase(); const slug = cityMatch[2]; const data = await prefetch.byMunicipality({ uf, slug });
    await seed(queryClient, getQueryKey(trpc.ddd.byMunicipality, { uf, slug }, "query"), data);
    if (!data) return { title: "Município não encontrado | DDD Brasil", description, canonicalPath: path, notFound: true, noindex: true };
    const questions: [string, string][] = [[`Qual é o DDD de ${data.municipality.name}?`, `O DDD de ${data.municipality.name} é ${data.municipality.ddd}.`], [`Como ligar para ${data.municipality.name}?`, `Em ligações interurbanas, use o código da operadora seguido do DDD ${data.municipality.ddd} e do número de telefone.`]];
    return { title: `DDD de ${data.municipality.name} (${data.state.uf}) | ${site}`, description: `Confira o DDD de ${data.municipality.name}, em ${data.state.name}, e navegue por municípios relacionados.`, canonicalPath: path, ogType: "article", jsonLd: [breadcrumbs([{ name: site, item: "/" }, { name: data.state.name, item: `/estado/${data.state.uf.toLowerCase()}` }, { name: data.municipality.name, item: path }]), { "@context": "https://schema.org", "@type": "City", name: data.municipality.name, containedInPlace: { "@type": "AdministrativeArea", name: data.state.name, identifier: data.state.uf }, population: data.municipality.populationEstimated ?? undefined, geo: { "@type": "GeoCoordinates", latitude: data.municipality.latitude, longitude: data.municipality.longitude } }, faq(questions)] };
  }
  return { title: "Página não encontrada | DDD Brasil", description, canonicalPath: path, notFound: true, noindex: true };
}
