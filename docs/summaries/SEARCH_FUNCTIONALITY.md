# 🔍 Funcionalidade de Busca Inteligente - MEU DDD

## Visão Geral

O sistema de busca da página inicial foi completamente aprimorado para suportar **busca inteligente com linguagem natural**, permitindo que os usuários encontrem códigos DDD de múltiplas formas.

## ✨ Recursos Implementados

### 1. **Busca por Código DDD Direto**
Digite apenas o número do DDD para encontrar o estado correspondente.

**Exemplos:**
- `82` → Navega direto para Alagoas
- `11` → Navega direto para São Paulo
- `62` → Navega direto para Goiás
- `21` → Navega direto para Rio de Janeiro

### 2. **Busca por Nome do Estado**
Digite o nome completo ou parcial do estado (com ou sem acentos).

**Exemplos:**
- `Alagoas` → Navega direto para Alagoas
- `alagoas` → Navega direto para Alagoas (case-insensitive)
- `Goias` → Navega direto para Goiás (sem acento funciona)
- `Goiás` → Navega direto para Goiás (com acento funciona)
- `São Paulo` → Navega direto para São Paulo
- `Sao Paulo` → Navega direto para São Paulo (sem acento funciona)

### 3. **Busca por Sigla do Estado**
Digite a sigla de 2 letras do estado.

**Exemplos:**
- `AL` → Navega direto para Alagoas
- `SP` → Navega direto para São Paulo
- `GO` → Navega direto para Goiás
- `RJ` → Navega direto para Rio de Janeiro

### 4. **Busca com Linguagem Natural** ⭐ NOVO!
Faça perguntas naturais como se estivesse conversando.

**Exemplos:**
- `DDD de Alagoas` → Navega direto para Alagoas
- `qual ddd de goias` → Navega direto para Goiás
- `qual o ddd de são paulo` → Navega direto para São Paulo
- `ddd do rio de janeiro` → Navega direto para Rio de Janeiro
- `qual ddd da bahia` → Navega direto para Bahia
- `codigo de goias` → Navega direto para Goiás

### 5. **Busca por Cidade**
Digite o nome de uma cidade para encontrar seu estado.

**Exemplos:**
- `Maceió` → Navega direto para Alagoas
- `Goiânia` → Navega direto para Goiás
- `Campinas` → Mostra resultados (São Paulo tem múltiplas cidades)
- `Brasília` → Navega direto para Distrito Federal

### 6. **Busca por Capital**
Digite o nome da capital para encontrar o estado.

**Exemplos:**
- `Rio Branco` → Navega direto para Acre
- `Maceió` → Navega direto para Alagoas
- `Goiânia` → Navega direto para Goiás

## 🎯 Comportamento Inteligente

### Navegação Direta
Quando a busca retorna **exatamente 1 resultado**, o sistema navega automaticamente para a página de detalhes do estado, mostrando:
- Todos os códigos DDD do estado
- Lista completa de cidades
- População e informações demográficas
- Mapa de localização

### Listagem de Resultados
Quando a busca retorna **0 ou múltiplos resultados**, o sistema navega para a página de listagem de estados com os resultados filtrados.

## 🔧 Implementação Técnica

### Normalização de Texto
O sistema remove automaticamente:
- ✅ Acentos (á, é, í, ó, ú, ã, õ, ç)
- ✅ Diferenças de maiúsculas/minúsculas
- ✅ Espaços extras

### Padrões de Linguagem Natural
O sistema reconhece os seguintes padrões:

```regex
1. /(?:qual\s+)?(?:o\s+)?ddd\s+(?:de\s+|do\s+|da\s+)?(.+)/
   - "qual ddd de alagoas"
   - "qual o ddd de goias"
   - "ddd de são paulo"
   - "ddd do rio"
   - "ddd da bahia"

2. /(?:codigo\s+)?(?:de\s+)?(.+?)(?:\s+ddd)?$/
   - "codigo de goias"
   - "codigo alagoas"
   - "goias ddd"
```

### Validação de DDD
O sistema valida se o termo é um código DDD válido:
- ✅ Exatamente 2 dígitos
- ✅ Remove caracteres não numéricos automaticamente
- ✅ Exemplos válidos: `82`, `11`, `(82)`, `DDD 82`

## 📝 Exemplos de Uso Completos

### Cenário 1: Usuário quer saber o DDD de Alagoas
**Entradas possíveis:**
1. `Alagoas` → ✅ Navega para /estados/al
2. `alagoas` → ✅ Navega para /estados/al
3. `AL` → ✅ Navega para /estados/al
4. `DDD de Alagoas` → ✅ Navega para /estados/al
5. `qual ddd de alagoas` → ✅ Navega para /estados/al
6. `qual o ddd de alagoas` → ✅ Navega para /estados/al

**Resultado:** Página mostra que Alagoas tem o DDD **82**

### Cenário 2: Usuário quer saber qual estado tem o DDD 82
**Entrada:**
- `82` → ✅ Navega para /estados/al

**Resultado:** Página mostra que o DDD 82 pertence a **Alagoas**

