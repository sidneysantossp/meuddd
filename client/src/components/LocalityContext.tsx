import { Building2, BusFront, ExternalLink, Landmark, MapPinned, PhoneCall, Trees } from "lucide-react";
import { getLocalityContent, LOCALITY_EDITORIAL_REVIEW_DATE, mapSearchUrl } from "@shared/localityContent";
import { LocalitySuggestionDialog } from "./LocalitySuggestionDialog";

type LocalityContextProps = {
  name: string;
  stateName: string;
  uf: string;
  slug: string;
  municipalityIbgeCode: number;
};

const emergencyNumbers = [
  { number: "190", label: "Polícia Militar" },
  { number: "192", label: "SAMU" },
  { number: "193", label: "Bombeiros" },
];

function SourceLine({ label, url, verifiedOn }: { label: string; url: string; verifiedOn: string }) {
  return <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#718378] hover:text-[#f06a4d]">Fonte: {label} · verificada em {verifiedOn}<ExternalLink size={12} /></a>;
}

export function LocalityContext({ name, stateName, uf, slug, municipalityIbgeCode }: LocalityContextProps) {
  const local = getLocalityContent(uf, slug);
  const locality = `${name}, ${stateName}`;
  const mapResources = [
    { title: "Pontos turísticos", description: `Abrir uma pesquisa de atrações em ${name} no mapa.`, href: mapSearchUrl(`pontos turísticos em ${locality}`), icon: MapPinned },
    { title: "Bares e restaurantes", description: "Pesquisar opções por localização e consultar horários diretamente no mapa.", href: mapSearchUrl(`bares e restaurantes em ${locality}`), icon: Building2 },
    { title: "Transporte público", description: "Pesquisar estações, terminais e pontos de ônibus próximos no mapa.", href: mapSearchUrl(`transporte público em ${locality}`), icon: BusFront },
  ];

  return <section className="border-b border-[#ded4c3] bg-[#fffaf1]" aria-labelledby="local-context-title">
    <div className="container py-14 lg:py-16">
      <div className="grid gap-9 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Guia local verificável</div>
          <h2 id="local-context-title" className="mt-3 font-display text-4xl tracking-[-0.05em]">{name} além do DDD</h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#5d756c]">Atalhos de contexto local para planear uma visita ou confirmar serviços. As informações específicas só aparecem quando há fonte institucional identificada.</p>
          {local && <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#718378]">Ficha local revista em {LOCALITY_EDITORIAL_REVIEW_DATE}</p>}
          <div className="mt-6 flex flex-col items-start gap-3">
            <a href="https://www.gov.br/anatel/pt-br/regulado/numeracao/codigos-nacionais/servicos-de-utilidade-publica-e-de-emergencia" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Códigos nacionais de emergência e utilidade pública <ExternalLink size={14} /></a>
            <LocalitySuggestionDialog municipalityIbgeCode={municipalityIbgeCode} municipalityName={name} />
          </div>
        </div>
        <div className="grid gap-4">
          {local?.history && <article className="rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-6"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f06a4d]"><Landmark size={14} /> História da cidade</div><p className="mt-4 text-sm leading-6 text-[#5d756c]">{local.history.body}</p><SourceLine {...local.history.source} /></article>}
          {local?.mobility && <article className="rounded-2xl bg-[#143d36] p-6 text-[#faf3e5]"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5c5a1]"><BusFront size={14} /> Transporte público</div><p className="mt-4 text-sm leading-6 text-[#c8dbd2]">{local.mobility.body}</p><a href={local.mobility.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#f5c5a1] hover:text-white">Abrir informações de mobilidade <ExternalLink size={14} /></a><SourceLine {...local.mobility.source} /></article>}
          {local?.parks && <div className="grid gap-3 sm:grid-cols-3">{local.parks.map(park => <article key={park.title} className="rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-5"><Trees size={17} className="text-[#f06a4d]" /><h3 className="mt-4 text-sm font-bold">{park.title}</h3><p className="mt-2 text-xs leading-5 text-[#5d756c]">{park.description}</p><a href={park.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Ver no mapa <ExternalLink size={13} /></a></article>)}</div>}
          {local?.heritage && <div className="grid gap-3 sm:grid-cols-2">{local.heritage.map(item => <article key={item.title} className="rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-5"><Landmark size={17} className="text-[#f06a4d]" /><h3 className="mt-4 text-sm font-bold">{item.title}</h3><p className="mt-2 text-xs leading-5 text-[#5d756c]">{item.description}</p><a href={item.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Abrir no mapa <ExternalLink size={13} /></a></article>)}</div>}
          <div className="grid gap-3 sm:grid-cols-3">{mapResources.map(resource => { const Icon = resource.icon; return <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-[#ded4c3] bg-[#faf3e5] p-5 transition-colors hover:border-[#f06a4d]"><Icon size={17} className="text-[#f06a4d]" /><h3 className="mt-4 text-sm font-bold group-hover:text-[#f06a4d]">{resource.title}</h3><p className="mt-2 text-xs leading-5 text-[#5d756c]">{resource.description}</p><ExternalLink size={14} className="mt-4 text-[#f06a4d]" /></a>})}</div>
          <div className="grid gap-3 border-t border-[#ded4c3] pt-4 sm:grid-cols-3">{emergencyNumbers.map(item => <a key={item.number} href={`tel:${item.number}`} className="flex items-center gap-3 rounded-xl bg-[#e9deca] px-4 py-3 text-sm font-bold text-[#143d36] hover:bg-[#f5c5a1]"><PhoneCall size={16} className="text-[#f06a4d]" /><span><strong className="block font-display text-xl leading-none">{item.number}</strong><small className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#718378]">{item.label}</small></span></a>)}</div>
          {local?.municipalServices?.map(service => <a key={service.title} href={service.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#f06a4d] hover:text-[#143d36]"><PhoneCall size={14} /> {service.title} <ExternalLink size={13} /></a>)}
        </div>
      </div>
    </div>
  </section>;
}
