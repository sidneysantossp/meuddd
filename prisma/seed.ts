import { PrismaClient } from '@prisma/client';
import { generateCitiesForState } from './cities-data';

const prisma = new PrismaClient();

async function main() {
  // Dados dos estados brasileiros com seus códigos DDD
  const statesData = [
    {
      name: 'São Paulo',
      code: 'SP',
      slug: 'sao-paulo',
      region: 'Sudeste',
      population: 46289333,
      area: 248219.481,
      capital: 'São Paulo',
      dddCodes: [
        { code: '11', description: 'Grande São Paulo' },
        { code: '12', description: 'Vale do Paraíba e Litoral Norte' },
        { code: '13', description: 'Baixada Santista' },
        { code: '14', description: 'Região de Bauru, Marília e Presidente Prudente' },
        { code: '15', description: 'Região de Sorocaba e Itapetininga' },
        { code: '16', description: 'Região de Araraquara, São Carlos e Ribeirão Preto' },
        { code: '17', description: 'Região de Barretos e São José do Rio Preto' },
        { code: '18', description: 'Região de Presidente Prudente e Dracena' },
        { code: '19', description: 'Região de Campinas, Piracicaba e Limeira' }
      ]
    },
    {
      name: 'Rio de Janeiro',
      code: 'RJ',
      slug: 'rio-de-janeiro',
      region: 'Sudeste',
      population: 17366189,
      area: 43780.172,
      capital: 'Rio de Janeiro',
      dddCodes: [
        { code: '21', description: 'Região Metropolitana do Rio de Janeiro' },
        { code: '22', description: 'Região dos Lagos e Norte Fluminense' },
        { code: '24', description: 'Região Sul Fluminense' }
      ]
    },
    {
      name: 'Minas Gerais',
      code: 'MG',
      slug: 'minas-gerais',
      region: 'Sudeste',
      population: 21292666,
      area: 586522.122,
      capital: 'Belo Horizonte',
      dddCodes: [
        { code: '31', description: 'Região Metropolitana de Belo Horizonte' },
        { code: '32', description: 'Zona da Mata e Sul de Minas' },
        { code: '33', description: 'Região de Governador Valadares' },
        { code: '34', description: 'Região de Uberlândia e Uberaba' },
        { code: '35', description: 'Região de Poços de Caldas e Varginha' },
        { code: '37', description: 'Região de Divinópolis' },
        { code: '38', description: 'Norte de Minas' }
      ]
    },
    {
      name: 'Espírito Santo',
      code: 'ES',
      slug: 'espirito-santo',
      region: 'Sudeste',
      population: 4064052,
      area: 46095.583,
      capital: 'Vitória',
      dddCodes: [
        { code: '27', description: 'Região Metropolitana da Grande Vitória' },
        { code: '28', description: 'Norte, Sul e Serrano do Espírito Santo' }
      ]
    },
    {
      name: 'Bahia',
      code: 'BA',
      slug: 'bahia',
      region: 'Nordeste',
      population: 14873064,
      area: 564733.177,
      capital: 'Salvador',
      dddCodes: [
        { code: '71', description: 'Região Metropolitana de Salvador' },
        { code: '73', description: 'Sul da Bahia' },
        { code: '74', description: 'Centro-Oeste da Bahia' },
        { code: '75', description: 'Oeste da Bahia' },
        { code: '77', description: 'Sudoeste da Bahia' }
      ]
    },
    {
      name: 'Pernambuco',
      code: 'PE',
      slug: 'pernambuco',
      region: 'Nordeste',
      population: 9616621,
      area: 98148.325,
      capital: 'Recife',
      dddCodes: [
        { code: '81', description: 'Grande Recife e Zona da Mata' },
        { code: '87', description: 'Sertão, Agreste e São Francisco' }
      ]
    },
    {
      name: 'Ceará',
      code: 'CE',
      slug: 'ceara',
      region: 'Nordeste',
      population: 9240580,
      area: 148920.472,
      capital: 'Fortaleza',
      dddCodes: [
        { code: '85', description: 'Grande Fortaleza e Litoral' },
        { code: '88', description: 'Sertão Central, Sertão dos Inhamuns e Jaguaribe' }
      ]
    },
    {
      name: 'Paraná',
      code: 'PR',
      slug: 'parana',
      region: 'Sul',
      population: 11597484,
      area: 199307.922,
      capital: 'Curitiba',
      dddCodes: [
        { code: '41', description: 'Região Metropolitana de Curitiba' },
        { code: '42', description: 'Região de Ponta Grossa e Guarapuava' },
        { code: '43', description: 'Norte Pioneiro' },
        { code: '44', description: 'Noroeste Paranaense' },
        { code: '45', description: 'Oeste Paranaense' },
        { code: '46', description: 'Sudoeste Paranaense' }
      ]
    },
    {
      name: 'Rio Grande do Sul',
      code: 'RS',
      slug: 'rio-grande-do-sul',
      region: 'Sul',
      population: 11422973,
      area: 281748.538,
      capital: 'Porto Alegre',
      dddCodes: [
        { code: '51', description: 'Região Metropolitana de Porto Alegre' },
        { code: '53', description: 'Região Sul e Sudoeste' },
        { code: '54', description: 'Região Noroeste' },
        { code: '55', description: 'Região Central e Missões' }
      ]
    },
    {
      name: 'Santa Catarina',
      code: 'SC',
      slug: 'santa-catarina',
      region: 'Sul',
      population: 7252502,
      area: 95736.165,
      capital: 'Florianópolis',
      dddCodes: [
        { code: '47', description: 'Região Norte e Vale do Itajaí' },
        { code: '48', description: 'Grande Florianópolis e Sul' },
        { code: '49', description: 'Oeste e Meio Oeste' }
      ]
    },
    {
      name: 'Alagoas',
      code: 'AL',
      slug: 'alagoas',
      region: 'Nordeste',
      population: 3351543,
      area: 27848.141,
      capital: 'Maceió',
      dddCodes: [
        { code: '82', description: 'Todo o estado de Alagoas' }
      ]
    },
    {
      name: 'Sergipe',
      code: 'SE',
      slug: 'sergipe',
      region: 'Nordeste',
      population: 2318822,
      area: 21915.116,
      capital: 'Aracaju',
      dddCodes: [
        { code: '79', description: 'Todo o estado de Sergipe' }
      ]
    },
    {
      name: 'Paraíba',
      code: 'PB',
      slug: 'paraiba',
      region: 'Nordeste',
      population: 4039277,
      area: 56473.225,
      capital: 'João Pessoa',
      dddCodes: [
        { code: '83', description: 'Todo o estado da Paraíba' }
      ]
    },
    {
      name: 'Rio Grande do Norte',
      code: 'RN',
      slug: 'rio-grande-do-norte',
      region: 'Nordeste',
      population: 3534165,
      area: 52811.047,
      capital: 'Natal',
      dddCodes: [
        { code: '84', description: 'Todo o estado do Rio Grande do Norte' }
      ]
    },
    {
      name: 'Piauí',
      code: 'PI',
      slug: 'piaui',
      region: 'Nordeste',
      population: 3281480,
      area: 251577.738,
      capital: 'Teresina',
      dddCodes: [
        { code: '86', description: 'Todo o estado do Piauí' }
      ]
    },
    {
      name: 'Maranhão',
      code: 'MA',
      slug: 'maranhao',
      region: 'Nordeste',
      population: 7035055,
      area: 331937.450,
      capital: 'São Luís',
      dddCodes: [
        { code: '98', description: 'Região Metropolitana de São Luís e Leste' },
        { code: '99', description: 'Oeste, Sul e Centro do Maranhão' }
      ]
    },
    {
      name: 'Goiás',
      code: 'GO',
      slug: 'goias',
      region: 'Centro-Oeste',
      population: 7206589,
      area: 340111.374,
      capital: 'Goiânia',
      dddCodes: [
        { code: '62', description: 'Região Metropolitana de Goiânia e Sudoeste' },
        { code: '64', description: 'Norte Goiano' }
      ]
    },
    {
      name: 'Mato Grosso',
      code: 'MT',
      slug: 'mato-grosso',
      region: 'Centro-Oeste',
      population: 3658873,
      area: 903366.192,
      capital: 'Cuiabá',
      dddCodes: [
        { code: '65', description: 'Todo o estado de Mato Grosso' }
      ]
    },
    {
      name: 'Mato Grosso do Sul',
      code: 'MS',
      slug: 'mato-grosso-do-sul',
      region: 'Centro-Oeste',
      population: 2809397,
      area: 357145.532,
      capital: 'Campo Grande',
      dddCodes: [
        { code: '67', description: 'Todo o estado de Mato Grosso do Sul' }
      ]
    },
    {
      name: 'Distrito Federal',
      code: 'DF',
      slug: 'distrito-federal',
      region: 'Centro-Oeste',
      population: 3055149,
      area: 5779.999,
      capital: 'Brasília',
      dddCodes: [
        { code: '61', description: 'Distrito Federal e Entorno' }
      ]
    },
    {
      name: 'Tocantins',
      code: 'TO',
      slug: 'tocantins',
      region: 'Norte',
      population: 1590248,
      area: 277720.520,
      capital: 'Palmas',
      dddCodes: [
        { code: '63', description: 'Todo o estado de Tocantins' }
      ]
    },
    {
      name: 'Acre',
      code: 'AC',
      slug: 'acre',
      region: 'Norte',
      population: 896466,
      area: 164123.964,
      capital: 'Rio Branco',
      dddCodes: [
        { code: '68', description: 'Todo o estado do Acre' }
      ]
    },
    {
      name: 'Amazonas',
      code: 'AM',
      slug: 'amazonas',
      region: 'Norte',
      population: 4207714,
      area: 1559167.889,
      capital: 'Manaus',
      dddCodes: [
        { code: '92', description: 'Região Metropolitana de Manaus' },
        { code: '97', description: 'Interior do Amazonas' }
      ]
    },
    {
      name: 'Roraima',
      code: 'RR',
      slug: 'roraima',
      region: 'Norte',
      population: 652713,
      area: 224118.044,
      capital: 'Boa Vista',
      dddCodes: [
        { code: '95', description: 'Todo o estado de Roraima' }
      ]
    },
    {
      name: 'Pará',
      code: 'PA',
      slug: 'para',
      region: 'Norte',
      population: 8777124,
      area: 1245959.666,
      capital: 'Belém',
      dddCodes: [
        { code: '91', description: 'Região Metropolitana de Belém' },
        { code: '93', description: 'Sudoeste e Sul do Pará' },
        { code: '94', description: 'Marajó e Nordeste Paraense' }
      ]
    },
    {
      name: 'Amapá',
      code: 'AP',
      slug: 'amapa',
      region: 'Norte',
      population: 866353,
      area: 142470.714,
      capital: 'Macapá',
      dddCodes: [
        { code: '96', description: 'Todo o estado do Amapá' }
      ]
    },
    {
      name: 'Rondônia',
      code: 'RO',
      slug: 'rondonia',
      region: 'Norte',
      population: 1815738,
      area: 237590.547,
      capital: 'Porto Velho',
      dddCodes: [
        { code: '69', description: 'Todo o estado de Rondônia' }
      ]
    }
  ];

  console.log('Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.city.deleteMany();
  await prisma.dddCode.deleteMany();
  await prisma.state.deleteMany();

  // Inserir estados e seus códigos DDD
  for (const stateData of statesData) {
    const { dddCodes, ...state } = stateData;
    
    const createdState = await prisma.state.create({
      data: state
    });

    // Inserir códigos DDD
    const createdDddCodes: any[] = [];
    for (const dddCode of dddCodes) {
      const createdDddCode = await prisma.dddCode.create({
        data: {
          ...dddCode,
          stateId: createdState.id
        }
      });
      createdDddCodes.push(createdDddCode);
    }

    // Inserir cidades
    const cities = generateCitiesForState(state.name, dddCodes.map(d => d.code));
    const usedCityNames = new Set();
    
    for (const cityData of cities) {
      // Garantir nome único para a cidade
      let cityName = cityData.name;
      let counter = 1;
      
      while (usedCityNames.has(cityName)) {
        cityName = cityData.name + ' ' + counter;
        counter++;
      }
      
      usedCityNames.add(cityName);
      
      // Gerar slug para a cidade
      const slug = cityName.toLowerCase()
        .normalize('NFD')
        .replace(/[\\u0300-\\u036f]/g, '')
        .replace(/[^a-z0-9\\s-]/g, '')
        .replace(/\\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      // Encontrar os códigos DDD para esta cidade
      const cityDddCodes = createdDddCodes.filter(dddCode => 
        cityData.dddCodes.includes(dddCode.code)
      );

      await prisma.city.create({
        data: {
          name: cityName,
          slug: slug,
          population: cityData.population,
          isCapital: cityData.isCapital,
          stateId: createdState.id,
          dddCodes: {
            connect: cityDddCodes.map(dddCode => ({ id: dddCode.id }))
          }
        }
      });
    }
  }

  console.log('Seed concluído com sucesso!');
  console.log(`Estados criados: ${statesData.length}`);
  console.log('Códigos DDD criados:', statesData.reduce((acc, state) => acc + state.dddCodes.length, 0));
  
  // Contar total de cidades criadas
  const totalCities = await prisma.city.count();
  console.log('Cidades criadas:', totalCities);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });