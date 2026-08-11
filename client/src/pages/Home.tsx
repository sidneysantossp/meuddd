/* Atlas Vivo: busca em dados reais, cartografia clicável e índices partilháveis. */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Globe2,
  History,
  MapPin,
  Menu,
  Phone,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { BrazilStateMap } from "@/components/BrazilStateMap";
import { trpc } from "@/lib/trpc";

const featuredCodes = ["11", "21", "31", "41", "51", "61", "71", "81", "91"];
const regionOrder = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

function Brand() {
  return (
    <a href="#topo" className="group inline-flex items-center gap-3" aria-label="DDD Brasil, voltar ao topo">
      <span className="grid size-11 place-items-center overflow-hidden rounded-[14px] bg-[#f06a4d] shadow-[0_7px_18px_rgba(240,106,77,0.22)]">
        <img src="/manus-storage/ddd-brasil-mark_5ec0d09e.png" alt="" className="size-8 object-contain transition-transform duration-300 group-hover:rotate-6" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[1.35rem] font-semibold tracking-[-0.05em] text-[#143d36]">DDD Brasil</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#678176]">Atlas de conexões</span>
      </span>
    </a>
  );
}

function initialSearch() {
  const params = new URLSearchParams(window.location.search);
  return { query: params.get("q") ?? "", uf: params.get("uf")?.toUpperCase() ?? "" };
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [{ query: firstQuery, uf: firstUf }] = useState(initialSearch);
  const [query, setQuery] = useState(firstQuery);
  const [stateFilter, setStateFilter] = useState(firstUf);
  const [mobileNav, setMobileNav] = useState(false);
  const [recent, setRecent] = useState(["11", "21", "61"]);
  const states = trpc.ddd.states.useQuery();
  const searchInput = useMemo(() => ({ query: query.trim() || undefined, uf: stateFilter || undefined }), [query, stateFilter]);
  const search = trpc.ddd.search.useQuery(searchInput);
  const stateOptions = states.data ?? [];
  const results = search.data ?? [];
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

  const copy = (value: string, message: string) => navigator.clipboard.writeText(value).then(() => toast.success(message)).catch(() => toast.error("Não foi possível copiar agora."));
  const updateQuery = (value: string) => {
    setQuery(value);
    if (/^\d{2}$/.test(value)) setRecent(current => [value, ...current.filter(code => code !== value)].slice(0, 3));
  };
  const clearFilters = () => { setQuery(""); setStateFilter(""); };
  const selectState = (uf: string) => {
    setStateFilter(uf);
    document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const submitSearch = () => {
    const code = query.trim();
    if (/^\d{2}$/.test(code) && results.some(result => result.code === code)) setLocation(`/ddd/${code}`);
    else document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div id="topo" className="page-shell min-h-screen">
      <header className="relative z-20 border-b border-[#d9d1bf]/70 bg-[#faf3e5]/90 backdrop-blur-md">
        <div className="container flex min-h-[78px] items-center justify-between gap-8">
          <Brand />
          <nav className={`${mobileNav ? "flex" : "hidden"} absolute left-4 right-4 top-[86px] flex-col gap-2 rounded-2xl border border-[#d9d1bf] bg-[#faf3e5] p-3 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a href="#buscar" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#143d36]">Buscar DDD</a>
            <a href="#mapa" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5d756c]">Mapa interativo</a>
            <a href="#sobre" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5d756c]">Como funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#buscar" className="pressable hidden items-center gap-2 rounded-full bg-[#143d36] px-4 py-2.5 text-sm font-bold text-[#faf3e5] md:inline-flex">Consultar agora <ArrowUpRight size={15} /></a>
            <button type="button" className="pressable grid size-10 place-items-center rounded-full border border-[#d9d1bf] text-[#143d36] md:hidden" aria-label="Abrir menu" onClick={() => setMobileNav(value => !value)}>
              {mobileNav ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="container relative grid min-h-[640px] items-center gap-14 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-20">
          <div className="relative z-10 max-w-[640px]">
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d1bf] bg-[#f5ead7] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#547267]"><Sparkles size={14} className="text-[#f06a4d]" /> Base territorial completa</div>
            <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.7rem,8vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#143d36]">Qual é o <em className="font-normal text-[#f06a4d]">DDD</em> de onde você está?</h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[470px] text-[1.08rem] leading-7 text-[#5d756c]">Consulte todos os municípios brasileiros por cidade, estado, UF ou número. Cada DDD tem agora um link próprio para partilhar.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#6d8178]">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> 5.571 municípios</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> 67 códigos</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> Mapa clicável</span>
            </div>
          </div>
          <div className="relative min-h-[430px] lg:min-h-[540px]">
            <div className="hero-grid absolute inset-x-3 top-4 h-[410px] overflow-hidden rounded-[2rem] bg-[#143d36] shadow-[0_30px_70px_rgba(20,61,54,0.24)] lg:inset-x-0 lg:h-[500px]">
              <img src="/manus-storage/ddd-brasil-hero-reference_27813efb.png" alt="Mapa topográfico abstrato do Brasil com pontos de conexão" className="map-drift absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#143d36]/15 via-transparent to-[#143d36]/70" />
              <div className="absolute left-6 top-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7e8ce]/70"><span className="size-2 rounded-full bg-[#f06a4d]" /> Dados em movimento</div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 border-t border-[#f7e8ce]/20 pt-4 text-[#f7e8ce]"><span className="font-display text-3xl italic">27 UFs</span><span className="text-right text-[10px] font-bold uppercase leading-4 tracking-[0.18em] text-[#f7e8ce]/70">um país<br />conectado</span></div>
            </div>
            <div className="absolute -bottom-4 -left-3 z-10 flex items-center gap-3 rounded-2xl border border-[#e3d6c0] bg-[#fffaf1] px-4 py-3 shadow-[0_18px_36px_rgba(20,61,54,0.13)] sm:left-4 lg:bottom-2 lg:-left-10"><span className="grid size-10 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><Globe2 size={19} /></span><span><strong className="block font-display text-2xl leading-5 text-[#143d36]">67</strong><small className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#668077]">códigos ativos</small></span></div>
          </div>
        </section>

        <section id="buscar" className="relative z-10 bg-[#143d36] py-14 text-[#faf3e5] lg:py-16">
          <div className="container">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">01 / Encontrar</div><h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">Digite um lugar. <em className="font-normal text-[#f5c5a1]">Aponte o caminho.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#b8cec4]">Nome da cidade, estado, UF ou os dois dígitos. Se for um DDD, abrimos o seu link direto.</p></div>
            <div className="grid gap-4 rounded-[1.5rem] bg-[#f8f0df] p-3 text-[#143d36] shadow-[0_22px_60px_rgba(0,0,0,0.16)] md:grid-cols-[1fr_260px_auto] md:p-4">
              <label className="group flex min-h-[70px] items-center gap-3 rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]"><Search size={22} className="shrink-0 text-[#f06a4d]" /><span className="sr-only">Pesquisar DDD</span><input value={query} onChange={event => updateQuery(event.target.value)} onKeyDown={event => { if (event.key === "Enter") submitSearch(); }} placeholder="Ex.: Campinas, Bahia ou 21" className="w-full bg-transparent text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#98a69c]" /></label>
              <label className="relative flex min-h-[70px] items-center rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]"><span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">Filtrar por estado</span><select value={stateFilter} onChange={event => setStateFilter(event.target.value)} className="w-full appearance-none bg-transparent pt-4 text-sm font-semibold outline-none"><option value="">Todos os estados</option>{stateOptions.map(state => <option value={state.uf} key={state.uf}>{state.name} · {state.uf}</option>)}</select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-7 text-[#f06a4d]" /></label>
              <button type="button" onClick={submitSearch} className="pressable flex min-h-[70px] items-center justify-center gap-2 rounded-xl bg-[#f06a4d] px-7 text-sm font-bold text-white hover:bg-[#dd593e]">Encontrar DDD <ArrowDownRight size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#b8cec4]"><span className="mr-1 font-semibold text-[#76998c]">Sugestões rápidas</span>{featuredCodes.map(code => <button key={code} type="button" onClick={() => updateQuery(code)} className="pressable rounded-full border border-[#4d7268] px-3 py-1.5 font-bold text-[#f8f0df] hover:border-[#f06a4d] hover:bg-[#f06a4d]">{code}</button>)}</div>
          </div>
        </section>

        <section id="resultados" className="container scroll-mt-8 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[230px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="mb-8 flex items-center justify-between lg:block"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">02 / Resultados</div><h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#143d36]">O Brasil<br /><em className="font-normal">responde.</em></h2></div><div className="grid size-11 place-items-center rounded-full bg-[#e9deca] text-[#143d36] lg:mt-7"><SlidersHorizontal size={18} /></div></div>
              <div className="hidden border-l border-[#d9d1bf] pl-5 text-xs leading-5 text-[#6b8177] lg:block"><p>Encontramos <strong className="text-[#143d36]">{results.length}</strong> códigos que combinam com a busca.</p><p className="mt-3">Dados reais, organizados por território.</p></div>
              {recent.length > 0 && <div className="mt-8 border-t border-[#d9d1bf] pt-5"><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]"><History size={13} /> Consultados</div><div className="flex flex-wrap gap-2 lg:flex-col">{recent.map(code => <Link key={code} href={`/ddd/${code}`} className="flex items-center justify-between rounded-lg bg-[#eee5d3] px-3 py-2 text-left text-xs font-bold text-[#143d36] hover:bg-[#f5c5a1]"><span>DDD {code}</span><ArrowUpRight size={13} /></Link>)}</div></div>}
            </aside>
            <div>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d9d1bf] pb-5 sm:flex-row sm:items-center"><p className="text-sm text-[#6b8177]" aria-live="polite"><strong className="text-[#143d36]">{search.isLoading ? "…" : results.length}</strong> resultados encontrados</p>{(query || stateFilter) && <button type="button" onClick={clearFilters} className="pressable inline-flex items-center gap-2 self-start text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Limpar busca <X size={14} /></button>}</div>
              {search.isLoading ? <div className="rounded-2xl border border-dashed border-[#cfc3b0] bg-[#f5ead7] px-6 py-14 text-center"><p className="text-sm font-bold text-[#143d36]">A consultar o atlas completo…</p></div> : results.length ? <div className="atlas-grid-lines space-y-5">{groupedResults.map((group, groupIndex) => <section key={group.region} className="relative overflow-hidden rounded-[1.5rem] border border-[#ded4c3] bg-[#fffaf1]/95 p-5 sm:p-7"><div className="relative z-10 mb-5 flex flex-col justify-between gap-3 border-b border-[#e6ddce] pb-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b9085]"><span className="font-display text-lg font-semibold tracking-normal text-[#f06a4d]">0{groupIndex + 1}</span> / território</div><h3 className="font-display text-3xl tracking-[-0.05em] text-[#143d36]">{group.region}</h3></div><span className="index-tick text-xs font-bold text-[#6b8177]">{group.items.length} códigos</span></div><div className="relative z-10 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{group.items.map(item => <article key={item.code} className="result-card border-b border-[#e6ddce] bg-[#fffaf1]/55 p-4 sm:border-l-2 sm:border-b-0 sm:border-[#f5c5a1]"><div className="mb-6 flex items-start justify-between"><div className="flex items-baseline gap-2"><div className="font-display text-[3.5rem] leading-[0.75] tracking-[-0.08em] text-[#f06a4d]">{item.code}</div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]">DDD</span></div><button type="button" onClick={() => copy(item.code, `DDD ${item.code} copiado`)} className="pressable grid size-8 place-items-center rounded-full bg-[#f1e7d6] text-[#143d36] hover:bg-[#f5c5a1]" aria-label={`Copiar DDD ${item.code}`}><Copy size={14} /></button></div><div className="mb-4"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]"><MapPin size={13} className="text-[#f06a4d]" /> {item.states.map(state => state.uf).join(" · ")}</div><h4 className="mt-2 text-base font-bold tracking-[-0.03em] text-[#143d36]">{item.states.map(state => state.name).join(" · ")}</h4></div><p className="border-t border-[#e6ddce] pt-3 text-xs leading-5 text-[#70837a]">{item.sampleCities.join(" · ")}</p><div className="mt-4 flex items-center justify-between gap-3"><Link href={`/ddd/${item.code}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#143d36] hover:text-[#f06a4d]">Ver {item.cityCount} cidades <ArrowUpRight size={14} /></Link><button type="button" onClick={() => copy(`${window.location.origin}/ddd/${item.code}`, "Rota partilhável copiada")} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f06a4d]">Partilhar rota</button></div></article>)}</div></section>)}</div> : <div className="rounded-2xl border border-dashed border-[#cfc3b0] bg-[#f5ead7] px-6 py-14 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><Search size={19} /></div><h3 className="font-display text-2xl text-[#143d36]">Nenhum código encontrado</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6b8177]">Tente outro nome de cidade, estado ou limpe os filtros para explorar o atlas completo.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-[#143d36] px-4 py-2 text-xs font-bold text-[#faf3e5]">Ver todos os códigos</button></div>}
            </div>
          </div>
        </section>

        <section id="mapa" className="border-y border-[#d9d1bf] bg-[#eee5d3] py-20 lg:py-24">
          <div className="container">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">03 / Explorar</div><h2 className="font-display max-w-[520px] text-5xl leading-[0.94] tracking-[-0.06em] text-[#143d36]">Clique no estado. <em className="font-normal text-[#f06a4d]">Abra o território.</em></h2></div><p className="max-w-[450px] text-sm leading-6 text-[#6b8177]">Cada forma do mapa representa uma UF. Ao selecionar uma, a busca mostra todos os DDDs e municípios daquele estado.</p></div>
            <BrazilStateMap states={stateOptions} selectedUf={stateFilter || undefined} onStateSelect={selectState} />
            <div className="mt-6 flex flex-wrap gap-2">{stateOptions.map(state => <button type="button" key={state.uf} onClick={() => selectState(state.uf)} className={`pressable rounded-full border px-3 py-2 text-xs font-bold transition-colors ${stateFilter === state.uf ? "border-[#f06a4d] bg-[#f06a4d] text-white" : "border-[#cfc3b0] bg-[#fffaf1] text-[#143d36] hover:border-[#f06a4d]"}`}>{state.uf} <span className="ml-1 opacity-70">{state.dddCount}</span></button>)}</div>
          </div>
        </section>

        <section id="sobre" className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.7fr] lg:py-24"><div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">Um atlas para o dia a dia</div><h2 className="font-display max-w-[620px] text-5xl leading-[0.95] tracking-[-0.06em] text-[#143d36] sm:text-6xl">Menos dúvida na hora de <em className="font-normal">conectar.</em></h2></div><div className="border-l border-[#d9d1bf] pl-6 text-sm leading-7 text-[#6b8177]"><p>O DDD Brasil organiza os códigos de área do país em uma busca rápida, com ligação direta para cada DDD e leitura visual por estado.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#143d36]"><span className="grid size-9 place-items-center rounded-full bg-[#f5c5a1]"><Phone size={15} /></span> Informação clara, de ponta a ponta.</div></div></section>
      </main>
      <footer className="bg-[#143d36] py-10 text-[#d6e0d7]"><div className="container flex flex-col justify-between gap-4 text-xs sm:flex-row sm:items-center"><span className="font-display text-xl text-[#faf3e5]">DDD Brasil</span><span>Base territorial importada e documentada · {new Date().getFullYear()}</span></div></footer>
    </div>
  );
}
