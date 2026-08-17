import { CircleCheck } from "lucide-react";

type TerritoryQuickAnswerProps = {
  answer: string;
  context?: string;
  question: string;
};

export function TerritoryQuickAnswer({
  answer,
  context,
  question,
}: TerritoryQuickAnswerProps) {
  return (
    <section
      className="container py-5 lg:py-7"
      aria-labelledby="resposta-rapida-territorial"
    >
      <div className="rounded-2xl border border-[#c9d8cf] bg-[#edf5f0] p-5 text-[#143d36] sm:p-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d65139]">
          <CircleCheck size={15} /> Resposta rápida
        </div>
        <h2
          id="resposta-rapida-territorial"
          className="mt-3 font-display text-2xl leading-tight tracking-[-0.03em] sm:text-3xl"
        >
          {question}
        </h2>
        <p className="mt-3 max-w-4xl text-base font-semibold leading-7 text-[#143d36]">
          {answer}
        </p>
        {context ? (
          <p className="mt-2 max-w-4xl text-sm leading-6 text-[#5d756c]">
            {context}
          </p>
        ) : null}
      </div>
    </section>
  );
}
