import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  ExternalLink,
  MapPin,
  PhoneCall,
  Search,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import {
  editorialSources,
  findEditorialGuide,
  getRelatedEditorialGuides,
} from "@shared/editorialGuides";
import { PublicNavbar } from "@/components/PublicNavbar";
import NotFound from "./NotFound";

export default function DddGuidePage() {
  const [, params] = useRoute("/guia/:slug");
  const guide = findEditorialGuide(params?.slug);
  if (!guide) return <NotFound />;

  const related = getRelatedEditorialGuides(guide.slug);

  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar />

      <article className="container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">
              {guide.eyebrow}
            </div>
            <h1 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
              {guide.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#5d756c]">
              {guide.description}
            </p>
            <Link
              href="/#buscar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]"
            >
              Pesquisar um DDD <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] lg:col-span-2">
            <img
              src={guide.image}
              alt={guide.imageAlt}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
              width={1280}
              height={720}
              loading="eager"
            />
            <div className="relative bg-[#143d36] p-7 text-[#faf3e5] sm:p-10">
              <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#f5c5a1_1px,transparent_1px)] [background-size:18px_18px]" />
              <div className="relative">
                <div className="grid size-12 place-items-center rounded-full bg-[#f06a4d]">
                  <PhoneCall size={22} />
                </div>
                <p className="mt-6 font-display text-2xl leading-tight sm:text-3xl">
                  {guide.summary}
                </p>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#c8dbd2]">
                  Cada guia combina explicação prática, referências oficiais e
                  atalhos para o atlas territorial de DDDs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-10 border-y border-[#ded4c3] py-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
              Em contexto
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
              O essencial antes de discar
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#5d756c]">
              {guide.intro}
            </p>
          </div>
          <ol className="grid gap-3">
            {guide.sections.map((section, index) => (
              <li
                key={section.title}
                className="rounded-2xl border border-[#ded4c3] bg-[#fffaf1] p-5"
              >
                <span className="font-display text-3xl text-[#f06a4d]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-bold">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5d756c]">
                  {section.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 py-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
              Perguntas frequentes
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
              Dúvidas sobre o tema
            </h2>
          </div>
          <div className="grid gap-3">
            {guide.faqs.map(faq => (
              <details
                key={faq.question}
                className="rounded-xl border border-[#ded4c3] bg-[#fffaf1] px-5 py-4"
              >
                <summary className="cursor-pointer text-sm font-bold">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[#5d756c]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="grid gap-5 border-t border-[#ded4c3] py-14 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c8177]">
              <BookOpenText size={14} className="text-[#f06a4d]" /> Fontes e
              atualização
            </div>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
              Referências oficiais
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#5d756c]">
              As referências regulatórias ajudam a separar regras de numeração
              de orientações que podem mudar por plano, serviço ou prestadora.
            </p>
          </div>
          <div className="grid gap-3">
            {guide.sources.map(sourceId => {
              const source = editorialSources[sourceId];
              return (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-[#ded4c3] bg-[#fffaf1] p-5 text-sm font-bold transition-colors hover:border-[#f06a4d]"
                >
                  <span>{source.name}</span>
                  <ExternalLink size={16} className="shrink-0 text-[#f06a4d]" />
                </a>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-[#e9deca] p-7 sm:p-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c8177]">
                <MapPin size={14} className="text-[#f06a4d]" /> Atlas
                territorial
              </div>
              <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
                Confirme o DDD no território certo
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#5d756c]">
                Abra uma cidade, um estado ou a cobertura de um código para
                validar a área de numeração e partilhar o resultado direto.
              </p>
            </div>
            <Link
              href="/#explorar"
              className="inline-flex items-center gap-2 self-center rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]"
            >
              Abrir atlas <Search size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 border-t border-[#cfc3b0] pt-6 sm:grid-cols-3">
            {guide.territoryLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl bg-[#faf3e5] p-4 text-sm font-bold hover:text-[#f06a4d]"
              >
                {link.label}
                <ArrowUpRight className="mt-4" size={16} />
              </Link>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="py-16">
            <div className="mb-7 flex items-end justify-between gap-5">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f06a4d]">
                  Continue a leitura
                </div>
                <h2 className="mt-3 font-display text-4xl tracking-[-0.05em]">
                  Guias relacionados
                </h2>
              </div>
              <Link
                href="/guias"
                className="hidden text-sm font-bold text-[#f06a4d] sm:inline-flex sm:items-center sm:gap-2"
              >
                Ver todos <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map(item => (
                <Link
                  key={item.slug}
                  href={`/guia/${item.slug}`}
                  className="group rounded-2xl border border-[#ded4c3] bg-[#fffaf1] p-6 transition-colors hover:border-[#f06a4d]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#718378]">
                    {item.eyebrow}
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.04em] group-hover:text-[#f06a4d]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d756c]">
                    {item.description}
                  </p>
                  <ArrowUpRight className="mt-5 text-[#f06a4d]" size={18} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
