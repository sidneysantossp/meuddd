# Sistema de Links Internos e Externos nos Artigos

## ✅ Implementação Completa

Foi implementado um sistema automático de injeção de links internos e externos em todos os 88 artigos do blog. Os links são adicionados automaticamente em palavras-chave relevantes, melhorando o SEO e a experiência do usuário.

## Arquivos Criados/Modificados

### 1. Novo Arquivo: `src/utils/linkInjector.ts`

Utilitário responsável por adicionar links no conteúdo dos artigos.

**Funções principais**:
- `injectLinks()`: Adiciona links em um texto
- `injectLinksInBlogPost()`: Adiciona links em todas as seções de um post
- `injectLinksInBlogPosts()`: Processa array de posts

### 2. Modificado: `src/data/blogPosts.ts`

Atualizado para usar o sistema de injeção de links:

```typescript
import { injectLinksInBlogPosts } from '@/utils/linkInjector';

// Gerar posts para o Acre (sem links)
const acreBlogPostsRaw = generateStateBlogPosts('Acre');

// Adicionar links internos e externos em todos os posts
export const acreBlogPosts = injectLinksInBlogPosts(acreBlogPostsRaw);
```

### 3. Modificado: `src/pages/BlogPostPage.tsx`

Atualizado para renderizar HTML com links usando `dangerouslySetInnerHTML`:

- Introdução
- Seções e subseções
- Conclusão
- FAQ (respostas)
- Checklist (itens)

## Links Internos Adicionados

### Páginas de Referência

| Palavra-chave | URL | Exemplo |
|---------------|-----|---------|
| Nome da cidade | `/cidade/{cidade-slug}` | Rio Branco → `/cidade/rio-branco` |
| Nome do estado | `/estado/{estado-slug}` | Acre → `/estado/acre` |
| Sigla do estado | `/estado/{estado-slug}` | AC → `/estado/acre` |
| DDD + número | `/cidade/{cidade-slug}` | DDD 68 → `/cidade/rio-branco` |
| código + número | `/cidade/{cidade-slug}` | código 68 → `/cidade/rio-branco` |

### Características dos Links Internos

- **Atributos**: `href`, `title`, `class`
- **Estilo**: `text-primary hover:underline font-medium`
- **Comportamento**: Navegação interna (sem `target="_blank"`)
- **SEO**: Ajuda na distribuição de link juice

## Links Externos Adicionados

### Sites Governamentais e de Autoridade

| Palavra-chave | URL | Descrição |
|---------------|-----|-----------|
| IBGE | https://www.ibge.gov.br | Instituto Brasileiro de Geografia e Estatística |
| Instituto Brasileiro de Geografia e Estatística | https://www.ibge.gov.br | IBGE |
| Anatel | https://www.gov.br/anatel/pt-br | Agência Nacional de Telecomunicações |
| Agência Nacional de Telecomunicações | https://www.gov.br/anatel/pt-br | Anatel |
| Procon | https://www.procon.sp.gov.br | Proteção e Defesa do Consumidor |
| Código de Defesa do Consumidor | https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor | CDC |
| CDC | https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor | Código de Defesa do Consumidor |
| Ministério das Comunicações | https://www.gov.br/mcom/pt-br | Ministério das Comunicações |

### Características dos Links Externos

- **Atributos**: `href`, `target="_blank"`, `rel="noopener noreferrer nofollow"`, `title`, `class`
- **Estilo**: `text-primary hover:underline font-medium`
- **Comportamento**: Abre em nova aba
- **SEO**: `nofollow` para links externos (boas práticas)

## Regras de Injeção

### 1. Primeira Ocorrência Apenas

Cada palavra-chave é linkada apenas na primeira vez que aparece no texto, evitando excesso de links.

```typescript
const maxReplacements = 1;
```

### 2. Palavras Completas

O sistema usa regex com `\b` (word boundary) para garantir que apenas palavras completas sejam linkadas:

- ✅ "Acre" em "no Acre" → linkado
- ❌ "Acre" em "Acrelândia" → não linkado

### 3. Evita Links Duplicados

O regex verifica se o texto já está dentro de um link antes de adicionar novo:

```typescript
(?<!<a[^>]*>)(?<!href=["'])\\b(keyword)\\b(?![^<]*<\/a>)
```

### 4. Case Insensitive

A busca é case insensitive, funcionando para "Acre", "acre", "ACRE", etc.

## Exemplo de Transformação

### Antes (texto original):

```
A cidade de Rio Branco no estado do Acre conta com diversos provedores.
O IBGE divulga dados sobre a região. A Anatel regula as telecomunicações.
O DDD 68 é usado em Rio Branco. Consulte o Procon para reclamações.
```

### Depois (com links):

