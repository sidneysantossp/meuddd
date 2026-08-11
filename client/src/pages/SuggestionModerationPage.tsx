import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Check, ClipboardCheck, LockKeyhole, MessageSquareText, X } from "lucide-react";
import { useMemo, useState } from "react";

const labels = { mobility: "Mobilidade", useful_phone: "Telefone útil", other: "Outra informação" } as const;
const statuses = { pending: "Pendente", reviewed: "Em revisão", approved: "Aprovada", dismissed: "Rejeitada" } as const;
const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

export default function SuggestionModerationPage() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [statusFilter, setStatusFilter] = useState<"all" | keyof typeof statuses>("pending");
  const [ufFilter, setUfFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState<"" | keyof typeof labels>("");
  const queryInput = useMemo(() => ({
    limit: 100,
    ...(statusFilter === "all" ? {} : { status: statusFilter }),
    ...(ufFilter ? { uf: ufFilter } : {}),
    ...(topicFilter ? { topic: topicFilter } : {}),
  }), [statusFilter, topicFilter, ufFilter]);
  const suggestions = trpc.insights.localitySuggestions.useQuery(queryInput, { enabled: isAdmin });
  const utils = trpc.useUtils();
  const review = trpc.insights.reviewLocalitySuggestion.useMutation({
    onSuccess: () => utils.insights.localitySuggestions.invalidate(),
  });

  return <DashboardLayout><section className="mx-auto w-full max-w-5xl py-6 text-[#143d36]">
    <header className="mb-7 flex flex-col gap-3 border-b border-[#143d36]/10 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8533a]">Qualidade de dados</p><h1 className="mt-2 font-serif text-4xl tracking-tight">Moderar sugestões locais</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#143d36]/70">Reveja contribuições sobre mobilidade e telefones úteis antes de qualquer atualização editorial. Os envios não incluem dados de contacto.</p></div><Badge className="w-fit bg-[#143d36] px-3 py-1 text-[#faf3e5]">Acesso administrativo</Badge></header>
    {loading ? <div className="rounded-2xl bg-[#faf3e5] p-8 text-sm text-[#143d36]/70">A verificar permissões…</div> : null}
    {!loading && !isAdmin ? <Card className="border-[#e8533a]/20 bg-[#fffaf0] shadow-none"><CardHeader><LockKeyhole className="mb-2 h-6 w-6 text-[#e8533a]" /><CardTitle>Acesso restrito</CardTitle><CardDescription>A moderação de contribuições locais está disponível apenas para a equipa administradora.</CardDescription></CardHeader></Card> : null}
    {isAdmin ? <div className="grid gap-4"><Card className="border-[#143d36]/10 bg-[#fffaf0] shadow-none"><CardContent className="grid gap-4 p-5 sm:grid-cols-3"><label className="grid gap-2 text-sm font-semibold">Estado da moderação<select value={statusFilter} onChange={event => setStatusFilter(event.target.value as typeof statusFilter)} className="h-10 rounded-lg border border-[#143d36]/15 bg-white px-3 text-sm font-normal"><option value="all">Todos os estados</option><option value="pending">Pendentes</option><option value="reviewed">Em revisão</option><option value="approved">Aprovadas</option><option value="dismissed">Rejeitadas</option></select></label><label className="grid gap-2 text-sm font-semibold">UF da localidade<select value={ufFilter} onChange={event => setUfFilter(event.target.value)} className="h-10 rounded-lg border border-[#143d36]/15 bg-white px-3 text-sm font-normal"><option value="">Todas as UFs</option>{ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Categoria da sugestão<select value={topicFilter} onChange={event => setTopicFilter(event.target.value as typeof topicFilter)} className="h-10 rounded-lg border border-[#143d36]/15 bg-white px-3 text-sm font-normal"><option value="">Todas as categorias</option>{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></CardContent></Card>
      {suggestions.isLoading ? <div className="rounded-2xl bg-[#faf3e5] p-8 text-sm text-[#143d36]/70">A carregar sugestões…</div> : null}
      {suggestions.error ? <div className="rounded-2xl border border-[#e8533a]/20 bg-[#fffaf0] p-6 text-sm text-[#9c2b1a]">Não foi possível carregar as sugestões. Verifique a sessão administrativa.</div> : null}
      {suggestions.data?.length === 0 ? <Card className="border-[#143d36]/10 shadow-none"><CardContent className="flex gap-3 p-6 text-sm text-[#143d36]/70"><MessageSquareText className="h-5 w-5 shrink-0 text-[#e8533a]" />Não existem sugestões neste estado de moderação.</CardContent></Card> : null}
      {suggestions.data?.map(item => <Card key={item.id} className="border-[#143d36]/10 shadow-none"><CardContent className="grid gap-4 p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{item.municipalityName ?? `Município ${item.municipalityIbgeCode}`}{item.uf ? ` · ${item.uf}` : ""}</p><p className="mt-1 text-xs text-[#143d36]/60">Enviada {formatDate(item.createdAt)}</p></div><div className="flex gap-2"><Badge variant="outline" className="border-[#e8533a]/30 text-[#b63e29]">{labels[item.topic]}</Badge><Badge variant="outline" className="border-[#143d36]/20 text-[#143d36]">{statuses[item.status]}</Badge></div></div><p className="rounded-xl bg-[#faf3e5] p-4 text-sm leading-6">{item.note}</p>{item.status !== "approved" && item.status !== "dismissed" ? <div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" disabled={review.isPending} onClick={() => review.mutate({ id: item.id, status: "reviewed" })}><ClipboardCheck className="mr-2 h-4 w-4" />Em revisão</Button><Button size="sm" className="bg-[#143d36] text-[#faf3e5] hover:bg-[#0d2d27]" disabled={review.isPending} onClick={() => review.mutate({ id: item.id, status: "approved" })}><Check className="mr-2 h-4 w-4" />Aprovar</Button><Button size="sm" variant="outline" className="border-[#e8533a]/30 text-[#b63e29]" disabled={review.isPending} onClick={() => review.mutate({ id: item.id, status: "dismissed" })}><X className="mr-2 h-4 w-4" />Rejeitar</Button></div> : null}</CardContent></Card>)}</div> : null}
  </section></DashboardLayout>;
}
