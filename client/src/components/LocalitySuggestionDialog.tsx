import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Check, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SuggestionTopic = "mobility" | "useful_phone" | "other";

const topics: { value: SuggestionTopic; label: string }[] = [
  { value: "mobility", label: "Transporte público" },
  { value: "useful_phone", label: "Telefone útil ou serviço" },
  { value: "other", label: "Outra informação local" },
];

export function LocalitySuggestionDialog({
  municipalityIbgeCode,
  municipalityName,
}: {
  municipalityIbgeCode: number;
  municipalityName: string;
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<SuggestionTopic>("mobility");
  const [note, setNote] = useState("");
  const submit = trpc.local.suggestUpdate.useMutation({
    onSuccess: () => {
      setNote("");
      setOpen(false);
      toast.success("Sugestão recebida", {
        description:
          "A informação será verificada antes de qualquer atualização pública.",
      });
    },
    onError: () =>
      toast.error("Não foi possível enviar a sugestão", {
        description: "Tente novamente dentro de alguns instantes.",
      }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-auto border-[#143d36]/20 bg-transparent px-4 py-3 text-left text-xs font-bold text-[#143d36] hover:border-[#e8533a] hover:bg-[#fff5e9]"
        >
          <MessageSquarePlus className="mr-2 h-4 w-4 text-[#e8533a]" /> Sugerir
          alteração local
        </Button>
      </DialogTrigger>
      <DialogContent className="border-[#ded4c3] bg-[#fffaf1] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-[#143d36]">
            Atualizar {municipalityName}
          </DialogTitle>
          <DialogDescription className="leading-6 text-[#5d756c]">
            Informe uma possível alteração em transporte ou telefone útil. Não
            inclua nome, telefone, e-mail ou outro dado pessoal. Todas as
            sugestões passam por verificação editorial.
          </DialogDescription>
        </DialogHeader>
        <fieldset className="grid gap-2">
          <legend className="text-xs font-bold uppercase tracking-[0.12em] text-[#718378]">
            Tema
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {topics.map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => setTopic(item.value)}
                className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition-colors ${topic === item.value ? "border-[#143d36] bg-[#143d36] text-[#faf3e5]" : "border-[#ded4c3] bg-[#faf3e5] text-[#143d36] hover:border-[#e8533a]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#718378]">
          O que deve ser revisto?
          <Textarea
            value={note}
            onChange={event => setNote(event.target.value)}
            maxLength={600}
            minLength={12}
            placeholder="Ex.: o link de horários mudou; indicar o novo endereço público para verificação."
            className="min-h-32 resize-y border-[#ded4c3] bg-white text-sm font-normal normal-case tracking-normal text-[#143d36] placeholder:text-[#718378]/70"
          />
        </label>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-[#718378]">{note.trim().length}/600</p>
          <Button
            type="button"
            disabled={note.trim().length < 12 || submit.isPending}
            onClick={() => submit.mutate({ municipalityIbgeCode, topic, note })}
            className="bg-[#e8533a] text-white hover:bg-[#c9432e]"
          >
            {submit.isPending ? (
              "A enviar…"
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Enviar sugestão
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