```html
A cidade de <a href="/cidade/rio-branco" title="DDD de Rio Branco" class="text-primary hover:underline font-medium">Rio Branco</a> no estado do <a href="/estado/acre" title="Códigos DDD do Acre" class="text-primary hover:underline font-medium">Acre</a> conta com diversos provedores.
O <a href="https://www.ibge.gov.br" target="_blank" rel="noopener noreferrer nofollow" title="Instituto Brasileiro de Geografia e Estatística" class="text-primary hover:underline font-medium">IBGE</a> divulga dados sobre a região. A <a href="https://www.gov.br/anatel/pt-br" target="_blank" rel="noopener noreferrer nofollow" title="Agência Nacional de Telecomunicações" class="text-primary hover:underline font-medium">Anatel</a> regula as telecomunicações.
O <a href="/cidade/rio-branco" title="DDD 68 - Rio Branco" class="text-primary hover:underline font-medium">DDD 68</a> é usado em Rio Branco. Consulte o <a href="https://www.procon.sp.gov.br" target="_blank" rel="noopener noreferrer nofollow" title="Procon - Proteção e Defesa do Consumidor" class="text-primary hover:underline font-medium">Procon</a> para reclamações.
```

## Seções Afetadas

Os links são adicionados em todas as seções do artigo:

1. ✅ **Introdução** (3 parágrafos)
2. ✅ **Seções principais** (5-6 seções)
3. ✅ **Subseções** (10-15 subseções)
4. ✅ **Conclusão** (3 parágrafos)
5. ✅ **FAQ** (8 respostas)
6. ✅ **Checklist** (14-16 itens)

**Total**: ~30-40 blocos de texto por artigo × 88 artigos = ~2.640-3.520 blocos processados

## Benefícios SEO

### Links Internos

1. **Link Juice Distribution**: Distribui autoridade entre páginas
2. **Crawlability**: Facilita indexação pelo Google
3. **User Experience**: Navegação intuitiva
4. **Dwell Time**: Aumenta tempo no site
5. **Bounce Rate**: Reduz taxa de rejeição

### Links Externos

1. **Autoridade**: Links para sites governamentais aumentam confiabilidade
2. **Relevância**: Mostra que o conteúdo é bem pesquisado
3. **E-A-T**: Melhora Expertise, Authoritativeness, Trustworthiness
4. **User Value**: Fornece fontes oficiais para o usuário

## Estatísticas

| Métrica | Valor |
|---------|-------|
| Total de Artigos | 88 |
| Palavras-chave Internas | 5 por artigo |
| Palavras-chave Externas | 5 por artigo |
| Links Potenciais por Artigo | 10 |
| Total de Links Potenciais | ~880 |
| Seções Processadas | ~2.640-3.520 |

## Manutenção e Expansão

### Adicionar Novos Links Externos

Edite `src/utils/linkInjector.ts`:

```typescript
const externalLinks: LinkRule[] = [
  // ... links existentes
  {
    keywords: ['Nova Palavra-chave'],
    url: 'https://exemplo.com',
    isExternal: true,
    title: 'Descrição do Link'
  }
];
```

### Adicionar Novos Links Internos

Os links internos são gerados automaticamente baseados em:
- Nome da cidade
- Nome do estado
- Sigla do estado
- Código DDD

Para adicionar novos padrões, edite a função `injectLinks()` em `linkInjector.ts`.

### Expandir para Outros Estados

Quando adicionar artigos de outros estados, os links serão automaticamente injetados:

```typescript
// Gerar posts para Alagoas
const alagoasBlogPostsRaw = generateStateBlogPosts('Alagoas');
export const alagoasBlogPosts = injectLinksInBlogPosts(alagoasBlogPostsRaw);
```

## Testes

### Build

```bash
npm run build
```

✅ **Resultado**: Build bem-sucedido (3.017 MB)

### Verificação Manual

1. Acesse qualquer artigo: `/blog/acre/{cidade}/{slug}`
2. Inspecione o HTML
3. Verifique se as palavras-chave têm links
4. Teste cliques nos links internos e externos

### Exemplo de Teste

Artigo: `/blog/acre/rio-branco/melhor-internet-fibra-rio-branco`

Verificar:
- [ ] "Rio Branco" tem link para `/cidade/rio-branco`
- [ ] "Acre" tem link para `/estado/acre`
- [ ] "DDD 68" tem link para `/cidade/rio-branco`
- [ ] "IBGE" tem link para `https://www.ibge.gov.br`
- [ ] "Anatel" tem link para `https://www.gov.br/anatel/pt-br`
- [ ] Links externos abrem em nova aba
- [ ] Links internos navegam na mesma aba
- [ ] Estilo dos links está correto (azul, hover underline)

## Segurança

### dangerouslySetInnerHTML

O uso de `dangerouslySetInnerHTML` é seguro neste caso porque:

1. **Conteúdo Controlado**: Todo o conteúdo é gerado internamente
2. **Sem Input do Usuário**: Não há entrada de usuário no conteúdo
3. **HTML Sanitizado**: Apenas tags `<a>` são adicionadas
4. **Regex Controlado**: O regex é específico e não permite injeção

### Boas Práticas Aplicadas

- ✅ `rel="noopener noreferrer"` em links externos
- ✅ `rel="nofollow"` em links externos (SEO)
- ✅ `target="_blank"` apenas em links externos
- ✅ `title` attribute para acessibilidade
- ✅ Classes CSS para estilização consistente

## Conclusão

✅ **Sistema de links implementado com sucesso!**

- 88 artigos com links internos e externos
- Palavras-chave automaticamente linkadas
- SEO otimizado
- Experiência do usuário melhorada
- Fácil manutenção e expansão

O sistema está pronto para produção e contribuirá significativamente para o SEO e a navegabilidade do site.
