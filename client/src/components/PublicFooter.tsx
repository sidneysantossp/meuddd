import { ArrowUpRight, AtSign, Linkedin, MapPin, MessageCircle, Newspaper, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const productLinks = [
  { href: "/#buscar", label: "Buscar DDD" },
  { href: "/#mapa", label: "Mapa interativo" },
  { href: "/gerador", label: "Gerador de número" },
  { href: "/guias", label: "Blog" },
  { href: "/imprensa", label: "Imprensa" },
] as const;

const institutionalLinks = [
  { href: "/sobre", label: "Sobre a plataforma" },
  { href: "/contato", label: "Contato" },
  { href: "/contato#correcoes", label: "Sugerir atualização" },
] as const;

const legalLinks = [
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
  { href: "/lgpd", label: "LGPD" },
] as const;

const socialLinks = [
  { href: "https://wa.me/?text=Conhe%C3%A7a%20o%20Meu%20DDD%3A%20https%3A%2F%2Fwww.meuddd.com.br%2F", label: "Partilhar no WhatsApp", icon: MessageCircle },
  { href: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.meuddd.com.br%2F", label: "Partilhar no LinkedIn", icon: Linkedin },
  { href: "https://x.com/intent/post?text=Consulte%20DDDs%20de%20todo%20o%20Brasil%20no%20Meu%20DDD&url=https%3A%2F%2Fwww.meuddd.com.br%2F", label: "Partilhar no X", icon: AtSign },
] as const;

function FooterLinkList({ title, links }: { title: string; links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#cfdcd4]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-[#d9e4dc] transition-colors hover:text-[#f06a4d]">{link.label}</Link></li>)}
      </ul>
    </div>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-[#27594f] bg-[#143d36] text-[#faf3e5]" aria-label="Rodapé do Meu DDD">
      <div className="container py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Meu DDD, ir para a página inicial">
              <span className="grid size-11 place-items-center rounded-[14px] bg-[#f06a4d] text-[#fffaf1] shadow-[0_7px_18px_rgba(0,0,0,0.16)]"><MapPin size={24} strokeWidth={2.25} aria-hidden="true" /></span>
              <span className="leading-none"><span className="block font-display text-[1.35rem] font-semibold tracking-[-0.05em]">Meu DDD</span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#cfdcd4]">Brasil conectado</span></span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#d9e4dc]">Uma plataforma pública para encontrar DDDs por cidade, estado e código, com dados territoriais, guias práticos e links diretos para consulta.</p>
            <Link href="/#buscar" className="pressable mt-6 inline-flex items-center gap-2 rounded-full bg-[#faf3e5] px-4 py-2.5 text-sm font-bold text-[#143d36] hover:bg-[#f06a4d] hover:text-[#fffaf1]">Consultar DDD <ArrowUpRight size={15} /></Link>
          </section>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <FooterLinkList title="Explorar" links={productLinks} />
            <FooterLinkList title="Plataforma" links={institutionalLinks} />
            <FooterLinkList title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-[#427166] pt-7 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#d9e4dc]">
            <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#f6b96c]" aria-hidden="true" />Dados e conteúdo apresentados de forma informativa.</span>
            <Link href="/contato" className="inline-flex items-center gap-2 transition-colors hover:text-[#f06a4d]"><Newspaper size={16} aria-hidden="true" />Contato e imprensa</Link>
          </div>
          <div className="flex items-center gap-2" aria-label="Partilhar o Meu DDD nas redes sociais">
            {socialLinks.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="pressable grid size-9 place-items-center rounded-full border border-[#427166] text-[#faf3e5] transition-colors hover:border-[#f06a4d] hover:bg-[#f06a4d]"><Icon size={17} aria-hidden="true" /></a>)}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[#27594f] pt-6 text-xs text-[#a9c2b8] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Meu DDD. Consulta territorial e informação sobre telefonia no Brasil.</p>
          <p>Feito para consultas rápidas, partilha responsável e informação acessível.</p>
        </div>
      </div>
    </footer>
  );
}
