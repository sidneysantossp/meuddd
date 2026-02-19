# Guia Rápido: Como Testar URLs Canonical no Navegador

## 🚀 Teste Rápido (30 segundos)

### Passo 1: Abrir a Aplicação
```bash
npm run dev
```

### Passo 2: Abrir no Navegador
Acesse: `http://localhost:5173/cidade/acrelandia`

### Passo 3: Abrir DevTools
Pressione `F12` ou `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac)

### Passo 4: Executar no Console
Cole e execute este comando:
```javascript
document.querySelector('link[rel="canonical"]')?.href
```

### ✅ Resultado Esperado
```
"https://www.meuddd.com.br/cidade/acrelandia"
```

---

## 🔍 Teste Detalhado

### Método 1: Inspecionar Elemento

1. **Abra a aplicação** no navegador
2. **Clique com botão direito** em qualquer lugar da página
3. **Selecione "Inspecionar"** ou "Inspect Element"
4. **Vá para a aba "Elements"** (Chrome) ou "Inspetor" (Firefox)
5. **Expanda a tag `<head>`**
6. **Procure por `<link rel="canonical"`**

**Você deve ver algo assim:**
```html
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ...
  <link rel="canonical" href="https://www.meuddd.com.br/cidade/acrelandia">
  ...
</head>
```

### Método 2: Console JavaScript

Abra o console (F12 → Console) e execute:

```javascript
// Verificar se canonical existe
const canonical = document.querySelector('link[rel="canonical"]');
console.log('Canonical encontrada:', canonical !== null);

// Mostrar URL canonical
console.log('URL Canonical:', canonical?.href);

// Verificar se é absoluta
const isAbsolute = canonical?.href.startsWith('https://');
console.log('É URL absoluta:', isAbsolute);

// Verificar se corresponde ao domínio correto
const isCorrectDomain = canonical?.href.includes('meuddd.com.br');
console.log('Domínio correto:', isCorrectDomain);
```

**Resultado esperado:**
```
Canonical encontrada: true
URL Canonical: https://www.meuddd.com.br/cidade/acrelandia
É URL absoluta: true
Domínio correto: true
```

### Método 3: Verificar Todas as Meta Tags

```javascript
// Listar todas as meta tags e links importantes
const seoTags = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content,
  canonical: document.querySelector('link[rel="canonical"]')?.href,
  ogTitle: document.querySelector('meta[property="og:title"]')?.content,
  ogUrl: document.querySelector('meta[property="og:url"]')?.content,
  ogDescription: document.querySelector('meta[property="og:description"]')?.content,
};

console.table(seoTags);
```

**Resultado esperado:**
```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│   (index)   │                           Values                             │
├─────────────┼──────────────────────────────────────────────────────────────┤
│   title     │ 'DDD 68 em Acrelândia - Guia Completo da Cidade de AC'     │
│ description │ 'Código DDD 68 Acrelândia. População de 15.256 habitantes...'│
│  canonical  │ 'https://www.meuddd.com.br/cidade/acrelandia'               │
│  ogTitle    │ 'DDD 68 em Acrelândia - Guia Completo da Cidade de AC'     │
│   ogUrl     │ 'https://www.meuddd.com.br/cidade/acrelandia'               │
│ogDescription│ 'Código DDD 68 Acrelândia. População de 15.256 habitantes...'│
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## 📋 Checklist de Teste

Teste as seguintes páginas e verifique se todas têm canonical URL:

### Páginas Principais
- [ ] **Home**: `http://localhost:5173/`
  - Canonical esperada: `https://www.meuddd.com.br/`
  
- [ ] **Estados**: `http://localhost:5173/estados`
  - Canonical esperada: `https://www.meuddd.com.br/estados`
  
- [ ] **Detalhes do Estado**: `http://localhost:5173/estado/acre`
  - Canonical esperada: `https://www.meuddd.com.br/estado/acre`
  
- [ ] **Detalhes da Cidade**: `http://localhost:5173/cidade/acrelandia`
  - Canonical esperada: `https://www.meuddd.com.br/cidade/acrelandia`
  
- [ ] **Sobre**: `http://localhost:5173/sobre`
  - Canonical esperada: `https://www.meuddd.com.br/sobre`
  
- [ ] **Contato**: `http://localhost:5173/contato`
  - Canonical esperada: `https://www.meuddd.com.br/contato`
  
- [ ] **Validar DDD**: `http://localhost:5173/validar`
  - Canonical esperada: `https://www.meuddd.com.br/validar`
  
- [ ] **Gerador**: `http://localhost:5173/gerador`
  - Canonical esperada: `https://www.meuddd.com.br/gerador`
  
- [ ] **Busca por Voz**: `http://localhost:5173/busca-voz`
  - Canonical esperada: `https://www.meuddd.com.br/busca-voz`
  
- [ ] **Blog**: `http://localhost:5173/blog`
  - Canonical esperada: `https://www.meuddd.com.br/blog`

### Script de Teste Automatizado

Salve este código como `test-canonical-browser.js` e execute no console:

