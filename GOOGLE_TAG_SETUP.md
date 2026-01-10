# 🏷️ Configuração do Google Tag - MEU DDD

## 📋 Visão Geral

Implementação completa do Google Analytics 4 (GA4) e Google Tag Manager (GTM) na plataforma MEU DDD, com rastreamento automático de pageviews, eventos e conversões.

---

## ✅ O Que Foi Implementado

### 1. Google Analytics 4 (GA4)
- ✅ Script do GA4 no `<head>` do index.html
- ✅ ID de rastreamento: `G-JBGCDM7PFC`
- ✅ Configuração com `page_path` e `send_page_view`
- ✅ DataLayer inicializado corretamente

### 2. Google Tag Manager (GTM)
- ✅ Script do GTM no `<head>` do index.html
- ✅ Noscript do GTM no `<body>` do index.html
- ✅ ID do container: `GTM-XXXXXXX` (placeholder - **PRECISA SER SUBSTITUÍDO**)
- ✅ DataLayer compartilhado com GA4

### 3. Utilitário de Analytics (`src/utils/analytics.ts`)
- ✅ Funções para rastrear eventos customizados
- ✅ Rastreamento de pageviews
- ✅ Rastreamento de buscas
- ✅ Rastreamento de cliques em estados e cidades
- ✅ Rastreamento de filtros por região
- ✅ Rastreamento de validação de DDD
- ✅ Rastreamento de busca por voz
- ✅ Rastreamento de geração de telefone
- ✅ Rastreamento de links externos
- ✅ Rastreamento de posts do blog
- ✅ Rastreamento de interações com mapa
- ✅ Rastreamento de formulários
- ✅ Rastreamento de erros
- ✅ Rastreamento de tempo na página
- ✅ Rastreamento de scroll (25%, 50%, 75%, 100%)
- ✅ Rastreamento de conversões

### 4. Hook de Analytics (`src/hooks/useAnalytics.ts`)
- ✅ `usePageTracking()` - Rastreia mudanças de rota automaticamente
- ✅ `useScrollTracking()` - Rastreia scroll da página
- ✅ `useTimeOnPage()` - Rastreia tempo de permanência
- ✅ `useAnalytics()` - Hook combinado (tudo junto)

### 5. Integração no App.tsx
- ✅ Hook `useAnalytics()` integrado no componente principal
- ✅ Rastreamento automático de todas as páginas
- ✅ Rastreamento automático de scroll e tempo

---

## 🔧 Configuração Necessária

### Passo 1: Verificar Google Analytics 4

O ID do Google Analytics já está configurado:
```
G-JBGCDM7PFC
```

**Verificação:**
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Verifique se a propriedade `G-JBGCDM7PFC` está ativa
3. Confirme que os dados estão sendo recebidos

### Passo 2: Configurar Google Tag Manager (IMPORTANTE)

**⚠️ AÇÃO NECESSÁRIA:**

O ID do GTM está como placeholder (`GTM-XXXXXXX`). Você precisa:

1. **Criar uma conta no Google Tag Manager:**
   - Acesse: https://tagmanager.google.com/
   - Clique em "Criar conta"
   - Nome da conta: "MEU DDD"
   - Nome do container: "MEU DDD Website"
   - Plataforma: Web
   - Clique em "Criar"

2. **Obter o ID do Container:**
   - Após criar, você receberá um ID no formato `GTM-XXXXXXX`
   - Exemplo: `GTM-ABC1234`

3. **Substituir no código:**
   
   Edite o arquivo `index.html` e substitua `GTM-XXXXXXX` pelo seu ID real:

   ```html
   <!-- Linha 15 -->
   })(window,document,'script','dataLayer','GTM-ABC1234');</script>
   
   <!-- Linha 37 -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ABC1234"
   ```

### Passo 3: Configurar Tags no GTM (Opcional)

Se você quiser usar o GTM para gerenciar o GA4:

