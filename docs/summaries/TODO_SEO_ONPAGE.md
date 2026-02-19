# TODO: Implementação Completa de SEO On-Page

## Objetivo
Implementar estrutura completa de SEO On-Page em todas as páginas do site MEU DDD, seguindo padrões de dados estruturados, hierarquia adequada de títulos, meta tags otimizadas e conteúdo otimizado para SEO.

## Problemas Identificados
- ❌ Title muito curto: "MEU DDD" (7 caracteres) - deve ter até 60
- ❌ Meta description genérica (100 caracteres) - deve ter até 160
- ❌ Keywords ausentes
- ❌ Canonical URL não definida
- ❌ Publisher ausente
- ❌ Hierarquia de headings inadequada (múltiplos H1)
- ❌ Falta de dados estruturados (JSON-LD)
- ❌ Títulos com padrão "Guia para DDD XX + Cidade/Estado"
- ❌ Falta de Open Graph e Twitter Cards
- ❌ Conteúdo sem otimização (listas, tabelas, negrito, palavras de transição)

## Plano de Implementação

### Fase 1: Criar Infraestrutura de SEO
- [ ] Criar componente SEO avançado (SEOHead.tsx)
- [ ] Criar hook useSEO para gerenciar meta tags
- [ ] Criar estrutura de dados SEO para todas as páginas
- [ ] Criar gerador de dados estruturados (JSON-LD)
- [ ] Criar utilitário para validação de SEO

### Fase 2: Implementar SEO nas Páginas Principais
- [ ] HomePage - Página inicial
- [ ] StatesPage - Lista de estados
- [ ] AboutPage - Sobre
- [ ] ContactPage - Contato
- [ ] ValidateDDDPage - Validar DDD
- [ ] GeneratorPage - Gerador
- [ ] VoiceSearchPage - Busca por voz
- [ ] BlogPage - Blog
- [ ] BlogPostPage - Post do blog

### Fase 3: Implementar SEO nos 27 Estados
- [ ] Acre (AC)
- [ ] Alagoas (AL)
- [ ] Amapá (AP)
- [ ] Amazonas (AM)
- [ ] Bahia (BA)
- [ ] Ceará (CE)
- [ ] Distrito Federal (DF)
- [ ] Espírito Santo (ES)
- [ ] Goiás (GO)
- [ ] Maranhão (MA)
- [ ] Mato Grosso (MT)
- [ ] Mato Grosso do Sul (MS)
- [ ] Minas Gerais (MG)
- [ ] Pará (PA)
- [ ] Paraíba (PB)
- [ ] Paraná (PR)
- [ ] Pernambuco (PE)
- [ ] Piauí (PI)
- [ ] Rio de Janeiro (RJ)
- [ ] Rio Grande do Norte (RN)
- [ ] Rio Grande do Sul (RS)
- [ ] Rondônia (RO)
- [ ] Roraima (RR)
- [ ] Santa Catarina (SC)
- [ ] São Paulo (SP)
- [ ] Sergipe (SE)
- [ ] Tocantins (TO)

### Fase 4: Implementar SEO nas Páginas de Cidades
- [ ] CityDetailPage - Template para todas as cidades

### Fase 5: Otimização de Conteúdo
- [ ] Adicionar listas estruturadas
- [ ] Adicionar tabelas de informações
- [ ] Adicionar negrito em termos importantes
- [ ] Adicionar palavras de transição
- [ ] Melhorar legibilidade
- [ ] Adicionar links internos
- [ ] Adicionar links externos relevantes

### Fase 6: Validação e Testes
- [ ] Validar todos os títulos (≤ 60 caracteres)
- [ ] Validar todas as descrições (≤ 160 caracteres)
- [ ] Validar hierarquia de headings (1 H1 por página)
- [ ] Validar dados estruturados (JSON-LD)
- [ ] Testar Open Graph
- [ ] Testar Twitter Cards
- [ ] Testar canonical URLs
- [ ] Executar npm run lint

## Estrutura de SEO Padrão

### Meta Tags Obrigatórias
- Title (≤ 60 caracteres)
- Description (≤ 160 caracteres)
- Keywords (5-10 palavras-chave)
- Canonical URL
- Author
- Publisher
- Language (pt-BR)
- Robots (index, follow)

### Open Graph Tags
- og:title
- og:description
- og:type
- og:url
- og:image
- og:site_name
- og:locale

### Twitter Card Tags
- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:site

### Dados Estruturados (JSON-LD)
- Organization
- WebSite
- BreadcrumbList
- FAQPage
- Article (para blog)
- LocalBusiness (para páginas de cidades)

### Hierarquia de Conteúdo
- 1 H1 por página (título principal)
- H2 para seções principais
- H3 para subseções
- H4-H6 conforme necessário
- Listas (ul/ol) para informações estruturadas
- Tabelas para dados comparativos
- Negrito (<strong>) para termos importantes
- Links internos para navegação
- Links externos para autoridades

## Padrões de Títulos

### Página Inicial
❌ "MEU DDD"
✅ "Consulta de Códigos DDD do Brasil | MEU DDD"

### Página de Estado
❌ "Guia para DDD 11 São Paulo"
✅ "Códigos DDD de São Paulo | Consulta Completa"

### Página de Cidade
❌ "DDD 11 São Paulo - SP"
✅ "DDD de São Paulo - SP | Código Telefônico"

### Página de Validação
❌ "Validar DDD"
✅ "Validar Código DDD | Verificador Online"

## Notas
- Remover todos os padrões "Guia para DDD XX + Cidade/Estado"
- Usar linguagem natural e descritiva
- Focar em palavras-chave relevantes
- Manter consistência em todas as páginas
- Priorizar experiência do usuário
