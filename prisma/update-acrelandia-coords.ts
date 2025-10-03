import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Atualizando coordenadas de Acrelândia...');

  // Coordenadas aproximadas de Acrelândia, Acre
  const acrelandiaCoords = {
    latitude: -9.8247,
    longitude: -67.0417,
    area: 1575.0 // Área em km²
  };

  try {
    // Buscar o estado do Acre
    const acreState = await prisma.state.findUnique({
      where: {
        slug: 'acre'
      }
    });

    if (!acreState) {
      console.error('Estado do Acre não encontrado');
      return;
    }

    // Buscar Acrelândia
    const acrelandia = await prisma.city.findFirst({
      where: {
        name: 'Acrelândia',
        stateId: acreState.id
      }
    });

    if (!acrelandia) {
      console.error('Acrelândia não encontrada');
      return;
    }

    // Atualizar coordenadas e área
    const updatedCity = await prisma.city.update({
      where: {
        id: acrelandia.id
      },
      data: {
        latitude: acrelandiaCoords.latitude,
        longitude: acrelandiaCoords.longitude,
        area: acrelandiaCoords.area
      }
    });

    console.log('Acrelândia atualizada com sucesso:');
    console.log(`- Nome: ${updatedCity.name}`);
    console.log(`- Latitude: ${updatedCity.latitude}`);
    console.log(`- Longitude: ${updatedCity.longitude}`);
    console.log(`- Área: ${updatedCity.area} km²`);

  } catch (error) {
    console.error('Erro ao atualizar Acrelândia:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });