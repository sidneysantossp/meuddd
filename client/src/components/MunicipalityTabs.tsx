/* Conteúdo editorial em tabs das páginas de município: turismo, gastronomia,
   transporte e clima. Renderizado no SSR (legível para rastreadores) e com
   navegação nativa de tabs no cliente. Cada página fecha com um cartão de
   autoridade que liga à página pilar do estado (/estado/{uf}). */
import {
  ArrowUpRight,
  MapPin,
  Mountain,
  Utensils,
  BusFront,
  CloudSun,
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import {
  OFFICIAL_URLS,
  isAllowedExternal,
  renderMarkdownLinks,
} from "@shared/externalLinks";
import type { MunicipalityTabs as MunicipalityTabsData } from "@shared/localityTabs/types";

/* Links internos por termo territorial: o nome do estado e a região referidos
   no texto editorial apontam para as páginas pilar do site. */
function linkRegion(body: string, region: string, regionHref: string): string {
  const idx = body.indexOf(region);
  if (idx === -1) return body;
  return `${body.slice(0, idx)}<a class="underline decoration-[#f06a4d]/60 underline-offset-4 hover:text-[#f06a4d]" href="${regionHref}">${region}</a>${body.slice(idx + region.length)}`;
}

interface Props {
  city: string;
  stateName: string;
  uf: string;
  tabs: MunicipalityTabsData;
}

const TABS = [
  { id: "tourism", label: "Pontos turísticos", icon: Mountain, key: "tourism" },
  {
    id: "dining",
    label: "Bares e restaurantes",
    icon: Utensils,
    key: "dining",
  },
  { id: "transport", label: "Transporte", icon: BusFront, key: "transport" },
  { id: "climate", label: "Clima e região", icon: CloudSun, key: "climate" },
] as const;

export function MunicipalityTabs({ city, stateName, uf, tabs }: Props) {
  const [active, setActive] = useState<string>("tourism");

  const content = (
    <>
      {TABS.map(({ id, key, label, icon: Icon }) => (
        <div
          key={id}
          role="tabpanel"
          id={`tabpanel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={active !== id}
        >
          {key === "tourism" && (
            <div className="space-y-5">
              <p
                className="leading-7 text-[#5d756c]"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownLinks(
                    linkRegion(
                      tabs.tourism.intro,
                      stateName,
                      `/estado/${uf.toLowerCase()}`
                    )
                  ),
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.tourism.items.map(item => (
                  <a
                    key={item.mapHref}
                    href={item.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-3 rounded-2xl border border-[#143d36]/15 bg-[#fffaf1] p-4 transition-colors hover:border-[#f06a4d]/50"
                  >
                    <MapPin
                      size={17}
                      className="mt-0.5 shrink-0 text-[#f06a4d]"
                    />
                    <div>
                      <strong className="block font-display text-[#143d36]">
                        {item.name}
                      </strong>
                      <p
                        className="mt-1 text-sm leading-6 text-[#5d756c]"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdownLinks(item.description),
                        }}
                      />
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#f06a4d]">
                        Ver no mapa <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              {tabs.tourism.closing && (
                <p
                  className="leading-7 text-[#5d756c]"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownLinks(
                      linkRegion(
                        tabs.tourism.closing,
                        stateName,
                        `/estado/${uf.toLowerCase()}`
                      )
                    ),
                  }}
                />
              )}
            </div>
          )}
          {key === "dining" && (
            <div className="space-y-5">
              <p
                className="leading-7 text-[#5d756c]"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownLinks(
                    linkRegion(
                      tabs.dining.intro,
                      stateName,
                      `/estado/${uf.toLowerCase()}`
                    )
                  ),
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.dining.items.map(item => (
                  <a
                    key={item.mapHref}
                    href={item.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-3 rounded-2xl border border-[#143d36]/15 bg-[#fffaf1] p-4 transition-colors hover:border-[#f06a4d]/50"
                  >
                    <Utensils
                      size={17}
                      className="mt-0.5 shrink-0 text-[#f06a4d]"
                    />
                    <div>
                      <strong className="block font-display text-[#143d36]">
                        {item.name}
                      </strong>
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#f06a4d]">
                        {item.kind}
                      </span>
                      <p
                        className="mt-1 text-sm leading-6 text-[#5d756c]"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdownLinks(item.description),
                        }}
                      />
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#f06a4d]">
                        Ver no mapa <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
              {tabs.dining.closing && (
                <p
                  className="leading-7 text-[#5d756c]"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownLinks(
                      linkRegion(
                        tabs.dining.closing,
                        stateName,
                        `/estado/${uf.toLowerCase()}`
                      )
                    ),
                  }}
                />
              )}
            </div>
          )}
          {key === "transport" && (
            <div className="space-y-5">
              <p
                className="leading-7 text-[#5d756c]"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownLinks(
                    linkRegion(
                      tabs.transport.intro,
                      stateName,
                      `/estado/${uf.toLowerCase()}`
                    )
                  ),
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.transport.items.map(item => {
                  const inner = (
                    <div className="group flex gap-3 rounded-2xl border border-[#143d36]/15 bg-[#fffaf1] p-4 transition-colors hover:border-[#f06a4d]/50">
                      <BusFront
                        size={17}
                        className="mt-0.5 shrink-0 text-[#f06a4d]"
                      />
                      <div>
                        <strong className="block font-display text-[#143d36]">
                          {item.name}
                        </strong>
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#f06a4d]">
                          {item.kind}
                        </span>
                        <p
                          className="mt-1 text-sm leading-6 text-[#5d756c]"
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdownLinks(item.description),
                          }}
                        />
                        {item.mapHref && (
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#f06a4d]">
                            Ver no mapa <ArrowUpRight size={12} />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                  return item.mapHref ? (
                    <a
                      key={`${item.name}-${item.kind}`}
                      href={item.mapHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={`${item.name}-${item.kind}`}>{inner}</div>
                  );
                })}
              </div>
              {tabs.transport.closing && (
                <p
                  className="leading-7 text-[#5d756c]"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownLinks(
                      linkRegion(
                        tabs.transport.closing,
                        stateName,
                        `/estado/${uf.toLowerCase()}`
                      )
                    ),
                  }}
                />
              )}
              <a
                href={OFFICIAL_URLS.anatelNumeracao}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#f06a4d] hover:text-[#143d36]"
              >
                Plano de Numeração Brasileiro · ANATEL{" "}
                <ArrowUpRight size={12} />
              </a>
            </div>
          )}
          {key === "climate" && (
            <div className="space-y-5">
              <p
                className="leading-7 text-[#5d756c]"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownLinks(
                    linkRegion(
                      tabs.climate.intro,
                      stateName,
                      `/estado/${uf.toLowerCase()}`
                    )
                  ),
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tabs.climate.details.map(d => (
                  <div key={d.label} className="rounded-2xl bg-[#e9deca] p-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#718378]">
                      {d.label}
                    </span>
                    <p className="mt-1 font-display text-lg text-[#143d36]">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="leading-7 text-[#5d756c]"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdownLinks(
                    linkRegion(
                      tabs.climate.body,
                      stateName,
                      `/estado/${uf.toLowerCase()}`
                    )
                  ),
                }}
              />
              {tabs.climate.source &&
                isAllowedExternal(tabs.climate.source.href) && (
                  <a
                    href={tabs.climate.source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-[#f06a4d] hover:text-[#143d36]"
                  >
                    Dados climáticos · {tabs.climate.source.label}{" "}
                    <ArrowUpRight size={12} />
                  </a>
                )}
            </div>
          )}
        </div>
      ))}
      {/* Cartão de autoridade: a página da cidade aponta para a página pilar do estado */}
      <div className="mt-8 rounded-[1.25rem] bg-[#143d36] p-6 text-[#faf3e5] sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f06a4d]">
            <MapPin size={22} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]">
              Todo o estado
            </div>
            <p className="mt-2 font-display text-2xl leading-tight">
              Conheça o estado de {stateName}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#b8cec4]">
              {stateName} reúne todos os municípios e códigos DDD cobertos nesta
              página. Explore o território completo na página do estado.
            </p>
            <Link
              href={`/estado/${uf.toLowerCase()}`}
              className="mt-4 inline-flex items-center gap-1 font-bold text-[#f5c5a1] hover:text-[#faf3e5]"
            >
              Ver {stateName} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section
      className="container py-10 lg:py-14"
      aria-label={`Guia local de ${city}`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">
            Guia local · Revisado em {tabs.reviewedOn}
          </div>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.03em] text-[#143d36] sm:text-5xl">
            {city} em detalhe
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Secções do guia local"
          className="mb-6 flex flex-wrap gap-2"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={active === id}
              aria-controls={`tabpanel-${id}`}
              onClick={() => setActive(id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                active === id
                  ? "border-[#143d36] bg-[#143d36] text-[#faf3e5]"
                  : "border-[#143d36]/25 bg-[#fffaf1] text-[#143d36] hover:border-[#143d36]/50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
        {content}
        <p className="mt-6 text-xs leading-5 text-[#718378]">
          Conteúdo editorial baseado nos dados territoriais oficiais (IBGE e
          ANATEL) e em fontes locais públicas. Os links abrem pesquisas no
          Google Maps para confirmação da localização.
        </p>
      </div>
    </section>
  );
}
