import { ArrowLeft, ArrowUpRight, Copy, Phone, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { ShareActions } from "@/components/ShareActions";
import { PublicNavbar } from "@/components/PublicNavbar";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { IntentCluster } from "@/components/IntentCluster";
import { TerritoryQuickAnswer } from "@/components/TerritoryQuickAnswer";
import { officialTerritorialSources } from "@shared/territorialSeo";
import { buildDddFaq } from "@shared/territorialFaq";

export const PRIORITY_DDD_EDITORIAL: Record<string, { state: string; uf: string; title: string; summary: string; curiosity: string }> = {
  "63": {
    state: "Tocantins",
    uf: "TO",
    title: "DDD 63 é de qual estado?",
    summary: "O DDD 63 é utilizado no Tocantins. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "Criado pela Constituição de 1988, o Tocantins é o estado mais novo do Brasil.",
  },
  "96": {
    state: "Amapá",
    uf: "AP",
    title: "DDD 96 é de qual estado?",
    summary: "O DDD 96 é utilizado no Amapá. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "Macapá, a capital amapaense, é conhecida pela proximidade com a Linha do Equador.",
  },
  "82": {
    state: "Alagoas",
    uf: "AL",
    title: "DDD 82 é de qual estado?",
    summary: "O DDD 82 é utilizado em Alagoas. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "Alagoas integra o Nordeste brasileiro e reúne municípios litorâneos e do interior sob o mesmo contexto regional.",
  },
  "68": {
    state: "Acre",
    uf: "AC",
    title: "DDD 68 é de qual estado?",
    summary: "O DDD 68 é utilizado no Acre. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "O Acre passou a integrar o território brasileiro após o Tratado de Petrópolis, assinado em 1903.",
  },
  "86": {
    state: "Piauí",
    uf: "PI",
    title: "DDD 86 é de qual estado?",
    summary: "O DDD 86 é utilizado no Piauí. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "O litoral do Piauí está associado ao Delta do Parnaíba, uma paisagem partilhada com o Maranhão.",
  },
  "27": {
    state: "Espírito Santo",
    uf: "ES",
    title: "DDD 27 é de qual estado?",
    summary: "O DDD 27 é utilizado no Espírito Santo. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
    curiosity: "Vitória, capital capixaba, combina uma porção insular com áreas no continente.",
  },
  "61": {
    state: "Distrito Federal",
    uf: "DF",
    title: "DDD 61 é de onde?",
    summary: "O DDD 61 atende o Distrito Federal e localidades de Goiás. Nesta página, consulte os municípios abrangidos e confirme a localidade antes de fazer uma ligação.",
    curiosity: "Brasília foi inaugurada em 1960 e é a capital federal do Brasil.",
  },
  "94": {
    state: "Pará",
    uf: "PA",
    title: "DDD 94 é de qual estado?",
    summary: "O DDD 94 é utilizado no Pará. Consulte os municípios abrangidos e abra as fichas locais para confirmar a localidade antes de organizar uma ligação.",
    curiosity: "A Ilha do Marajó, no Pará, é um dos grandes arquipélagos flúvio-marinhos brasileiros.",
  },
  "28": {
    state: "Sergipe",
    uf: "SE",
    title: "DDD 28 é de qual estado?",
    summary: "O DDD 28 é utilizado em Sergipe. Consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial da ligação.",
    curiosity: "Sergipe é o menor estado brasileiro em extensão territorial.",
  },
  "89": {
    state: "Piauí",
    uf: "PI",
    title: "DDD 89 é de qual estado?",
    summary: "O DDD 89 é utilizado no Piauí. Consulte a lista de municípios e confirme a localidade antes de partilhar ou utilizar um contacto.",
    curiosity: "O Piauí reúne sertão, cerrados e litoral no mesmo território nordestino.",
  },
  "41": {
    state: "Paraná",
    uf: "PR",
    title: "DDD 41 é de qual estado?",
    summary: "O DDD 41 é utilizado no Paraná. Nesta página, consulte os municípios abrangidos e avance para as fichas locais e estaduais relacionadas.",
    curiosity: "O Paraná abriga as Cataratas do Iguaçu, uma das paisagens naturais mais conhecidas do país.",
  },
  "43": {
    state: "Rio Grande do Sul",
    uf: "RS",
    title: "DDD 43 é de qual estado?",
    summary: "O DDD 43 é utilizado no Rio Grande do Sul. Consulte os municípios atendidos e confirme a cobertura local antes de fazer uma ligação.",
    curiosity: "O Rio Grande do Sul é o estado situado mais ao sul do território brasileiro.",
  },
  "29": {
    state: "Bahia",
    uf: "BA",
    title: "DDD 29 é de qual estado?",
    summary: "O DDD 29 é utilizado na Bahia. Consulte a lista de municípios e navegue para a ficha estadual para confirmar o contexto da ligação.",
    curiosity: "Salvador, capital da Bahia, foi a primeira capital do Brasil colonial.",
  },
  "95": {
    state: "Roraima",
    uf: "RR",
    title: "DDD 95 é de qual estado?",
    summary: "O DDD 95 é utilizado em Roraima. Consulte os municípios abrangidos e confirme a localidade antes de fazer ou partilhar uma ligação.",
    curiosity: "O Monte Roraima integra a paisagem de fronteira entre Brasil, Guiana e Venezuela.",
  },
  "13": {
    state: "São Paulo",
    uf: "SP",
    title: "DDD 13 é de qual estado?",
    summary: "O DDD 13 é utilizado em áreas do litoral e do sul do estado de São Paulo. Consulte os municípios listados para confirmar a cobertura local.",
    curiosity: "O litoral paulista reúne áreas urbanas, portuárias e de preservação ambiental no Sudeste brasileiro.",
  },
  "93": {
    state: "Pará",
    uf: "PA",
    title: "DDD 93 é de qual estado?",
    summary: "O DDD 93 é utilizado no Pará. Consulte os municípios abrangidos e use as fichas locais para confirmar a localidade da ligação.",
    curiosity: "O Pará é atravessado pela Linha do Equador na sua porção norte e integra a Região Norte.",
  },
  "64": {
    state: "Goiás",
    uf: "GO",
    title: "DDD 64 é de qual estado?",
    summary: "O DDD 64 é utilizado em Goiás. Consulte as cidades atendidas e navegue para a página estadual antes de confirmar um contacto.",
    curiosity: "Goiás abriga a Chapada dos Veadeiros, reconhecida pela paisagem de cerrado e quedas-d’água.",
  },
  "83": {
    state: "Paraíba",
    uf: "PB",
    title: "DDD 83 é de qual estado?",
    summary: "O DDD 83 é utilizado na Paraíba. Consulte os municípios abrangidos e confirme a localidade para interpretar corretamente o código de área.",
    curiosity: "A Ponta dos Seixas, na Paraíba, é conhecida como o ponto mais oriental das Américas continentais.",
  },
  "87": {
    state: "Pernambuco",
    uf: "PE",
    title: "DDD 87 é de qual estado?",
    summary: "O DDD 87 é utilizado em Pernambuco. Consulte os municípios da lista e utilize as fichas locais para confirmar a cobertura territorial.",
    curiosity: "O arquipélago de Fernando de Noronha pertence administrativamente a Pernambuco.",
  },
  "53": {
    state: "Rio Grande do Sul",
    uf: "RS",
    title: "DDD 53 é de qual estado?",
    summary: "O DDD 53 é utilizado no Rio Grande do Sul. Consulte os municípios atendidos e confirme a localidade antes de fazer uma ligação interurbana.",
    curiosity: "A Lagoa dos Patos é uma referência geográfica importante no sul do Rio Grande do Sul.",
  },
  "79": {
    state: "Sergipe",
    uf: "SE",
    title: "DDD 79 é de qual estado?",
    summary: "O DDD 79 é utilizado em Sergipe. Consulte os municípios abrangidos e navegue para a ficha estadual para complementar a pesquisa.",
    curiosity: "Sergipe é banhado pelo Atlântico e faz fronteira terrestre com Bahia e Alagoas.",
  },
};

export default function DddDetail() {
  const [, params] = useRoute("/ddd/:code");
  const code = params?.code ?? "";
  const detail = trpc.ddd.byCode.useQuery({ code }, { enabled: /^\d{2}$/.test(code) });

  if (detail.isLoading) return <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] text-[#143d36]"><p className="text-sm font-bold uppercase tracking-[0.2em]">A localizar o DDD {code}</p></main>;
  const data = detail.data;
  if (!data) return <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] px-6 text-center text-[#143d36]"><div><div className="font-display text-7xl text-[#f06a4d]">{code || "—"}</div><h1 className="mt-4 font-display text-4xl">DDD não encontrado</h1><Link href="/#buscar" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]"><ArrowLeft size={16} /> Voltar à busca</Link></div></main>;

  const { municipalities, states } = data;
  const priorityEditorial = PRIORITY_DDD_EDITORIAL[data.code];
  const faqs = [
    ...(priorityEditorial ? [[priorityEditorial.title, priorityEditorial.summary] as [string, string]] : []),
    [`Quais cidades usam o DDD ${data.code}?`, `O DDD ${data.code} abrange ${data.cityCount} municípios apresentados na lista desta página.`],
    [`Como ligar para um número com DDD ${data.code}?`, `Em ligações interurbanas, informe o código da operadora, o DDD ${data.code} e o número de telefone.`],
  ];

  return <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
    <PublicNavbar endSlot={<ShareActions compact path={`/ddd/${code}`} title={`DDD ${data.code}: cidades e estados abrangidos`} />} />
    <section className="container grid gap-12 py-14 lg:grid-cols-[0.72fr_1.28fr] lg:py-20">
      <div><div className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">Atlas de conexão</div><div className="font-display text-[clamp(6rem,18vw,13rem)] leading-[0.72] tracking-[-0.1em] text-[#f06a4d]">{data.code}</div><div className="mt-7 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#668077]"><Phone size={15} className="text-[#f06a4d]" /> Código de área</div><h1 className="mt-5 font-display text-4xl leading-[0.94] tracking-[-0.06em] sm:text-5xl">DDD {data.code}: {data.cityCount} cidades atendidas</h1><p className="mt-5 max-w-md text-sm leading-6 text-[#6b8177]">Este é o link direto e partilhável do DDD {data.code}. Envie-o para consultar as localidades cobertas pelo código{states.length ? states.map((state, index) => <span key={state.uf}>{index === 0 ? " nos estados de " : index === states.length - 1 ? " e " : ", "}<Link href={`/estado/${state.uf.toLowerCase()}`} className="font-bold text-[#143d36] underline decoration-[#f06a4d]/40 underline-offset-2">{state.name}</Link></span>) : ""} e navegue ao pilar estadual.</p><div className="mt-8 flex flex-wrap gap-2">{states.map(state => <Link key={state.uf} href={`/estado/${state.uf.toLowerCase()}`} className="rounded-full bg-[#e9deca] px-3 py-2 text-xs font-bold text-[#143d36]">{state.name} · {state.uf}</Link>)}</div></div>
      <div className="rounded-[1.75rem] border border-[#ded4c3] bg-[#fffaf1] p-5 shadow-[0_20px_50px_rgba(20,61,54,0.08)] sm:p-7"><div className="mb-6 flex items-end justify-between border-b border-[#e6ddce] pb-5"><div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">Municípios abrangidos</div><h2 className="mt-2 font-display text-3xl tracking-[-0.04em]">Lista completa</h2></div><span className="grid size-10 place-items-center rounded-full bg-[#f5c5a1]" aria-label="DDD"><Copy size={16} /></span></div><div className="grid max-h-[620px] gap-2 overflow-y-auto pr-2 sm:grid-cols-2">{municipalities.map(municipality => <Link key={municipality.ibgeCode} href={`/cidade/${municipality.uf.toLowerCase()}/${municipality.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-[#eee5d3] px-4 py-3 hover:border-[#f06a4d]"><span className="min-w-0"><strong className="block truncate text-sm">{municipality.name}</strong><small className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b9085]"><span aria-hidden="true" className="text-[#f06a4d]">&#9679;</span> {municipality.uf} {municipality.capital ? "· capital" : ""}</small></span><span aria-hidden="true" className="shrink-0 text-[#f06a4d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">&#8599;</span></Link>)}</div></div>
    </section>
    <section className="container py-2 lg:py-6"><TerritoryTrustPanel scope="ddd" /></section>
    <TerritoryQuickAnswer question={`Quais cidades usam o DDD ${data.code}?`} answer={`O DDD ${data.code} abrange ${data.cityCount} municípios${states.length ? ` nos estados de ${states.map(state => state.name).join(", ")}` : ""}.`} context="Abra uma ficha municipal para confirmar a localidade antes de fazer ou partilhar uma ligação." />
    {states[0] ? <IntentCluster ddd={data.code} state={states[0]} /> : null}
    {priorityEditorial ? <section className="border-y border-[#d9d1bf] bg-[#f5ead7]" aria-labelledby={`ddd-${data.code}-guide-title`}>
      <div className="container grid gap-9 py-14 lg:grid-cols-[0.84fr_1.16fr] lg:py-16">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Guia de recuperação territorial</div>
          <h2 id={`ddd-${data.code}-guide-title`} className="mt-3 font-display text-4xl tracking-[-0.05em] sm:text-5xl">{priorityEditorial.title}</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#5d756c]">{priorityEditorial.summary}</p>
        </div>
	        <div className="grid gap-4 sm:grid-cols-2">
	          <article className="rounded-[1.5rem] border border-[#ded2be] bg-[#fffaf1] p-6 shadow-[0_12px_35px_rgba(20,61,54,0.06)]"><h3 className="font-display text-2xl tracking-[-0.04em]">Como usar o DDD {data.code}</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">Em uma chamada interurbana, informe o código da operadora, o DDD {data.code} e o número de telefone. Consulte a operadora para conhecer tarifas e condições da ligação.</p></article>
	          <article className="rounded-[1.5rem] border border-[#ded2be] bg-[#fffaf1] p-6 shadow-[0_12px_35px_rgba(20,61,54,0.06)]"><h3 className="font-display text-2xl tracking-[-0.04em]">Confirme a localidade</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">O código deve ser interpretado junto com o município. Abra a cidade na lista e confirme a cobertura territorial antes de partilhar um contacto ou organizar uma ligação.</p></article>
	          <article className="sm:col-span-2 rounded-[1.5rem] border border-[#e6be9b] bg-[#fff3df] p-6 shadow-[0_12px_35px_rgba(20,61,54,0.06)]">
	            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d94e34]">Curiosidade regional</div>
	            <h3 className="mt-2 font-display text-2xl tracking-[-0.04em]">Além do código de área</h3>
	            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5d756c]">{priorityEditorial.curiosity}</p>
	            <a href={officialTerritorialSources.ibge.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#143d36] underline decoration-[#f06a4d] underline-offset-4">Consultar contexto territorial no IBGE <ArrowUpRight size={13} /></a>
	          </article>
	          <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1"><Link href={`/estado/${priorityEditorial.uf.toLowerCase()}`} className="pressable rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]">Ver DDDs do {priorityEditorial.state}</Link><Link href="/gerador" className="pressable rounded-full border border-[#b8c8be] px-5 py-3 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">Simular formato com DDD</Link></div>
        </div>
      </div>
    </section> : null}
    <section className="border-t border-[#ded4c3] bg-[#fffaf1]"><div className="container grid gap-8 py-14 lg:grid-cols-[0.75fr_1.25fr]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Perguntas frequentes</div><h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">Sobre o DDD {data.code}</h2><p className="mt-4 text-sm leading-6 text-[#6b8177]">Respostas diretas sobre a cobertura e o uso do código de área.</p></div><div className="grid gap-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-[#ded4c3] bg-[#faf3e5] px-5 py-4"><summary className="cursor-pointer text-sm font-bold">{question}</summary><p className="mt-3 text-sm leading-6 text-[#5d756c]">{answer}</p></details>)}</div></div></section>
  </main>;
}
