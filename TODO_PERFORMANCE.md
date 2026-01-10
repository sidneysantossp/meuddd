# TODO: Otimizações de Performance Implementadas e Pendentes

## ✅ Implementado

### 1. Lazy Loading nas Páginas de Estado
- ✅ `StateDetailPage.tsx` - Carrega dados apenas quando necessário
- ✅ `StatesPage.tsx` - Carrega lista de estados de forma assíncrona
- ✅ Skeleton loaders para melhor UX durante carregamento
- ✅ Code splitting parcial (stateDetailedInfo.js = 94KB separado)

### 2. Infraestrutura Supabase
- ✅ Banco de dados criado
- ✅ Tabelas `states` e `cities` criadas
- ✅ Índices para performance
- ✅ RLS policies configuradas
- ✅ Cliente Supabase configurado (`src/lib/supabase.ts`)
- ✅ API com caching (`src/lib/statesApi.ts`)

### 3. Documentação
- ✅ `PERFORMANCE_OPTIMIZATION.md` - Guia completo
- ✅ `SUPORTE_NECESSARIO.md` - Documentação do problema de robots.txt

## 🚧 Pendente (Próximos Passos)

### 1. Remover Imports Estáticos (CRÍTICO)
**Problema:** states.ts ainda é importado estaticamente em várias páginas:
- `HomePage.tsx`
- `CityDetailPage.tsx`
- `GeneratorPage.tsx`
- `ValidateDDDPage.tsx`
- `SitemapPage.tsx`
- `blogPosts.ts`

**Solução:** Converter todos para lazy loading:
```typescript
// Ao invés de:
import { brazilianStates } from '@/data/states';

// Usar:
const [states, setStates] = useState([]);
useEffect(() => {
  import('@/data/states').then(m => setStates(m.brazilianStates));
}, []);
```

### 2. Migrar Dados para Supabase (RECOMENDADO)
**Benefício:** Reduzir bundle de 2.9MB para ~800KB (-70%)

**Passos:**
1. Criar script de migração funcional
2. Migrar todos os 27 estados e ~730 cidades
3. Atualizar todas as páginas para usar `src/lib/statesApi.ts`
4. Remover arquivos `states.ts` e `stateDetailedInfo.ts` do bundle
5. Manter arquivos como backup

### 3. Otimizar Outras Páginas
- [ ] `HomePage.tsx` - Lazy load de statistics, blog, FAQ
- [ ] `CityDetailPage.tsx` - Lazy load de dados da cidade
- [ ] `GeneratorPage.tsx` - Lazy load de estados
- [ ] `ValidateDDDPage.tsx` - Lazy load de validação
- [ ] `SitemapPage.tsx` - Lazy load de URLs

### 4. Code Splitting Avançado
- [ ] Configurar `manualChunks` no vite.config.ts
- [ ] Separar vendor chunks (React, React Router, etc.)
- [ ] Separar data chunks por região (Norte, Nordeste, etc.)
- [ ] Implementar route-based code splitting

### 5. Otimizações Adicionais
- [ ] Implementar virtual scrolling para listas longas
- [ ] Adicionar service worker para cache offline
- [ ] Otimizar imagens (se houver)
- [ ] Implementar prefetching de dados
- [ ] Configurar headers de cache no CDN

### 6. Monitoramento
- [ ] Configurar Lighthouse CI
- [ ] Monitorar Core Web Vitals
- [ ] Configurar error tracking (Sentry)
- [ ] Adicionar analytics de performance

## 📊 Métricas Atuais vs. Esperadas

### Antes das Otimizações
- Bundle inicial: ~2.9MB
- Tempo de carregamento: 5-8s
- Time to Interactive: 6-10s
- Lighthouse Score: 40-60

### Após Otimizações Parciais (Atual)
- Bundle inicial: ~2.9MB (ainda grande devido a imports estáticos)
- stateDetailedInfo separado: 94KB ✅
- Skeleton loaders: ✅
- Lazy loading: Parcial (2 páginas)

### Após Todas as Otimizações (Esperado)
- Bundle inicial: ~800KB (-72%)
- Tempo de carregamento: 1-2s (-75%)
- Time to Interactive: 2-3s (-70%)
- Lighthouse Score: 85-95 (+50%)

## 🎯 Prioridade de Implementação

### Alta Prioridade (Fazer Agora)
1. ✅ Lazy loading em StateDetailPage e StatesPage
2. 🚧 Remover imports estáticos das outras páginas
3. 🚧 Configurar manualChunks no vite.config.ts

### Média Prioridade (Próxima Sprint)
4. Migrar dados para Supabase
5. Implementar virtual scrolling
6. Adicionar service worker

### Baixa Prioridade (Futuro)
7. Otimizar imagens
8. Implementar prefetching
9. Configurar Lighthouse CI

## 📝 Notas Técnicas

### Por que o bundle ainda está grande?
O Vite detectou que `states.ts` é importado tanto dinamicamente (StateDetailPage, StatesPage) quanto estaticamente (HomePage, etc.). Quando isso acontece, o Vite não consegue fazer code splitting e mantém o arquivo no bundle principal.

**Solução:** Remover TODOS os imports estáticos de `states.ts` e usar apenas lazy loading.

### Alternativa: Migrar para Supabase
Ao invés de fazer lazy loading de arquivos JavaScript grandes, podemos:
1. Armazenar dados no Supabase
2. Fazer fetch apenas dos dados necessários
3. Implementar caching em memória
4. Reduzir bundle drasticamente

**Vantagens:**
- Bundle muito menor
- Dados podem ser atualizados sem rebuild
- Melhor performance
- Escalável

**Desvantagens:**
- Requer migração de dados
- Dependência de serviço externo
- Latência de rede (mitigada com cache)

## 🚀 Como Continuar

### Opção 1: Lazy Loading Completo (Rápido)
1. Converter todas as páginas para lazy loading
2. Configurar manualChunks
3. Testar e validar
4. Deploy

**Tempo estimado:** 2-3 horas  
**Redução de bundle:** ~40-50%

### Opção 2: Migração para Supabase (Melhor)
1. Criar script de migração funcional
2. Migrar todos os dados
3. Atualizar todas as páginas
4. Testar e validar
5. Deploy

**Tempo estimado:** 4-6 horas  
**Redução de bundle:** ~70-80%

## ✅ Checklist de Validação

Após implementar as otimizações, verificar:

- [ ] Bundle inicial < 1MB
- [ ] Lighthouse Performance Score > 85
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTI (Time to Interactive) < 3.8s
- [ ] Todas as páginas carregam corretamente
- [ ] Skeleton loaders funcionando
- [ ] Cache funcionando
- [ ] Sem erros no console

---

**Status Atual:** 🟡 Otimizações Parciais Implementadas  
**Próximo Passo:** Remover imports estáticos ou migrar para Supabase  
**Impacto no SEO:** 🔴 Alto - Bundle grande prejudica Core Web Vitals
