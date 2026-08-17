import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { BarChart3, LockKeyhole, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

export default function SearchInsightsPage() {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [period, setPeriod] = useState("all");
  const [minVolume, setMinVolume] = useState("1");
  const queryInput = useMemo(
    () => ({
      limit: 50,
      minVolume: Number(minVolume),
      periodDays: period === "all" ? undefined : Number(period),
    }),
    [minVolume, period]
  );
  const insights = trpc.insights.unmatchedSearches.useQuery(queryInput, {
    enabled: isAdmin,
  });

  return (
    <DashboardLayout>
      <section className="mx-auto w-full max-w-5xl py-6 text-[#143d36]">
        <header className="mb-7 flex flex-col gap-3 border-b border-[#143d36]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8533a]">
              Inteligência editorial
            </p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight">
              Pesquisas sem resultado
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#143d36]/70">
              Termos agregados para priorizar sinónimos, novos guias e melhorias
              de cobertura. Não são guardados IPs, identificadores ou dados de
              perfil.
            </p>
          </div>
          <Badge className="w-fit bg-[#143d36] px-3 py-1 text-[#faf3e5]">
            Acesso administrativo
          </Badge>
        </header>

        {loading ? (
          <div className="rounded-2xl bg-[#faf3e5] p-8 text-sm text-[#143d36]/70">
            A verificar permissões…
          </div>
        ) : null}
        {!loading && !isAdmin ? (
          <Card className="border-[#e8533a]/20 bg-[#fffaf0] shadow-none">
            <CardHeader>
              <LockKeyhole className="mb-2 h-6 w-6 text-[#e8533a]" />
              <CardTitle>Acesso restrito</CardTitle>
              <CardDescription>
                Esta visão contém sinais agregados de procura e está disponível
                apenas para a equipa administradora.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
        {isAdmin && insights.isLoading ? (
          <div className="rounded-2xl bg-[#faf3e5] p-8 text-sm text-[#143d36]/70">
            A carregar termos agregados…
          </div>
        ) : null}
        {isAdmin && insights.error ? (
          <div className="rounded-2xl border border-[#e8533a]/20 bg-[#fffaf0] p-6 text-sm text-[#9c2b1a]">
            Não foi possível carregar os termos. Atualize a página ou verifique
            a sessão administrativa.
          </div>
        ) : null}
        {isAdmin && insights.data ? (
          <div className="grid gap-4">
            <Card className="border-[#143d36]/10 bg-[#fffaf0] shadow-none">
              <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  Período de atividade
                  <select
                    value={period}
                    onChange={event => setPeriod(event.target.value)}
                    className="h-10 rounded-lg border border-[#143d36]/15 bg-white px-3 text-sm font-normal"
                  >
                    <option value="all">Todo o histórico</option>
                    <option value="7">Últimos 7 dias</option>
                    <option value="30">Últimos 30 dias</option>
                    <option value="90">Últimos 90 dias</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  Volume mínimo
                  <select
                    value={minVolume}
                    onChange={event => setMinVolume(event.target.value)}
                    className="h-10 rounded-lg border border-[#143d36]/15 bg-white px-3 text-sm font-normal"
                  >
                    <option value="1">1 ou mais ocorrências</option>
                    <option value="3">3 ou mais ocorrências</option>
                    <option value="5">5 ou mais ocorrências</option>
                    <option value="10">10 ou mais ocorrências</option>
                  </select>
                </label>
              </CardContent>
            </Card>
            <Card className="border-[#143d36]/10 bg-[#143d36] text-[#faf3e5] shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <BarChart3 className="h-8 w-8 text-[#f6b08f]" />
                <div>
                  <p className="text-2xl font-semibold">
                    {insights.data.length}
                  </p>
                  <p className="text-sm text-[#faf3e5]/70">
                    termos distintos disponíveis para priorização
                  </p>
                </div>
              </CardContent>
            </Card>
            {insights.data.length === 0 ? (
              <Card className="border-[#143d36]/10 shadow-none">
                <CardContent className="flex gap-3 p-6 text-sm text-[#143d36]/70">
                  <SearchX className="h-5 w-5 shrink-0 text-[#e8533a]" />
                  Ainda não existem pesquisas sem resultado que cumpram os
                  critérios mínimos de privacidade.
                </CardContent>
              </Card>
            ) : null}
            {insights.data.map(item => (
              <Card
                key={item.normalizedQuery}
                className="border-[#143d36]/10 shadow-none"
              >
                <CardContent className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                  <div>
                    <p className="font-semibold">{item.latestQuery}</p>
                    <p className="mt-1 text-xs text-[#143d36]/60">
                      Normalizado: {item.normalizedQuery}
                      {item.selectedUf ? ` · filtro ${item.selectedUf}` : ""}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit border-[#e8533a]/30 text-[#b63e29]"
                  >
                    {item.searchCount} ocorrências
                  </Badge>
                  <p className="text-xs text-[#143d36]/60">
                    Atualizado {formatDate(item.lastSeenAt)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </section>
    </DashboardLayout>
  );
}
