import { ArrowLeft, ArrowUpRight, MapPin, Phone, Users } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { BrazilStateMap } from "@/components/BrazilStateMap";
import { trpc } from "@/lib/trpc";
import { PublicNavbar } from "@/components/PublicNavbar";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { IntentCluster } from "@/components/IntentCluster";
import { TerritoryQuickAnswer } from "@/components/TerritoryQuickAnswer";
import { buildStateFaq } from "@shared/territorialFaq";
import { FaqSection } from "@/components/FaqSection";
import { OFFICIAL_URLS } from "@shared/externalLinks";

const formatPopulation = (value: number | null) =>
  value ? new Intl.NumberFormat("pt-BR").format(value) : "Dado não disponível";

export default function StatePage() {
  const [, params] = useRoute("/estado/:uf");
  const [, setLocation] = useLocation();
  const uf = (params?.uf ?? "").toUpperCase();
  const detail = trpc.ddd.byState.useQuery(
    { uf },
    { enabled: /^[A-Z]{2}$/.test(uf) }
  );
  const states = trpc.ddd.states.useQuery();

  if (detail.isLoading)
    return (
      <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] text-[#143d36]">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          A localizar o estado {uf}
        </p>
      </main>
    );
  if (!detail.data)
    return (
      <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] px-6 text-center text-[#143d36]">
        <div>
          <h1 className="font-display text-5xl">Estado não encontrado</h1>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]"
          >
            Voltar ao atlas
          </Link>
        </div>
      </main>
    );

  const { state, ddds, municipalities, cityCount } = detail.data;
  const faqs = buildStateFaq({
    stateName: state.name,
    uf: state.uf,
    cityCount,
    ddds,
  });
  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar />
      <section className="container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">
              Estado / {state.region}
            </div>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              DDD de {state.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5d756c]">
              Consulte todos os códigos de área e municípios de {state.name}.
              Esta página reúne a navegação territorial e os dados de referência
              para a busca telefónica no estado. A numeração do território
              brasileiro é regulada pela{" "}
              <a
                href={OFFICIAL_URLS.anatelNumeracao}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-[#f06a4d]/60 underline-offset-4 font-semibold text-[#143d36] hover:text-[#f06a4d]"
              >
                ANATEL
              </a>
              , no âmbito do Plano de Numeração Brasileiro.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#e9deca] p-4">
                <Users size={17} className="text-[#f06a4d]" />
                <strong className="mt-4 block font-display text-3xl">
                  {formatPopulation(state.populationEstimated)}
                </strong>
                <a
                  href={`https://www.ibge.gov.br/cidades-e-estados/${state.uf.toLowerCase()}.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#718378] hover:text-[#f06a4d]"
                >
                  habitantes · IBGE {state.populationReferenceYear}
                </a>
              </div>
              <div className="rounded-2xl bg-[#143d36] p-4 text-[#faf3e5]">
                <Phone size={17} className="text-[#f5c5a1]" />
                <strong className="mt-4 block font-display text-3xl">
                  {ddds.length}
                </strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b8cec4]">
                  DDDs no estado
                </span>
              </div>
            </div>
          </div>
          <div>
            <BrazilStateMap
              states={states.data ?? []}
              selectedUf={state.uf}
              onStateSelect={nextUf =>
                setLocation(`/estado/${nextUf.toLowerCase()}`)
              }
            />
          </div>
        </div>
      </section>
      <section className="container py-2 lg:py-6">
        <TerritoryTrustPanel
          scope="estado"
          populationYear={state.populationReferenceYear}
        />
      </section>
      <TerritoryQuickAnswer
        question={`Quantos DDDs existem em ${state.name}?`}
        answer={`${state.name} reúne ${ddds.length} código${ddds.length === 1 ? "" : "s"} de área e ${cityCount} município${cityCount === 1 ? "" : "s"} no inventário territorial do Meu DDD.`}
        context="Use os links abaixo para abrir cada área de numeração e a respetiva lista de cidades abrangidas."
      />
      <section
        className="container py-12 lg:py-16"
        aria-labelledby={`ddd-de-${state.uf.toLowerCase()}-h2`}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
              Resposta direta
            </div>
            <h2
              id={`ddd-de-${state.uf.toLowerCase()}-h2`}
              className="mt-3 font-display text-4xl tracking-[-0.05em] sm:text-5xl"
            >
              Qual é o DDD de {state.name}?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5d756c]">
              {state.name} é atendido pelos DDDs{" "}
              {ddds.map(ddd => ddd.code).join(", ")}. Cada código cobre uma
              região distinta do estado: os maiores volumes de municípios
              concentram-se{" "}
              {ddds.length > 0
                ? `no DDD ${ddds[0].code}`
                : "nas capitais e nos principais centros urbanos"}
              . Para descobrir o código de uma cidade específica, use a lista de
              municípios desta página ou a busca do topo — o DDD será exibido
              junto ao resultado.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6b8177]">
              Ao ligar para outro número de {state.name} fora da mesma área de
              numeração, é preciso discar 0 + código da prestadora + DDD +
              número. Para ligações de longa distância, verifique o plano da sua
              operadora para conhecer as tarifas aplicáveis.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {ddds.map(ddd => (
              <Link
                key={ddd.code}
                href={`/ddd/${ddd.code}`}
                className="pressable rounded-full bg-[#143d36] px-4 py-2.5 text-sm font-bold text-[#faf3e5]"
              >
                DDD {ddd.code} · {ddd.cityCount}{" "}
                {ddd.cityCount === 1 ? "cidade" : "cidades"}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-[#ded4c3] bg-[#fffaf1]">
        <div className="container py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
                Índice telefónico
              </div>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
                DDDs de {state.name}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#6b8177]">
              Cada código abre uma página própria, com os municípios abrangidos
              e navegação de volta a este pilar estadual.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ddds.map(ddd => (
              <Link
                key={ddd.code}
                href={`/ddd/${ddd.code}`}
                className="group rounded-2xl border border-[#e6ddce] bg-[#faf3e5] p-5 hover:border-[#f06a4d]"
              >
                <div className="flex items-start justify-between">
                  <strong className="font-display text-5xl tracking-[-0.08em] text-[#f06a4d]">
                    {ddd.code}
                  </strong>
                  <ArrowUpRight
                    size={18}
                    className="text-[#143d36] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#718378]">
                  {ddd.cityCount} municípios
                </p>
                <p className="mt-2 text-sm text-[#5d756c]">
                  {ddd.sampleCities.slice(0, 3).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container py-16">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
            Municípios / {cityCount}
          </div>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
            Todas as cidades de {state.name}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b8177]">
            Navegue diretamente para a página da sua cidade, com DDD, população
            estimada, coordenadas e links territoriais relacionados.
          </p>
        </div>
        <div className="mun-grid">
          {municipalities.map(city => (
            <Link
              key={city.ibgeCode}
              href={`/cidade/${city.uf.toLowerCase()}/${city.slug}`}
              className="mun-item"
              data-ddd={city.ddd}
            >
              {city.name} <small>{city.ddd}</small>
              <span aria-hidden="true">&#8599;</span>
            </Link>
          ))}
        </div>
      </section>
      <FaqSection
        id={`faq-estado-${state.uf.toLowerCase()}`}
        heading="Perguntas frequentes"
        subheading={`DDD e telefonia em ${state.name}`}
        faqs={faqs}
        theme="dark"
      />
      <IntentCluster state={state} />
    </main>
  );
}