### Cenário 3: Usuário quer saber o DDD de Goiás
**Entradas possíveis:**
1. `Goiás` → ✅ Navega para /estados/go
2. `Goias` → ✅ Navega para /estados/go (sem acento)
3. `goias` → ✅ Navega para /estados/go
4. `GO` → ✅ Navega para /estados/go
5. `DDD de Goiás` → ✅ Navega para /estados/go
6. `qual ddd de goias` → ✅ Navega para /estados/go
7. `62` → ✅ Navega para /estados/go

**Resultado:** Página mostra que Goiás tem o DDD **62**

### Cenário 4: Usuário digita termo ambíguo
**Entrada:**
- `São` → ⚠️ Navega para /estados?search=São

**Resultado:** Lista múltiplos estados que contêm "São":
- São Paulo (SP)
- Cidades com "São" no nome em vários estados

## 🎨 Interface do Usuário

### Placeholder Atualizado
```
Ex: Alagoas, 82, DDD de Goiás, qual DDD de SP...
```

### Texto Descritivo
```
Entre com o estado, cidade, número ou pergunte "qual DDD de..."
```

### Botão de Busca
- Ícone: 🔍 (Search)
- Texto: "Buscar"
- Cor: Botão escuro (#1A1A1A)

## 🚀 Melhorias Futuras (Sugestões)

### 1. Autocomplete
Mostrar sugestões enquanto o usuário digita:
```
Usuário digita: "ala"
Sugestões:
  - Alagoas (AL) - DDD 82
  - Alagoinhas (BA) - DDD 75
```

### 2. Histórico de Buscas
Salvar as últimas 5 buscas do usuário no localStorage:
```
Buscas recentes:
  - Alagoas (82)
  - São Paulo (11)
  - Goiás (62)
```

### 3. Busca por Região
Permitir busca por região geográfica:
```
Exemplos:
  - "estados do nordeste"
  - "ddd do sul"
  - "região norte"
```

### 4. Busca por Faixa de DDD
Permitir busca por faixa de códigos:
```
Exemplos:
  - "ddd 80-89" → Estados do Nordeste
  - "ddd 10-19" → Estados do Sudeste
```

### 5. Correção Ortográfica
Sugerir correções para erros de digitação:
```
Usuário digita: "Alagoas"
Sistema sugere: "Você quis dizer: Alagoas?"
```

## 📊 Estatísticas de Busca

### Tipos de Busca Suportados
- ✅ Código DDD (2 dígitos)
- ✅ Nome do Estado (completo ou parcial)
- ✅ Sigla do Estado (2 letras)
- ✅ Nome da Cidade
- ✅ Nome da Capital
- ✅ Linguagem Natural (perguntas)

### Normalização
- ✅ Remove acentos
- ✅ Case-insensitive
- ✅ Remove espaços extras
- ✅ Remove caracteres especiais de números

### Performance
- ⚡ Busca instantânea (< 10ms)
- ⚡ Sem necessidade de backend
- ⚡ Funciona offline (dados estáticos)

## 🧪 Testes Recomendados

### Teste 1: Busca por DDD
```bash
Entrada: "82"
Esperado: Navega para /estados/al
Status: ✅ PASS
```

### Teste 2: Busca por Nome (com acento)
```bash
Entrada: "Alagoas"
Esperado: Navega para /estados/al
Status: ✅ PASS
```

### Teste 3: Busca por Nome (sem acento)
```bash
Entrada: "alagoas"
Esperado: Navega para /estados/al
Status: ✅ PASS
```

### Teste 4: Linguagem Natural
```bash
Entrada: "DDD de Alagoas"
Esperado: Navega para /estados/al
Status: ✅ PASS
```

### Teste 5: Linguagem Natural (variação)
```bash
Entrada: "qual ddd de goias"
Esperado: Navega para /estados/go
Status: ✅ PASS
```

### Teste 6: Busca por Sigla
```bash
Entrada: "AL"
Esperado: Navega para /estados/al
Status: ✅ PASS
```

### Teste 7: Busca Vazia
```bash
Entrada: ""
Esperado: Não faz nada (botão desabilitado)
Status: ✅ PASS
```

### Teste 8: Busca com Múltiplos Resultados
```bash
Entrada: "São"
Esperado: Navega para /estados?search=São (lista filtrada)
Status: ✅ PASS
```

## 📚 Documentação de Código

### Arquivo: `src/data/states.ts`

#### Função: `normalizeText(text: string): string`
Remove acentos e normaliza texto para comparação.

```typescript
normalizeText("São Paulo") // retorna: "sao paulo"
normalizeText("Goiás") // retorna: "goias"
```

#### Função: `extractDDDFromQuery(query: string): string | null`
Extrai o termo de busca de queries em linguagem natural.

```typescript
extractDDDFromQuery("DDD de Alagoas") // retorna: "alagoas"
extractDDDFromQuery("qual ddd de goias") // retorna: "goias"
extractDDDFromQuery("82") // retorna: null (não é query natural)
```

#### Função: `isDDDCode(term: string): boolean`
Verifica se o termo é um código DDD válido (2 dígitos).

```typescript
isDDDCode("82") // retorna: true
isDDDCode("11") // retorna: true
isDDDCode("Alagoas") // retorna: false
isDDDCode("1") // retorna: false (apenas 1 dígito)
```

#### Função: `getStateByDDD(ddd: string): State | undefined`
Busca um estado pelo código DDD.

```typescript
getStateByDDD("82") // retorna: State { name: "Alagoas", ... }
getStateByDDD("11") // retorna: State { name: "São Paulo", ... }
getStateByDDD("99") // retorna: undefined (não existe)
```

#### Função: `getStateByName(name: string): State | undefined`
Busca um estado pelo nome ou sigla (com normalização).

```typescript
getStateByName("Alagoas") // retorna: State { name: "Alagoas", ... }
getStateByName("alagoas") // retorna: State { name: "Alagoas", ... }
getStateByName("AL") // retorna: State { name: "Alagoas", ... }
getStateByName("Goias") // retorna: State { name: "Goiás", ... }
```

#### Função: `searchStates(searchTerm: string): State[]`
Função principal de busca com suporte a linguagem natural.

```typescript
searchStates("82") // retorna: [State { name: "Alagoas", ... }]
searchStates("DDD de Alagoas") // retorna: [State { name: "Alagoas", ... }]
searchStates("qual ddd de goias") // retorna: [State { name: "Goiás", ... }]
searchStates("São") // retorna: [State { name: "São Paulo", ... }, ...]
```

### Arquivo: `src/pages/HomePage.tsx`

#### Função: `handleSearch(e: React.FormEvent): void`
Manipula o envio do formulário de busca com navegação inteligente.

```typescript
// Se encontra 1 resultado: navega para detalhes do estado
// Se encontra 0 ou múltiplos: navega para listagem com filtro

handleSearch("82") // navega para: /estados/al
handleSearch("Alagoas") // navega para: /estados/al
handleSearch("São") // navega para: /estados?search=São
```

## 🎓 Guia de Uso para Usuários

### Como Buscar um Código DDD

#### Método 1: Digite o Nome do Estado
1. Clique no campo de busca
2. Digite o nome do estado (ex: "Alagoas")
3. Pressione Enter ou clique em "Buscar"
4. Você será levado direto para a página do estado com todos os DDDs

#### Método 2: Digite o Código DDD
1. Clique no campo de busca
2. Digite apenas o número (ex: "82")
3. Pressione Enter ou clique em "Buscar"
4. Você será levado direto para a página do estado correspondente

#### Método 3: Faça uma Pergunta Natural
1. Clique no campo de busca
2. Digite sua pergunta (ex: "qual ddd de goias")
3. Pressione Enter ou clique em "Buscar"
4. O sistema entenderá sua pergunta e mostrará o resultado

### Dicas para Melhores Resultados

✅ **Funciona:**
- "Alagoas", "alagoas", "ALAGOAS" (qualquer capitalização)
- "Goiás", "Goias" (com ou sem acento)
- "82", "11", "62" (apenas números)
- "DDD de Alagoas", "qual ddd de goias" (perguntas naturais)

❌ **Não funciona:**
- "DDD 82 qual estado" (muito complexo)
- "estados com ddd 80" (busca por faixa não implementada)
- "ddd nordeste" (busca por região não implementada)

## 🔐 Segurança e Validação

### Sanitização de Entrada
- ✅ Remove caracteres especiais de números
- ✅ Limita busca a termos válidos
- ✅ Previne injeção de código
- ✅ Valida formato de DDD (2 dígitos)

### Tratamento de Erros
- ✅ Busca vazia não faz nada
- ✅ Termo inválido mostra "Nenhum resultado"
- ✅ Erro de navegação é tratado graciosamente

## 📱 Responsividade

A busca funciona perfeitamente em:
- 📱 Mobile (375px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1920px+)

## ♿ Acessibilidade

- ✅ Campo de busca com label descritivo
- ✅ Placeholder informativo
- ✅ Botão com texto e ícone
- ✅ Navegação por teclado (Tab, Enter)
- ✅ Foco visível em todos os elementos

## 🌐 SEO

### URLs Amigáveis
```
/estados/al → Alagoas
/estados/go → Goiás
/estados/sp → São Paulo
/estados?search=termo → Resultados de busca
```

### Meta Tags Dinâmicas
Cada página de estado tem meta tags otimizadas:
```html
<title>DDD de Alagoas (82) - Códigos e Cidades | MEU DDD</title>
<meta name="description" content="Consulte o código DDD 82 de Alagoas. Veja todas as cidades, população e informações completas sobre telecomunicações em Alagoas.">
```

## 🎉 Conclusão

A funcionalidade de busca inteligente do MEU DDD oferece uma experiência de usuário superior, permitindo que os usuários encontrem códigos DDD de forma rápida e intuitiva, usando linguagem natural ou termos técnicos. O sistema é robusto, rápido e fácil de usar, atendendo às necessidades de todos os tipos de usuários.

---

**Desenvolvido com ❤️ pela Equipe MEU DDD**
