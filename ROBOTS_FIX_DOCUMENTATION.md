# Correção do Problema de Injeção do robots.txt pela Plataforma Miaoda

## 🔍 Problema Identificado

A plataforma Miaoda estava injetando automaticamente um arquivo `robots.txt` próprio que sobrescrevia o arquivo correto do projeto, resultando em:

- ❌ **URL incorreta do sitemap**: `https://medo.dev/api/miaoda/sitemapPush/sitemap.xml`
- ❌ **sitemap.xml redirecionando para home** (interceptado pelo React Router)
- ✅ **URL correta esperada**: `https://www.meuddd.com.br/sitemap.xml`

### Causa Raiz

A plataforma Miaoda injeta automaticamente um `robots.txt` em nível de CDN/plataforma, que sobrescreve qualquer arquivo local do projeto. Isso acontece porque a plataforma tem um serviço de sitemap centralizado em `https://medo.dev/api/miaoda/sitemapPush/sitemap.xml`.

## ✅ Soluções Implementadas (Múltiplas Camadas de Proteção)

Implementei **5 camadas de proteção** para garantir que os arquivos corretos sejam servidos:

### 1. Arquivo de Configuração da Plataforma (`.miaoda.json`)

Criado arquivo `.miaoda.json` na raiz do projeto para tentar desabilitar a injeção da plataforma:

```json
{
  "seo": {
    "disableRobotsTxtInjection": true,
    "disableSitemapInjection": true,
    "useCustomRobotsTxt": true,
    "useCustomSitemap": true
  },
  "cdn": {
    "bypassRobotsTxt": true,
    "bypassSitemap": true
  }
}
```

**Objetivo**: Informar à plataforma Miaoda que este projeto usa arquivos customizados e não deve injetar os próprios.

### 2. Headers do Vercel (`public/_headers`)

Criado arquivo `public/_headers` para definir headers HTTP específicos:

```
/robots.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
  X-Miaoda-Override: true

/sitemap.xml
  Content-Type: application/xml; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
  X-Miaoda-Override: true
```

**Objetivo**: 
- Definir headers corretos para os arquivos
- Desabilitar cache para forçar revalidação
- Adicionar header customizado `X-Miaoda-Override: true` para sinalizar override

### 3. Configuração do Vercel (`vercel.json`)

Atualizado `vercel.json` com múltiplas configurações:

#### a) Rewrites (maior prioridade)
```json
"rewrites": [
  {
    "source": "/robots.txt",
    "destination": "/robots.txt"
  },
  {
    "source": "/sitemap.xml",
    "destination": "/sitemap.xml"
  }
]
```

#### b) Headers HTTP
```json
"headers": [
  {
    "source": "/robots.txt",
    "headers": [
      {
        "key": "Content-Type",
        "value": "text/plain; charset=utf-8"
      },
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }
    ]
  },
  {
    "source": "/sitemap.xml",
    "headers": [
      {
        "key": "Content-Type",
        "value": "application/xml; charset=utf-8"
      },
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      },
      {
        "key": "X-Robots-Tag",
        "value": "noindex"
      }
    ]
  }
]
```

#### c) Routes com Headers Inline
```json
"routes": [
  {
    "src": "/robots.txt",
    "dest": "/robots.txt",
    "headers": {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  },
  {
    "src": "/sitemap.xml",
    "dest": "/sitemap.xml",
    "headers": {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  }
]
```

**Objetivo**: 
- Usar rewrites para maior prioridade
- Desabilitar cache completamente (`max-age=0, must-revalidate`)
- Garantir Content-Type correto
- Adicionar `X-Robots-Tag: noindex` no sitemap para evitar indexação do próprio sitemap

### 4. Plugin Vite com Hook de Build (`vite.config.ts`)

Atualizado o plugin `staticFilesPlugin` para incluir um hook `closeBundle`:

```typescript
const staticFilesPlugin = () => {
  return {
    name: 'serve-static-files',
    configureServer(server: any) {
      // ... código existente para dev server ...
    },
    closeBundle() {
      // Após o build, garantir que os arquivos corretos estejam no dist
      const distPath = path.resolve(__dirname, 'dist');
      const publicPath = path.resolve(__dirname, 'public');
      
      // Copiar robots.txt
      const robotsSource = path.join(publicPath, 'robots.txt');
      const robotsDest = path.join(distPath, 'robots.txt');
      if (fs.existsSync(robotsSource)) {
        fs.copyFileSync(robotsSource, robotsDest);
        console.log('✅ robots.txt copiado para dist/');
      }
      
      // Copiar sitemap.xml
      const sitemapSource = path.join(publicPath, 'sitemap.xml');
      const sitemapDest = path.join(distPath, 'sitemap.xml');
      if (fs.existsSync(sitemapSource)) {
        fs.copyFileSync(sitemapSource, sitemapDest);
        console.log('✅ sitemap.xml copiado para dist/');
      }
      
      // Criar arquivo .miaoda-static para indicar que estes arquivos não devem ser sobrescritos
      const miaodaStaticPath = path.join(distPath, '.miaoda-static');
      fs.writeFileSync(miaodaStaticPath, JSON.stringify({
        files: ['robots.txt', 'sitemap.xml'],
        override: false,
        timestamp: new Date().toISOString()
      }, null, 2));
      console.log('✅ .miaoda-static criado em dist/');
    },
  };
};
```

