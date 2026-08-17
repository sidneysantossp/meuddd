/* Central de inteligência de dados — painel /admin.
   Dashboard com KPIs de cobertura editorial, pesquisas sem resultados e
   sugestões de utilizadores, com moderação inline das sugestões. */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Inbox,
  Loader2,
  LogOut,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const TOPIC_LABEL: Record<string, string> = {
  mobility: "Transporte",
  useful_phone: "Telefone útil",
  other: "Outro",
};

const STATUS_META: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pendente", cls: "bg-amber-100 text-amber-800" },
  reviewed: { label: "Revisada", cls: "bg-sky-100 text-sky-800" },
  approved: { label: "Aprovada", cls: "bg-emerald-100 text-emerald-800" },
  dismissed: { label: "Rejeitada", cls: "bg-neutral-200 text-neutral-700" },
};

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf3e5] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#143d36]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#faf3e5] text-[#143d36] flex flex-col items-center justify-center gap-4 p-6 text-center">
        <ShieldCheck className="h-12 w-12 text-[#c96f53]" />
        <h1 className="text-2xl font-bold">Acesso restrito</h1>
        <p className="max-w-md text-sm text-[#143d36]/70">
          Esta área é reservada ao administrador da plataforma.
        </p>
        <Button asChild variant="outline">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const [suggestStatus, setSuggestStatus] = useState<
    "all" | "pending" | "reviewed" | "approved" | "dismissed"
  >("all");
  const utils = trpc.useUtils();

  const dashboard = trpc.insights.dashboard.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const unmatched = trpc.insights.unmatchedSearches.useQuery({
    limit: 25,
    minVolume: 1,
  });

  const suggestions = trpc.insights.localitySuggestions.useQuery({
    status: suggestStatus === "all" ? undefined : suggestStatus,
    limit: 40,
  });

  const review = trpc.insights.reviewLocalitySuggestion.useMutation({
    onSuccess: () => {
      utils.insights.localitySuggestions.invalidate();
      utils.insights.dashboard.invalidate();
      toast.success("Sugestão atualizada");
    },
    onError: e => toast.error(`Erro ao atualizar: ${e.message}`),
  });

  const kpis = dashboard.data;
  const unmatchedByPeriod = useMemo(() => {
    if (!kpis) return 0;
    return period === "7d" ? kpis.unmatched.last7d : kpis.unmatched.last30d;
  }, [kpis, period]);

  return (
    <div className="min-h-screen bg-[#faf3e5] text-[#143d36]">
      <header className="border-b border-[#143d36]/10 bg-[#143d36] text-[#faf3e5]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-[#f08a5d]" />
            <div>
              <h1 className="text-lg font-bold">
                Meu DDD — Inteligência de Dados
              </h1>
              <p className="text-xs text-[#faf3e5]/70">
                Central de análise e priorização de conteúdo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-sm text-[#faf3e5]/80 hover:text-[#faf3e5]"
            >
              Ver site
            </Link>
            <Button variant="ghost" size="sm" className="text-[#faf3e5]">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {dashboard.isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-[#143d36]" />
          </div>
        ) : kpis ? (
          <>
            {/* KPIs de cobertura */}
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#143d36]/60">
                Cobertura editorial
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                  icon={<MapPin className="h-5 w-5" />}
                  label="Municípios com ficha editorial"
                  value={`${kpis.coverage.municipalitiesWithTabs} / ${kpis.coverage.totalMunicipalities}`}
                  sub={`${kpis.coverage.completionPercent}% concluído`}
                />
                <KpiCard
                  icon={<Search className="h-5 w-5" />}
                  label="Pesquisas sem resultado"
                  value={String(kpis.unmatched.total)}
                  sub={`${unmatchedByPeriod} nos últimos ${period === "7d" ? "7" : "30"} dias`}
                />
                <KpiCard
                  icon={<Inbox className="h-5 w-5" />}
                  label="Sugestões recebidas"
                  value={String(kpis.suggestions.total)}
                  sub={`${kpis.suggestions.pending} pendentes de moderação`}
                />
                <KpiCard
                  icon={<CheckCircle2 className="h-5 w-5" />}
                  label="Sugestões aprovadas"
                  value={String(kpis.suggestions.approved)}
                  sub={`${kpis.suggestions.dismissed} rejeitadas`}
                />
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top termos sem resultado */}
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">
                    Top termos sem resultado
                  </CardTitle>
                  <Select
                    value={period}
                    onValueChange={v => setPeriod(v as "7d" | "30d")}
                  >
                    <SelectTrigger className="w-28 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Últimos 7d</SelectItem>
                      <SelectItem value="30d">Últimos 30d</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="space-y-2">
                  {unmatched.data?.length ? (
                    unmatched.data.map((t, i) => (
                      <div
                        key={t.normalizedQuery}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className="w-5 text-xs text-[#143d36]/50">
                            {i + 1}.
                          </span>
                          <span className="truncate">{t.latestQuery}</span>
                          {t.selectedUf ? (
                            <Badge variant="outline" className="text-[10px]">
                              {t.selectedUf}
                            </Badge>
                          ) : null}
                        </span>
                        <span className="font-mono text-xs text-[#c96f53]">
                          {t.searchCount}×
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#143d36]/60">
                      Sem registos no período.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Sugestões recentes */}
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">
                    Sugestões dos utilizadores
                  </CardTitle>
                  <Select
                    value={suggestStatus}
                    onValueChange={v =>
                      setSuggestStatus(
                        v as
                          | "all"
                          | "pending"
                          | "reviewed"
                          | "approved"
                          | "dismissed"
                      )
                    }
                  >
                    <SelectTrigger className="w-32 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="reviewed">Revisadas</SelectItem>
                      <SelectItem value="approved">Aprovadas</SelectItem>
                      <SelectItem value="dismissed">Rejeitadas</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : suggestions.data?.length ? (
                    suggestions.data.map(s => (
                      <div
                        key={s.id}
                        className="rounded-lg border border-[#143d36]/10 p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Badge
                              variant="secondary"
                              className="text-[10px] font-normal"
                            >
                              {TOPIC_LABEL[s.topic] ?? s.topic}
                            </Badge>
                            <span className="text-[#143d36]/60">
                              IBGE {s.municipalityIbgeCode}
                            </span>
                          </div>
                          <Badge
                            className={`${STATUS_META[s.status]?.cls ?? ""} text-[10px]`}
                          >
                            {STATUS_META[s.status]?.label ?? s.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm">{s.note}</p>
                        {s.status === "pending" ? (
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              className="bg-emerald-700 text-white hover:bg-emerald-800"
                              disabled={review.isPending}
                              onClick={() =>
                                review.mutate({ id: s.id, status: "approved" })
                              }
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={review.isPending}
                              onClick={() =>
                                review.mutate({ id: s.id, status: "reviewed" })
                              }
                            >
                              <Clock className="h-3.5 w-3.5" /> Revisar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-neutral-600"
                              disabled={review.isPending}
                              onClick={() =>
                                review.mutate({ id: s.id, status: "dismissed" })
                              }
                            >
                              <XCircle className="h-3.5 w-3.5" /> Rejeitar
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#143d36]/60">
                      Sem sugestões neste filtro.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Separator className="bg-[#143d36]/10" />

            {/* Recomendações derivadas */}
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#143d36]/60">
                O que priorizar
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <InsightCard
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="Palavras-chave de conteúdo novo"
                  text={`Os ${Math.min(kpis.unmatched.topTerms.length, 5)} termos mais procurados sem resultado são os melhores candidatos para novos guias editoriais.`}
                />
                <InsightCard
                  icon={<AlertCircle className="h-5 w-5" />}
                  title="Lacunas de cobertura"
                  text={`Apenas ${kpis.coverage.completionPercent}% dos municípios têm ficha editorial. Completar as UFs restantes é a maior alavanca de tráfego.`}
                />
                <InsightCard
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Moderação em aberto"
                  text={`${kpis.suggestions.pending} sugestões aguardam revisão. Aprovar as relevantes melhora a confiança do conteúdo local.`}
                />
              </div>
            </section>
          </>
        ) : (
          <p className="py-12 text-center text-sm text-[#143d36]/70">
            Não foi possível carregar os dados de inteligência.
          </p>
        )}
      </main>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-start gap-3 pt-6">
        <span className="rounded-lg bg-[#143d36]/10 p-2 text-[#143d36]">
          {icon}
        </span>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs font-medium text-[#143d36]/70">{label}</p>
          {sub ? <p className="mt-1 text-xs text-[#c96f53]">{sub}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-start gap-3 pt-6">
        <span className="rounded-lg bg-[#f08a5d]/15 p-2 text-[#c96f53]">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-[#143d36]/70">
            {text}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
