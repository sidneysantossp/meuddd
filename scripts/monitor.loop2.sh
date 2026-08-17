#!/bin/bash
# Monitor noturno do lote de geração das tabs editoriais (14/08 -> 15/08 UTC).
# Verifica a cada 10 min até 04:30 UTC; relança o lote sequencial quando a quota repuser.
LOG=/home/ubuntu/ddd-brasil/.generated/tabs/monitor.loop2.log
END=$(date -d "2026-08-15 05:30:00 UTC" +%s 2>/dev/null || date -v+08:40H -j -f "%Y-%m-%dT%H:%M:%S" "$(date -u +%FT%H:%M:%S)" +%s)
echo "[$(date -u +%FT%T)] monitor.loop2 INICIADO (até ~04:30 UTC)" >> "$LOG"
while [ "$(date -u +%s)" -lt "$END" ]; do
  bash /home/ubuntu/ddd-brasil/scripts/monitorBatch.sh >> "$LOG" 2>&1
  sleep 600
done
echo "MONITOR_LOOP2_DONE" >> "$LOG"
