import { ArrowUpRight, Compass, Map, Phone } from "lucide-react";
import { Link } from "wouter";
import { regionSlug } from "@shared/territorialSeo";

type IntentClusterProps = { city?: { name: string; uf: string; slug: string }; ddd?: string; state: { name: string; uf: string; region: string } };

export function IntentCluster({ city, ddd, state }: IntentClusterProps) {
  const statePath = `/estado/${state.uf.toLowerCase()}`;
  const regionPath = `/regiao/${regionSlug(state.region)}`;
  const cards = [
    ...(city && ddd ? [{ eyebrow: "Código da cidade", title: `DDD ${ddd} de ${city.name}`, description: `Consulte cobertura e municípios ligados ao código de área de ${city.name}.`, href: `/ddd/${ddd}`, icon: Phone }] : []),
    ...(ddd ? [{ eyebrow: "Cobertura por DDD", title: `Cidades do DDD ${ddd}`, description: "Navegue pela lista de municípios atendidos pelo mesmo código de área.", href: `/ddd/${ddd}`, icon: Map }] : []),
    { eyebrow: "Pilar estadual", title: `DDD de ${state.name}`, description: `Veja todos os códigos de área e municípios de ${state.name}.`, href: statePath, icon: Compass },
    { eyebrow: "Hub regional", title: `DDDs do ${state.region}`, description: `Explore os estados e códigos de área da região ${state.region}.`, href: regionPath, icon: Map },
  ];
  const uniqueCards = cards.filter((card, index, list) => list.findIndex(item => item.href === card.href && item.title === card.title) === index).slice(0, 3);
  return <section className="border-y border-[#ded4c3] bg-[#fffaf1]"><div className="container py-14"><div className="max-w-2xl"><div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Próximas consultas</div><h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">Navegue por intenção</h2><p className="mt-3 text-sm leading-6 text-[#6b8177]">Continue a pesquisa por código, estado e região através de páginas territoriais relacionadas.</p></div><div className="mt-8 grid gap-4 md:grid-cols-3">{uniqueCards.map(card => { const Icon = card.icon; return <Link key={`${card.href}-${card.title}`} href={card.href} className="group rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-5 transition-colors hover:border-[#f06a4d]"><div className="flex items-start justify-between gap-3"><Icon size={18} className="text-[#f06a4d]" /><ArrowUpRight size={16} className="text-[#143d36] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><div className="mt-7 text-[10px] font-bold uppercase tracking-[0.15em] text-[#718378]">{card.eyebrow}</div><h3 className="mt-2 text-base font-bold">{card.title}</h3><p className="mt-2 text-sm leading-6 text-[#5d756c]">{card.description}</p></Link>; })}</div></div></section>;
}
