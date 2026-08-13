import { ArrowLeft, ArrowUpRight, Copy, MapPin, Phone, Share2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { ShareActions } from "@/components/ShareActions";
import { PublicNavbar } from "@/components/PublicNavbar";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { IntentCluster } from "@/components/IntentCluster";
import { TerritoryQuickAnswer } from "@/components/TerritoryQuickAnswer";

export const PRIORITY_DDD_EDITORIAL: Record<string, { state: string; uf: string; title: string; summary: string }> = {
  "63": {
    state: "Tocantins",
    uf: "TO",
    title: "DDD 63 é de qual estado?",
    summary: "O DDD 63 é utilizado no Tocantins. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
  },
  "96": {
    state: "Amapá",
    uf: "AP",
    title: "DDD 96 é de qual estado?",
    summary: "O DDD 96 é utilizado no Amapá. Nesta página, consulte os municípios abrangidos, navegue para a ficha estadual e confirme o contexto territorial antes de fazer uma ligação.",
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
      <div><div className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">Atlas de conexão</div><div className="font-display text-[clamp(6rem,18vw,13rem)] leading-[0.72] tracking-[-0.1em] text-[#f06a4d]">{data.code}</div><div className="mt-7 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#668077]"><Phone size={15} className="text-[#f06a4d]" /> Código de área</div><h1 className="mt-5 font-display text-4xl leading-[0.94] tracking-[-0.06em] sm:text-5xl">{data.cityCount} cidades conectadas.</h1><p className="mt-5 max-w-md text-sm leading-6 text-[#6b8177]">Este é o link direto e partilhável do DDD {data.code}. Envie-o para consultar as localidades cobertas pelo código e navegue aos respetivos pilares estaduais.</p><div className="mt-8 flex flex-wrap gap-2">{states.map(state => <Link key={state.uf} href={`/estado/${state.uf.toLowerCase()}`} className="rounded-full bg-[#e9deca] px-3 py-2 text-xs font-bold text-[#143d36]">{state.name} · {state.uf}</Link>)}</div></div>
      <div className="rounded-[1.75rem] border border-[#ded4c3] bg-[#fffaf1] p-5 shadow-[0_20px_50px_rgba(20,61,54,0.08)] sm:p-7"><div className="mb-6 flex items-end justify-between border-b border-[#e6ddce] pb-5"><div><div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">Municípios abrangidos</div><h2 className="mt-2 font-display text-3xl tracking-[-0.04em]">Lista completa</h2></div><span className="grid size-10 place-items-center rounded-full bg-[#f5c5a1]" aria-label="DDD"><Copy size={16} /></span></div><div className="grid max-h-[620px] gap-2 overflow-y-auto pr-2 sm:grid-cols-2">{municipalities.map(municipality => <Link key={municipality.ibgeCode} href={`/cidade/${municipality.uf.toLowerCase()}/${municipality.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-[#eee5d3] px-4 py-3 hover:border-[#f06a4d]"><span className="min-w-0"><strong className="block truncate text-sm">{municipality.name}</strong><small className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b9085]"><MapPin size={11} className="text-[#f06a4d]" /> {municipality.uf} {municipality.capital ? "· capital" : ""}</small></span><ArrowUpRight size={15} className="shrink-0 text-[#f06a4d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}</div></div>
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
          <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1"><Link href={`/estado/${priorityEditorial.uf.toLowerCase()}`} className="pressable rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]">Ver DDDs do {priorityEditorial.state}</Link><Link href="/gerador" className="pressable rounded-full border border-[#b8c8be] px-5 py-3 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">Simular formato com DDD</Link></div>
        </div>
      </div>
    </section> : null}
    <section className="border-t border-[#ded4c3] bg-[#fffaf1]"><div className="container grid gap-8 py-14 lg:grid-cols-[0.75fr_1.25fr]"><div><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Perguntas frequentes</div><h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">Sobre o DDD {data.code}</h2><p className="mt-4 text-sm leading-6 text-[#6b8177]">Respostas diretas sobre a cobertura e o uso do código de área.</p></div><div className="grid gap-3">{faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-[#ded4c3] bg-[#faf3e5] px-5 py-4"><summary className="cursor-pointer text-sm font-bold">{question}</summary><p className="mt-3 text-sm leading-6 text-[#5d756c]">{answer}</p></details>)}</div></div></section>
  </main>;
}
