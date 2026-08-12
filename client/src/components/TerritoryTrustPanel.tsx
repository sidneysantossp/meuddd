import { BadgeCheck, CalendarCheck2, ExternalLink, ShieldCheck } from "lucide-react";
import { officialTerritorialSources, TERRITORIAL_REVIEW_DATE } from "@shared/territorialSeo";

type TerritoryTrustPanelProps = {
  className?: string;
  populationYear?: number | null;
  scope: "cidade" | "ddd" | "estado" | "região";
};

const scopeCopy = {
  cidade: "O DDD e o contexto territorial desta cidade são apresentados com referência à numeração nacional e aos dados territoriais disponíveis.",
  ddd: "A cobertura municipal deste DDD é organizada com referência à numeração nacional e à divisão territorial dos municípios abrangidos.",
  estado: "Os códigos de área e municípios deste estado são apresentados com referência à numeração nacional e aos dados territoriais disponíveis.",
  região: "Este hub regional organiza os pilares estaduais com referência à divisão territorial brasileira e aos códigos de área nacionais.",
};

export function TerritoryTrustPanel({ className = "", populationYear, scope }: TerritoryTrustPanelProps) {
  const reviewed = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${TERRITORIAL_REVIEW_DATE}T12:00:00Z`));
  return <aside className={`rounded-2xl border border-[#ded4c3] bg-[#fffaf1] p-5 text-[#143d36] ${className}`} aria-label="Fontes e revisão territorial">
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f06a4d]"><ShieldCheck size={15} /> Dados e revisão</div>
    <p className="mt-3 text-sm leading-6 text-[#5d756c]">{scopeCopy[scope]}</p>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {[officialTerritorialSources.anatel, officialTerritorialSources.ibge].map(source => <a key={source.shortName} href={source.url} target="_blank" rel="noreferrer" className="group rounded-xl bg-[#faf3e5] p-3 transition-colors hover:bg-[#e9deca]"><div className="flex items-center justify-between gap-3"><strong className="text-xs">{source.shortName}</strong><ExternalLink size={13} className="text-[#f06a4d]" /></div><p className="mt-1 text-xs leading-5 text-[#657a71]">{source.purpose}</p></a>)}
    </div>
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#e6ddce] pt-3 text-[10px] font-bold uppercase tracking-[0.11em] text-[#718378]"><span className="inline-flex items-center gap-1"><CalendarCheck2 size={13} className="text-[#f06a4d]" /> Revisto em {reviewed}</span>{populationYear ? <span className="inline-flex items-center gap-1"><BadgeCheck size={13} className="text-[#f06a4d]" /> População IBGE {populationYear}</span> : null}</div>
  </aside>;
}
