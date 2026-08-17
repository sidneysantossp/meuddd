#!/bin/bash
# Verifica progresso das tabs por UF contra a contagem oficial da base de dados.
cd /home/ubuntu/ddd-brasil || exit 1
declare -A want=( [ac]=22 [al]=102 [am]=62 [ap]=16 [ba]=417 [ce]=184 [df]=1 [es]=78 [go]=246 [ma]=217 [mg]=853 [ms]=79 [mt]=142 [pa]=144 [pb]=223 [pe]=185 [pi]=224 [pr]=399 [rj]=92 [rn]=167 [ro]=52 [rr]=15 [rs]=497 [sc]=295 [se]=75 [sp]=645 [to]=139 )
total=0; ok_ufs=0; running=""
for uf in ac al ap am ba ce df es go ma mt ms mg pa pb pr pe pi rj rn rs ro rr sc sp se to; do
  n=$(python3 -c "import json;print(len(json.load(open('.generated/tabs/${uf}.json'))))" 2>/dev/null || echo 0)
  w=${want[$uf]}
  total=$((total + n))
  if [ "$n" -ge "$w" ]; then ok_ufs=$((ok_ufs + 1)); echo "${uf}: $n/$w OK"; else echo "${uf}: $n/$w"; fi
done
# detetar qual UF está a correr (argumento do processo ativo)
running=$(ps aux | grep '[g]enerateTabsResilient' | grep -oE 'uf=[a-z]{2}' | sed 's/uf=//' | sort -u | tr '\n' ' ')
echo "TOTAL: $total (meta 5571) | UFs completas: $ok_ufs/27 | a correr: ${running:-nenhum}"
grep -c "ALL_UF_DONE" .generated/tabs/resilient.log 2>/dev/null || true
