import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Limpar dados existentes
  await prisma.cityDddCode.deleteMany()
  await prisma.city.deleteMany()
  await prisma.dddCode.deleteMany()
  await prisma.state.deleteMany()

  // Estados brasileiros com seus dados
  const states = [
    {
      name: 'Acre',
      slug: 'acre',
      code: 'AC',
      region: 'Norte',
      population: 830000,
      area: 164112.0,
      capital: 'Rio Branco',
      dddCodes: ['68']
    },
    {
      name: 'Alagoas',
      slug: 'alagoas',
      code: 'AL',
      region: 'Nordeste',
      population: 3350000,
      area: 27848.0,
      capital: 'Maceió',
      dddCodes: ['82']
    },
    {
      name: 'Amapá',
      slug: 'amapa',
      code: 'AP',
      region: 'Norte',
      population: 733000,
      area: 142814.0,
      capital: 'Macapá',
      dddCodes: ['96']
    },
    {
      name: 'Amazonas',
      slug: 'amazonas',
      code: 'AM',
      region: 'Norte',
      population: 3940000,
      area: 1570745.0,
      capital: 'Manaus',
      dddCodes: ['92', '97']
    },
    {
      name: 'Bahia',
      slug: 'bahia',
      code: 'BA',
      region: 'Nordeste',
      population: 14873000,
      area: 564733.0,
      capital: 'Salvador',
      dddCodes: ['71', '73', '74', '75', '77']
    },
    {
      name: 'Ceará',
      slug: 'ceara',
      code: 'CE',
      region: 'Nordeste',
      population: 9187000,
      area: 148825.0,
      capital: 'Fortaleza',
      dddCodes: ['85', '88']
    },
    {
      name: 'Distrito Federal',
      slug: 'distrito-federal',
      code: 'DF',
      region: 'Centro-Oeste',
      population: 3055000,
      area: 5779.0,
      capital: 'Brasília',
      dddCodes: ['61']
    },
    {
      name: 'Espírito Santo',
      slug: 'espirito-santo',
      code: 'ES',
      region: 'Sudeste',
      population: 4064000,
      area: 46073.0,
      capital: 'Vitória',
      dddCodes: ['27', '28']
    },
    {
      name: 'Goiás',
      slug: 'goias',
      code: 'GO',
      region: 'Centro-Oeste',
      population: 7206000,
      area: 340111.0,
      capital: 'Goiânia',
      dddCodes: ['62', '64']
    },
    {
      name: 'Maranhão',
      slug: 'maranhao',
      code: 'MA',
      region: 'Nordeste',
      population: 7035000,
      area: 331983.0,
      capital: 'São Luís',
      dddCodes: ['98', '99']
    },
    {
      name: 'Mato Grosso',
      slug: 'mato-grosso',
      code: 'MT',
      region: 'Centro-Oeste',
      population: 3658000,
      area: 903357.0,
      capital: 'Cuiabá',
      dddCodes: ['65', '66']
    },
    {
      name: 'Mato Grosso do Sul',
      slug: 'mato-grosso-do-sul',
      code: 'MS',
      region: 'Centro-Oeste',
      population: 2809000,
      area: 357125.0,
      capital: 'Campo Grande',
      dddCodes: ['67']
    },
    {
      name: 'Minas Gerais',
      slug: 'minas-gerais',
      code: 'MG',
      region: 'Sudeste',
      population: 21292000,
      area: 586522.0,
      capital: 'Belo Horizonte',
      dddCodes: ['31', '32', '33', '34', '35', '37', '38']
    },
    {
      name: 'Pará',
      slug: 'para',
      code: 'PA',
      region: 'Norte',
      population: 8602000,
      area: 1247954.0,
      capital: 'Belém',
      dddCodes: ['91', '93', '94']
    },
    {
      name: 'Paraíba',
      slug: 'paraiba',
      code: 'PB',
      region: 'Nordeste',
      population: 4039000,
      area: 56469.0,
      capital: 'João Pessoa',
      dddCodes: ['83']
    },
    {
      name: 'Paraná',
      slug: 'parana',
      code: 'PR',
      region: 'Sul',
      population: 11516000,
      area: 199307.0,
      capital: 'Curitiba',
      dddCodes: ['41', '42', '43', '44', '45', '46']
    },
    {
      name: 'Pernambuco',
      slug: 'pernambuco',
      code: 'PE',
      region: 'Nordeste',
      population: 9616000,
      area: 98148.0,
      capital: 'Recife',
      dddCodes: ['81', '87']
    },
    {
      name: 'Piauí',
      slug: 'piaui',
      code: 'PI',
      region: 'Nordeste',
      population: 3271000,
      area: 251529.0,
      capital: 'Teresina',
      dddCodes: ['86', '89']
    },
    {
      name: 'Rio de Janeiro',
      slug: 'rio-de-janeiro',
      code: 'RJ',
      region: 'Sudeste',
      population: 17463000,
      area: 43696.0,
      capital: 'Rio de Janeiro',
      dddCodes: ['21', '22', '24']
    },
    {
      name: 'Rio Grande do Norte',
      slug: 'rio-grande-do-norte',
      code: 'RN',
      region: 'Nordeste',
      population: 3534000,
      area: 52811.0,
      capital: 'Natal',
      dddCodes: ['84']
    },
    {
      name: 'Rio Grande do Sul',
      slug: 'rio-grande-do-sul',
      code: 'RS',
      region: 'Sul',
      population: 11463000,
      area: 281730.0,
      capital: 'Porto Alegre',
      dddCodes: ['51', '53', '54', '55']
    },
    {
      name: 'Rondônia',
      slug: 'rondonia',
      code: 'RO',
      region: 'Norte',
      population: 1796000,
      area: 237576.0,
      capital: 'Porto Velho',
      dddCodes: ['69']
    },
    {
      name: 'Roraima',
      slug: 'roraima',
      code: 'RR',
      region: 'Norte',
      population: 631000,
      area: 224300.0,
      capital: 'Boa Vista',
      dddCodes: ['95']
    },
    {
      name: 'Santa Catarina',
      slug: 'santa-catarina',
      code: 'SC',
      region: 'Sul',
      population: 7252000,
      area: 95736.0,
      capital: 'Florianópolis',
      dddCodes: ['47', '48', '49']
    },
    {
      name: 'São Paulo',
      slug: 'sao-paulo',
      code: 'SP',
      region: 'Sudeste',
      population: 46649000,
      area: 248209.0,
      capital: 'São Paulo',
      dddCodes: ['11', '12', '13', '14', '15', '16', '17', '18', '19']
    },
    {
      name: 'Sergipe',
      slug: 'sergipe',
      code: 'SE',
      region: 'Nordeste',
      population: 2318000,
      area: 21918.0,
      capital: 'Aracaju',
      dddCodes: ['79']
    },
    {
      name: 'Tocantins',
      slug: 'tocantins',
      code: 'TO',
      region: 'Norte',
      population: 1590000,
      area: 277620.0,
      capital: 'Palmas',
      dddCodes: ['63']
    }
  ]

  // Inserir estados e códigos DDD
  for (const stateData of states) {
    const state = await prisma.state.create({
      data: {
        name: stateData.name,
        slug: stateData.slug,
        code: stateData.code,
        region: stateData.region,
        population: stateData.population,
        area: stateData.area,
        capital: stateData.capital,
        dddCodes: {
          create: stateData.dddCodes.map(code => ({
            code,
            description: `DDD ${code} - ${stateData.name}`
          }))
        }
      }
    })

    console.log(`Created state: ${state.name} with DDD codes: ${stateData.dddCodes.join(', ')}`)
  }

  // Adicionar algumas cidades de exemplo para cada estado
  const sampleCities = [
    // Acre
    { name: 'Rio Branco', stateSlug: 'acre', population: 413418, isCapital: true, dddCodes: ['68'] },
    { name: 'Cruzeiro do Sul', stateSlug: 'acre', population: 87817, isCapital: false, dddCodes: ['68'] },
    { name: 'Sena Madureira', stateSlug: 'acre', population: 45336, isCapital: false, dddCodes: ['68'] },
    
    // São Paulo
    { name: 'São Paulo', stateSlug: 'sao-paulo', population: 12325232, isCapital: true, dddCodes: ['11'] },
    { name: 'Campinas', stateSlug: 'sao-paulo', population: 1223237, isCapital: false, dddCodes: ['19'] },
    { name: 'Guarulhos', stateSlug: 'sao-paulo', population: 1392121, isCapital: false, dddCodes: ['11'] },
    { name: 'São Bernardo do Campo', stateSlug: 'sao-paulo', population: 844483, isCapital: false, dddCodes: ['11'] },
    { name: 'Santo André', stateSlug: 'sao-paulo', population: 720938, isCapital: false, dddCodes: ['11'] },
    { name: 'Osasco', stateSlug: 'sao-paulo', population: 699944, isCapital: false, dddCodes: ['11'] },
    { name: 'São José dos Campos', stateSlug: 'sao-paulo', population: 729374, isCapital: false, dddCodes: ['12'] },
    { name: 'Ribeirão Preto', stateSlug: 'sao-paulo', population: 720116, isCapital: false, dddCodes: ['16'] },
    { name: 'Sorocaba', stateSlug: 'sao-paulo', population: 705159, isCapital: false, dddCodes: ['15'] },
    { name: 'Santos', stateSlug: 'sao-paulo', population: 433656, isCapital: false, dddCodes: ['13'] },
    
    // Rio de Janeiro
    { name: 'Rio de Janeiro', stateSlug: 'rio-de-janeiro', population: 6747815, isCapital: true, dddCodes: ['21'] },
    { name: 'Niterói', stateSlug: 'rio-de-janeiro', population: 513584, isCapital: false, dddCodes: ['21'] },
    { name: 'Duque de Caxias', stateSlug: 'rio-de-janeiro', population: 924624, isCapital: false, dddCodes: ['21'] },
    { name: 'Nova Iguaçu', stateSlug: 'rio-de-janeiro', population: 865843, isCapital: false, dddCodes: ['21'] },
    { name: 'Petrópolis', stateSlug: 'rio-de-janeiro', population: 306678, isCapital: false, dddCodes: ['24'] },
    { name: 'Volta Redonda', stateSlug: 'rio-de-janeiro', population: 273988, isCapital: false, dddCodes: ['24'] },
    { name: 'Barra Mansa', stateSlug: 'rio-de-janeiro', population: 185013, isCapital: false, dddCodes: ['24'] },
    { name: 'Angra dos Reis', stateSlug: 'rio-de-janeiro', population: 207044, isCapital: false, dddCodes: ['24'] },
    { name: 'Cabo Frio', stateSlug: 'rio-de-janeiro', population: 230378, isCapital: false, dddCodes: ['22'] },
    { name: 'Macaé', stateSlug: 'rio-de-janeiro', population: 234628, isCapital: false, dddCodes: ['22'] },
    
    // Minas Gerais
    { name: 'Belo Horizonte', stateSlug: 'minas-gerais', population: 2527011, isCapital: true, dddCodes: ['31'] },
    { name: 'Uberlândia', stateSlug: 'minas-gerais', population: 702577, isCapital: false, dddCodes: ['34'] },
    { name: 'Contagem', stateSlug: 'minas-gerais', population: 639731, isCapital: false, dddCodes: ['31'] },
    { name: 'Juiz de Fora', stateSlug: 'minas-gerais', population: 580753, isCapital: false, dddCodes: ['32'] },
    { name: 'Betim', stateSlug: 'minas-gerais', population: 444735, isCapital: false, dddCodes: ['31'] },
    { name: 'Montes Claros', stateSlug: 'minas-gerais', population: 398226, isCapital: false, dddCodes: ['38'] },
    { name: 'Ribeirão das Neves', stateSlug: 'minas-gerais', population: 338197, isCapital: false, dddCodes: ['31'] },
    { name: 'Uberaba', stateSlug: 'minas-gerais', population: 340277, isCapital: false, dddCodes: ['34'] },
    { name: 'Governador Valadares', stateSlug: 'minas-gerais', population: 281046, isCapital: false, dddCodes: ['33'] },
    { name: 'Ipatinga', stateSlug: 'minas-gerais', population: 270245, isCapital: false, dddCodes: ['31'] },
    
    // Bahia
    { name: 'Salvador', stateSlug: 'bahia', population: 2872347, isCapital: true, dddCodes: ['71'] },
    { name: 'Feira de Santana', stateSlug: 'bahia', population: 657314, isCapital: false, dddCodes: ['75'] },
    { name: 'Vitória da Conquista', stateSlug: 'bahia', population: 365453, isCapital: false, dddCodes: ['77'] },
    { name: 'Camaçari', stateSlug: 'bahia', population: 307864, isCapital: false, dddCodes: ['71'] },
    { name: 'Itabuna', stateSlug: 'bahia', population: 238940, isCapital: false, dddCodes: ['73'] },
    { name: 'Juazeiro', stateSlug: 'bahia', population: 235729, isCapital: false, dddCodes: ['74'] },
    { name: 'Lauro de Freitas', stateSlug: 'bahia', population: 201067, isCapital: false, dddCodes: ['71'] },
    { name: 'Alagoinhas', stateSlug: 'bahia', population: 157557, isCapital: false, dddCodes: ['75'] },
    { name: 'Barreiras', stateSlug: 'bahia', population: 158695, isCapital: false, dddCodes: ['77'] },
    { name: 'Porto Seguro', stateSlug: 'bahia', population: 150658, isCapital: false, dddCodes: ['73'] },
    
    // Rio Grande do Sul
    { name: 'Porto Alegre', stateSlug: 'rio-grande-do-sul', population: 1488252, isCapital: true, dddCodes: ['51'] },
    { name: 'Caxias do Sul', stateSlug: 'rio-grande-do-sul', population: 517451, isCapital: false, dddCodes: ['54'] },
    { name: 'Gravataí', stateSlug: 'rio-grande-do-sul', population: 262651, isCapital: false, dddCodes: ['51'] },
    { name: 'Canoas', stateSlug: 'rio-grande-do-sul', population: 349581, isCapital: false, dddCodes: ['51'] },
    { name: 'Bagé', stateSlug: 'rio-grande-do-sul', population: 127827, isCapital: false, dddCodes: ['53'] },
    { name: 'Santa Maria', stateSlug: 'rio-grande-do-sul', population: 283653, isCapital: false, dddCodes: ['55'] },
    { name: 'Novo Hamburgo', stateSlug: 'rio-grande-do-sul', population: 247734, isCapital: false, dddCodes: ['51'] },
    { name: 'São Leopoldo', stateSlug: 'rio-grande-do-sul', population: 236040, isCapital: false, dddCodes: ['51'] },
    { name: 'Rio Grande', stateSlug: 'rio-grande-do-sul', population: 210325, isCapital: false, dddCodes: ['53'] },
    { name: 'Pelotas', stateSlug: 'rio-grande-do-sul', population: 343224, isCapital: false, dddCodes: ['53'] }
  ]

  for (const cityData of sampleCities) {
    const state = await prisma.state.findUnique({
      where: { slug: cityData.stateSlug },
      include: { dddCodes: true }
    })

    if (state) {
      const slug = cityData.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const city = await prisma.city.create({
        data: {
          name: cityData.name,
          slug,
          population: cityData.population,
          isCapital: cityData.isCapital,
          stateId: state.id,
          latitude: null, // Será adicionado depois
          longitude: null, // Será adicionado depois
        }
      })

      // Conectar códigos DDD à cidade através da tabela de junção
      const relevantDddCodes = state.dddCodes.filter(ddd => cityData.dddCodes.includes(ddd.code))
      for (const dddCode of relevantDddCodes) {
        await prisma.cityDddCode.create({
          data: {
            cityId: city.id,
            dddCodeId: dddCode.id
          }
        })
      }

      console.log(`Created city: ${city.name} in ${state.name}`)
    }
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })