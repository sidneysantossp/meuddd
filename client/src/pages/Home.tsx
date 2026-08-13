/* Atlas Vivo: busca em dados reais, cartografia clicável e índices partilháveis. */
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation, useSearch } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  History,
  LocateFixed,
  LoaderCircle,
  MapPin,
  Menu,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { BrazilStateMap } from "@/components/BrazilStateMap";
import { PUBLIC_NAV_ITEMS, PublicNavbar } from "@/components/PublicNavbar";
import { coordinatesForPrecision, geolocationFailure, precisionDescription, stateSelection, territorySelection, type LocationPrecision, type LocationStatus } from "@/lib/territoryDiscovery";
import { addRecentDdd, readRecentDdds, saveRecentDdds } from "@/lib/recentDdds";

export const HERO_TITLE_CLASS = "reveal reveal-delay-1 font-display text-[clamp(3.7rem,8vw,7.2rem)] font-semibold leading-[0.88] tracking-[0.012em] text-[#143d36]";
import { trpc } from "@/lib/trpc";

const featuredCodes = ["11", "21", "31", "41", "51", "61", "71", "81", "91"];
const popularDdds = [
  { code: "63", territory: "Tocantins" },
  { code: "96", territory: "Amapá" },
  { code: "82", territory: "Alagoas" },
  { code: "68", territory: "Acre" },
  { code: "86", territory: "Piauí" },
  { code: "61", territory: "Distrito Federal e entorno" },
];
const regionOrder = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

export { PUBLIC_NAV_ITEMS as MAIN_NAV_ITEMS };

function Brand() {
  return (
    <a href="#topo" className="group inline-flex items-center gap-3" aria-label="Meu DDD, voltar ao topo">
      <span className="grid size-11 place-items-center rounded-[14px] bg-[#f06a4d] text-[#fffaf1] shadow-[0_7px_18px_rgba(240,106,77,0.22)] transition-transform duration-300 group-hover:rotate-6">
        <MapPin size={25} strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[1.35rem] font-semibold tracking-[-0.05em] text-[#143d36]">Meu DDD</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#678176]">Brasil conectado</span>
      </span>
    </a>
  );
}

function initialSearch(search: string) {
  const params = new URLSearchParams(search);
  return { query: params.get("q") ?? "", uf: params.get("uf")?.toUpperCase() ?? "" };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const urlSearch = useSearch();
  // O Router recebe `ssrSearch` no servidor, enquanto o navegador já dispõe de
  // `window.location.search` antes da hidratação. A fonte explícita evita que o
  // filtro por UF seja vazio apenas na primeira renderização do cliente.
  const initialUrlSearch = typeof window === "undefined" ? urlSearch : window.location.search;
  const [{ query: firstQuery, uf: firstUf }] = useState(() => initialSearch(initialUrlSearch));
  const [query, setQuery] = useState(firstQuery);
  const [stateFilter, setStateFilter] = useState(firstUf);
  const [mobileNav, setMobileNav] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [locationPrecision, setLocationPrecision] = useState<LocationPrecision>("approximate");
  const [locationLabel, setLocationLabel] = useState("");
  const states = trpc.ddd.states.useQuery();
  const searchInput = useMemo(() => ({ query: query.trim() || undefined, uf: stateFilter || undefined }), [query, stateFilter]);
  const hasSearchCriteria = Boolean(searchInput.query || searchInput.uf);
  const search = trpc.ddd.search.useQuery(searchInput, { enabled: hasSearchCriteria });
  const recordUnmatchedSearch = trpc.ddd.recordUnmatchedSearch.useMutation();
  const resolveNearbyTerritory = trpc.ddd.resolveNearbyTerritory.useMutation();
  const trackedSearches = useRef(new Set<string>());
  const stateOptions = states.data ?? [];
  const results = search.data ?? [];
  const isLocating = locationStatus === "requesting" || locationStatus === "resolving";
  const groupedResults = useMemo(
    () => regionOrder.map(region => ({ region, items: results.filter(item => item.states[0]?.region === region) })).filter(group => group.items.length),
    [results],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (stateFilter) params.set("uf", stateFilter);
    window.history.replaceState({}, "", `${window.location.pathname}${params.size ? `?${params}` : ""}${window.location.hash}`);
  }, [query, stateFilter]);

  useEffect(() => {
    const attemptedQuery = query.trim();
    const key = `${attemptedQuery.toLocaleLowerCase("pt-BR")}|${stateFilter}`;
    if (!attemptedQuery || search.isLoading || !search.isSuccess || results.length !== 0 || trackedSearches.current.has(key)) return;
    trackedSearches.current.add(key);
    recordUnmatchedSearch.mutate({ query: attemptedQuery, uf: stateFilter || undefined });
  }, [query, stateFilter, results.length, search.isLoading, search.isSuccess, recordUnmatchedSearch]);

  useEffect(() => {
    setRecent(readRecentDdds(window.localStorage));
  }, []);

  useEffect(() => {
    saveRecentDdds(window.localStorage, recent);
  }, [recent]);

  const copy = (value: string, message: string) => navigator.clipboard.writeText(value).then(() => toast.success(message)).catch(() => toast.error("Não foi possível copiar agora."));
  const updateQuery = (value: string) => {
    setQuery(value);
    if (/^\d{2}$/.test(value)) setRecent(current => addRecentDdd(current, value));
  };
  const clearFilters = () => { setQuery(""); setStateFilter(""); };
  const clearRecent = () => {
    setRecent([]);
    toast.message("Histórico local removido deste dispositivo.");
  };
  const clearLocationSuggestion = () => {
    clearFilters();
    setLocationStatus("idle");
    setLocationLabel("");
    toast.message("Sugestão de localização removida. Faça uma nova pesquisa.");
  };
  const revealResults = () => window.requestAnimationFrame(() => document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  const selectState = (uf: string) => {
    const selection = stateSelection(uf);
    setQuery(selection.query);
    setStateFilter(selection.uf);
    revealResults();
  };
  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      setLocationLabel("Este navegador não disponibiliza localização.");
      return;
    }
    setLocationStatus("requesting");
    setLocationLabel("");
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocationStatus("resolving");
        const coordinates = coordinatesForPrecision({ latitude: position.coords.latitude, longitude: position.coords.longitude }, locationPrecision);
        resolveNearbyTerritory.mutate(coordinates, {
          onSuccess: territory => {
            if (!territory) {
              setLocationStatus("error");
              setLocationLabel("Não foi possível sugerir um DDD para esta localização.");
              return;
            }
            const selection = territorySelection(territory);
            updateQuery(selection.query);
            setStateFilter(selection.uf);
            setLocationStatus("resolved");
            setLocationLabel(`${selection.label} ${locationPrecision === "approximate" ? "A sugestão usa uma localização aproximada." : "A sugestão usa a localização mais precisa disponibilizada pelo dispositivo."}`);
            toast.success(`DDD ${territory.ddd} sugerido para ${territory.municipalityName}.`);
            revealResults();
          },
          onError: () => {
            setLocationStatus("error");
            setLocationLabel("Não foi possível consultar o território desta localização.");
          },
        });
      },
      error => {
        const failure = geolocationFailure(error.code);
        setLocationStatus(failure.status);
        setLocationLabel(failure.label);
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  };
  const submitSearch = () => {
    const code = query.trim();
    if (/^\d{2}$/.test(code) && results.some(result => result.code === code)) setLocation(`/ddd/${code}`);
    else document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="topo" className="page-shell min-h-screen">
      <PublicNavbar />

      <main>
        <section id="mapa" className="container relative grid min-h-[640px] scroll-mt-8 items-center gap-14 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-20">
          <div className="relative z-10 max-w-[640px]">
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d1bf] bg-[#f5ead7] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#547267]"><Sparkles size={14} className="text-[#f06a4d]" /> Base territorial completa</div>
            <h1 className={HERO_TITLE_CLASS}>Qual é o <em className="font-normal text-[#f06a4d]">DDD</em> de onde você está?</h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[470px] text-[1.08rem] leading-7 text-[#5d756c]">Consulte todos os municípios brasileiros por cidade, estado, UF ou número. Cada DDD tem agora um link próprio para partilhar.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#6d8178]">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> 5.571 municípios</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> 67 códigos</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> Mapa clicável</span>
            </div>
          </div>
          <div className="relative min-h-[430px] lg:min-h-[540px]">
            <BrazilStateMap states={stateOptions} selectedUf={stateFilter || undefined} onStateSelect={selectState} />
            <div className="pointer-events-none absolute -bottom-4 -left-3 z-10 flex items-center gap-3 rounded-2xl border border-[#e3d6c0] bg-[#fffaf1] px-4 py-3 shadow-[0_18px_36px_rgba(20,61,54,0.13)] sm:left-4 lg:bottom-2 lg:-left-10"><span className="grid size-10 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><MapPin size={19} /></span><span><strong className="block font-display text-2xl leading-5 text-[#143d36]">27</strong><small className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#668077]">estados clicáveis</small></span></div>
          </div>
        </section>

        <section id="buscar" className="relative z-10 bg-[#143d36] py-14 text-[#faf3e5] lg:py-16">
          <div className="container">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">01 / Encontrar</div><h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">Digite um lugar. <em className="font-normal text-[#f5c5a1]">Aponte o caminho.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#b8cec4]">Nome da cidade, estado, UF ou os dois dígitos. Se for um DDD, abrimos o seu link direto.</p></div>
            <div className="grid gap-4 rounded-[1.5rem] bg-[#f8f0df] p-3 text-[#143d36] shadow-[0_22px_60px_rgba(0,0,0,0.16)] md:grid-cols-[1fr_260px_auto] md:p-4">
              <label className="group flex min-h-[70px] items-center gap-3 rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]"><Search size={22} className="shrink-0 text-[#f06a4d]" /><span className="sr-only">Pesquisar DDD</span><input value={query} onChange={event => updateQuery(event.target.value)} onKeyDown={event => { if (event.key === "Enter") submitSearch(); }} placeholder="Ex.: Campinas, Bahia ou 21" className="w-full bg-transparent text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#98a69c]" /></label>
              <label className="relative flex min-h-[70px] items-center rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]"><span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">Filtrar por estado</span><select value={stateFilter} onChange={event => event.target.value ? selectState(event.target.value) : clearFilters()} className="w-full appearance-none bg-transparent pt-4 text-sm font-semibold outline-none"><option value="">Todos os estados</option>{stateOptions.map(state => <option value={state.uf} key={state.uf}>{state.name} · {state.uf}</option>)}</select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-7 text-[#f06a4d]" /></label>
              <button type="button" onClick={submitSearch} className="pressable flex min-h-[70px] items-center justify-center gap-2 rounded-xl bg-[#f06a4d] px-7 text-sm font-bold text-white hover:bg-[#dd593e]">Encontrar DDD <ArrowDownRight size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#b8cec4]"><span className="mr-1 font-semibold text-[#76998c]">Sugestões rápidas</span>{featuredCodes.map(code => <button key={code} type="button" onClick={() => updateQuery(code)} className="pressable rounded-full border border-[#4d7268] px-3 py-1.5 font-bold text-[#f8f0df] hover:border-[#f06a4d] hover:bg-[#f06a4d]">{code}</button>)}<span className="ml-1 text-[#9bb7ab]">Aceita acentos e grafias aproximadas, como “Sao Paolo”.</span></div>
            <div className="mt-4 flex flex-col gap-3"><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><button type="button" onClick={requestLocation} disabled={isLocating} aria-describedby="privacidade-localizacao" className="pressable inline-flex w-fit items-center gap-2 rounded-full border border-[#5c8074] bg-[#19483f] px-4 py-2 text-xs font-bold text-[#f8f0df] hover:border-[#f5c5a1] hover:bg-[#21564b] disabled:cursor-wait disabled:opacity-80"><span className={`relative grid size-6 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36] ${isLocating ? "location-target" : ""}`}>{isLocating ? <LoaderCircle size={14} className="animate-spin" aria-hidden="true" /> : <LocateFixed size={14} aria-hidden="true" />}</span>{locationStatus === "requesting" ? "A aguardar permissão…" : locationStatus === "resolving" ? "A localizar território…" : `Usar localização ${locationPrecision === "approximate" ? "aproximada" : "mais precisa"}`}</button>{locationStatus === "resolved" && <button type="button" onClick={clearLocationSuggestion} className="pressable inline-flex w-fit items-center gap-2 rounded-full border border-[#799a8d] px-4 py-2 text-xs font-bold text-[#d6e5de] hover:border-[#f5c5a1] hover:bg-[#21564b] hover:text-[#fffaf1]"><X size={14} aria-hidden="true" /> Limpar sugestão</button>}</div><fieldset className="flex flex-wrap gap-2" aria-label="Precisão da localização"><legend className="sr-only">Precisão da localização</legend>{(["approximate", "exact"] as const).map(precision => <button key={precision} type="button" disabled={isLocating} aria-pressed={locationPrecision === precision} onClick={() => setLocationPrecision(precision)} className={`pressable rounded-full border px-3 py-1.5 text-[11px] font-bold ${locationPrecision === precision ? "border-[#f5c5a1] bg-[#f5c5a1] text-[#143d36]" : "border-[#5c8074] text-[#c8dbd2] hover:border-[#f5c5a1]"}`}>{precision === "approximate" ? "Aproximada (recomendada)" : "Mais precisa"}</button>)}</fieldset><p id="privacidade-localizacao" className="max-w-xl text-[11px] leading-5 text-[#9bb7ab]">{precisionDescription(locationPrecision)} A localização só é consultada após a sua ação para sugerir cidade, UF e DDD. As coordenadas não são guardadas.</p></div>
            {isLocating && <div role="status" aria-live="polite" className="location-progress mt-3 flex max-w-xl items-center gap-3 rounded-xl border border-[#41695e] bg-[#19483f] px-4 py-3 text-xs text-[#d6e5de]"><span className="location-progress-bars" aria-hidden="true"><i /><i /><i /></span><span><strong className="block text-[#fffaf1]">{locationStatus === "requesting" ? "A solicitar acesso à localização" : "A identificar o território mais próximo"}</strong><span className="mt-0.5 block text-[#abc5ba]">A pesquisa será atualizada assim que o DDD for sugerido.</span></span></div>}
            {locationLabel && <p aria-live="polite" className={`mt-3 text-xs font-semibold ${locationStatus === "resolved" ? "text-[#f5c5a1]" : "text-[#ffb3a3]"}`}>{locationLabel}</p>}
          </div>
        </section>

        <section aria-labelledby="ddds-populares" className="border-y border-[#d9d1bf] bg-[#f5ead7] py-14 lg:py-16"><div className="container"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">Acesso rápido</div><h2 id="ddds-populares" className="font-display text-4xl tracking-[-0.05em] text-[#143d36]">DDDs mais procurados</h2></div><p className="max-w-md text-sm leading-6 text-[#6b8177]">Atalhos baseados em consultas históricas agregadas do Meu DDD. Não representam dados pessoais.</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{popularDdds.map((item, index) => <button type="button" key={item.code} onClick={() => { updateQuery(item.code); revealResults(); }} className="pressable group flex items-center justify-between rounded-2xl border border-[#d9d1bf] bg-[#fffaf1] px-5 py-4 text-left hover:border-[#f06a4d] hover:shadow-[0_12px_28px_rgba(20,61,54,0.09)]"><span><span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">0{index + 1} / DDD</span><strong className="mt-1 block font-display text-3xl leading-none text-[#f06a4d]">{item.code}</strong><span className="mt-2 block text-xs font-semibold text-[#5d756c]">{item.territory}</span></span><ArrowDownRight className="text-[#143d36] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" size={18} /></button>)}</div></div></section>

        <section id="resultados" className="container scroll-mt-8 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[230px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="mb-8 flex items-center justify-between lg:block"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">02 / Resultados</div><h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#143d36]">O Brasil<br /><em className="font-normal">responde.</em></h2></div><div className="grid size-11 place-items-center rounded-full bg-[#e9deca] text-[#143d36] lg:mt-7"><SlidersHorizontal size={18} /></div></div>
              <div className="hidden border-l border-[#d9d1bf] pl-5 text-xs leading-5 text-[#6b8177] lg:block"><p>Encontramos <strong className="text-[#143d36]">{results.length}</strong> códigos que combinam com a busca.</p><p className="mt-3">Dados reais, organizados por território.</p></div>
              {recent.length > 0 && <div className="mt-8 border-t border-[#d9d1bf] pt-5"><div className="mb-3 flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]"><History size={13} /> Consultados</div><button type="button" onClick={clearRecent} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f06a4d] hover:text-[#143d36]">Limpar</button></div><p className="mb-3 text-[10px] leading-4 text-[#7b9085]">Guardado apenas neste dispositivo.</p><div className="flex flex-wrap gap-2 lg:flex-col">{recent.map(code => <Link key={code} href={`/ddd/${code}`} className="flex items-center justify-between rounded-lg bg-[#eee5d3] px-3 py-2 text-left text-xs font-bold text-[#143d36] hover:bg-[#f5c5a1]"><span>DDD {code}</span><ArrowUpRight size={13} /></Link>)}</div></div>}
            </aside>
            <div>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d9d1bf] pb-5 sm:flex-row sm:items-center"><p className="text-sm text-[#6b8177]" aria-live="polite"><strong className="text-[#143d36]">{search.isLoading ? "…" : results.length}</strong> resultados encontrados</p>{(query || stateFilter) && <button type="button" onClick={clearFilters} className="pressable inline-flex items-center gap-2 self-start text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Limpar busca <X size={14} /></button>}</div>
              {search.isLoading ? <div className="rounded-2xl border border-dashed border-[#cfc3b0] bg-[#f5ead7] px-6 py-14 text-center"><p className="text-sm font-bold text-[#143d36]">A consultar o atlas completo…</p></div> : results.length ? <div className="atlas-grid-lines space-y-5">{groupedResults.map((group, groupIndex) => <section key={group.region} className="relative overflow-hidden rounded-[1.5rem] border border-[#ded4c3] bg-[#fffaf1]/95 p-5 sm:p-7"><div className="relative z-10 mb-5 flex flex-col justify-between gap-3 border-b border-[#e6ddce] pb-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b9085]"><span className="font-display text-lg font-semibold tracking-normal text-[#f06a4d]">0{groupIndex + 1}</span> / território</div><h3 className="font-display text-3xl tracking-[-0.05em] text-[#143d36]">{group.region}</h3></div><span className="index-tick text-xs font-bold text-[#6b8177]">{group.items.length} códigos</span></div><div className="relative z-10 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{group.items.map(item => <article key={item.code} className="result-card border-b border-[#e6ddce] bg-[#fffaf1]/55 p-4 sm:border-l-2 sm:border-b-0 sm:border-[#f5c5a1]"><div className="mb-6 flex items-start justify-between"><div className="flex items-baseline gap-2"><div className="font-display text-[3.5rem] leading-[0.75] tracking-[-0.08em] text-[#f06a4d]">{item.code}</div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]">DDD</span></div><button type="button" onClick={() => copy(item.code, `DDD ${item.code} copiado`)} className="pressable grid size-8 place-items-center rounded-full bg-[#f1e7d6] text-[#143d36] hover:bg-[#f5c5a1]" aria-label={`Copiar DDD ${item.code}`}><Copy size={14} /></button></div><div className="mb-4"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]"><MapPin size={13} className="text-[#f06a4d]" /> {item.states.map(state => state.uf).join(" · ")}</div><h4 className="mt-2 text-base font-bold tracking-[-0.03em] text-[#143d36]">{item.states.map(state => state.name).join(" · ")}</h4></div><p className="border-t border-[#e6ddce] pt-3 text-xs leading-5 text-[#70837a]">{item.sampleCities.join(" · ")}</p><div className="mt-4 flex items-center justify-between gap-3"><Link href={`/ddd/${item.code}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#143d36] hover:text-[#f06a4d]">Ver {item.cityCount} cidades <ArrowUpRight size={14} /></Link><button type="button" onClick={() => copy(`${window.location.origin}/ddd/${item.code}`, "Rota partilhável copiada")} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f06a4d]">Partilhar rota</button></div></article>)}</div></section>)}</div> : <div className="rounded-2xl border border-dashed border-[#cfc3b0] bg-[#f5ead7] px-6 py-14 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><Search size={19} /></div><h3 className="font-display text-2xl text-[#143d36]">Nenhum código encontrado</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6b8177]">Tente outro nome de cidade, estado ou limpe os filtros para explorar o atlas completo.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-[#143d36] px-4 py-2 text-xs font-bold text-[#faf3e5]">Ver todos os códigos</button></div>}
            </div>
          </div>
        </section>

        <section id="estados" className="border-y border-[#d9d1bf] bg-[#eee5d3] py-20 lg:py-24">
          <div className="container">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">03 / Explorar</div><h2 className="font-display max-w-[520px] text-5xl leading-[0.94] tracking-[-0.06em] text-[#143d36]">Clique no estado. <em className="font-normal text-[#f06a4d]">Abra o território.</em></h2></div><p className="max-w-[450px] text-sm leading-6 text-[#6b8177]">Cada forma do mapa representa uma UF. Ao selecionar uma, a busca mostra todos os DDDs e municípios daquele estado.</p></div>
            <div className="rounded-[1.5rem] border border-[#cfc3b0] bg-[#fffaf1] p-5 shadow-[0_22px_50px_rgba(20,61,54,0.08)] sm:p-7"><div className="mb-5 flex items-center justify-between gap-4 border-b border-[#e3d6c0] pb-5"><span className="text-xs font-bold uppercase tracking-[0.18em] text-[#667f75]">Seleção rápida por UF</span><span className="font-display text-2xl text-[#143d36]">27 UFs</span></div><div className="flex flex-wrap gap-2">{stateOptions.map(state => <button type="button" key={state.uf} onClick={() => selectState(state.uf)} aria-pressed={stateFilter === state.uf} aria-label={`Mostrar imediatamente os DDDs de ${state.name}`} className={`pressable rounded-full border px-3 py-2 text-xs font-bold transition-colors ${stateFilter === state.uf ? "border-[#f06a4d] bg-[#f06a4d] text-white" : "border-[#cfc3b0] bg-[#fffaf1] text-[#143d36] hover:border-[#f06a4d]"}`}>{state.uf} <span className="ml-1 opacity-70">{state.dddCount}</span></button>)}</div></div>
          </div>
        </section>

        <section id="sobre" className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.7fr] lg:py-24"><div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">Um atlas para o dia a dia</div><h2 className="font-display max-w-[620px] text-5xl leading-[0.95] tracking-[-0.06em] text-[#143d36] sm:text-6xl">Menos dúvida na hora de <em className="font-normal">conectar.</em></h2></div><div className="border-l border-[#d9d1bf] pl-6 text-sm leading-7 text-[#6b8177]"><p>O Meu DDD organiza os códigos de área do país em uma busca rápida, com ligação direta para cada DDD e leitura visual por estado.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#143d36]"><span className="grid size-9 place-items-center rounded-full bg-[#f5c5a1]"><Phone size={15} /></span> Informação clara, de ponta a ponta.</div></div></section>
      </main>
      <footer className="bg-[#143d36] py-10 text-[#d6e0d7]"><div className="container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center"><span className="font-display text-xl text-[#faf3e5]">Meu DDD</span><span>Base territorial importada e documentada</span></div></footer>
    </div>
  );
}
