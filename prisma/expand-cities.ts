import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista de 50 cidades estratégicas para adicionar
const newCities = [
  // Região Norte
  { name: 'Santarém', stateCode: 'PA', population: 306660, isCapital: false, dddCodes: ['93'] },
  { name: 'Ananindeua', stateCode: 'PA', population: 536435, isCapital: false, dddCodes: ['91'] },
  { name: 'Marabá', stateCode: 'PA', population: 283542, isCapital: false, dddCodes: ['94'] },
  { name: 'Altamira', stateCode: 'PA', population: 115969, isCapital: false, dddCodes: ['93'] },
  { name: 'Parauapebas', stateCode: 'PA', population: 201059, isCapital: false, dddCodes: ['94'] },
  { name: 'Castanhal', stateCode: 'PA', population: 204699, isCapital: false, dddCodes: ['91'] },
  { name: 'Abaetetuba', stateCode: 'PA', population: 151992, isCapital: false, dddCodes: ['91'] },
  { name: 'Cametá', stateCode: 'PA', population: 134381, isCapital: false, dddCodes: ['91'] },
  
  // Amazonas
  { name: 'Parintins', stateCode: 'AM', population: 115363, isCapital: false, dddCodes: ['92'] },
  { name: 'Itacoatiara', stateCode: 'AM', population: 102701, isCapital: false, dddCodes: ['92'] },
  { name: 'Manacapuru', stateCode: 'AM', population: 98074, isCapital: false, dddCodes: ['92'] },
  { name: 'Coari', stateCode: 'AM', population: 86080, isCapital: false, dddCodes: ['97'] },
  { name: 'Tefé', stateCode: 'AM', population: 61957, isCapital: false, dddCodes: ['97'] },
  
  // Rondônia
  { name: 'Ji-Paraná', stateCode: 'RO', population: 130009, isCapital: false, dddCodes: ['69'] },
  { name: 'Ariquemes', stateCode: 'RO', population: 96072, isCapital: false, dddCodes: ['69'] },
  { name: 'Vilhena', stateCode: 'RO', population: 99696, isCapital: false, dddCodes: ['69'] },
  
  // Acre
  { name: 'Cruzeiro do Sul', stateCode: 'AC', population: 87817, isCapital: false, dddCodes: ['68'] },
  { name: 'Sena Madureira', stateCode: 'AC', population: 45476, isCapital: false, dddCodes: ['68'] },
  
  // Amapá
  { name: 'Macapá', stateCode: 'AP', population: 522036, isCapital: true, dddCodes: ['96'] },
  { name: 'Santana', stateCode: 'AP', population: 117584, isCapital: false, dddCodes: ['96'] },
  
  // Roraima
  { name: 'Boa Vista', stateCode: 'RR', population: 419652, isCapital: true, dddCodes: ['95'] },
  
  // Tocantins
  { name: 'Araguaína', stateCode: 'TO', population: 183381, isCapital: false, dddCodes: ['63'] },
  { name: 'Palmas', stateCode: 'TO', population: 306296, isCapital: true, dddCodes: ['63'] },
  { name: 'Gurupi', stateCode: 'TO', population: 87238, isCapital: false, dddCodes: ['63'] },
  
  // Região Nordeste
  // Bahia
  { name: 'Feira de Santana', stateCode: 'BA', population: 619015, isCapital: false, dddCodes: ['75'] },
  { name: 'Vitória da Conquista', stateCode: 'BA', population: 365464, isCapital: false, dddCodes: ['77'] },
  { name: 'Camaçari', stateCode: 'BA', population: 295244, isCapital: false, dddCodes: ['71'] },
  { name: 'Itabuna', stateCode: 'BA', population: 219203, isCapital: false, dddCodes: ['73'] },
  { name: 'Juazeiro', stateCode: 'BA', population: 216687, isCapital: false, dddCodes: ['74'] },
  { name: 'Lauro de Freitas', stateCode: 'BA', population: 195694, isCapital: false, dddCodes: ['71'] },
  
  // Pernambuco
  { name: 'Jaboatão dos Guararapes', stateCode: 'PE', population: 702629, isCapital: false, dddCodes: ['81'] },
  { name: 'Olinda', stateCode: 'PE', population: 393115, isCapital: false, dddCodes: ['81'] },
  { name: 'Caruaru', stateCode: 'PE', population: 365276, isCapital: false, dddCodes: ['81'] },
  { name: 'Petrolina', stateCode: 'PE', population: 354391, isCapital: false, dddCodes: ['87'] },
  
  // Ceará
  { name: 'Caucaia', stateCode: 'CE', population: 365276, isCapital: false, dddCodes: ['85'] },
  { name: 'Juazeiro do Norte', stateCode: 'CE', population: 274185, isCapital: false, dddCodes: ['88'] },
  
  // Maranhão
  { name: 'Imperatriz', stateCode: 'MA', population: 259337, isCapital: false, dddCodes: ['99'] },
  { name: 'Caxias', stateCode: 'MA', population: 163608, isCapital: false, dddCodes: ['99'] },
  
  // Piauí
  { name: 'Parnaíba', stateCode: 'PI', population: 155960, isCapital: false, dddCodes: ['86'] },
  
  // Rio Grande do Norte
  { name: 'Mossoró', stateCode: 'RN', population: 297864, isCapital: false, dddCodes: ['84'] },
  
  // Paraíba
  { name: 'Campina Grande', stateCode: 'PB', population: 410332, isCapital: false, dddCodes: ['83'] },
  
  // Alagoas
  { name: 'Maceió', stateCode: 'AL', population: 1018948, isCapital: true, dddCodes: ['82'] },
  
  // Sergipe
  { name: 'Aracaju', stateCode: 'SE', population: 664908, isCapital: true, dddCodes: ['79'] },
  
  // Região Centro-Oeste
  // Goiás
  { name: 'Aparecida de Goiânia', stateCode: 'GO', population: 510929, isCapital: false, dddCodes: ['62'] },
  { name: 'Anápolis', stateCode: 'GO', population: 391977, isCapital: false, dddCodes: ['62'] },
  { name: 'Luziânia', stateCode: 'GO', population: 205866, isCapital: false, dddCodes: ['61'] },
  
  // Mato Grosso
  { name: 'Várzea Grande', stateCode: 'MT', population: 283712, isCapital: false, dddCodes: ['65'] },
  { name: 'Rondonópolis', stateCode: 'MT', population: 234378, isCapital: false, dddCodes: ['66'] },
  
  // Mato Grosso do Sul
  { name: 'Dourados', stateCode: 'MS', population: 225670, isCapital: false, dddCodes: ['67'] },
  
  // Região Sudeste
  // São Paulo
  { name: 'Sorocaba', stateCode: 'SP', population: 711747, isCapital: false, dddCodes: ['15'] },
  { name: 'Ribeirão Preto', stateCode: 'SP', population: 720116, isCapital: false, dddCodes: ['16'] },
  { name: 'Santos', stateCode: 'SP', population: 433656, isCapital: false, dddCodes: ['13'] },
  { name: 'São José dos Campos', stateCode: 'SP', population: 729394, isCapital: false, dddCodes: ['12'] },
  { name: 'Osasco', stateCode: 'SP', population: 699944, isCapital: false, dddCodes: ['11'] },
  { name: 'Barueri', stateCode: 'SP', population: 276582, isCapital: false, dddCodes: ['11'] },
  { name: 'Bauru', stateCode: 'SP', population: 379453, isCapital: false, dddCodes: ['14'] },
  
  // Rio de Janeiro
  { name: 'Niterói', stateCode: 'RJ', population: 515317, isCapital: false, dddCodes: ['21'] },
  { name: 'Nova Iguaçu', stateCode: 'RJ', population: 796737, isCapital: false, dddCodes: ['21'] },
  
  // Minas Gerais
  { name: 'Contagem', stateCode: 'MG', population: 668723, isCapital: false, dddCodes: ['31'] },
  { name: 'Uberlândia', stateCode: 'MG', population: 706597, isCapital: false, dddCodes: ['34'] },
  { name: 'Juiz de Fora', stateCode: 'MG', population: 573805, isCapital: false, dddCodes: ['32'] },
  { name: 'Betim', stateCode: 'MG', population: 444229, isCapital: false, dddCodes: ['31'] },
  
  // Espírito Santo
  { name: 'Vila Velha', stateCode: 'ES', population: 501325, isCapital: false, dddCodes: ['27'] },
  { name: 'Serra', stateCode: 'ES', population: 485376, isCapital: false, dddCodes: ['27'] },
  
  // Região Sul
  // Paraná
  { name: 'Londrina', stateCode: 'PR', population: 575377, isCapital: false, dddCodes: ['43'] },
  { name: 'Maringá', stateCode: 'PR', population: 436179, isCapital: false, dddCodes: ['44'] },
  { name: 'Foz do Iguaçu', stateCode: 'PR', population: 258432, isCapital: false, dddCodes: ['45'] },
  { name: 'Cascavel', stateCode: 'PR', population: 336091, isCapital: false, dddCodes: ['45'] },
  { name: 'Ponta Grossa', stateCode: 'PR', population: 355331, isCapital: false, dddCodes: ['42'] },
  
  // Rio Grande do Sul
  { name: 'Caxias do Sul', stateCode: 'RS', population: 517866, isCapital: false, dddCodes: ['54'] },
  { name: 'Pelotas', stateCode: 'RS', population: 343132, isCapital: false, dddCodes: ['53'] },
  { name: 'Canoas', stateCode: 'RS', population: 348437, isCapital: false, dddCodes: ['51'] },
  
  // Santa Catarina
  { name: 'Joinville', stateCode: 'SC', population: 616318, isCapital: false, dddCodes: ['47'] },
  { name: 'Blumenau', stateCode: 'SC', population: 361855, isCapital: false, dddCodes: ['47'] }
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function main() {
  console.log('Iniciando expansão de 50 novas cidades...');

  try {
    // Verificar cidades existentes para evitar duplicatas
    const existingCities = await prisma.city.findMany({
      select: { name: true, state: { select: { code: true } } }
    });

    const existingCityKeys = new Set(
      existingCities.map(city => `${city.name.toLowerCase()}-${city.state.code}`)
    );

    let addedCount = 0;
    let skippedCount = 0;

    for (const cityData of newCities) {
      const cityKey = `${cityData.name.toLowerCase()}-${cityData.stateCode}`;
      
      if (existingCityKeys.has(cityKey)) {
        console.log(`⚠️  Cidade ${cityData.name} (${cityData.stateCode}) já existe, pulando...`);
        skippedCount++;
        continue;
      }

      try {
        // Buscar o estado
        const state = await prisma.state.findUnique({
          where: { code: cityData.stateCode }
        });

        if (!state) {
          console.log(`❌ Estado ${cityData.stateCode} não encontrado para ${cityData.name}`);
          continue;
        }

        // Buscar os códigos DDD
        const dddCodes = await prisma.dddCode.findMany({
          where: {
            stateId: state.id,
            code: { in: cityData.dddCodes }
          }
        });

        if (dddCodes.length === 0) {
          console.log(`❌ Nenhum código DDD encontrado para ${cityData.name} (${cityData.stateCode})`);
          continue;
        }

        // Gerar slug único
        let slug = generateSlug(cityData.name);
        let counter = 1;
        let uniqueSlug = slug;

        while (await prisma.city.findFirst({
          where: { 
            slug: uniqueSlug,
            stateId: state.id
          }
        })) {
          uniqueSlug = `${slug}-${counter}`;
          counter++;
        }

        // Criar a cidade
        const createdCity = await prisma.city.create({
          data: {
            name: cityData.name,
            slug: uniqueSlug,
            population: cityData.population,
            isCapital: cityData.isCapital,
            stateId: state.id,
            dddCodes: {
              connect: dddCodes.map(ddd => ({ id: ddd.id }))
            }
          }
        });

        console.log(`✅ Cidade ${cityData.name} (${cityData.stateCode}) adicionada com sucesso!`);
        addedCount++;

      } catch (error) {
        console.error(`❌ Erro ao adicionar ${cityData.name}:`, error.message);
      }
    }

    console.log('\n📊 Resumo da operação:');
    console.log(`✅ Cidades adicionadas: ${addedCount}`);
    console.log(`⚠️  Cidades puladas (já existiam): ${skippedCount}`);
    console.log(`📈 Total de cidades no banco: ${await prisma.city.count()}`);

  } catch (error) {
    console.error('❌ Erro durante a execução:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });