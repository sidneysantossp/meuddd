import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { TerritorialFaq } from "@shared/territorialFaq";

// Secção de perguntas frequentes em acordeão: comportamento collapible suave e
// acessível (aria-expanded, foco por teclado) que mantém o conteúdo visível no
// SSR para o Google (mesmo que o details original), respeitando o rich result
// FAQPage. A animação só corre no cliente, atrás de prefers-reduced-motion.
const faqThemes = {
  light: {
    section: "border-t border-[#ded4c3] bg-[#fffaf1]",
    eyebrow: "text-[#f06a4d]",
    questionText: "text-[#143d36]",
    answerText: "text-[#5d756c]",
    card: "border border-[#ded4c3] bg-[#faf3e5]",
    chevron: "text-[#f06a4d]",
  },
  dark: {
    section: "bg-[#143d36] text-[#faf3e5]",
    eyebrow: "text-[#f5c5a1]",
    questionText: "text-[#faf3e5]",
    answerText: "text-[#c8dbd2]",
    card: "border border-[#476b61] bg-[#1c4b43]",
    chevron: "text-[#f5c5a1]",
  },
};

export function FaqSection({
  heading = "Perguntas frequentes",
  subheading,
  faqs,
  id,
  theme = "light",
}: {
  heading?: string;
  subheading?: string;
  faqs: TerritorialFaq[];
  id?: string;
  theme?: "light" | "dark";
}) {
  const palette = faqThemes[theme];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(current => (current === index ? null : index));

  return (
    <section className={palette.section} id={id}>
      <div className="container grid gap-8 py-14 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${palette.eyebrow}`}>{heading}</div>
          {subheading ? <p className="mt-4 text-sm leading-6 opacity-80">{subheading}</p> : null}
        </div>
        <div className="grid gap-3" role="presentation">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`rounded-xl ${palette.card}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-bold ${palette.questionText}`}
                  onClick={() => toggle(index)}
                >
                  <span className="w-11/12">{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 ${palette.chevron} transition-transform duration-200`}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className={`px-5 pb-4 text-sm leading-6 ${palette.answerText}`}>{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
