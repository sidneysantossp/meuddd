import { Check, Copy, Linkedin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ShareActionsProps = {
  path: string;
  title: string;
  compact?: boolean;
};

export function ShareActions({
  path,
  title,
  compact = false,
}: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copiado", {
        description: "A rota está pronta para partilhar.",
      });
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      toast.error("Não foi possível copiar o link agora.");
    }
  };
  const openShare = (service: "whatsapp" | "linkedin" | "x") => {
    const url = `${window.location.origin}${path}`;
    const message = `${title} — consulte no DDD Brasil`;
    const target =
      service === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`
        : service === "linkedin"
          ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          : `https://x.com/intent/post?text=${encodeURIComponent(`${message} ${url}`)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "" : "rounded-2xl border border-[#ded4c3] bg-[#fffaf1] p-3"}`}
      aria-label="Partilhar página"
    >
      {!compact && (
        <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7b9085]">
          Partilhar
        </span>
      )}
      <button
        type="button"
        onClick={copyLink}
        className={`pressable inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition-colors ${copied ? "bg-[#143d36] text-[#faf3e5]" : "bg-[#e9deca] text-[#143d36] hover:bg-[#f5c5a1]"}`}
        aria-label="Copiar link de partilha"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
        {copied ? "Copiado" : "Copiar link"}
      </button>
      <button
        type="button"
        onClick={() => openShare("whatsapp")}
        className="pressable grid size-8 place-items-center rounded-full border border-[#ded4c3] text-[#143d36] hover:border-[#25d366] hover:bg-[#e7f7e9]"
        aria-label="Partilhar no WhatsApp"
      >
        <MessageCircle size={15} />
      </button>
      <button
        type="button"
        onClick={() => openShare("linkedin")}
        className="pressable grid size-8 place-items-center rounded-full border border-[#ded4c3] text-[#143d36] hover:border-[#0a66c2] hover:bg-[#eaf3fb]"
        aria-label="Partilhar no LinkedIn"
      >
        <Linkedin size={15} />
      </button>
      <button
        type="button"
        onClick={() => openShare("x")}
        className="pressable grid size-8 place-items-center rounded-full border border-[#ded4c3] text-[#143d36] hover:border-[#143d36] hover:bg-[#e9deca]"
        aria-label="Partilhar no X"
      >
        <Send size={14} />
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copiado com sucesso" : ""}
      </span>
    </div>
  );
}
