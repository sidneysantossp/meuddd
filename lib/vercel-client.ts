import { PrismaClient } from '@prisma/client';

// Cliente Prisma para Vercel com tratamento de erros
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// Função para verificar e inicializar o banco de dados
export async function initializeVercelDatabase() {
  try {
    await prisma.$connect();
    
    // Verificar se há dados
    const stateCount = await prisma.state.count();
    
    if (stateCount === 0) {
      console.log('📊 Banco de dados vazio no ambiente Vercel');
      // Em produção na Vercel, podemos retornar dados mockados ou usar uma abordagem diferente
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com banco de dados na Vercel:', error);
    return false;
  }
}

export default prisma;