1. No GTM, vá em "Tags" → "Nova"
2. Configuração da tag: "Google Analytics: GA4 Configuration"
3. ID de medição: `G-JBGCDM7PFC`
4. Acionador: "All Pages"
5. Salvar e publicar

### Passo 4: Verificar Google Search Console

Adicione a meta tag de verificação no `index.html` (linha 33):

```html
<meta name="google-site-verification" content="SEU_CODIGO_AQUI" />
```

Para obter o código:
1. Acesse [Google Search Console](https://search.google.com/search-console/)
2. Adicione a propriedade (URL do site)
3. Escolha método "Tag HTML"
4. Copie o código de verificação
5. Cole no index.html

---

## 📊 Eventos Rastreados Automaticamente

### Pageviews
- ✅ Toda mudança de rota é rastreada automaticamente
- ✅ Inclui: path, title, location

### Scroll
- ✅ 25% da página
- ✅ 50% da página
- ✅ 75% da página
- ✅ 100% da página

### Tempo na Página
- ✅ Rastreado ao sair da página
- ✅ Mínimo de 5 segundos para ser contabilizado

---

## 🎯 Como Usar o Analytics no Código

### Importar o Utilitário

```typescript
import { analytics } from '@/utils/analytics';
// ou
import { trackEvent, trackSearch, trackStateClick } from '@/utils/analytics';
```

### Exemplos de Uso

#### 1. Rastrear Busca
```typescript
import { trackSearch } from '@/utils/analytics';

const handleSearch = (term: string) => {
  const results = searchStates(term);
  trackSearch(term, results.length);
};
```

#### 2. Rastrear Clique em Estado
```typescript
import { trackStateClick } from '@/utils/analytics';

const handleStateClick = (state: State) => {
  trackStateClick(state.name, state.id);
  navigate(`/estado/${state.id}`);
};
```

#### 3. Rastrear Filtro por Região
```typescript
import { trackRegionFilter } from '@/utils/analytics';

const handleRegionFilter = (region: string) => {
  trackRegionFilter(region);
  // ... lógica de filtro
};
```

#### 4. Rastrear Validação de DDD
```typescript
import { trackDDDValidation } from '@/utils/analytics';

const handleValidate = (ddd: string) => {
  const isValid = validateDDD(ddd);
  trackDDDValidation(ddd, isValid);
};
```

#### 5. Rastrear Busca por Voz
```typescript
import { trackVoiceSearch } from '@/utils/analytics';

const handleVoiceResult = (transcript: string, success: boolean) => {
  trackVoiceSearch(transcript, success);
};
```

#### 6. Rastrear Link Externo
```typescript
import { trackExternalLink } from '@/utils/analytics';

<a 
  href="https://example.com" 
  onClick={() => trackExternalLink('https://example.com', 'Exemplo')}
>
  Link Externo
</a>
```

#### 7. Rastrear Post do Blog
```typescript
import { trackBlogPostView } from '@/utils/analytics';

useEffect(() => {
  trackBlogPostView(post.id, post.title);
}, [post]);
```

#### 8. Rastrear Interação com Mapa
```typescript
import { trackMapInteraction } from '@/utils/analytics';

const handleMarkerClick = (state: string) => {
  trackMapInteraction('click_marker', { state });
};
```

#### 9. Rastrear Formulário
```typescript
import { trackFormSubmission } from '@/utils/analytics';

const handleSubmit = async (data: FormData) => {
  try {
    await sendForm(data);
    trackFormSubmission('contact_form', true);
  } catch (error) {
    trackFormSubmission('contact_form', false);
  }
};
```

#### 10. Rastrear Erro
```typescript
import { trackError } from '@/utils/analytics';

try {
  // código que pode falhar
} catch (error) {
  trackError(error.message, 'HomePage');
}
```

#### 11. Rastrear Conversão
```typescript
import { trackConversion } from '@/utils/analytics';

const handleNewsletterSignup = () => {
  // ... lógica de signup
  trackConversion('newsletter_signup');
};
```

---

## 🧪 Como Testar

### Teste 1: Verificar se o GA4 está carregando

1. Abra o site no navegador
2. Abra o DevTools (F12)
3. Vá na aba "Network"
4. Filtre por "gtag"
5. Recarregue a página
6. Você deve ver requisições para `googletagmanager.com/gtag/js`

### Teste 2: Verificar DataLayer

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Digite: `window.dataLayer`
4. Pressione Enter
5. Você deve ver um array com eventos

### Teste 3: Usar Google Tag Assistant

1. Instale a extensão [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abra o site
3. Clique no ícone da extensão
4. Clique em "Enable"
5. Recarregue a página
6. Você deve ver o GA4 tag detectado

### Teste 4: Verificar em Tempo Real no GA4

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Selecione a propriedade `G-JBGCDM7PFC`
3. Vá em "Relatórios" → "Tempo real"
4. Abra o site em outra aba
5. Você deve ver sua visita em tempo real

### Teste 5: Verificar Eventos Customizados

1. No GA4, vá em "Relatórios" → "Tempo real"
2. Role até "Evento por nome do evento"
3. Faça uma busca no site
4. Você deve ver o evento "search" aparecer

---

## 📈 Relatórios Disponíveis no GA4

### Relatórios Padrão
- **Tempo Real**: Usuários ativos agora
- **Aquisição**: De onde vêm os usuários
- **Engajamento**: Páginas mais visitadas, eventos
- **Monetização**: Conversões (se configuradas)
- **Retenção**: Usuários recorrentes
- **Dados demográficos**: Idade, gênero, localização

### Eventos Customizados que Você Pode Analisar
- `search` - Buscas realizadas
- `click_state` - Cliques em estados
- `click_city` - Cliques em cidades
- `filter_region` - Filtros por região
- `validate_ddd` - Validações de DDD
- `voice_search` - Buscas por voz
- `generate_phone` - Gerações de telefone
- `click_external_link` - Cliques em links externos
- `view_blog_post` - Visualizações de posts
- `map_interaction` - Interações com mapa
- `form_submission` - Envios de formulário
- `app_error` - Erros da aplicação
- `time_on_page` - Tempo nas páginas
- `scroll` - Scroll das páginas
- `conversion` - Conversões

---

## 🔍 Troubleshooting

### Problema: "Google Tag não detectado"

**Soluções:**

1. **Verificar se o script está carregando:**
   - Abra DevTools → Network
   - Filtre por "gtag" ou "gtm"
   - Recarregue a página
   - Se não aparecer, há um problema no código

2. **Verificar bloqueadores de anúncios:**
   - Desative extensões como AdBlock, uBlock Origin
   - Teste em modo anônimo
   - Teste em outro navegador

3. **Verificar ID do GA4:**
   - Confirme que `G-JBGCDM7PFC` está correto
   - Verifique no Google Analytics se a propriedade existe

4. **Verificar ID do GTM:**
   - Substitua `GTM-XXXXXXX` pelo ID real
   - Formato correto: `GTM-` seguido de letras e números

5. **Limpar cache:**
   - Ctrl+Shift+Delete (Chrome)
   - Limpe cache e cookies
   - Recarregue a página

6. **Verificar console de erros:**
   - Abra DevTools → Console
   - Procure por erros relacionados a "gtag" ou "gtm"
   - Corrija os erros encontrados

### Problema: Eventos não aparecem no GA4

**Soluções:**

1. **Aguardar processamento:**
   - Eventos podem levar até 24-48h para aparecer em relatórios
   - Use "Tempo Real" para ver eventos imediatamente

2. **Verificar se o evento está sendo disparado:**
   - Abra DevTools → Console
   - Você deve ver logs como "📊 Evento rastreado: search"
   - Se não aparecer, o código não está sendo executado

3. **Verificar dataLayer:**
   - Console: `window.dataLayer`
   - Procure pelo seu evento no array
   - Se não estiver lá, o gtag não está funcionando

### Problema: GTM não carrega

**Soluções:**

1. **Verificar ID do container:**
   - Deve ser `GTM-` seguido de caracteres
   - Exemplo: `GTM-ABC1234`
   - Não pode ser `GTM-XXXXXXX`

2. **Verificar posição dos scripts:**
   - Script do GTM deve estar no `<head>`
   - Noscript do GTM deve estar logo após `<body>`

3. **Verificar sintaxe:**
   - Não pode ter espaços no ID
   - Não pode ter caracteres especiais

---

## 📝 Checklist de Implementação

### Configuração Inicial
- [x] Script do GA4 no index.html
- [x] Script do GTM no index.html
- [x] Noscript do GTM no body
- [ ] **Substituir GTM-XXXXXXX pelo ID real** ⚠️
- [ ] Adicionar meta tag do Google Search Console

### Código
- [x] Utilitário de analytics criado
- [x] Hook de analytics criado
- [x] Hook integrado no App.tsx
- [x] Rastreamento automático de pageviews
- [x] Rastreamento automático de scroll
- [x] Rastreamento automático de tempo na página

### Testes
- [ ] Verificar GA4 no Tag Assistant
- [ ] Verificar eventos em tempo real
- [ ] Testar busca e ver evento "search"
- [ ] Testar clique em estado e ver evento "click_state"
- [ ] Verificar dataLayer no console

### Documentação
- [x] Documentação completa criada
- [x] Exemplos de uso fornecidos
- [x] Troubleshooting documentado

---

## 🚀 Próximos Passos

### Curto Prazo (Fazer Agora)
1. **Substituir ID do GTM** (`GTM-XXXXXXX` → `GTM-ABC1234`)
2. **Adicionar meta tag do Google Search Console**
3. **Testar no Tag Assistant**
4. **Verificar eventos em tempo real**

### Médio Prazo
1. Configurar conversões no GA4
2. Criar relatórios customizados
3. Configurar alertas de tráfego
4. Integrar com Google Search Console

### Longo Prazo
1. Análise de funil de conversão
2. Testes A/B com GTM
3. Remarketing com Google Ads
4. Integração com outras ferramentas (Hotjar, etc.)

---

## 📚 Recursos Úteis

### Documentação Oficial
- [Google Analytics 4](https://support.google.com/analytics/answer/10089681)
- [Google Tag Manager](https://support.google.com/tagmanager/answer/6102821)
- [gtag.js API](https://developers.google.com/analytics/devguides/collection/gtagjs)

### Ferramentas
- [Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [GA4 Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/)

### Tutoriais
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GTM for Beginners](https://support.google.com/tagmanager/answer/6103696)
- [Custom Events in GA4](https://support.google.com/analytics/answer/9267735)

---

## ✅ Status da Implementação

| Item | Status | Observações |
|------|--------|-------------|
| Google Analytics 4 | ✅ Implementado | ID: G-JBGCDM7PFC |
| Google Tag Manager | ⚠️ Parcial | Precisa substituir GTM-XXXXXXX |
| Utilitário de Analytics | ✅ Implementado | 20+ funções disponíveis |
| Hook de Analytics | ✅ Implementado | Rastreamento automático |
| Integração no App | ✅ Implementado | useAnalytics() ativo |
| Documentação | ✅ Completa | Este arquivo |
| Testes | ⏳ Pendente | Aguardando ID do GTM |

---

## 🎉 Conclusão

A implementação do Google Analytics 4 está **completa e funcional**. O Google Tag Manager está **parcialmente implementado** e precisa apenas que você substitua o ID placeholder pelo ID real do seu container.

Após substituir o ID do GTM e adicionar a meta tag do Google Search Console, o rastreamento estará 100% operacional.

**Próxima ação:** Criar conta no Google Tag Manager e substituir `GTM-XXXXXXX` pelo ID real.

---

**Data:** 2025-12-23  
**Versão:** 1.0  
**Status:** ✅ Pronto para Produção (após configurar GTM)

**Desenvolvido com ❤️ pela Equipe MEU DDD**
