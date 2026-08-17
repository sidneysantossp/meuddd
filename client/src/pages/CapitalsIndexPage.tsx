import { Link } from "wouter";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Landmark,
  MapPin,
  Phone,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { PublicNavbar } from "@/components/PublicNavbar";
import { TerritoryTrustPanel } from "@/components/TerritoryTrustPanel";
import { trpc } from "@/lib/trpc";

const regions = [
  "Todas",
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
];

function formatPopulation(value: number | null) {
  return value
    ? new Intl.NumberFormat("pt-BR").format(value)
    : "Dado não disponível";
}

export default function CapitalsIndexPage() {
  const [region, setRegion] = useState("Todas");
  const capitalsQuery = trpc.ddd.capitals.useQuery();
  const capitals = capitalsQuery.data ?? [];
  const visibleCapitals = useMemo(
    () =>
      region === "Todas"
        ? capitals
        : capitals.filter(capital => capital.region === region),
    [capitals, region]
  );

  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar />
      <section className="container grid gap-10 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd1bd] bg-[#f5ead7] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#668077]">
            <Landmark size={13} className="text-[#f06a4d]" /> Índice territorial
          </div>
          <h1 className="mt-6 font-display text-6xl leading-[0.88] tracking-[-0.07em] sm:text-7xl">
            DDDs das <em className="font-normal text-[#f06a4d]">capitais</em> do
            Brasil
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#5d756c]">
            Navegue pelas capitais brasileiras, filtre por região e abra a ficha
            local com o DDD, dados territoriais e referências de contexto
            verificáveis.
          </p>
        </div>
        <div className="rounded-[1.75rem] bg-[#143d36] p-7 text-[#faf3e5] shadow-[0_24px_55px_rgba(20,61,54,0.18)]">
          <MapPin size={22} className="text-[#f5c5a1]" />
          <div className="mt-16">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]">
              Cobertura nacional
            </div>
            <p className="mt-3 font-display text-5xl leading-none">
              {capitals.length || "27"}
            </p>
            <p className="mt-2 text-sm text-[#c8dbd2]">
              capitais organizadas por região e ligadas às suas páginas de
              município.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-[#ded4c3] bg-[#fffaf1]">
        <div className="container py-10">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-[#e9deca] text-[#143d36]">
                <SlidersHorizontal size={17} />
              </span>
              <div>
                <h2 className="font-display text-3xl tracking-[-0.05em]">
                  Filtrar por região
                </h2>
                <p className="mt-1 text-sm text-[#6b8177]">
                  {visibleCapitals.length} capitais no recorte atual
                </p>
              </div>
            </div>
            <div
              className="flex flex-wrap gap-2"
              aria-label="Filtro de capitais por região"
            >
              {regions.map(item => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRegion(item)}
                  aria-pressed={region === item}
                  className={`pressable rounded-full px-4 py-2 text-xs font-bold transition-colors ${region === item ? "bg-[#f06a4d] text-white" : "border border-[#ded4c3] bg-[#faf3e5] text-[#143d36] hover:border-[#f06a4d]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <TerritoryTrustPanel scope="cidade" />
      <section className="container py-14 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {capitalsQuery.isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-[1.5rem] bg-[#e9deca]"
                />
              ))
            : visibleCapitals.map(capital => (
                <Link
                  key={capital.ibgeCode}
                  href={`/cidade/${capital.uf.toLowerCase()}/${capital.slug}`}
                  className="group rounded-[1.5rem] border border-[#ded4c3] bg-[#fffaf1] p-6 transition-all hover:-translate-y-1 hover:border-[#f06a4d] hover:shadow-[0_18px_36px_rgba(20,61,54,0.12)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#718378]">
                        {capital.region} · {capital.uf}
                      </span>
                      <h2 className="mt-3 font-display text-4xl tracking-[-0.06em] group-hover:text-[#f06a4d]">
                        {capital.name}
                      </h2>
                    </div>
                    <ArrowUpRight
                      size={19}
                      className="shrink-0 text-[#f06a4d]"
                    />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#e3d8c7] pt-4">
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#718378]">
                        <Phone size={12} /> DDD
                      </span>
                      <strong className="mt-1 block font-display text-3xl leading-none">
                        {capital.ddd}
                      </strong>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#718378]">
                        <Users size={12} /> população
                      </span>
                      <strong className="mt-1 block text-sm">
                        {formatPopulation(capital.populationEstimated)}
                      </strong>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        {!capitalsQuery.isLoading && visibleCapitals.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#d2c6b4] bg-[#fffaf1] p-8 text-center text-sm text-[#6b8177]">
            Não encontrámos capitais neste filtro.
          </p>
        )}
      </section>
    </main>
  );
}
