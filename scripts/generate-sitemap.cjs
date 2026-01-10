/**
 * Script para gerar sitemap.xml completo com todas as URLs da plataforma MEU DDD
 * Execute com: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// Importar dados dos estados (simulado - vamos criar manualmente)
const BASE_URL = 'https://www.meuddd.com.br';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Estados brasileiros com suas cidades
const statesData = {
  ac: { name: 'Acre', cities: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Brasiléia', 'Plácido de Castro', 'Xapuri', 'Epitaciolândia', 'Senador Guiomard', 'Acrelândia', 'Bujari', 'Capixaba', 'Mâncio Lima', 'Manoel Urbano', 'Marechal Thaumaturgo', 'Porto Acre', 'Porto Walter', 'Rodrigues Alves', 'Santa Rosa do Purus', 'Assis Brasil', 'Jordão'] },
  al: { name: 'Alagoas', cities: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'União dos Palmares', 'Penedo', 'São Miguel dos Campos', 'Santana do Ipanema', 'Delmiro Gouveia', 'Coruripe'] },
  ap: { name: 'Amapá', cities: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Mazagão', 'Porto Grande', 'Tartarugalzinho', 'Vitória do Jari', 'Amapá', 'Ferreira Gomes', 'Calçoene', 'Pracuúba', 'Serra do Navio', 'Pedra Branca do Amapari', 'Cutias', 'Itaubal'] },
  am: { name: 'Amazonas', cities: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé', 'Tabatinga', 'Maués', 'Humaitá', 'São Gabriel da Cachoeira'] },
  ba: { name: 'Bahia', cities: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Lauro de Freitas', 'Ilhéus', 'Jequié', 'Teixeira de Freitas', 'Alagoinhas', 'Barreiras', 'Porto Seguro', 'Simões Filho', 'Paulo Afonso', 'Eunápolis', 'Santo Antônio de Jesus', 'Valença', 'Candeias', 'Guanambi'] },
  ce: { name: 'Ceará', cities: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca', 'Maranguape', 'Iguatu', 'Quixadá', 'Canindé', 'Pacajus', 'Aquiraz', 'Crateús', 'Russas', 'Aracati', 'Cascavel', 'Pacatuba', 'Icó', 'Horizonte'] },
  df: { name: 'Distrito Federal', cities: ['Brasília'] },
  es: { name: 'Espírito Santo', cities: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'São Mateus', 'Colatina', 'Guarapari', 'Aracruz', 'Viana', 'Nova Venécia', 'Barra de São Francisco', 'Santa Maria de Jetibá', 'Castelo', 'Marataízes', 'São Gabriel da Palha', 'Domingos Martins', 'Itapemirim', 'Afonso Cláudio'] },
  go: { name: 'Goiás', cities: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Trindade', 'Formosa', 'Novo Gama', 'Itumbiara', 'Senador Canedo', 'Catalão', 'Jataí', 'Planaltina', 'Caldas Novas', 'Santo Antônio do Descoberto', 'Goianésia', 'Cidade Ocidental', 'Mineiros'] },
  ma: { name: 'Maranhão', cities: ['São Luís', 'Imperatriz', 'São José de Ribamar', 'Timon', 'Caxias', 'Codó', 'Paço do Lumiar', 'Açailândia', 'Bacabal', 'Balsas', 'Barra do Corda', 'Santa Inês', 'Pinheiro', 'Pedreiras', 'Chapadinha', 'Santa Luzia', 'Presidente Dutra', 'Viana', 'Grajaú', 'Itapecuru Mirim'] },
  mt: { name: 'Mato Grosso', cities: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Cáceres', 'Sorriso', 'Lucas do Rio Verde', 'Barra do Garças', 'Primavera do Leste', 'Alta Floresta', 'Pontes e Lacerda', 'Juína', 'Colíder', 'Diamantino', 'Nova Mutum', 'Peixoto de Azevedo', 'Guarantã do Norte', 'Mirassol d\'Oeste', 'Campo Verde'] },
  ms: { name: 'Mato Grosso do Sul', cities: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Aquidauana', 'Nova Andradina', 'Sidrolândia', 'Naviraí', 'Maracaju', 'Paranaíba', 'Coxim', 'Rio Brilhante', 'Amambai', 'São Gabriel do Oeste', 'Chapadão do Sul', 'Jardim', 'Anastácio', 'Aparecida do Taboado', 'Cassilândia'] },
  mg: { name: 'Minas Gerais', cities: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Santa Luzia', 'Sete Lagoas', 'Divinópolis', 'Ibirité', 'Poços de Caldas', 'Patos de Minas', 'Teófilo Otoni', 'Sabará', 'Pouso Alegre', 'Barbacena'] },
  pa: { name: 'Pará', cities: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal', 'Parauapebas', 'Itaituba', 'Cametá', 'Bragança', 'Abaetetuba', 'Marituba', 'Altamira', 'Tucuruí', 'Paragominas', 'Redenção', 'Barcarena', 'Tailândia', 'Capanema', 'Breves', 'Benevides'] },
  pb: { name: 'Paraíba', cities: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras', 'Cabedelo', 'Guarabira', 'Mamanguape', 'Sapé', 'Monteiro', 'Pombal', 'Itabaiana', 'Esperança', 'Princesa Isabel', 'Rio Tinto', 'Conde', 'Catolé do Rocha', 'Alagoinha'] },
  pr: { name: 'Paraná', cities: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Araucária', 'Toledo', 'Apucarana', 'Pinhais', 'Campo Largo', 'Almirante Tamandaré', 'Umuarama', 'Piraquara', 'Cambé', 'Paranavaí'] },
  pe: { name: 'Pernambuco', cities: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Camaragibe', 'Garanhuns', 'Vitória de Santo Antão', 'Igarassu', 'São Lourenço da Mata', 'Abreu e Lima', 'Santa Cruz do Capibaribe', 'Ipojuca', 'Serra Talhada', 'Araripina', 'Gravatá', 'Carpina', 'Goiana'] },
  pi: { name: 'Piauí', cities: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano', 'Campo Maior', 'Barras', 'União', 'Altos', 'Pedro II', 'Oeiras', 'São Raimundo Nonato', 'Esperantina', 'Valença do Piauí', 'Luís Correia', 'Amarante', 'Regeneração', 'Bom Jesus', 'Simplício Mendes', 'Canto do Buriti'] },
  rj: { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Belford Roxo', 'Campos dos Goytacazes', 'São João de Meriti', 'Petrópolis', 'Volta Redonda', 'Magé', 'Itaboraí', 'Macaé', 'Cabo Frio', 'Nova Friburgo', 'Barra Mansa', 'Angra dos Reis', 'Mesquita', 'Teresópolis', 'Nilópolis'] },
  rn: { name: 'Rio Grande do Norte', cities: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Ceará-Mirim', 'Caicó', 'Assu', 'Currais Novos', 'Nova Cruz', 'São José de Mipibu', 'Apodi', 'Santa Cruz', 'Pau dos Ferros', 'João Câmara', 'Extremoz', 'Touros', 'Areia Branca', 'Macau', 'Guamaré'] },
  rs: { name: 'Rio Grande do Sul', cities: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canoas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'São Leopoldo', 'Rio Grande', 'Alvorada', 'Passo Fundo', 'Sapucaia do Sul', 'Uruguaiana', 'Santa Cruz do Sul', 'Cachoeirinha', 'Bagé', 'Bento Gonçalves', 'Erechim', 'Guaíba'] },
  ro: { name: 'Rondônia', cities: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Jaru', 'Rolim de Moura', 'Guajará-Mirim', 'Pimenta Bueno', 'Buritis', 'Ouro Preto do Oeste', 'Espigão d\'Oeste', 'Colorado do Oeste', 'Cerejeiras', 'São Miguel do Guaporé', 'Presidente Médici', 'Machadinho d\'Oeste', 'Nova Brasilândia d\'Oeste', 'Alvorada d\'Oeste', 'Alta Floresta d\'Oeste'] },
  rr: { name: 'Roraima', cities: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí', 'São João da Baliza', 'São Luiz', 'Bonfim', 'Alto Alegre', 'Cantá', 'Normandia', 'Pacaraima', 'Iracema', 'Amajari', 'Caroebe', 'Uiramutã'] },
  sc: { name: 'Santa Catarina', cities: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Criciúma', 'Chapecó', 'Itajaí', 'Jaraguá do Sul', 'Lages', 'Palhoça', 'Balneário Camboriú', 'Brusque', 'Tubarão', 'São Bento do Sul', 'Caçador', 'Camboriú', 'Navegantes', 'Concórdia', 'Rio do Sul', 'Araranguá'] },
  sp: { name: 'São Paulo', cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'São José dos Campos', 'Ribeirão Preto', 'Sorocaba', 'Mauá', 'São José do Rio Preto', 'Santos', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Carapicuíba', 'Piracicaba', 'Bauru', 'Itaquaquecetuba', 'São Vicente'] },
  se: { name: 'Sergipe', cities: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância', 'Tobias Barreto', 'Simão Dias', 'Propriá', 'Barra dos Coqueiros', 'Umbaúba', 'Laranjeiras', 'Itabaianinha', 'Ribeirópolis', 'Maruim', 'Poço Verde', 'Carmópolis', 'Aquidabã', 'Arauá', 'Indiaroba'] },
  to: { name: 'Tocantins', cities: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins', 'Colinas do Tocantins', 'Guaraí', 'Tocantinópolis', 'Miracema do Tocantins', 'Araguatins', 'Dianópolis', 'Formoso do Araguaia', 'Pedro Afonso', 'Augustinópolis', 'Arraias', 'Taguatinga', 'Xambioá', 'Wanderlândia', 'Ananás', 'Alvorada'] }
};

// Mapeamento de IDs de estados para slugs
const stateIdToSlug = {
  ac: 'acre',
  al: 'alagoas',
  ap: 'amapa',
  am: 'amazonas',
  ba: 'bahia',
  ce: 'ceara',
  df: 'distrito-federal',
  es: 'espirito-santo',
  go: 'goias',
  ma: 'maranhao',
  mt: 'mato-grosso',
  ms: 'mato-grosso-do-sul',
  mg: 'minas-gerais',
  pa: 'para',
  pb: 'paraiba',
  pr: 'parana',
  pe: 'pernambuco',
  pi: 'piaui',
  rj: 'rio-de-janeiro',
  rn: 'rio-grande-do-norte',
  rs: 'rio-grande-do-sul',
  ro: 'rondonia',
  rr: 'roraima',
  sc: 'santa-catarina',
  sp: 'sao-paulo',
  se: 'sergipe',
  to: 'tocantins'
};

// Posts do blog
const blogPosts = [
  { id: 'evolucao-codigos-ddd', date: '2025-12-15' },
  { id: 'impacto-ddd-comunicacao', date: '2025-12-10' },
  { id: 'curiosidades-ddd-brasil', date: '2025-12-05' },
  { id: 'ddd-revolucionou-ligacoes', date: '2025-11-28' },
  { id: 'futuro-ddd-tecnologia', date: '2025-11-20' }
];

// Função para normalizar nome de cidade para URL
function normalizeForURL(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-|-$/g, '') // Remove hífens no início e fim
    .trim();
}

// Gerar URLs do sitemap
const sitemapURLs = [];

// 1. Página Inicial
sitemapURLs.push({
  loc: `${BASE_URL}/`,
  lastmod: CURRENT_DATE,
  changefreq: 'daily',
  priority: 1.0,
});

// 2. Páginas Principais
const mainPages = [
  { path: '/estados', changefreq: 'weekly', priority: 0.9 },
  { path: '/validar', changefreq: 'monthly', priority: 0.7 },
  { path: '/busca-voz', changefreq: 'monthly', priority: 0.7 },
  { path: '/gerador', changefreq: 'monthly', priority: 0.7 },
  { path: '/blog', changefreq: 'weekly', priority: 0.8 },
  { path: '/sobre', changefreq: 'monthly', priority: 0.5 },
  { path: '/contato', changefreq: 'monthly', priority: 0.5 },
  { path: '/politicas-de-privacidade', changefreq: 'monthly', priority: 0.4 },
  { path: '/termos-de-uso', changefreq: 'monthly', priority: 0.4 },
];

mainPages.forEach(page => {
  sitemapURLs.push({
    loc: `${BASE_URL}${page.path}`,
    lastmod: CURRENT_DATE,
    changefreq: page.changefreq,
    priority: page.priority,
  });
});

// 3. Páginas de Estados (27 estados)
Object.keys(statesData).forEach(stateId => {
  sitemapURLs.push({
    loc: `${BASE_URL}/estado/${stateIdToSlug[stateId]}`,
    lastmod: CURRENT_DATE,
    changefreq: 'weekly',
    priority: 0.8,
  });
});

// 4. Páginas de Cidades
let totalCities = 0;
Object.keys(statesData).forEach(stateId => {
  const state = statesData[stateId];
  state.cities.forEach(cityName => {
    const citySlug = normalizeForURL(cityName);
    sitemapURLs.push({
      loc: `${BASE_URL}/cidade/${citySlug}`,
      lastmod: CURRENT_DATE,
      changefreq: 'monthly',
      priority: 0.6,
    });
    totalCities++;
  });
});

// 5. Posts do Blog
blogPosts.forEach(post => {
  sitemapURLs.push({
    loc: `${BASE_URL}/blog/${post.id}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: 0.7,
  });
});

// Gerar XML do sitemap
function generateSitemapXML(urls) {
  const urlEntries = urls
    .map(
      url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

// Gerar sitemap
const sitemapXML = generateSitemapXML(sitemapURLs);

// Salvar arquivo
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapXML, 'utf-8');

// Estatísticas
console.log('✅ Sitemap.xml gerado com sucesso!');
console.log('');
console.log('📊 Estatísticas:');
console.log(`   • Total de URLs: ${sitemapURLs.length}`);
console.log(`   • Página inicial: 1`);
console.log(`   • Páginas principais: ${mainPages.length}`);
console.log(`   • Páginas de estados: ${Object.keys(statesData).length}`);
console.log(`   • Páginas de cidades: ${totalCities}`);
console.log(`   • Posts do blog: ${blogPosts.length}`);
console.log('');
console.log(`📁 Arquivo salvo em: ${outputPath}`);
console.log('');
console.log('🔗 URLs por prioridade:');
console.log(`   • Prioridade 1.0: ${sitemapURLs.filter(u => u.priority === 1.0).length} URLs`);
console.log(`   • Prioridade 0.9: ${sitemapURLs.filter(u => u.priority === 0.9).length} URLs`);
console.log(`   • Prioridade 0.8: ${sitemapURLs.filter(u => u.priority === 0.8).length} URLs`);
console.log(`   • Prioridade 0.7: ${sitemapURLs.filter(u => u.priority === 0.7).length} URLs`);
console.log(`   • Prioridade 0.6: ${sitemapURLs.filter(u => u.priority === 0.6).length} URLs`);
console.log(`   • Prioridade 0.5: ${sitemapURLs.filter(u => u.priority === 0.5).length} URLs`);
console.log(`   • Prioridade 0.4: ${sitemapURLs.filter(u => u.priority === 0.4).length} URLs`);
console.log('');
console.log('📝 Próximos passos:');
console.log('   1. Verifique o sitemap.xml em /public/sitemap.xml');
console.log('   2. Teste o sitemap em: https://www.xml-sitemaps.com/validate-xml-sitemap.html');
console.log('   3. Envie para o Google Search Console');
console.log('   4. Adicione a URL do sitemap no robots.txt');
console.log('');
console.log('🌐 URL do sitemap: https://www.meuddd.com.br/sitemap.xml');
