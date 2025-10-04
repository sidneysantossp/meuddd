const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Verificando cidades no banco de dados...');
    
    // Verificar estados
    const states = await prisma.state.findMany({
      where: {
        OR: [
          { name: { contains: 'acre' } },
          { code: { contains: 'ac' } }
        ]
      }
    });
    
    console.log('Estados encontrados:', states);
    
    if (states.length > 0) {
      const acreState = states[0];
      
      // Verificar cidades do Acre
      const cities = await prisma.city.findMany({
        where: {
          stateId: acreState.id,
          OR: [
            { name: { contains: 'acrelandia' } },
            { slug: { contains: 'acrelandia' } }
          ]
        }
      });
      
      console.log('Cidades encontradas:', cities);
      
      // Listar todas as cidades do Acre
      const allCities = await prisma.city.findMany({
        where: {
          stateId: acreState.id
        },
        include: {
          state: true,
          dddCodes: true
        }
      });
      
      console.log('Todas as cidades do Acre:');
      allCities.forEach(city => {
        console.log(`- ${city.name} (${city.slug}) - DDDs: ${city.dddCodes.map(d => d.code).join(', ')}`);
      });
    }
    
  } catch (error) {
    console.error('Erro ao consultar banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();