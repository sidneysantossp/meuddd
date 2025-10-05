import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Função para criar o cliente Prisma com tratamento de erro
function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  
  // Verificar se o banco de dados existe
  const dbPath = process.env.DATABASE_URL.replace('file:', '');
  const dbDir = path.dirname(dbPath);
  
  // Criar diretório se não existir
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  // Verificar se o arquivo do banco de dados existe
  if (!fs.existsSync(dbPath)) {
    console.warn(`Database file not found at: ${dbPath}`);
    console.warn('Please ensure the database is properly initialized during build');
  }
  
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });
  
  // Testar conexão
  client.$connect()
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((error) => {
      console.error('Database connection failed:', error);
      throw error;
    });
  
  return client;
}

export const db =
  globalForPrisma.prisma ??
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db