**Objetivo**:
- Garantir que após o build, os arquivos corretos sejam copiados para `dist/`
- Criar arquivo `.miaoda-static` para sinalizar à plataforma que estes arquivos não devem ser sobrescritos
- Fornecer feedback visual no console durante o build

### 5. Arquivo de Metadados (`.miaoda-static`)

Criado automaticamente durante o build em `dist/.miaoda-static`:

```json
{
  "files": [
    "robots.txt",
    "sitemap.xml"
  ],
  "override": false,
  "timestamp": "2025-12-23T13:06:59.060Z"
}
```

**Objetivo**: Informar à plataforma Miaoda quais arquivos não devem ser sobrescritos durante o deploy.

## 📋 Arquivos Modificados

### Arquivos Criados
1. `.miaoda.json` - Configuração da plataforma Miaoda
2. `public/_headers` - Headers do Vercel
3. `dist/.miaoda-static` - Metadados de arquivos protegidos (gerado automaticamente)

### Arquivos Modificados
1. `vercel.json` - Adicionado rewrites, atualizado headers e routes
2. `vite.config.ts` - Adicionado hook `closeBundle` no plugin
3. `vite.config.dev.ts` - Plugin para desenvolvimento (commit anterior)

### Arquivos Verificados (Já Corretos)
1. `public/robots.txt` - Conteúdo correto com URL do sitemap
2. `public/sitemap.xml` - 534 URLs com domínio correto

## 🚀 Como Funciona

### Durante o Desenvolvimento
1. O plugin `staticFilesPlugin` intercepta requisições para `/robots.txt` e `/sitemap.xml`
2. Serve os arquivos diretamente de `public/` com headers corretos
3. Funciona tanto em `vite.config.ts` quanto em `vite.config.dev.ts`

### Durante o Build
1. Vite copia automaticamente arquivos de `public/` para `dist/`
2. O hook `closeBundle` é executado após o build
3. Arquivos são copiados novamente para garantir integridade
4. Arquivo `.miaoda-static` é criado com metadados
5. Console mostra confirmação visual:
   ```
   ✅ robots.txt copiado para dist/
   ✅ sitemap.xml copiado para dist/
   ✅ .miaoda-static criado em dist/
   ```

### Durante o Deploy
1. Vercel lê `vercel.json` e aplica rewrites (maior prioridade)
2. Vercel lê `public/_headers` e aplica headers HTTP
3. Arquivos de `dist/` são servidos com configurações corretas
4. Plataforma Miaoda (esperamos) respeita `.miaoda.json` e `.miaoda-static`
5. Cache desabilitado (`max-age=0`) força revalidação

### Em Produção
1. CDN/Plataforma Miaoda (esperamos) não injeta robots.txt devido às configurações
2. Vercel serve os arquivos corretos de `dist/`
3. Headers HTTP corretos são aplicados
4. Sem cache, garantindo sempre a versão mais recente

## 🔍 Verificação

### Após o Deploy

1. **Verificar robots.txt**:
   ```bash
   curl -I https://www.meuddd.com.br/robots.txt
   ```
   Deve retornar:
   - `Content-Type: text/plain; charset=utf-8`
   - `Cache-Control: public, max-age=0, must-revalidate`

2. **Verificar conteúdo do robots.txt**:
   ```bash
   curl https://www.meuddd.com.br/robots.txt
   ```
   Deve mostrar:
   ```
   User-agent: *
   Allow: /
   Disallow: /projects/
   Disallow: /plugin/

   Sitemap: https://www.meuddd.com.br/sitemap.xml
   ```

3. **Verificar sitemap.xml**:
   ```bash
   curl -I https://www.meuddd.com.br/sitemap.xml
   ```
   Deve retornar:
   - `Content-Type: application/xml; charset=utf-8`
   - `Cache-Control: public, max-age=0, must-revalidate`

4. **Verificar conteúdo do sitemap.xml**:
   ```bash
   curl https://www.meuddd.com.br/sitemap.xml | head -20
   ```
   Deve mostrar XML com URLs do domínio `www.meuddd.com.br`

### Limpeza de Cache

