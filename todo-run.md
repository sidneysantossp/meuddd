# Run agendado — retoma da produção em massa das tabs editoriais (14/08)

- [x] Verificar estado atual: cadeia única em execução (bash+p4+tsx+node, 5 processos), 24 fichas válidas de ontem
- [x] Garantir o loop de monitorização a funcionar: cadeia única do lote sequencial relançada manualmente às 09:02 UTC (instâncias duplicadas anteriores mortas com pkill)
- [ ] Acompanhar o progresso até as 27 UFs completas — quota esgotada desde ~16:30 UTC de 13/08; verificada às 06:20/09:31/09:42/09:53/10:19 UTC de 14/08: SEMPRE 412. Hipótese de reset: 03:00 UTC (meia-noite BRT) de 15/08; monitor.loop.sh ativo até 18:00 UTC (verifica a cada 10 min e relança o lote quando repuser)
- [ ] Quando completo: pnpm tsx scripts/integrateTabs.mts
- [ ] pnpm format + pnpm test (80+ testes) + TypeScript sem erros
- [ ] Screenshot de /cidade/sp/sorocaba com 4 tabs editoriais e cartão cidade->estado
- [ ] webdev_save_checkpoint + commit/push para github main
- [ ] Avisar o utilizador com números finais
