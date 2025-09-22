import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gerador de Números Telefônicos - Crie Números para Testes',
  description: 'Buscando gerar números telefônicos? Use nossa ferramenta online para criar números de telefone válidos para testes e demonstrações. Gere números fixos e celulares por DDD.',
  keywords: [
    'gerador de números', 'gerar números telefônicos', 'números para testes', 
    'números fictícios', 'criar números', 'gerador de telefone', 'números DDD',
    'telefonia teste', 'números para demonstração', 'gerador online'
  ],
  openGraph: {
    title: 'Gerador de Números Telefônicos - Ferramenta Online',
    description: 'Crie números de telefone válidos para testes e demonstrações. Ferramenta gratuita com todos os DDDs do Brasil.',
    type: 'website',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerador de Números Telefônicos',
    description: 'Ferramenta online para gerar números de telefone válidos para testes.'
  },
  alternates: {
    canonical: 'https://meuddd.vercel.app/gerador-numeros'
  },
  robots: {
    index: true,
    follow: true
  }
};