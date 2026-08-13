import { useState, type FormEvent } from "react";
import { ArrowUpRight, Download, FileText, Mail, Newspaper, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PublicNavbar } from "@/components/PublicNavbar";

const pageContent = {
  "/sobre": { eyebrow: "A plataforma", title: "Sobre o Meu DDD", intro: "O Meu DDD organiza a consulta de códigos de área brasileiros em páginas diretas por DDD, estado e município.", sections: [["Consulta territorial", "A plataforma reúne referências para encontrar a área de numeração associada a uma localidade e navegar entre cidades, estados e códigos."], ["Conteúdo explicativo", "O Blog ajuda a compreender chamadas, numeração e dúvidas recorrentes de forma simples e objetiva."]] },
  "/contato": { eyebrow: "Contato", title: "Fale sobre o Meu DDD", intro: "Envie uma mensagem sobre a plataforma, páginas locais ou oportunidades editoriais. Para correções numa cidade específica, inclua o endereço da página que precisa de revisão.", sections: [["Correções locais", "Ao encontrar uma informação desatualizada numa página de cidade, use o botão Sugerir alteração local. A indicação pode ser analisada antes de qualquer atualização."], ["Assuntos institucionais e imprensa", "A área de imprensa apresenta o enquadramento da plataforma e disponibiliza materiais de marca para citações editoriais."]] },
  "/politica-de-privacidade": { eyebrow: "Privacidade", title: "Política de privacidade", intro: "Esta página apresenta, de forma resumida, como o Meu DDD trata a navegação e os dados necessários para manter o serviço disponível.", sections: [["Dados de navegação", "A plataforma pode registar dados técnicos e estatísticos de uso para compreender pesquisas sem resultado, melhorar a experiência e manter a segurança do serviço."], ["Finalidade", "Informações enviadas em sugestões são utilizadas para analisar a atualização de conteúdos locais. Não utilize esse canal para enviar dados pessoais sensíveis."]] },
  "/termos-de-uso": { eyebrow: "Uso responsável", title: "Termos de uso", intro: "O Meu DDD disponibiliza informações de consulta e conteúdo editorial para finalidade informativa.", sections: [["Uso do conteúdo", "Os dados devem ser confirmados junto de fontes oficiais sempre que a decisão depender de informação atualizada ou de um serviço público específico."], ["Disponibilidade", "A plataforma procura manter as páginas acessíveis e corretas, mas códigos, localidades e serviços podem ser atualizados por entidades competentes."]] },
  "/lgpd": { eyebrow: "Proteção de dados", title: "LGPD e transparência", intro: "A proteção de dados pessoais orienta a forma como o Meu DDD reduz a recolha de informação e comunica as finalidades do tratamento.", sections: [["Minimização", "A plataforma procura tratar apenas as informações necessárias para a navegação, funcionamento técnico e análise de sugestões de conteúdo."], ["Direitos do titular", "Pedidos relacionados a dados pessoais devem identificar claramente o contexto da interação, para que possam ser encaminhados e analisados de forma adequada."]] },
  "/imprensa": { eyebrow: "Imprensa", title: "Informações para imprensa", intro: "O Meu DDD é uma plataforma de consulta de códigos de área brasileiros, com páginas por DDD, estado e município.", sections: [["O que a plataforma oferece", "Consulta territorial, páginas programáticas de referência, artigos sobre telefonia e ferramentas de simulação claramente identificadas."], ["Referência de marca", "Ao mencionar a plataforma, utilize o nome Meu DDD e o endereço canónico www.meuddd.com.br."]] },
} as const;

type ContactValues = { name: string; email: string; message: string };
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isPrepared, setIsPrepared] = useState(false);

  const validate = () => {
    const nextErrors: ContactErrors = {};
    if (values.name.trim().length < 2) nextErrors.name = "Informe o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Informe um email válido.";
    if (values.message.trim().length < 10) nextErrors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setIsPrepared(Object.keys(nextErrors).length === 0);
  };

  return (
    <section id="correcoes" className="mt-12 rounded-3xl border border-[#ded5c4] bg-[#fffaf1] p-6 shadow-[0_14px_36px_rgba(20,61,54,0.06)] sm:p-8" aria-labelledby="contact-form-title">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8533a]">Mensagem direta</p>
      <h2 id="contact-form-title" className="mt-3 font-display text-3xl tracking-[-0.04em]">Como podemos ajudar?</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5d756c]">Preencha os campos abaixo. A validação ajuda a confirmar que a mensagem está pronta para encaminhamento por email.</p>
      <form className="mt-7 grid gap-5" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-[#143d36]">Nome<input value={values.name} onChange={event => { setValues(current => ({ ...current, name: event.target.value })); setIsPrepared(false); }} className="rounded-xl border border-[#d9d1bf] bg-[#faf3e5] px-4 py-3 font-normal outline-none transition focus:border-[#e8533a] focus:ring-2 focus:ring-[#e8533a]/20" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} /></label>
          <label className="grid gap-2 text-sm font-bold text-[#143d36]">Email<input type="email" value={values.email} onChange={event => { setValues(current => ({ ...current, email: event.target.value })); setIsPrepared(false); }} className="rounded-xl border border-[#d9d1bf] bg-[#faf3e5] px-4 py-3 font-normal outline-none transition focus:border-[#e8533a] focus:ring-2 focus:ring-[#e8533a]/20" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} /></label>
        </div>
        {errors.name ? <p id="contact-name-error" className="-mt-3 text-sm text-[#c9432d]">{errors.name}</p> : null}
        {errors.email ? <p id="contact-email-error" className="-mt-3 text-sm text-[#c9432d]">{errors.email}</p> : null}
        <label className="grid gap-2 text-sm font-bold text-[#143d36]">Mensagem<textarea value={values.message} onChange={event => { setValues(current => ({ ...current, message: event.target.value })); setIsPrepared(false); }} rows={5} className="resize-y rounded-xl border border-[#d9d1bf] bg-[#faf3e5] px-4 py-3 font-normal outline-none transition focus:border-[#e8533a] focus:ring-2 focus:ring-[#e8533a]/20" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} /></label>
        {errors.message ? <p id="contact-message-error" className="-mt-3 text-sm text-[#c9432d]">{errors.message}</p> : null}
        <div className="flex flex-wrap items-center gap-4"><button type="submit" className="pressable rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5] hover:bg-[#27594f]">Validar mensagem</button>{isPrepared ? <p className="text-sm font-semibold text-[#27594f]" role="status">Mensagem validada. Para encaminhar, envie o conteúdo para o canal de contacto indicado pela sua organização.</p> : null}</div>
      </form>
    </section>
  );
}

