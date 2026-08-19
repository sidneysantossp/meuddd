import { ArrowLeft, ArrowUpRight, MapPin, Phone, Users } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { OFFICIAL_URLS } from "@shared/externalLinks";
import { trpc } from "@/lib/trpc";
import { ShareActions } from "@/components/ShareActions";
import { LocalityContext } from "@/components/LocalityContext";
import { PublicNavbar } from "@/components/PublicNavbar";
import {
  getMunicipalityTabsKey,
  getMunicipalityTabsSync,
} from "@shared/localityTabs";
import type { LocalityTabsCatalog } from "@shared/localityTabs/types";
import { useQueryClient } from "@tanstack/react-query";
import { MunicipalityTabs } from "@/components/MunicipalityTabs";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { IntentCluster } from "@/components/IntentCluster";
import { TerritoryQuickAnswer } from "@/components/TerritoryQuickAnswer";
import { buildMunicipalityFaq } from "@shared/territorialFaq";
import { regionSlug } from "@shared/territorialSeo";
import { FaqSection } from "@/components/FaqSection";

const formatPopulation = (value: number | null) =>
  value ? new Intl.NumberFormat("pt-BR").format(value) : "Dado não disponível";

// Subcomponente com ordem de hooks estável: a query dos tabs editoriais é
// sempre chamada (nunca dentro de IIFE nem depois de early returns), e o
// initialData mantém a identidade com o seed SSR para hidratação correta.
function MunicipalityTabsSection({
  municipality,
  state,
  slug,
  queryClient,
}: {
  municipality: { name: string; ibgeCode: number };
  state: { uf: string; name: string };
  slug: string;
  queryClient: ReturnType<typeof useQueryClient>;
}) {
  const tabsKey = getMunicipalityTabsKey(state.uf, slug);
  const tabsQuery = trpc.localityTabs.byMunicipality.useQuery(
    { uf: state.uf, slug },
    {
      enabled: Boolean(slug),
      // Dados iniciais do SSR: o prefetch semeia as tabs da UF no queryClient
      // (chave ["localityTabs", uf]), garantindo que o primeiro render do
      // client é idêntico ao HTML hidratado e sem mismatch de hidratação.
      initialData: () => {
        const catalog = queryClient.getQueryData<LocalityTabsCatalog>([
          "localityTabs",
          state.uf.toLowerCase(),
        ]);
        const tabs =
          catalog?.[tabsKey] ?? getMunicipalityTabsSync(state.uf, slug);
        return tabs ? { tabs } : undefined;
      },
    }
  );
  const tabs = tabsQuery.data?.tabs;
  if (tabs)
    return (
      <MunicipalityTabs
        city={municipality.name}
        stateName={state.name}
        uf={state.uf}
        tabs={tabs}
      />
    );
  return (
    <LocalityContext
      name={municipality.name}
      stateName={state.name}
      uf={state.uf}
      slug={slug}
      municipalityIbgeCode={municipality.ibgeCode}
    />
  );
}

