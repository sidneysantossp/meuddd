#!/bin/bash

# Script de Teste de URLs Canonical
# Este script verifica se todas as páginas têm SEOHead implementado

echo "🔍 Verificando implementação de SEOHead nas páginas..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador
total=0
with_seo=0
without_seo=0

# Verificar cada página
for file in src/pages/*.tsx; do
    filename=$(basename "$file")
    total=$((total + 1))
    
    if grep -q "SEOHead" "$file"; then
        echo -e "${GREEN}✅${NC} $filename - SEOHead implementado"
        with_seo=$((with_seo + 1))
    else
        echo -e "${RED}❌${NC} $filename - SEOHead NÃO implementado"
        without_seo=$((without_seo + 1))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Resumo:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Total de páginas: ${YELLOW}$total${NC}"
echo -e "Com SEOHead: ${GREEN}$with_seo${NC}"
echo -e "Sem SEOHead: ${RED}$without_seo${NC}"
echo ""

# Calcular porcentagem
percentage=$((with_seo * 100 / total))
echo -e "Cobertura: ${YELLOW}${percentage}%${NC}"
echo ""

# Verificar páginas principais
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Verificando páginas principais:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

important_pages=(
    "HomePage.tsx"
    "StatesPage.tsx"
    "StateDetailPage.tsx"
    "CityDetailPage.tsx"
    "AboutPage.tsx"
    "ContactPage.tsx"
    "ValidateDDDPage.tsx"
    "GeneratorPage.tsx"
    "VoiceSearchPage.tsx"
    "BlogPage.tsx"
)

all_important_ok=true

for page in "${important_pages[@]}"; do
    if grep -q "SEOHead" "src/pages/$page" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $page"
    else
        echo -e "${RED}❌${NC} $page"
        all_important_ok=false
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$all_important_ok" = true ]; then
    echo -e "${GREEN}✅ Todas as páginas principais têm SEOHead implementado!${NC}"
    echo ""
    echo "🎉 URLs canonical estão acessíveis e prontas para indexação!"
else
    echo -e "${RED}⚠️  Algumas páginas principais ainda precisam de SEOHead${NC}"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar se canonical URLs são absolutas
echo "🔗 Verificando formato de URLs canonical..."
echo ""

if grep -r "canonical: 'https://www.meuddd.com.br" src/data/seoData.ts > /dev/null; then
    echo -e "${GREEN}✅${NC} URLs canonical em seoData.ts são absolutas"
else
    echo -e "${YELLOW}⚠️${NC}  Algumas URLs canonical podem ser relativas (verificar conversão no componente)"
fi

# Verificar conversão de URL relativa para absoluta em CityDetailPage
if grep -q "const canonicalUrl = \`https://www.meuddd.com.br\${seoData.canonical}\`" src/pages/CityDetailPage.tsx; then
    echo -e "${GREEN}✅${NC} CityDetailPage converte URLs relativas para absolutas"
else
    echo -e "${RED}❌${NC} CityDetailPage pode não estar convertendo URLs corretamente"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Próximos passos:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Executar: npm run build"
echo "2. Testar no navegador: Inspecionar elemento e procurar <link rel=\"canonical\">"
echo "3. Validar no Google Search Console"
echo "4. Usar ferramentas de SEO para verificar canonical URLs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