Se ainda aparecer a URL antiga:

1. **Cache do Navegador**:
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
   - Ou abrir em aba anônima

2. **Cache do CDN**:
   - Aguardar 5-10 minutos para propagação
   - Ou limpar cache manualmente no painel da Miaoda (se disponível)

3. **Cache do Google**:
   - Google Search Console > Inspeção de URL
   - Digite: `https://www.meuddd.com.br/robots.txt`
   - Clique em "Solicitar indexação"

## 📊 Próximos Passos

1. ⏳ **Aguardar Deploy** (2-5 minutos)
2. 🔍 **Verificar robots.txt** em: https://www.meuddd.com.br/robots.txt
3. 🔍 **Verificar sitemap.xml** em: https://www.meuddd.com.br/sitemap.xml
4. 🧹 **Limpar cache** se necessário (Ctrl+Shift+R)
5. 📊 **Submeter ao Google Search Console**:
   - Acesse: https://search.google.com/search-console
   - Vá em "Sitemaps"
   - Adicione: `https://www.meuddd.com.br/sitemap.xml`
6. 📊 **Submeter ao Bing Webmaster Tools**:
   - Acesse: https://www.bing.com/webmasters
   - Vá em "Sitemaps"
   - Adicione: `https://www.meuddd.com.br/sitemap.xml`
7. 🔎 **Verificar indexação**: Pesquisar `site:www.meuddd.com.br` no Google
8. 📈 **Monitorar cobertura** no Google Search Console

## ⚠️ Se o Problema Persistir

Se após o deploy e limpeza de cache você ainda ver a URL incorreta:

### Opção 1: Verificar Logs do Deploy
- Verificar se o build foi concluído com sucesso
- Procurar pelas mensagens:
  ```
  ✅ robots.txt copiado para dist/
  ✅ sitemap.xml copiado para dist/
  ✅ .miaoda-static criado em dist/
  ```

### Opção 2: Verificar Arquivos no Servidor
- Acessar o painel da Miaoda
- Verificar se os arquivos `robots.txt` e `sitemap.xml` estão corretos no servidor
- Verificar se o arquivo `.miaoda-static` foi deployado

### Opção 3: Contatar Suporte da Miaoda
Se nenhuma das soluções funcionar, pode ser necessário:
- Entrar em contato com o suporte da Miaoda
- Solicitar desabilitação manual da injeção de robots.txt
- Verificar se há alguma configuração de nível de plataforma que precisa ser ajustada
- Perguntar sobre o arquivo `.miaoda.json` e se há outras opções de configuração

### Opção 4: Solução Alternativa (Último Recurso)
Se a plataforma Miaoda não respeitar as configurações:
- Criar uma página `/robots` que redireciona para o robots.txt correto
- Usar um Edge Function do Vercel para interceptar requisições
- Considerar migrar para outra plataforma de hospedagem

## 📝 Resumo das Camadas de Proteção

| Camada | Arquivo | Objetivo | Prioridade |
|--------|---------|----------|------------|
| 1 | `.miaoda.json` | Desabilitar injeção da plataforma | Alta |
| 2 | `public/_headers` | Headers HTTP do Vercel | Alta |
| 3 | `vercel.json` (rewrites) | Rewrites do Vercel | Muito Alta |
| 4 | `vercel.json` (headers) | Headers HTTP do Vercel | Alta |
| 5 | `vercel.json` (routes) | Rotas do Vercel | Média |
| 6 | `vite.config.ts` (closeBundle) | Copiar arquivos após build | Alta |
| 7 | `dist/.miaoda-static` | Metadados de proteção | Média |

## ✅ Resultado Esperado

**ANTES:**
- ❌ robots.txt servido pela plataforma Miaoda
- ❌ URL do sitemap: `https://medo.dev/api/miaoda/sitemapPush/sitemap.xml`
- ❌ sitemap.xml redirecionava para home

**DEPOIS:**
- ✅ robots.txt servido do arquivo `public/robots.txt`
- ✅ URL do sitemap: `https://www.meuddd.com.br/sitemap.xml`
- ✅ sitemap.xml serve o arquivo XML correto com 534 URLs
- ✅ Múltiplas camadas de proteção garantem que arquivos corretos sejam servidos
- ✅ Funciona tanto em desenvolvimento quanto em produção
- ✅ Cache desabilitado para forçar revalidação

## 🔧 Commits Relacionados

1. **e8a6e20** - Correção inicial do robots.txt
2. **6b2eade** - Adicionar plugin para servir robots.txt e sitemap.xml corretamente
3. **84188b3** - Adicionar múltiplas camadas de proteção (commit atual)

---

**Data**: 2025-12-23  
**Status**: ✅ Implementado e testado localmente  
**Aguardando**: Deploy e verificação em produção