// Nota crítica: TODOS os hooks (useQueryClient etc.) devem ser declarados antes
// de qualquer early return. Hooks condicionais entre renders (primeiro render
// loading → segundo render com hooks extras) causam o erro React #310
// ("hooks can only be called inside a function component") em produção.
export default function MunicipalityPage() {
  const [, params] = useRoute("/cidade/:uf/:slug");
  const [, setLocation] = useLocation();
  const uf = (params?.uf ?? "").toUpperCase();
  const slug = params?.slug ?? "";
  const queryClient = useQueryClient();
  const detail = trpc.ddd.byMunicipality.useQuery(
    { uf, slug },
    { enabled: /^[A-Z]{2}$/.test(uf) && Boolean(slug) }
  );
  if (detail.isLoading)
    return (
      <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] text-[#143d36]">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          A localizar município
        </p>
      </main>
    );
  if (!detail.data)
    return (
      <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] px-6 text-center text-[#143d36]">
        <div>
          <h1 className="font-display text-5xl">Município não encontrado</h1>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]"
          >
            Voltar ao atlas
          </Link>
        </div>
      </main>
    );

  const { municipality, state, ddd, relatedMunicipalities } = detail.data;

  const faqs = buildMunicipalityFaq({
    municipalityName: municipality.name,
    stateName: state.name,
    stateUf: state.uf,
    ddd,
  });
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${municipality.latitude},${municipality.longitude}`;
  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar
        endSlot={
          <ShareActions
            compact
            path={`/cidade/${uf.toLowerCase()}/${slug}`}
            title={`DDD de ${municipality.name}, ${state.name}`}
          />
        }
      />
      <section className="container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">
              {state.region} / {state.name}
            </div>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              DDD de {municipality.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5d756c]">
              {municipality.name} é um município de{" "}
              <Link
                href={`/estado/${state.uf.toLowerCase()}`}
                className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
              >
                {state.name}
              </Link>
              , na{" "}
              <Link
                href={`/estado/${state.uf.toLowerCase()}`}
                className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
              >
                região {state.region}
              </Link>
              . A localidade integra o hub regional{" "}
              <Link
                href={`/regiao/${regionSlug(state.region)}`}
                className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
              >
                {state.region}
              </Link>
              . O código de área associado à localidade é o{" "}
              <Link
                href={`/ddd/${municipality.ddd}`}
                className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
              >
                <strong>DDD {municipality.ddd}</strong>
              </Link>
              .
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#e9deca] p-4">
                <Users size={17} className="text-[#f06a4d]" />
                <strong className="mt-4 block font-display text-3xl">
                  {formatPopulation(municipality.populationEstimated)}
                </strong>
                <a
                  href={OFFICIAL_URLS.ibgeCity(state.uf, slug)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#718378] hover:text-[#f06a4d]"
                >
                  habitantes · IBGE {municipality.populationReferenceYear}
                </a>
              </div>
              <Link
                href={`/ddd/${municipality.ddd}`}
                className="rounded-2xl bg-[#143d36] p-4 text-[#faf3e5]"
              >
                <Phone size={17} className="text-[#f5c5a1]" />
                <strong className="mt-4 block font-display text-3xl">
                  {municipality.ddd}
                </strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b8cec4]">
                  ver municípios do DDD
                </span>
              </Link>
            </div>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-[#143d36] p-7 text-[#faf3e5] shadow-[0_24px_55px_rgba(20,61,54,0.18)]"
          >
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#f5c5a1_1px,transparent_1px)] [background-size:18px_18px]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#f06a4d]">
                <MapPin size={22} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]">
                  Mapa da localidade
                </div>
                <p className="mt-3 font-display text-4xl leading-none">
                  Abrir {municipality.name}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  Ver no mapa <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>
      <MunicipalityTabsSection
        municipality={municipality}
        state={state}
        slug={slug}
        queryClient={queryClient}
      />
      <section className="container py-2 lg:py-6">
        <TerritoryTrustPanel
          scope="cidade"
          populationYear={municipality.populationReferenceYear}
        />
      </section>
      <TerritoryQuickAnswer
        question={`Qual é o DDD de ${municipality.name}?`}
        answer={`O DDD de ${municipality.name}, em ${state.name}, é ${municipality.ddd}.`}
        context="A cobertura é organizada por área de numeração. Confirme o município e a UF antes de utilizar o código numa ligação."
      />
      <IntentCluster
        city={{ name: municipality.name, uf: state.uf, slug }}
        ddd={municipality.ddd}
        state={state}
      />
      <section className="border-y border-[#ded4c3] bg-[#fffaf1]">
        <div className="container py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
                Território ligado
              </div>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
                Outras cidades com DDD {municipality.ddd}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#6b8177]">
                {municipality.name} partilha a área de numeração{" "}
                {municipality.ddd} com outros municípios de {state.name}, entre
                eles{" "}
                {relatedMunicipalities.slice(0, 5).map((city, index) => (
                  <span key={city.ibgeCode} className="inline">
                    {index > 0 ? ", " : ""}
                    <Link
                      href={`/cidade/${city.uf.toLowerCase()}/${city.slug}`}
                      className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
                    >
                      {city.name}
                    </Link>
                  </span>
                ))}
                {relatedMunicipalities.length > 5
                  ? ` e mais ${relatedMunicipalities.length - 5}`
                  : ""}{" "}
                — cidades vizinhas da mesma região de {state.name}, ligadas por
                chamadas intermunicipais com o mesmo código de área. Explore a
                lista completa abaixo e volte ao pilar de {state.name} para ver
                todos os DDDs do estado.
              </p>
              <button
                type="button"
                onClick={() => setLocation(`/estado/${state.uf.toLowerCase()}`)}
                className="mt-5 text-sm font-bold text-[#f06a4d]"
              >
                Ver todas as cidades de {state.uf} →
              </button>
            </div>
            <div className="grid gap-x-6 border-t border-[#e1d6c4] sm:grid-cols-2">
              {relatedMunicipalities.map(city => (
                <Link
                  key={city.ibgeCode}
                  href={`/cidade/${city.uf.toLowerCase()}/${city.slug}`}
                  className="group flex items-center justify-between gap-3 border-b border-[#e1d6c4] py-3 text-sm font-semibold hover:text-[#f06a4d]"
                >
                  <span>{city.name}</span>
                  <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FaqSection
        id={`faq-cidade-${state.uf.toLowerCase()}-${slug}`}
        heading="Perguntas frequentes"
        subheading={`Sobre o DDD de ${municipality.name}`}
        faqs={faqs}
      />
    </main>
  );
}
