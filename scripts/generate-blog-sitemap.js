const fs = require('fs');
const path = require('path');

// Importar dados dos estados
const statesData = require('../src/data/states.ts');

// Função para criar slug
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Tipos de artigos
const articleTypes = [
  'melhor-internet-fibra',
  'internet-fibra-cobertura',
  'internet-empresarial',
  'plano-internet-barato'
];

// Estados para gerar artigos
const statesToGenerate = ['Acre', 'Alagoas'];

// Gerar URLs de blog
const blogUrls = [];

statesToGenerate.forEach(stateName => {
  // Encontrar estado nos dados
  const stateData = {
    'Acre': { slug: 'acre', cities: 22 },
    'Alagoas': { slug: 'alagoas', cities: 169 }
  }[stateName];
  
  if (!stateData) return;
  
  console.log(`Gerando URLs para ${stateName}...`);
  
  // Para cada cidade (simulado)
  for (let i = 0; i < stateData.cities; i++) {
    const citySlug = `cidade-${i + 1}`; // Placeholder
    
    // Para cada tipo de artigo
    articleTypes.forEach(type => {
      const url = `https://www.meuddd.com.br/blog/${stateData.slug}/${citySlug}/${type}-${citySlug}`;
      blogUrls.push(url);
    });
  }
});

console.log(`\nTotal de URLs de blog geradas: ${blogUrls.length}`);
console.log(`\nPrimeiras 5 URLs:`);
blogUrls.slice(0, 5).forEach(url => console.log(`  - ${url}`));

// Salvar em arquivo
const outputPath = path.join(__dirname, '../public/blog-sitemap-urls.txt');
fs.writeFileSync(outputPath, blogUrls.join('\n'));
console.log(`\n✅ URLs salvas em: ${outputPath}`);
