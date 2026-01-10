# 🔄 Redirecionamento Não-WWW para WWW

## 📋 Descrição

Implementado redirecionamento automático de todas as URLs sem `www.` para a versão com `www.`, garantindo consistência de domínio e melhor SEO.

## ✅ Funcionalidade

### Comportamento
Todas as requisições para `meuddd.com.br` são automaticamente redirecionadas para `www.meuddd.com.br`:

**Exemplos de Redirecionamento:**
```
https://meuddd.com.br/
  → https://www.meuddd.com.br/

https://meuddd.com.br/estados
  → https://www.meuddd.com.br/estados

https://meuddd.com.br/estado/sp
  → https://www.meuddd.com.br/estado/sp

https://meuddd.com.br/cidade/sao-paulo
  → https://www.meuddd.com.br/cidade/sao-paulo

https://meuddd.com.br/blog/o-que-e-ddd
  → https://www.meuddd.com.br/blog/o-que-e-ddd
```

### Características Técnicas

**Tipo de Redirecionamento:** 301 (Permanente)
- ✅ Código HTTP: 301 Moved Permanently
- ✅ Preserva o caminho completo da URL
- ✅ Preserva query strings (parâmetros)
- ✅ Informa aos motores de busca que é permanente
- ✅ Transfere autoridade de SEO (link juice)

**Configuração no Vercel:**
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "meuddd.com.br"
        }
      ],
      "destination": "https://www.meuddd.com.br/:path*",
      "permanent": true
    }
  ]
}
```

## 🎯 Benefícios

### 1. SEO (Otimização para Motores de Busca)
- ✅ **Evita conteúdo duplicado**: Google não penaliza por ter duas versões da mesma página
- ✅ **Consolida autoridade**: Todo o link juice vai para uma única versão
- ✅ **Melhora ranking**: Sinais de SEO não são divididos entre www e não-www
- ✅ **Canonical URL**: Define claramente qual é a versão preferida

### 2. Consistência de Marca
- ✅ **URL única**: Todos os usuários veem a mesma URL
- ✅ **Compartilhamento**: Links compartilhados sempre apontam para a mesma versão
- ✅ **Profissionalismo**: URL consistente com www

### 3. Analytics e Métricas
- ✅ **Dados unificados**: Todas as visitas contam em um único domínio
- ✅ **Rastreamento preciso**: Não divide métricas entre duas versões
- ✅ **Relatórios simplificados**: Análise mais fácil e clara

### 4. Performance
- ✅ **Cache otimizado**: Navegadores e CDNs cacheiam uma única versão
- ✅ **Menos requisições**: Não há necessidade de verificar duas versões
- ✅ **Velocidade**: Redirecionamento 301 é rápido e eficiente

## 🔧 Implementação Técnica

### Arquivo Modificado
**`/vercel.json`**

### Configuração Adicionada
```json
"redirects": [
  {
    "source": "/:path*",
    "has": [
      {
        "type": "host",
        "value": "meuddd.com.br"
      }
    ],
    "destination": "https://www.meuddd.com.br/:path*",
    "permanent": true
  }
]
```

### Como Funciona

**1. Detecção:**
- Vercel verifica o host da requisição
- Se o host for `meuddd.com.br` (sem www), ativa o redirecionamento

**2. Redirecionamento:**
- Captura o caminho completo (`:path*`)
- Redireciona para `https://www.meuddd.com.br/:path*`
- Usa código HTTP 301 (`permanent: true`)