```javascript
// Lista de páginas para testar
const pagesToTest = [
  { path: '/', expected: 'https://www.meuddd.com.br/' },
  { path: '/estados', expected: 'https://www.meuddd.com.br/estados' },
  { path: '/estado/acre', expected: 'https://www.meuddd.com.br/estado/acre' },
  { path: '/cidade/acrelandia', expected: 'https://www.meuddd.com.br/cidade/acrelandia' },
  { path: '/sobre', expected: 'https://www.meuddd.com.br/sobre' },
  { path: '/contato', expected: 'https://www.meuddd.com.br/contato' },
  { path: '/validar', expected: 'https://www.meuddd.com.br/validar' },
  { path: '/gerador', expected: 'https://www.meuddd.com.br/gerador' },
  { path: '/busca-voz', expected: 'https://www.meuddd.com.br/busca-voz' },
  { path: '/blog', expected: 'https://www.meuddd.com.br/blog' },
];

// Função para testar canonical em uma página
async function testCanonical(page) {
  return new Promise((resolve) => {
    // Navegar para a página
    window.history.pushState({}, '', page.path);
    window.dispatchEvent(new Event('popstate'));
    
    // Aguardar um pouco para o React renderizar
    setTimeout(() => {
      const canonical = document.querySelector('link[rel="canonical"]')?.href;
      const passed = canonical === page.expected;
      
      resolve({
        path: page.path,
        expected: page.expected,
        actual: canonical,
        passed: passed,
      });
    }, 500);
  });
}

// Executar testes
async function runTests() {
  console.log('🧪 Iniciando testes de canonical URLs...\n');
  
  const results = [];
  for (const page of pagesToTest) {
    const result = await testCanonical(page);
    results.push(result);
    
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.path}`);
    if (!result.passed) {
      console.log(`   Esperado: ${result.expected}`);
      console.log(`   Obtido: ${result.actual}`);
    }
  }
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);
  
  console.log(`\n📊 Resultado: ${passed}/${total} testes passaram (${percentage}%)`);
  
  if (passed === total) {
    console.log('🎉 Todos os testes passaram!');
  } else {
    console.log('⚠️  Alguns testes falharam. Verifique os detalhes acima.');
  }
  
  return results;
}

// Executar
runTests();
```

---

## 🛠️ Ferramentas de Teste

### 1. Extensões do Navegador

**Chrome/Edge:**
- [SEOquake](https://chrome.google.com/webstore/detail/seoquake)
- [MozBar](https://chrome.google.com/webstore/detail/mozbar)
- [META SEO inspector](https://chrome.google.com/webstore/detail/meta-seo-inspector)

**Firefox:**
- [SEO Minion](https://addons.mozilla.org/en-US/firefox/addon/seo-minion/)

### 2. Ferramentas Online

- **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
  - Teste de URL
  - Inspeção de URL
  - Cobertura de índice

- **Google Rich Results Test**: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
  - Testa dados estruturados
  - Mostra canonical URL

- **Screaming Frog SEO Spider**: [screamingfrog.co.uk](https://www.screamingfrog.co.uk/seo-spider/)
  - Rastreia todo o site
  - Lista todas as canonical URLs
  - Identifica problemas

### 3. Linha de Comando

```bash
# Usando curl e grep
curl -s http://localhost:5173/cidade/acrelandia | grep -o '<link rel="canonical"[^>]*>'

# Usando wget
wget -qO- http://localhost:5173/cidade/acrelandia | grep canonical
```

**Nota**: Como é uma SPA, o canonical é injetado via JavaScript, então esses comandos podem não funcionar. Use ferramentas que executam JavaScript como Puppeteer ou Playwright.

---

## 🐛 Problemas Comuns

### Problema 1: Canonical não aparece
**Sintoma**: `document.querySelector('link[rel="canonical"]')` retorna `null`

**Possíveis causas:**
1. SEOHead não foi adicionado à página
2. react-helmet-async não está configurado
3. Página ainda está carregando

**Solução:**
```javascript
// Aguardar um pouco e tentar novamente
setTimeout(() => {
  console.log(document.querySelector('link[rel="canonical"]')?.href);
}, 1000);
```

### Problema 2: URL relativa em vez de absoluta
**Sintoma**: Canonical é `/cidade/acrelandia` em vez de `https://www.meuddd.com.br/cidade/acrelandia`

**Solução**: Verificar se a URL está sendo convertida para absoluta:
```typescript
const canonicalUrl = `https://www.meuddd.com.br${seoData.canonical}`;
```

### Problema 3: Canonical diferente do esperado
**Sintoma**: Canonical aponta para URL errada

**Solução**: Verificar configuração em `src/data/seoData.ts` ou função `generateCitySEO`

---

## ✅ Critérios de Sucesso

Uma canonical URL está correta quando:

1. ✅ **Existe**: Tag `<link rel="canonical">` está presente no `<head>`
2. ✅ **É absoluta**: Começa com `https://www.meuddd.com.br`
3. ✅ **É única**: Cada página tem sua própria canonical
4. ✅ **Corresponde ao sitemap**: URL no sitemap.xml é a mesma
5. ✅ **É acessível**: URL retorna 200 OK quando acessada
6. ✅ **É consistente**: Não muda entre recarregamentos

---

## 📚 Recursos Adicionais

- [Google: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Moz: Canonical Tag Guide](https://moz.com/learn/seo/canonicalization)
- [Ahrefs: Canonical Tags](https://ahrefs.com/blog/canonical-tags/)

---

**Última atualização**: 2025-12-20
**Versão**: 1.0
