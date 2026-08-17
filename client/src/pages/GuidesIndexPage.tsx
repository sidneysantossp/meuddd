import { ArrowLeft, ArrowUpRight, BookOpenText, Search } from "lucide-react";
import { Link } from "wouter";
import { editorialGuides } from "@shared/editorialGuides";
import { PublicNavbar } from "@/components/PublicNavbar";

export default function GuidesIndexPage() {
  return (
    <main className="page-shell min-h-screen bg-[#faf3e5] text-[#143d36]">
      <PublicNavbar />
      <section className="container py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f06a4d]">
              <BookOpenText size={15} /> Biblioteca editorial
            </div>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] tracking-[-0.07em] sm:text-7xl">
              Guias de
              <br />
              <em className="font-normal">telefonia.</em>
            </h1>
          </div>
          <p className="self-end max-w-xl text-base leading-7 text-[#5d756c]">
            Explicações práticas sobre códigos de área, chamadas, numeração,
            direitos do consumidor e consultas territoriais. Cada artigo indica
            as referências oficiais e aponta caminhos para o atlas de DDDs.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {editorialGuides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/guia/${guide.slug}`}
              className="group flex min-h-[230px] flex-col justify-between rounded-2xl border border-[#ded4c3] bg-[#fffaf1] p-6 transition-colors hover:border-[#f06a4d]"
            >
              <div>
                <span className="font-display text-3xl text-[#f06a4d]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.17em] text-[#718378]">
                  {guide.eyebrow}
                </div>
                <h2 className="mt-3 font-display text-2xl leading-tight tracking-[-0.04em] group-hover:text-[#f06a4d]">
                  {guide.title}
                </h2>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm font-bold">
                <span>Ler guia</span>
                <ArrowUpRight size={17} className="text-[#f06a4d]" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