function PressResources() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-3xl bg-[#143d36] p-7 text-[#faf3e5] shadow-[0_14px_36px_rgba(20,61,54,0.14)] sm:p-8" aria-labelledby="brand-kit-title">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f6b96c]">Recursos editoriais</p>
        <h2 id="brand-kit-title" className="mt-3 font-display text-3xl tracking-[-0.04em]">Kit de marca</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#d9e4dc]">O pacote contém a marca gráfica em SVG, uma paleta essencial, uma apresentação curta e orientações de atribuição editorial.</p>
        <a href="/manus-storage/meu-ddd-kit-de-marca-2026_ee73e833.zip" download className="pressable mt-6 inline-flex items-center gap-2 rounded-full bg-[#f06a4d] px-5 py-3 text-sm font-bold text-[#fffaf1] hover:bg-[#ff7a5f]">Baixar kit de marca <Download size={16} /></a>
      </section>
      <section className="rounded-3xl border border-[#ded5c4] bg-[#fffaf1] p-7 sm:p-8" aria-labelledby="platform-stats-title">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8533a]">Atualizado em agosto de 2026</p>
        <h2 id="platform-stats-title" className="mt-3 font-display text-3xl tracking-[-0.04em]">Em números</h2>
        <dl className="mt-6 grid grid-cols-3 gap-3">
          <div><dt className="font-display text-3xl text-[#143d36]">27</dt><dd className="mt-1 text-xs leading-5 text-[#5d756c]">UFs navegáveis</dd></div>
          <div><dt className="font-display text-3xl text-[#143d36]">67</dt><dd className="mt-1 text-xs leading-5 text-[#5d756c]">códigos DDD</dd></div>
          <div><dt className="font-display text-3xl text-[#143d36]">19</dt><dd className="mt-1 text-xs leading-5 text-[#5d756c]">artigos no Blog</dd></div>
        </dl>
        <p className="mt-6 text-sm leading-7 text-[#5d756c]">A plataforma organiza mais de 5,5 mil localidades brasileiras para consulta por cidade, estado e código.</p>
      </section>
    </div>
  );
}

export default function InstitutionalPage() {
  const [location] = useLocation();
  const page = pageContent[location as keyof typeof pageContent] ?? pageContent["/sobre"];
  const Icon = location === "/imprensa" ? Newspaper : location === "/contato" ? Mail : location === "/politica-de-privacidade" || location === "/lgpd" ? ShieldCheck : FileText;

  return (
    <main className="min-h-screen bg-[#faf3e5] text-[#143d36]"><PublicNavbar /><section className="container py-14 sm:py-20"><div className="max-w-3xl"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e8533a]"><Icon size={15} aria-hidden="true" />{page.eyebrow}</p><h1 className="mt-5 font-display text-5xl leading-[0.96] tracking-[-0.045em] sm:text-6xl">{page.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#5d756c]">{page.intro}</p></div><div className="mt-12 grid gap-5 md:grid-cols-2">{page.sections.map(([title, text]) => <article key={title} className="rounded-3xl border border-[#ded5c4] bg-[#fffaf1] p-6 shadow-[0_14px_36px_rgba(20,61,54,0.06)]"><h2 className="font-display text-2xl tracking-[-0.03em]">{title}</h2><p className="mt-3 text-sm leading-7 text-[#5d756c]">{text}</p></article>)}</div>{location === "/imprensa" ? <PressResources /> : null}{location === "/contato" ? <ContactForm /> : null}<div className="mt-10 flex flex-wrap gap-3"><Link href="/#buscar" className="pressable inline-flex items-center gap-2 rounded-full bg-[#143d36] px-5 py-3 text-sm font-bold text-[#faf3e5]">Consultar DDD <ArrowUpRight size={16} /></Link><Link href="/guias" className="pressable inline-flex items-center gap-2 rounded-full border border-[#d9d1bf] px-5 py-3 text-sm font-bold text-[#143d36]">Explorar Blog</Link></div></section></main>
  );
}
