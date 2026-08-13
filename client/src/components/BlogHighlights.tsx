import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "wouter";

export const featuredArticles = [
  {
    href: "/guia/o-que-e-ddd",
    eyebrow: "Telefonia / guia essencial",
    title: "O que é DDD? Entenda os códigos de área do Brasil",
    publishedAt: "12 de agosto de 2026",
    image: "/assets/blog-ddd-mapa-brasil.jpg",
    alt: "Ilustração editorial de mapa do Brasil, teclado de telefone e marcador de localização.",
  },
  {
    href: "/guia/como-descobrir-ddd-de-uma-cidade",
    eyebrow: "Consulta / cidades",
    title: "Como descobrir o DDD de uma cidade brasileira",
    publishedAt: "12 de agosto de 2026",
    image: "/assets/blog-consultar-ddd-cidade.jpg",
    alt: "Ilustração editorial de uma malha urbana, mapa dobrado e marcador de localização.",
  },
  {
    href: "/guia/como-ligar-para-outro-estado",
    eyebrow: "Chamadas / interurbanas",
    title: "Como ligar para outro estado: DDD e número de destino",
    publishedAt: "12 de agosto de 2026",
    image: "/assets/blog-ligacao-entre-estados.jpg",
    alt: "Ilustração editorial de regiões conectadas por uma ligação telefónica.",
  },
] as const;

export function BlogHighlights() {
  return (
    <section className="border-t border-[#ded5c4] bg-[#fffaf1] py-16 sm:py-20" aria-labelledby="blog-highlights-title">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8533a]">Conteúdo para consulta</p>
          <h2 id="blog-highlights-title" className="mt-4 font-display text-4xl tracking-[-0.045em] text-[#143d36] sm:text-5xl">Blog</h2>
          <p className="mt-4 text-base leading-7 text-[#5d756c] sm:text-lg">Explicações diretas para encontrar DDDs, entender chamadas e navegar com mais segurança pelas informações de telefonia.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredArticles.map(article => (
            <article key={article.href} className="group overflow-hidden rounded-3xl border border-[#ded5c4] bg-[#faf3e5] shadow-[0_14px_36px_rgba(20,61,54,0.07)]">
              <Link href={article.href} className="block overflow-hidden" aria-label={`Abrir artigo: ${article.title}`}>
                <img src={article.image} alt={article.alt} className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" loading="lazy" />
              </Link>
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e8533a]">{article.eyebrow}</p>
                <h3 className="mt-3 font-display text-2xl leading-[1.02] tracking-[-0.035em] text-[#143d36]">{article.title}</h3>
                <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#678176]"><CalendarDays size={14} aria-hidden="true" /><time dateTime="2026-08-12">Publicado em {article.publishedAt}</time></p>
                <Link href={article.href} className="pressable mt-6 inline-flex items-center gap-2 rounded-full bg-[#e8533a] px-4 py-2.5 text-sm font-bold text-[#fffaf1] transition-colors hover:bg-[#c9432d]">Ler mais <ArrowUpRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/guias" className="pressable inline-flex items-center gap-2 rounded-full border border-[#143d36] px-5 py-3 text-sm font-bold text-[#143d36] transition-colors hover:bg-[#143d36] hover:text-[#faf3e5]">Ver mais conteúdo <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
