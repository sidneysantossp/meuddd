/* Atlas Vivo: estado de erro tratado como uma página de atlas — marfim, floresta, coral e uma rota clara de retorno à busca. */
import { ArrowUpRight, Compass, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <div className="container flex min-h-screen flex-col justify-between py-8 sm:py-10">
        <a href="/" className="inline-flex w-fit items-center gap-3" aria-label="DDD Brasil, voltar ao início">
          <span className="grid size-11 place-items-center rounded-[14px] bg-[#f06a4d] shadow-[0_7px_18px_rgba(240,106,77,0.22)]"><img src="/manus-storage/ddd-brasil-mark_5ec0d09e.png" alt="" className="size-8 object-contain" /></span>
          <span><strong className="font-display block text-[1.35rem] leading-none tracking-[-0.05em]">DDD Brasil</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#678176]">Atlas de conexões</small></span>
        </a>
        <section className="relative grid items-center gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative z-10 max-w-lg">
            <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f06a4d]"><span className="size-2 rounded-full bg-[#f06a4d]" /> Folha não encontrada</div>
            <h1 className="font-display text-[clamp(4.8rem,11vw,9rem)] leading-[0.78] tracking-[-0.08em]">404</h1>
            <h2 className="mt-8 max-w-md font-display text-4xl leading-none tracking-[-0.06em] sm:text-5xl">Esse caminho saiu do mapa.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[#5d756c]">A página que você procurou não está neste atlas. Volte para a busca e encontre uma nova rota.</p>
            <a href="/#buscar" className="pressable mt-8 inline-flex items-center gap-2 rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5] shadow-[0_12px_24px_rgba(20,61,54,0.18)] hover:bg-[#1b5047]">Voltar para a busca <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-grid atlas-grid-lines relative min-h-[330px] overflow-hidden rounded-[2rem] bg-[#143d36] p-7 shadow-[0_30px_70px_rgba(20,61,54,0.18)] sm:min-h-[430px]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(240,106,77,0.5),transparent_3px),radial-gradient(circle_at_76%_68%,rgba(108,168,160,0.28),transparent_2px)] bg-[length:96px_96px,122px_122px] opacity-80" /><div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#143d36]/80" /><div className="relative z-10 flex h-full flex-col justify-between text-[#faf3e5]"><div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#f5c5a1]"><span className="inline-flex items-center gap-2"><Compass size={14} /> coordenada perdida</span><span>— 00°</span></div><div className="self-center text-center"><span className="mx-auto mb-4 grid size-16 place-items-center rounded-full border border-[#f8f0df]/40 bg-[#f06a4d] text-white shadow-[0_0_0_10px_rgba(240,106,77,0.12)]"><MapPin size={26} /></span><p className="font-display text-2xl italic">recalcular rota</p></div><div className="flex items-end justify-between border-t border-[#f8f0df]/20 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b8cec4]"><span>DDD Brasil</span><span>não encontrado</span></div></div></div>
        </section>
        <p className="text-xs text-[#8a9a91]">Feito para conectar o Brasil, mesmo quando uma rota desaparece.</p>
      </div>
    </main>
  );
}
