import { ArrowUpRight, Compass, MapPinned } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { PublicNavbar } from "@/components/PublicNavbar";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { findRegionHub, regionSlug } from "@shared/territorialSeo";

export default function RegionPage() {
  const [, params] = useRoute("/regiao/:slug");
  const region = findRegionHub(params?.slug ?? "");
  const states = trpc.ddd.states.useQuery();
  if (!region) return <main className="page-shell grid min-h-screen place-items-center bg-[#faf3e5] text-[#143d36]"><div className="text-center"><h1 className="font-display text-5xl">Região não encontrada</h1><Link href="/" className="mt-6 inline-flex rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]">Voltar à consulta</Link></div></main>;
  const regionStates = (states.data ?? []).filter(state => regionSlug(state.region) === region.slug);
  return <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]"><PublicNavbar /><section className="container py-14 lg:py-20"><div className="grid gap-8 lg:grid-cols-[1fr_0.82fr]"><div><div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">Hub territorial / Brasil</div><h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-[-0.07em] sm:text-7xl">DDDs do {region.name}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-[#5d756c]">Explore os pilares estaduais da região {region.name}. Cada página apresenta códigos de área, municípios e rotas de consulta relacionadas.</p><div className="mt-8 flex items-center gap-3 text-sm font-bold text-[#143d36]"><MapPinned size={17} className="text-[#f06a4d]" /> {regionStates.length} estados no hub regional</div></div><TerritoryTrustPanel scope="região" /></div></section><section className="border-y border-[#ded4c3] bg-[#fffaf1]"><div className="container py-14"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{regionStates.map(state => <Link key={state.uf} href={`/estado/${state.uf.toLowerCase()}`} className="group rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-6 hover:border-[#f06a4d]"><div className="flex items-start justify-between"><Compass size={18} className="text-[#f06a4d]" /><ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><div className="mt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#718378]">{state.uf} · {state.region}</div><h2 className="mt-2 font-display text-3xl">DDD de {state.name}</h2><p className="mt-3 text-sm leading-6 text-[#5d756c]">Consultar todos os municípios e códigos de área de {state.name}.</p></Link>)}</div></div></section></main>;
}
