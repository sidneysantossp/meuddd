import { Link } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Copy, Dices, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { createMobileSubscriber, formatMobileNumber, sanitizeMobileSubscriber } from "@/lib/mobileNumber";
import { PublicNavbar } from "@/components/PublicNavbar";

export const GENERATOR_SIMULATION_NOTICE = "Os números são exemplos aleatórios para simulação e testes. A ferramenta não consulta, identifica, reserva ou possui qualquer vínculo com números reais de telefone, titulares ou operadoras. Não confirma se o número existe, está disponível ou pertence a alguém.";

export default function Generator() {
  const statesQuery = trpc.ddd.states.useQuery();
  const [selectedUf, setSelectedUf] = useState("SP");
  const stateDetailQuery = trpc.ddd.byState.useQuery({ uf: selectedUf });
  const [selectedDdd, setSelectedDdd] = useState("11");
  const [subscriber, setSubscriber] = useState("987654321");

  const dddOptions = useMemo(() => stateDetailQuery.data?.ddds ?? [], [stateDetailQuery.data]);
  const state = useMemo(() => statesQuery.data?.find(item => item.uf === selectedUf), [selectedUf, statesQuery.data]);
  const simulatedNumber = formatMobileNumber(selectedDdd, subscriber);
  const isLoadingTerritory = statesQuery.isLoading || stateDetailQuery.isLoading;
  const hasTerritoryError = statesQuery.isError || stateDetailQuery.isError;
  const hasStateOptions = (statesQuery.data?.length ?? 0) > 0;
  const hasDddOptions = dddOptions.length > 0;

  useEffect(() => {
    const firstState = statesQuery.data?.[0];
    if (firstState && !statesQuery.data?.some(item => item.uf === selectedUf)) setSelectedUf(firstState.uf);
  }, [selectedUf, statesQuery.data]);

  useEffect(() => {
    const firstDdd = dddOptions[0]?.code;
    if (firstDdd && !dddOptions.some(item => item.code === selectedDdd)) setSelectedDdd(firstDdd);
  }, [dddOptions, selectedDdd]);

  const generate = () => setSubscriber(createMobileSubscriber());
  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(simulatedNumber);
      toast.success("Número simulado copiado.");
    } catch {
      toast.error("Não foi possível copiar agora.");
    }
  };

  return (
    <div className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar />

      <main>
        <section className="container grid gap-10 py-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:py-20">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d1bf] bg-[#f5ead7] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#547267]">
              <Sparkles size={14} className="text-[#f06a4d]" /> Ferramenta de simulação
            </div>
            <h1 className="font-display text-[clamp(3.25rem,6vw,5.9rem)] font-semibold leading-[0.91] tracking-[0.012em] text-[#143d36]">Simule um <em className="font-normal text-[#f06a4d]">número móvel</em> brasileiro.</h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#5d756c]">Escolha o estado, o código DDD e gere um exemplo no formato de telemóvel brasileiro. Ideal para protótipos, interfaces e documentação.</p>
            <div className="mt-8 grid gap-3 text-sm text-[#547267] sm:grid-cols-2">
              <span className="flex items-center gap-2"><Check size={16} className="text-[#f06a4d]" /> Usa DDDs da base territorial</span>
              <span className="flex items-center gap-2"><Check size={16} className="text-[#f06a4d]" /> Formato móvel com nono dígito</span>
            </div>
          </div>

          <section aria-labelledby="generator-title" className="rounded-[2rem] border border-[#1d564d] bg-[#143d36] p-5 text-[#faf3e5] shadow-[0_26px_70px_rgba(20,61,54,0.20)] sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5c5a1]">01 / Configurar</span>
                <h2 id="generator-title" className="mt-2 font-display text-3xl tracking-[-0.04em]">Gerador de celular</h2>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#f06a4d] text-white"><Phone size={21} /></span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="relative block rounded-2xl bg-[#fffaf1] px-5 pb-3 pt-7 text-[#143d36] ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]">
                <span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[#7b9085]">Estado</span>
                <select value={selectedUf} onChange={event => setSelectedUf(event.target.value)} disabled={statesQuery.isLoading || !hasStateOptions} className="w-full appearance-none bg-transparent text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-50" aria-label="Selecionar estado">
                  {statesQuery.isLoading && <option value={selectedUf}>Carregando estados…</option>}
                  {!statesQuery.isLoading && !hasStateOptions && <option value={selectedUf}>Estados indisponíveis</option>}
                  {(statesQuery.data ?? []).map(item => <option key={item.uf} value={item.uf}>{item.name} · {item.uf}</option>)}
                </select>
                <ChevronDown size={17} className="pointer-events-none absolute right-4 top-7 text-[#f06a4d]" />
              </label>
              <label className="relative block rounded-2xl bg-[#fffaf1] px-5 pb-3 pt-7 text-[#143d36] ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]">
                <span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[#7b9085]">Código DDD</span>
                <select value={selectedDdd} onChange={event => setSelectedDdd(event.target.value)} disabled={isLoadingTerritory || !hasDddOptions} className="w-full appearance-none bg-transparent text-sm font-semibold outline-none disabled:cursor-not-allowed disabled:opacity-50" aria-label="Selecionar DDD">
                  {isLoadingTerritory && <option value={selectedDdd}>Carregando DDDs…</option>}
                  {!isLoadingTerritory && !hasDddOptions && <option value={selectedDdd}>DDDs indisponíveis</option>}
                  {dddOptions.map(item => <option key={item.code} value={item.code}>DDD {item.code} · {item.cityCount} cidades</option>)}
                </select>
                <ChevronDown size={17} className="pointer-events-none absolute right-4 top-7 text-[#f06a4d]" />
              </label>
            </div>

            {hasTerritoryError && <p role="alert" className="mt-4 rounded-xl border border-[#f5c5a1]/50 bg-[#f06a4d]/15 px-4 py-3 text-xs leading-5 text-[#ffe7d6]">Não foi possível carregar os DDDs oficiais agora. O exemplo abaixo continua disponível apenas como formatação simulada.</p>}
            {!hasTerritoryError && !isLoadingTerritory && !hasDddOptions && <p role="status" className="mt-4 rounded-xl border border-[#f5c5a1]/50 bg-[#f5ead7]/10 px-4 py-3 text-xs leading-5 text-[#ffe7d6]">Não há DDDs disponíveis para este estado. Selecione outro estado para continuar.</p>}

            <label className="relative mt-4 block rounded-2xl bg-[#fffaf1] px-5 pb-3 pt-7 text-[#143d36] ring-1 ring-inset ring-[#ded2be] focus-within:ring-2 focus-within:ring-[#f06a4d]">
              <span className="absolute left-5 top-3 text-[9px] font-bold uppercase tracking-[0.17em] text-[#7b9085]">Parte móvel simulada</span>
              <input value={subscriber} onChange={event => setSubscriber(sanitizeMobileSubscriber(event.target.value))} inputMode="numeric" maxLength={9} aria-label="Parte móvel simulada" className="w-full bg-transparent font-mono text-lg font-bold tracking-[0.15em] outline-none placeholder:text-[#9aaba2]" />
            </label>

            <div className="mt-6 rounded-[1.5rem] border border-[#38665d] bg-[#0e302b] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9bb7ab]">Número simulado</span><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f5c5a1]"><MapPin size={14} /> {state?.name ?? (isLoadingTerritory ? "Carregando estado" : "Formato demonstrativo")}</span></div>
              <output aria-live="polite" className="mt-3 block font-mono text-[clamp(1.8rem,5vw,3.2rem)] font-bold tracking-[-0.05em] text-[#fffaf1]">{simulatedNumber}</output>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={generate} className="pressable inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#f06a4d] px-4 text-sm font-bold text-white hover:bg-[#dd593e]"><Dices size={18} /> Gerar novo exemplo</button>
                <button type="button" onClick={copyNumber} className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#65877e] px-4 text-sm font-bold text-[#faf3e5] hover:border-[#f5c5a1] hover:text-[#f5c5a1]"><Copy size={17} /> Copiar</button>
              </div>
            </div>

            <aside role="note" aria-label="Aviso sobre a simulação" className="mt-5 flex gap-3 rounded-xl border border-[#f5c5a1]/35 bg-[#f5ead7]/10 px-4 py-3 text-xs leading-5 text-[#d9eee7]">
              <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#f5c5a1]" />
              <p><strong className="text-[#fffaf1]">Uso exclusivamente simulatório.</strong> {GENERATOR_SIMULATION_NOTICE}</p>
            </aside>
          </section>
        </section>

        <section className="border-y border-[#d9d1bf] bg-[#f5ead7] py-12">
          <div className="container grid gap-8 md:grid-cols-3">
            <div><span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Formato</span><h2 className="mt-2 font-display text-3xl tracking-[-0.04em]">DDD + nove dígitos</h2></div>
            <p className="text-sm leading-6 text-[#5d756c]">Os números móveis brasileiros usam nove dígitos na parte local, iniciando em 9. O DDD é selecionado apenas entre códigos usados no estado escolhido.</p>
            <Link href="/" className="pressable inline-flex w-fit items-center self-center rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]">Consultar cidades e DDDs reais</Link>
          </div>
        </section>

        <section className="container py-16 lg:py-20" aria-labelledby="generator-guide-title">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Guia da ferramenta</span>
              <h2 id="generator-guide-title" className="mt-3 max-w-md font-display text-4xl tracking-[-0.05em] text-[#143d36] sm:text-5xl">Como funciona o gerador de número de telefone?</h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#5d756c]">Este simulador combina um DDD oficial do estado selecionado com uma sequência móvel de nove dígitos. O resultado serve para representar um formato brasileiro em ambientes de teste, maquetas, exemplos de interface e documentação técnica.</p>
            </div>

            <div className="grid gap-5">
              <article className="rounded-[1.5rem] border border-[#ded2be] bg-[#fffaf1] p-6 shadow-[0_12px_35px_rgba(20,61,54,0.06)]">
                <h3 className="font-display text-2xl tracking-[-0.04em] text-[#143d36]">O que o simulador faz</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d756c]">Ao escolher um estado, a ferramenta apresenta os DDDs associados àquele território. Depois, gera uma parte local iniciada em 9 e formata o exemplo como número móvel. Isto ajuda quem está a testar campos de formulário, fluxos de produto ou materiais demonstrativos a usar uma estrutura de número coerente.</p>
              </article>
              <article className="rounded-[1.5rem] border border-[#ded2be] bg-[#fffaf1] p-6 shadow-[0_12px_35px_rgba(20,61,54,0.06)]">
                <h3 className="font-display text-2xl tracking-[-0.04em] text-[#143d36]">O que o simulador não faz</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d756c]">O resultado não consulta operadoras, não identifica titulares e não confirma se há uma linha ativa. Por isso, não deve ser usado para assumir que um contacto existe, para efetuar cadastros, enviar mensagens, fazer chamadas ou contactar terceiros. Para uma demonstração segura, trate sempre o resultado como dado fictício.</p>
              </article>
            </div>
          </div>

          <div className="mt-14 grid gap-7 border-t border-[#d9d1bf] pt-12 lg:grid-cols-[1fr_0.9fr]">
            <article>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">DDD e território</span>
              <h3 className="mt-3 font-display text-3xl tracking-[-0.04em] text-[#143d36]">Escolha o código antes de criar o exemplo</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d756c]">O DDD identifica a área de numeração associada à ligação. Escolher primeiro o estado e o DDD torna o exemplo mais consistente com o contexto que está a ser representado. Se a sua dúvida é territorial, consulte a página do código ou do estado: ela explica a cobertura, os municípios e as informações de discagem sem confundir um exemplo simulado com um número de contacto.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/ddd/63" className="pressable rounded-full border border-[#b8c8be] px-4 py-2 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">DDD 63 — Tocantins</Link>
                <Link href="/ddd/96" className="pressable rounded-full border border-[#b8c8be] px-4 py-2 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">DDD 96 — Amapá</Link>
                <Link href="/estado/to" className="pressable rounded-full border border-[#b8c8be] px-4 py-2 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">DDDs do Tocantins</Link>
                <Link href="/estado/al" className="pressable rounded-full border border-[#b8c8be] px-4 py-2 text-sm font-bold text-[#143d36] hover:border-[#f06a4d] hover:text-[#d94e34]">DDDs de Alagoas</Link>
              </div>
            </article>

            <aside className="rounded-[1.5rem] bg-[#143d36] p-7 text-[#faf3e5]">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]">Uso responsável</span>
              <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">Para testes, não para contactos.</h3>
              <p className="mt-4 text-sm leading-7 text-[#d9eee7]">Use exemplos simulados quando precisar preencher protótipos, criar casos de teste, preparar uma demonstração ou documentar uma integração. Não use um número produzido aqui para se passar por outra pessoa, tentar receber códigos de confirmação ou comunicar com destinatários desconhecidos.</p>
              <a href="https://www.gov.br/anatel/pt-br/regulado/numeracao" target="_blank" rel="noreferrer" className="pressable mt-6 inline-flex text-sm font-bold text-[#f5c5a1] underline decoration-[#f5c5a1]/40 underline-offset-4 hover:text-white">Consultar orientações de numeração da Anatel</a>
            </aside>
          </div>

          <section className="mt-14 border-t border-[#d9d1bf] pt-12" aria-labelledby="generator-faq-title">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">Perguntas frequentes</span>
            <h2 id="generator-faq-title" className="mt-3 font-display text-4xl tracking-[-0.05em] text-[#143d36]">Dúvidas sobre números simulados e DDD</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-[#ded2be] bg-[#fffaf1] p-6"><h3 className="font-display text-xl tracking-[-0.03em] text-[#143d36]">O número gerado é real ou está disponível?</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">Não. A ferramenta constrói apenas um exemplo de formato e não verifica se existe uma linha, se está ativa ou se pertence a alguém.</p></article>
              <article className="rounded-2xl border border-[#ded2be] bg-[#fffaf1] p-6"><h3 className="font-display text-xl tracking-[-0.03em] text-[#143d36]">Posso usar o número em WhatsApp ou num cadastro?</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">Não é recomendado. Um exemplo simulado não deve ser usado para contacto, mensagens, validação por SMS, recuperação de conta ou qualquer cadastro externo.</p></article>
              <article className="rounded-2xl border border-[#ded2be] bg-[#fffaf1] p-6"><h3 className="font-display text-xl tracking-[-0.03em] text-[#143d36]">Por que escolher o estado e o DDD?</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">O DDD dá contexto territorial ao exemplo. A seleção usa a base de DDDs do Meu DDD para apresentar os códigos associados ao estado escolhido.</p></article>
              <article className="rounded-2xl border border-[#ded2be] bg-[#fffaf1] p-6"><h3 className="font-display text-xl tracking-[-0.03em] text-[#143d36]">Onde encontro um DDD de verdade?</h3><p className="mt-3 text-sm leading-6 text-[#5d756c]">Pesquise uma cidade, estado ou código no Meu DDD. As páginas territoriais mostram a cobertura do DDD e ajudam a identificar a área correta.</p></article>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
