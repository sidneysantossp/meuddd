/* Atlas Vivo: página editorial de busca, com assimetria funcional, verde território, marfim de atlas e coral de sinal. */
import { useMemo, useState } from "react";
import { toast } from "sonner";
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

type DddEntry = { code: string; state: string; uf: string; cities: string[]; region: string };

const dddData: DddEntry[] = [
  { code: "11", state: "São Paulo", uf: "SP", cities: ["São Paulo", "Guarulhos", "Osasco"], region: "Sudeste" },
  { code: "12", state: "São Paulo", uf: "SP", cities: ["São José dos Campos", "Taubaté", "Caraguatatuba"], region: "Sudeste" },
  { code: "13", state: "São Paulo", uf: "SP", cities: ["Santos", "São Vicente", "Praia Grande"], region: "Sudeste" },
  { code: "14", state: "São Paulo", uf: "SP", cities: ["Bauru", "Marília", "Botucatu"], region: "Sudeste" },
  { code: "15", state: "São Paulo", uf: "SP", cities: ["Sorocaba", "Itu", "Itapetininga"], region: "Sudeste" },
  { code: "16", state: "São Paulo", uf: "SP", cities: ["Ribeirão Preto", "Araraquara", "São Carlos"], region: "Sudeste" },
  { code: "17", state: "São Paulo", uf: "SP", cities: ["São José do Rio Preto", "Barretos", "Votuporanga"], region: "Sudeste" },
  { code: "18", state: "São Paulo", uf: "SP", cities: ["Presidente Prudente", "Araçatuba", "Dracena"], region: "Sudeste" },
  { code: "19", state: "São Paulo", uf: "SP", cities: ["Campinas", "Piracicaba", "Americana"], region: "Sudeste" },
  { code: "21", state: "Rio de Janeiro", uf: "RJ", cities: ["Rio de Janeiro", "Niterói", "São Gonçalo"], region: "Sudeste" },
  { code: "22", state: "Rio de Janeiro", uf: "RJ", cities: ["Campos dos Goytacazes", "Cabo Frio", "Macaé"], region: "Sudeste" },
  { code: "24", state: "Rio de Janeiro", uf: "RJ", cities: ["Volta Redonda", "Petrópolis", "Angra dos Reis"], region: "Sudeste" },
  { code: "27", state: "Espírito Santo", uf: "ES", cities: ["Vitória", "Vila Velha", "Serra"], region: "Sudeste" },
  { code: "28", state: "Espírito Santo", uf: "ES", cities: ["Cachoeiro de Itapemirim", "Itapemirim", "Alegre"], region: "Sudeste" },
  { code: "31", state: "Minas Gerais", uf: "MG", cities: ["Belo Horizonte", "Contagem", "Nova Lima"], region: "Sudeste" },
  { code: "32", state: "Minas Gerais", uf: "MG", cities: ["Juiz de Fora", "Barbacena", "São João del-Rei"], region: "Sudeste" },
  { code: "33", state: "Minas Gerais", uf: "MG", cities: ["Governador Valadares", "Teófilo Otoni", "Caratinga"], region: "Sudeste" },
  { code: "34", state: "Minas Gerais", uf: "MG", cities: ["Uberlândia", "Uberaba", "Araguari"], region: "Sudeste" },
  { code: "35", state: "Minas Gerais", uf: "MG", cities: ["Poços de Caldas", "Pouso Alegre", "Varginha"], region: "Sudeste" },
  { code: "37", state: "Minas Gerais", uf: "MG", cities: ["Divinópolis", "Itaúna", "Formiga"], region: "Sudeste" },
  { code: "38", state: "Minas Gerais", uf: "MG", cities: ["Montes Claros", "Januária", "Pirapora"], region: "Sudeste" },
  { code: "41", state: "Paraná", uf: "PR", cities: ["Curitiba", "São José dos Pinhais", "Paranaguá"], region: "Sul" },
  { code: "42", state: "Paraná", uf: "PR", cities: ["Ponta Grossa", "Guarapuava", "Irati"], region: "Sul" },
  { code: "43", state: "Paraná", uf: "PR", cities: ["Londrina", "Apucarana", "Cornélio Procópio"], region: "Sul" },
  { code: "44", state: "Paraná", uf: "PR", cities: ["Maringá", "Cianorte", "Campo Mourão"], region: "Sul" },
  { code: "45", state: "Paraná", uf: "PR", cities: ["Cascavel", "Foz do Iguaçu", "Toledo"], region: "Sul" },
  { code: "46", state: "Paraná", uf: "PR", cities: ["Pato Branco", "Francisco Beltrão", "Dois Vizinhos"], region: "Sul" },
  { code: "47", state: "Santa Catarina", uf: "SC", cities: ["Joinville", "Blumenau", "Itajaí"], region: "Sul" },
  { code: "48", state: "Santa Catarina", uf: "SC", cities: ["Florianópolis", "São José", "Palhoça"], region: "Sul" },
  { code: "49", state: "Santa Catarina", uf: "SC", cities: ["Chapecó", "Lages", "Caçador"], region: "Sul" },
  { code: "51", state: "Rio Grande do Sul", uf: "RS", cities: ["Porto Alegre", "Canoas", "Novo Hamburgo"], region: "Sul" },
  { code: "53", state: "Rio Grande do Sul", uf: "RS", cities: ["Pelotas", "Rio Grande", "Bagé"], region: "Sul" },
  { code: "54", state: "Rio Grande do Sul", uf: "RS", cities: ["Caxias do Sul", "Bento Gonçalves", "Vacaria"], region: "Sul" },
  { code: "55", state: "Rio Grande do Sul", uf: "RS", cities: ["Santa Maria", "Uruguaiana", "Santiago"], region: "Sul" },
  { code: "61", state: "Distrito Federal", uf: "DF", cities: ["Brasília", "Águas Claras", "Taguatinga"], region: "Centro-Oeste" },
  { code: "62", state: "Goiás", uf: "GO", cities: ["Goiânia", "Anápolis", "Aparecida de Goiânia"], region: "Centro-Oeste" },
  { code: "63", state: "Tocantins", uf: "TO", cities: ["Palmas", "Araguaína", "Gurupi"], region: "Norte" },
  { code: "64", state: "Goiás", uf: "GO", cities: ["Rio Verde", "Itumbiara", "Caldas Novas"], region: "Centro-Oeste" },
  { code: "65", state: "Mato Grosso", uf: "MT", cities: ["Cuiabá", "Várzea Grande", "Poconé"], region: "Centro-Oeste" },
  { code: "66", state: "Mato Grosso", uf: "MT", cities: ["Rondonópolis", "Sinop", "Sorriso"], region: "Centro-Oeste" },
  { code: "67", state: "Mato Grosso do Sul", uf: "MS", cities: ["Campo Grande", "Dourados", "Três Lagoas"], region: "Centro-Oeste" },
  { code: "68", state: "Acre", uf: "AC", cities: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"], region: "Norte" },
  { code: "69", state: "Rondônia", uf: "RO", cities: ["Porto Velho", "Ji-Paraná", "Ariquemes"], region: "Norte" },
  { code: "71", state: "Bahia", uf: "BA", cities: ["Salvador", "Lauro de Freitas", "Camaçari"], region: "Nordeste" },
  { code: "73", state: "Bahia", uf: "BA", cities: ["Ilhéus", "Itabuna", "Porto Seguro"], region: "Nordeste" },
  { code: "74", state: "Bahia", uf: "BA", cities: ["Juazeiro", "Senhor do Bonfim", "Jacobina"], region: "Nordeste" },
  { code: "75", state: "Bahia", uf: "BA", cities: ["Feira de Santana", "Alagoinhas", "Santo Amaro"], region: "Nordeste" },
  { code: "77", state: "Bahia", uf: "BA", cities: ["Barreiras", "Vitória da Conquista", "Guanambi"], region: "Nordeste" },
  { code: "79", state: "Sergipe", uf: "SE", cities: ["Aracaju", "Nossa Senhora do Socorro", "Itabaiana"], region: "Nordeste" },
  { code: "81", state: "Pernambuco", uf: "PE", cities: ["Recife", "Olinda", "Jaboatão dos Guararapes"], region: "Nordeste" },
  { code: "82", state: "Alagoas", uf: "AL", cities: ["Maceió", "Arapiraca", "Rio Largo"], region: "Nordeste" },
  { code: "83", state: "Paraíba", uf: "PB", cities: ["João Pessoa", "Campina Grande", "Santa Rita"], region: "Nordeste" },
  { code: "84", state: "Rio Grande do Norte", uf: "RN", cities: ["Natal", "Mossoró", "Parnamirim"], region: "Nordeste" },
  { code: "85", state: "Ceará", uf: "CE", cities: ["Fortaleza", "Caucaia", "Maracanaú"], region: "Nordeste" },
  { code: "86", state: "Piauí", uf: "PI", cities: ["Teresina", "Parnaíba", "Picos"], region: "Nordeste" },
  { code: "87", state: "Pernambuco", uf: "PE", cities: ["Petrolina", "Serra Talhada", "Garanhuns"], region: "Nordeste" },
  { code: "88", state: "Ceará", uf: "CE", cities: ["Juazeiro do Norte", "Sobral", "Crato"], region: "Nordeste" },
  { code: "89", state: "Piauí", uf: "PI", cities: ["Floriano", "São Raimundo Nonato", "Corrente"], region: "Nordeste" },
  { code: "91", state: "Pará", uf: "PA", cities: ["Belém", "Ananindeua", "Castanhal"], region: "Norte" },
  { code: "92", state: "Amazonas", uf: "AM", cities: ["Manaus", "Itacoatiara", "Manacapuru"], region: "Norte" },
  { code: "93", state: "Pará", uf: "PA", cities: ["Santarém", "Itaituba", "Altamira"], region: "Norte" },
  { code: "94", state: "Pará", uf: "PA", cities: ["Marabá", "Parauapebas", "Redenção"], region: "Norte" },
  { code: "95", state: "Roraima", uf: "RR", cities: ["Boa Vista", "Rorainópolis", "Caracaraí"], region: "Norte" },
  { code: "96", state: "Amapá", uf: "AP", cities: ["Macapá", "Santana", "Oiapoque"], region: "Norte" },
  { code: "97", state: "Amazonas", uf: "AM", cities: ["Tefé", "Coari", "Parintins"], region: "Norte" },
  { code: "98", state: "Maranhão", uf: "MA", cities: ["São Luís", "São José de Ribamar", "Paço do Lumiar"], region: "Nordeste" },
  { code: "99", state: "Maranhão", uf: "MA", cities: ["Imperatriz", "Caxias", "Bacabal"], region: "Nordeste" },
];

const states = ["Todos os estados", ...Array.from(new Set(dddData.map((item) => item.state))).sort((a, b) => a.localeCompare(b))];
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

export default function Home() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("Todos os estados");
  const [mobileNav, setMobileNav] = useState(false);
  const [recent, setRecent] = useState<string[]>(["11", "21", "61"]);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return dddData.filter((item) => {
      const matchesState = stateFilter === "Todos os estados" || item.state === stateFilter;
      const searchable = [item.code, item.state, item.uf, item.region, ...item.cities].join(" ").toLocaleLowerCase("pt-BR");
      return matchesState && (!normalized || searchable.includes(normalized));
    });
  }, [query, stateFilter]);

  const groupedResults = useMemo(() => regionOrder.map((region) => ({ region, items: results.filter((item) => item.region === region) })).filter((group) => group.items.length > 0), [results]);

  const updateQuery = (value: string) => {
    setQuery(value);
    if (value.length === 2 && dddData.some((item) => item.code === value)) {
      setRecent((current) => [value, ...current.filter((code) => code !== value)].slice(0, 3));
    }
  };

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success(`DDD ${code} copiado`, { description: "Agora é só completar o número." });
    } catch {
      toast.error("Não foi possível copiar agora");
    }
  };

  const clearFilters = () => {
    setQuery("");
    setStateFilter("Todos os estados");
  };

  return (
    <div id="topo" className="page-shell min-h-screen">
      <header className="relative z-20 border-b border-[#d9d1bf]/70 bg-[#faf3e5]/90 backdrop-blur-md">
        <div className="container flex min-h-[78px] items-center justify-between gap-8">
          <Brand />
          <nav className={`${mobileNav ? "flex" : "hidden"} absolute left-4 right-4 top-[86px] flex-col gap-2 rounded-2xl border border-[#d9d1bf] bg-[#faf3e5] p-3 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a href="#buscar" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#143d36] transition-colors hover:bg-[#eee5d3]">Buscar DDD</a>
            <a href="#explore" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5d756c] transition-colors hover:bg-[#eee5d3] hover:text-[#143d36]">Explorar estados</a>
            <a href="#sobre" className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5d756c] transition-colors hover:bg-[#eee5d3] hover:text-[#143d36]">Como funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#buscar" className="pressable hidden items-center gap-2 rounded-full bg-[#143d36] px-4 py-2.5 text-sm font-bold text-[#faf3e5] shadow-[0_7px_18px_rgba(20,61,54,0.14)] md:inline-flex">Consultar agora <ArrowUpRight size={15} /></a>
            <button type="button" className="pressable grid size-10 place-items-center rounded-full border border-[#d9d1bf] text-[#143d36] md:hidden" aria-label="Abrir menu" onClick={() => setMobileNav((value) => !value)}>
              {mobileNav ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="container relative grid min-h-[640px] items-center gap-14 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-20">
          <div className="relative z-10 max-w-[640px]">
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d1bf] bg-[#f5ead7] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#547267]"><Sparkles size={14} className="text-[#f06a4d]" /> O mapa começa aqui</div>
            <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.7rem,8vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#143d36]">Qual é o <em className="font-normal text-[#f06a4d]">DDD</em> de onde você está?</h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[460px] text-[1.08rem] leading-7 text-[#5d756c]">Descubra o código de qualquer cidade brasileira em segundos. Pesquise por lugar, estado ou pelo número que você já tem em mãos.</p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold text-[#6d8178]">
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> Brasil inteiro</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> Busca instantânea</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#f06a4d]" /> Sem cadastro</span>
            </div>
          </div>

          <div className="relative min-h-[430px] lg:min-h-[540px]">
            <div className="hero-grid absolute inset-x-3 top-4 h-[410px] overflow-hidden rounded-[2rem] bg-[#143d36] shadow-[0_30px_70px_rgba(20,61,54,0.24)] lg:inset-x-0 lg:h-[500px]">
              <img src="/manus-storage/ddd-brasil-hero-reference_27813efb.png" alt="Mapa topográfico abstrato do Brasil com pontos de conexão" className="map-drift absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#143d36]/15 via-transparent to-[#143d36]/70" />
              <div className="absolute left-6 top-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f7e8ce]/70"><span className="size-2 rounded-full bg-[#f06a4d]" /> Dados em movimento</div>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 border-t border-[#f7e8ce]/20 pt-4 text-[#f7e8ce]">
                <span className="font-display text-3xl italic">5 regiões</span>
                <span className="text-right text-[10px] font-bold uppercase leading-4 tracking-[0.18em] text-[#f7e8ce]/70">um país<br />conectado</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-3 z-10 flex items-center gap-3 rounded-2xl border border-[#e3d6c0] bg-[#fffaf1] px-4 py-3 shadow-[0_18px_36px_rgba(20,61,54,0.13)] sm:left-4 lg:bottom-2 lg:-left-10"><span className="grid size-10 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><Globe2 size={19} /></span><span><strong className="block font-display text-2xl leading-5 text-[#143d36]">67</strong><small className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#668077]">códigos ativos</small></span></div>
            <div className="absolute -right-2 top-11 z-10 hidden rounded-2xl border border-[#e3d6c0] bg-[#fffaf1]/95 px-4 py-3 shadow-[0_18px_36px_rgba(20,61,54,0.13)] sm:block lg:-right-7"><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#668077]"><span className="size-2 rounded-full bg-[#6ca8a0]" /> Em destaque</div><div className="font-display text-3xl text-[#143d36]">11 <span className="font-sans text-xs font-bold text-[#6b8177]">São Paulo</span></div></div>
          </div>
        </section>

        <section id="buscar" className="relative z-10 bg-[#143d36] py-14 text-[#faf3e5] lg:py-16">
          <div className="container">
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">01 / Encontrar</div><h2 className="font-display text-4xl tracking-[-0.05em] sm:text-5xl">Digite um lugar. <em className="font-normal text-[#f5c5a1]">Aponte o caminho.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#b8cec4]">Nome da cidade, estado, UF ou os dois dígitos do código. A busca entende tudo.</p></div>
            <div className="grid gap-4 rounded-[1.5rem] bg-[#f8f0df] p-3 text-[#143d36] shadow-[0_22px_60px_rgba(0,0,0,0.16)] md:grid-cols-[1fr_260px_auto] md:p-4">
              <label className="group flex min-h-[70px] items-center gap-3 rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] transition-shadow focus-within:ring-2 focus-within:ring-[#f06a4d]"><Search size={22} className="shrink-0 text-[#f06a4d]" /><span className="sr-only">Pesquisar DDD</span><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Ex.: Campinas, Bahia ou 21" className="w-full bg-transparent text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#98a69c]" /></label>
              <label className="relative flex min-h-[70px] items-center rounded-xl bg-[#fffaf1] px-5 ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]"><span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b9085]">Filtrar por estado</span><select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="w-full appearance-none bg-transparent pt-4 text-sm font-semibold outline-none"><option>Todos os estados</option>{states.slice(1).map((state) => <option key={state}>{state}</option>)}</select><ChevronDown size={17} className="pointer-events-none absolute right-4 top-7 text-[#f06a4d]" /></label>
              <button type="button" onClick={() => document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="pressable flex min-h-[70px] items-center justify-center gap-2 rounded-xl bg-[#f06a4d] px-7 text-sm font-bold text-white shadow-[0_10px_20px_rgba(240,106,77,0.25)] hover:bg-[#dd593e]">Encontrar DDD <ArrowDownRight size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#b8cec4]"><span className="mr-1 font-semibold text-[#76998c]">Sugestões rápidas</span>{featuredCodes.map((code) => <button key={code} type="button" onClick={() => updateQuery(code)} className="pressable rounded-full border border-[#4d7268] px-3 py-1.5 font-bold text-[#f8f0df] hover:border-[#f06a4d] hover:bg-[#f06a4d]">{code}</button>)}</div>
          </div>
        </section>

        <section id="resultados" className="container scroll-mt-8 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[230px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="mb-8 flex items-center justify-between lg:block"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">02 / Resultados</div><h2 className="font-display text-3xl leading-none tracking-[-0.04em] text-[#143d36]">O Brasil<br /><em className="font-normal">responde.</em></h2></div><div className="grid size-11 place-items-center rounded-full bg-[#e9deca] text-[#143d36] lg:mt-7"><SlidersHorizontal size={18} /></div></div>
              <div className="hidden border-l border-[#d9d1bf] pl-5 text-xs leading-5 text-[#6b8177] lg:block"><p>Encontramos <strong className="text-[#143d36]">{results.length}</strong> códigos que combinam com sua busca.</p><div className="mt-7 space-y-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]"><span className="block">Norte <b className="ml-1 text-[#143d36]">09</b></span><span className="block">Nordeste <b className="ml-1 text-[#143d36]">19</b></span><span className="block">Centro-Oeste <b className="ml-1 text-[#143d36]">07</b></span><span className="block">Sudeste <b className="ml-1 text-[#143d36]">23</b></span><span className="block">Sul <b className="ml-1 text-[#143d36]">09</b></span></div></div>
              {recent.length > 0 && <div className="mt-8 border-t border-[#d9d1bf] pt-5"><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]"><History size={13} /> Consultados</div><div className="flex flex-wrap gap-2 lg:flex-col">{recent.map((code) => <button key={code} type="button" onClick={() => updateQuery(code)} className="flex items-center justify-between rounded-lg bg-[#eee5d3] px-3 py-2 text-left text-xs font-bold text-[#143d36] transition-colors hover:bg-[#f5c5a1]"><span>DDD {code}</span><ArrowUpRight size={13} /></button>)}</div></div>}
            </aside>
            <div>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#d9d1bf] pb-5 sm:flex-row sm:items-center"><p className="text-sm text-[#6b8177]" aria-live="polite"><strong className="text-[#143d36]">{results.length}</strong> resultados encontrados</p>{(query || stateFilter !== "Todos os estados") && <button type="button" onClick={clearFilters} className="pressable inline-flex items-center gap-2 self-start text-xs font-bold text-[#f06a4d] hover:text-[#143d36]">Limpar busca <X size={14} /></button>}</div>
              {results.length > 0 ? <div className="atlas-grid-lines space-y-5">{groupedResults.map((group, groupIndex) => <section key={group.region} className="relative overflow-hidden rounded-[1.5rem] border border-[#ded4c3] bg-[#fffaf1]/95 p-5 sm:p-7"><div className="relative z-10 mb-5 flex flex-col justify-between gap-3 border-b border-[#e6ddce] pb-5 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7b9085]"><span className="font-display text-lg font-semibold tracking-normal text-[#f06a4d]">0{groupIndex + 1}</span> / território</div><h3 className="font-display text-3xl tracking-[-0.05em] text-[#143d36]">{group.region}</h3></div><span className="index-tick text-xs font-bold text-[#6b8177]">{group.items.length} {group.items.length === 1 ? "código" : "códigos"}</span></div><div className="relative z-10 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{group.items.map((item, index) => <article key={item.code} className={`result-card reveal reveal-delay-${Math.min(index + 1, 3)} border-b border-[#e6ddce] bg-[#fffaf1]/55 p-4 sm:border-l-2 sm:border-b-0 sm:border-[#f5c5a1]`}><div className="mb-6 flex items-start justify-between"><div className="flex items-baseline gap-2"><div className="font-display text-[3.5rem] leading-[0.75] tracking-[-0.08em] text-[#f06a4d]">{item.code}</div><span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b9b91]">DDD</span></div><button type="button" onClick={() => copyCode(item.code)} className="pressable grid size-8 place-items-center rounded-full bg-[#f1e7d6] text-[#143d36] hover:bg-[#f5c5a1]" aria-label={`Copiar DDD ${item.code}`}><Copy size={14} /></button></div><div className="mb-4"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b9085]"><MapPin size={13} className="text-[#f06a4d]" /> {item.uf}</div><h4 className="mt-2 text-base font-bold tracking-[-0.03em] text-[#143d36]">{item.state}</h4></div><p className="border-t border-[#e6ddce] pt-3 text-xs leading-5 text-[#70837a]">{item.cities.join(" · ")}</p><button type="button" onClick={() => { updateQuery(item.code); document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#143d36] hover:text-[#f06a4d]">Ver cidades <ArrowUpRight size={14} /></button></article>)}</div></section>)}</div> : <div className="atlas-grid-lines rounded-2xl border border-dashed border-[#cfc3b0] bg-[#f5ead7] px-6 py-14 text-center"><div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-[#f5c5a1] text-[#143d36]"><Search size={19} /></div><h3 className="font-display text-2xl text-[#143d36]">Nenhum código encontrado</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6b8177]">Tente outro nome de cidade, estado ou limpe os filtros para explorar o atlas completo.</p><button type="button" onClick={clearFilters} className="mt-5 rounded-full bg-[#143d36] px-4 py-2 text-xs font-bold text-[#faf3e5]">Ver todos os códigos</button></div>}
            </div>
          </div>
        </section>

        <section id="explore" className="border-y border-[#d9d1bf] bg-[#eee5d3] py-20 lg:py-24">
          <div className="container grid items-end gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">03 / Explorar</div><h2 className="font-display max-w-[450px] text-5xl leading-[0.94] tracking-[-0.06em] text-[#143d36]">Cada estado tem um <em className="font-normal text-[#f06a4d]">ritmo.</em></h2><p className="mt-6 max-w-[380px] text-sm leading-6 text-[#6b8177]">Viaje pelo mapa pelos códigos mais consultados e descubra as cidades que eles conectam.</p><a href="#resultados" className="pressable mt-8 inline-flex items-center gap-2 rounded-full border border-[#143d36] px-5 py-3 text-sm font-bold text-[#143d36] hover:bg-[#143d36] hover:text-[#faf3e5]">Explorar por região <ArrowUpRight size={16} /></a></div>
            <div className="hero-grid relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#143d36] p-7 text-[#faf3e5]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(240,106,77,0.24),transparent_2px),radial-gradient(circle_at_24%_72%,rgba(108,168,160,0.22),transparent_2px)] bg-[length:86px_86px,118px_118px] opacity-70" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]">Rotas por região</span><span className="rounded-full border border-[#f8f0df]/30 px-3 py-1 text-[10px] font-bold text-[#f8f0df]">2024</span></div><div className="mt-20 grid grid-cols-5 gap-2">{["N", "NE", "CO", "SE", "S"].map((region, index) => <button key={region} type="button" onClick={() => { const regionData = dddData.find((item) => item.region === ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"][index]); if (regionData) updateQuery(regionData.code); document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" }); }} className="group rounded-xl border border-[#f8f0df]/25 bg-[#f8f0df]/10 p-3 text-left transition-all hover:-translate-y-1 hover:border-[#f06a4d] hover:bg-[#f06a4d]"><span className="block text-[10px] font-bold text-[#f8f0df]/70 group-hover:text-white">{region}</span><strong className="mt-2 block font-display text-2xl">{["09", "19", "07", "23", "09"][index]}</strong></button>)}</div></div></div>
          </div>
        </section>

        <section id="sobre" className="container grid gap-10 py-20 lg:grid-cols-[1fr_0.7fr] lg:py-24">
          <div><div className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]">Um atlas para o dia a dia</div><h2 className="font-display max-w-[620px] text-5xl leading-[0.95] tracking-[-0.06em] text-[#143d36] sm:text-6xl">Menos dúvida na hora de <em className="font-normal">conectar.</em></h2></div>
          <div className="border-l border-[#d9d1bf] pl-6 text-sm leading-7 text-[#6b8177]"><p>O DDD Brasil organiza os códigos de área do país em uma busca simples, visual e rápida — para você fazer a ligação certa, entender um número ou planejar sua próxima conversa.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#143d36]"><span className="grid size-9 place-items-center rounded-full bg-[#f5c5a1]"><Phone size={15} /></span> Informação clara, de ponta a ponta.</div></div>
        </section>
      </main>

      <footer className="bg-[#143d36] py-10 text-[#d6e4dc]">
        <div className="container flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><div className="mb-3 flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#f06a4d]"><img src="/manus-storage/ddd-brasil-mark_5ec0d09e.png" alt="" className="size-7 object-contain" /></span><span className="font-display text-2xl text-[#faf3e5]">DDD Brasil</span></div><p className="max-w-xs text-xs leading-5 text-[#9eb9ad]">Um jeito mais humano de encontrar o código certo para cada lugar.</p></div><div className="flex flex-col items-start gap-3 text-xs font-semibold text-[#b8cec4] sm:items-end"><a href="#topo" className="hover:text-[#f5c5a1]">Voltar ao topo <ArrowUpRight size={13} className="inline" /></a><span>Feito para conectar o Brasil.</span></div></div>
      </footer>
    </div>
  );
}
