#!/bin/bash
# Monitor do lote de geração das tabs editoriais.
# - Verifica se a quota LLM repôs (chamada de teste única ao modelo do script).
# - Se repôs e não há instância do script resiliente em execução, relança o lote.
cd /home/ubuntu/ddd-brasil || exit 1

ALREADY_RUNNING=$(ps aux | grep -c '[g]enerateTabsResilient')

count_ok() {
  local total=0
  for j in .generated/tabs/*.json; do
    [ -f "$j" ] || continue
    local n
    n=$(python3 -c "import json;print(len(json.load(open('$j'))))" 2>/dev/null || echo 0)
    total=$((total + n))
  done
  echo "$total"
}

echo "[$(date -u +%FT%T)] fichas: $(count_ok); processos resilientes: $ALREADY_RUNNING"

if [ "$ALREADY_RUNNING" -gt 0 ]; then
  echo "Lote já em execução — sem ação."
  exit 0
fi

echo "A testar disponibilidade da quota LLM com o script resiliente do AC (batch de 1)..."
timeout 240 pnpm tsx scripts/generateTabsResilient.mts --uf=ac >> .generated/tabs/resilient.log 2>&1
RES=$?

# O script resiliente termina com exit 0 mesmo com quota esgotada (após 1h de
# backoff). Detetar quota esgotada pelas últimas marcas do log do AC.
QUOTA_GONE=$(tail -40 .generated/tabs/resilient.log | grep -c "quota esgotada")
MUN_OK=$(tail -40 .generated/tabs/resilient.log | grep -cE "OK .+AC:" || true)

if [ "$QUOTA_GONE" -gt 0 ] && [ "$MUN_OK" -eq 0 ]; then
  echo "Quota ainda esgotada (exit $RES, $QUOTA_GONE marcas de quota) — sem ação."
  exit 0
fi

if [ "$MUN_OK" -gt 0 ] || [ "$RES" -eq 0 ]; then
  echo "Quota repôs. A lançar o lote completo em background..."
  nohup bash -c 'for uf in ac al ap am ba ce df es go ma mt ms mg pa pb pr pe pi rj rn rs ro rr sc sp se to; do pnpm tsx scripts/generateTabsResilient.mts --uf=$uf >> .generated/tabs/resilient.log 2>&1; done; echo ALL_UF_DONE >> .generated/tabs/resilient.log' > .generated/tabs/resilient.out.log 2>&1 &
  echo "Lote lançado (PID $!)."
else
  echo "Quota ainda esgotada (exit $RES) — sem ação, aguardando próximo disparo."
fi
