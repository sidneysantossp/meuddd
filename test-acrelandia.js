// Test script para verificar a página da Acrelândia
const fetch = require('node-fetch');

async function testAcrelandia() {
  try {
    console.log('Testando API de estados...');
    const statesResponse = await fetch('https://meuddd.vercel.app/api/ddd/states');
    const states = await statesResponse.json();
    
    console.log('Estados encontrados:', states.length);
    
    const acreState = states.find(s => s.slug === 'acre');
    if (acreState) {
      console.log('Acre encontrado:', acreState.name);
      console.log('Cidades do Acre:', acreState.cities.length);
      
      const acrelandia = acreState.cities.find(c => c.slug === 'acrelandia');
      if (acrelandia) {
        console.log('Acrelândia encontrada:', acrelandia.name);
        console.log('Slug:', acrelandia.slug);
        console.log('População:', acrelandia.population);
      } else {
        console.log('Acrelândia NÃO encontrada no Acre');
        console.log('Cidades disponíveis:', acreState.cities.map(c => c.slug));
      }
    } else {
      console.log('Acre NÃO encontrado');
    }
    
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testAcrelandia();