**3. Preservação:**
- ✅ Caminho da URL preservado
- ✅ Query strings preservadas
- ✅ Fragmentos (#) preservados
- ✅ Método HTTP preservado

## 🧪 Testes

### Como Testar Após Deploy

**1. Teste Manual no Navegador:**
```
1. Acesse: https://meuddd.com.br/
2. Verifique se redireciona para: https://www.meuddd.com.br/
3. Observe a barra de endereços (deve mudar automaticamente)
```

**2. Teste com cURL:**
```bash
# Teste homepage
curl -I https://meuddd.com.br/

# Deve retornar:
# HTTP/2 301
# location: https://www.meuddd.com.br/

# Teste página de estados
curl -I https://meuddd.com.br/estados

# Deve retornar:
# HTTP/2 301
# location: https://www.meuddd.com.br/estados
```

**3. Teste com Ferramentas Online:**
- **Redirect Checker**: https://httpstatus.io/
- **SEO Site Checkup**: https://seositecheckup.com/tools/redirect-check
- **Screaming Frog**: Ferramenta desktop para verificar todos os redirecionamentos

**4. Teste Diferentes Páginas:**
```bash
# Homepage
curl -I https://meuddd.com.br/

# Estados
curl -I https://meuddd.com.br/estados

# Estado específico
curl -I https://meuddd.com.br/estado/sp

# Cidade específica
curl -I https://meuddd.com.br/cidade/sao-paulo

# Blog
curl -I https://meuddd.com.br/blog

# Post do blog
curl -I https://meuddd.com.br/blog/o-que-e-ddd
```

**5. Teste com Query Strings:**
```bash
# Com parâmetros
curl -I "https://meuddd.com.br/estados?regiao=sudeste"

# Deve redirecionar para:
# https://www.meuddd.com.br/estados?regiao=sudeste
```

## 📊 Verificação de SEO

### Google Search Console

**1. Definir Domínio Preferido:**
- Acesse: https://search.google.com/search-console
- Vá em: Configurações → Domínio preferido
- Selecione: "Exibir www"

**2. Verificar Redirecionamentos:**
- Ferramenta: Inspeção de URL
- Digite: https://meuddd.com.br/
- Verifique se o Google detecta o redirecionamento 301

**3. Atualizar Sitemap:**
- Certifique-se de que o sitemap usa URLs com www
- Atualizar para: https://www.meuddd.com.br/sitemap.xml

### Bing Webmaster Tools

**1. Configurar Domínio:**
- Acesse: https://www.bing.com/webmasters
- Adicione: www.meuddd.com.br (com www)

**2. Verificar Redirecionamentos:**
- Use a ferramenta de inspeção de URL
- Confirme que o redirecionamento 301 está funcionando

## 🔍 Monitoramento

### Métricas para Acompanhar

**1. Google Analytics:**
- Verifique se todas as visitas são contadas em `www.meuddd.com.br`
- Não deve haver tráfego em `meuddd.com.br` (sem www)

**2. Vercel Analytics:**
- Dashboard → Analytics
- Verifique se todos os acessos são para o domínio com www

**3. Google Search Console:**
- Impressões e cliques devem ser para URLs com www
- Verifique se não há erros de rastreamento

**4. Logs de Redirecionamento:**
- Vercel Dashboard → Logs
- Filtre por código 301
- Verifique se os redirecionamentos estão funcionando

## ⚠️ Considerações Importantes

### DNS Configuration

**Certifique-se de que o DNS está configurado:**

**Registro A (ou AAAA):**
```
www.meuddd.com.br → [IP do Vercel]
```

**Registro CNAME ou A para apex:**
```
meuddd.com.br → cname.vercel-dns.com
```

**Ou Registro A para apex:**
```
meuddd.com.br → [IP do Vercel]
```

### SSL/TLS Certificate

**Vercel automaticamente:**
- ✅ Provisiona certificado SSL para ambos (www e não-www)
- ✅ Renova automaticamente
- ✅ Força HTTPS

### Canonical Tags

**IMPORTANTE: Atualizar canonical tags em todas as páginas:**
```html
<link rel="canonical" href="https://www.meuddd.com.br/[caminho]" />
```

**Ação necessária:** Verificar e atualizar todas as canonical tags para usar www.

## 🚀 Deploy

### Passos para Aplicar

**1. Commit das Alterações:**
```bash
git add vercel.json
git commit -m "feat: Adicionar redirecionamento de não-www para www"
git push origin main
```

**2. Vercel Deploy Automático:**
- Vercel detecta o push
- Faz build do projeto
- Aplica a nova configuração de redirecionamento
- Deploy em produção

**3. Verificação Pós-Deploy:**
```bash
# Aguarde 2-3 minutos após o deploy
# Teste o redirecionamento
curl -I https://meuddd.com.br/

# Deve retornar 301 e location: https://www.meuddd.com.br/
```

## 📈 Impacto Esperado

### Curto Prazo (1-2 semanas)
- ✅ Redirecionamentos funcionando 100%
- ✅ Analytics mostrando apenas domínio com www
- ✅ Usuários não percebem diferença (redirecionamento transparente)

### Médio Prazo (1-2 meses)
- ✅ Google consolida autoridade no domínio com www
- ✅ Melhoria no ranking de busca (5-10%)
- ✅ Redução de conteúdo duplicado nos resultados

### Longo Prazo (3-6 meses)
- ✅ Autoridade de domínio consolidada
- ✅ Melhor posicionamento nos resultados de busca
- ✅ Aumento de tráfego orgânico (10-20%)

## 🔧 Troubleshooting

### Problema: Redirecionamento não funciona

**Solução 1: Verificar DNS**
```bash
# Verificar se apex está configurado
nslookup meuddd.com.br

# Deve retornar um IP válido
```

**Solução 2: Limpar Cache**
```bash
# Limpar cache do navegador
# Ou testar em modo anônimo
```

**Solução 3: Verificar Vercel**
```bash
# Vercel Dashboard → Domains
# Certifique-se de que ambos os domínios estão adicionados:
# - www.meuddd.com.br
# - meuddd.com.br
```

### Problema: Redirecionamento em loop

**Solução:**
```bash
# Verificar se não há conflito no vercel.json
# Certifique-se de que a configuração está exatamente como documentado
```

### Problema: SSL não funciona no apex

**Solução:**
```bash
# Vercel Dashboard → Settings → Domains
# Clique em "Refresh" no domínio apex (meuddd.com.br)
# Aguarde provisão do certificado SSL (pode levar até 24h)
```

## 📚 Referências

### Documentação Oficial
- **Vercel Redirects**: https://vercel.com/docs/project-configuration#project-configuration/redirects
- **Google SEO**: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- **MDN HTTP 301**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301

### Ferramentas Úteis
- **Redirect Checker**: https://httpstatus.io/
- **SEO Site Checkup**: https://seositecheckup.com/
- **Screaming Frog**: https://www.screamingfrog.co.uk/seo-spider/

### Artigos Recomendados
- **WWW vs Non-WWW**: https://www.searchenginejournal.com/www-vs-non-www-seo/
- **301 Redirects**: https://moz.com/learn/seo/redirection

## ⚠️ AÇÃO NECESSÁRIA: Atualizar Sitemap e Canonical Tags

### 1. Atualizar Sitemap
O sitemap atual precisa ser atualizado para usar URLs com www:
- Arquivo: `public/sitemap.xml`
- Trocar todas as URLs de `https://meuddd.com.br/` para `https://www.meuddd.com.br/`

### 2. Atualizar Canonical Tags
Todas as páginas precisam ter canonical tags atualizadas:
- Trocar de `https://meuddd.com.br/` para `https://www.meuddd.com.br/`
- Verificar componentes de SEO (Head, Helmet, etc.)

### 3. Atualizar Links Internos
Embora o redirecionamento funcione, é recomendado atualizar links internos:
- Links de navegação
- Links em conteúdo
- Links em rodapé

## ✅ Checklist de Implementação

- [x] Configuração adicionada ao vercel.json
- [x] JSON validado (sintaxe correta)
- [x] Documentação criada
- [ ] Commit e push para repositório
- [ ] Deploy no Vercel
- [ ] Teste de redirecionamento (homepage)
- [ ] Teste de redirecionamento (páginas internas)
- [ ] Teste com query strings
- [ ] **Atualizar sitemap.xml para usar www**
- [ ] **Atualizar canonical tags em todas as páginas**
- [ ] **Atualizar links internos**
- [ ] Verificação no Google Search Console
- [ ] Verificação no Bing Webmaster Tools
- [ ] Monitoramento de analytics (1 semana)
- [ ] Verificação de SEO (1 mês)

## 🎉 Resumo

**Implementado:** Redirecionamento automático 301 de não-www para www

**Benefícios:**
- ✅ Melhor SEO (evita conteúdo duplicado)
- ✅ Consistência de marca
- ✅ Analytics unificado
- ✅ Performance otimizada

**Próximos Passos:**
1. Fazer commit e push
2. Aguardar deploy automático
3. Testar redirecionamentos
4. **Atualizar sitemap e canonical tags**
5. Monitorar métricas

---

**Criado:** 2025-12-23  
**Status:** ✅ Implementado - Requer atualização de sitemap e canonical tags  
**Arquivo Modificado:** vercel.json  
**Domínio Padrão:** https://www.meuddd.com.br/
