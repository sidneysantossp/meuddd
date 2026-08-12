import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Link } from "wouter";

export const PUBLIC_NAV_ITEMS = [
  { href: "/#buscar", label: "Buscar DDD" },
  { href: "/#mapa", label: "Mapa interativo" },
  { href: "/guias", label: "Guias" },
  { href: "/gerador", label: "Gerar número" },
] as const;

type PublicNavbarProps = {
  endSlot?: ReactNode;
};

export function PublicNavbar({ endSlot }: PublicNavbarProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <header className="relative z-30 border-b border-[#d9d1bf]/70 bg-[#faf3e5]/90 backdrop-blur-md">
      <div className="container flex min-h-[78px] items-center justify-between gap-3 lg:gap-6">
        <Link href="/" className="group inline-flex shrink-0 items-center gap-3" aria-label="Meu DDD, ir para a página inicial" onClick={closeMobileNav}>
          <span className="grid size-11 place-items-center rounded-[14px] bg-[#f06a4d] text-[#fffaf1] shadow-[0_7px_18px_rgba(240,106,77,0.22)] transition-transform duration-300 group-hover:rotate-6">
            <MapPin size={25} strokeWidth={2.25} aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.35rem] font-semibold tracking-[-0.05em] text-[#143d36]">Meu DDD</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.24em] text-[#678176]">Brasil conectado</span>
          </span>
        </Link>

        <nav id="public-mobile-navigation" aria-label="Navegação principal" className={`${mobileNavOpen ? "flex" : "hidden"} absolute left-4 right-4 top-[86px] flex-col gap-1 rounded-2xl border border-[#d9d1bf] bg-[#faf3e5] p-3 shadow-xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-7`}>
          {PUBLIC_NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href} onClick={closeMobileNav} className="rounded-lg px-3 py-2 text-sm font-semibold text-[#5d756c] transition-colors hover:text-[#143d36]">
              {item.label}
            </Link>
          ))}
          {endSlot ? <div className="mt-2 border-t border-[#d9d1bf]/70 pt-2 lg:hidden">{endSlot}</div> : null}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {endSlot ? <div className="hidden lg:block">{endSlot}</div> : null}
          <Link href="/#buscar" className={`pressable hidden items-center gap-2 rounded-full bg-[#143d36] px-4 py-2.5 text-sm font-bold text-[#faf3e5] ${endSlot ? "xl:inline-flex" : "sm:inline-flex"}`} onClick={closeMobileNav}>
            Consultar agora <ArrowUpRight size={15} />
          </Link>
          <button type="button" className="pressable grid size-10 place-items-center rounded-full border border-[#d9d1bf] text-[#143d36] lg:hidden" aria-label={mobileNavOpen ? "Fechar menu" : "Abrir menu"} aria-controls="public-mobile-navigation" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(value => !value)}>
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
