export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

// Tipos para o sistema de DDD
export type Region = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';

export interface State {
  id: string;
  name: string;
  slug: string; // URL-friendly version of name (e.g., 'alagoas', 'sao-paulo')
  abbreviation: string;
  region: Region;
  capital: string;
  population: number;
  dddCodes: string[];
  cities: City[];
}

export interface City {
  name: string;
  ddd: string;
  population?: number;
}

// Tipos para mensagens de contato
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  read?: boolean;
}

// Tipos para o sistema de blog
export type BlogPostType = 
  | 'melhor-internet-fibra'
  | 'internet-fibra-cobertura'
  | 'internet-empresarial'
  | 'plano-internet-barato';

export interface BlogPost {
  id: string;
  type: BlogPostType;
  slug: string;
  title: string;
  description: string;
  content: BlogPostContent;
  city: {
    name: string;
    slug: string;
    ddd: string;
  };
  state: {
    name: string;
    slug: string;
  };
  author: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: number; // em minutos
  keywords: string[];
  relatedCities: string[]; // slugs de cidades vizinhas
}

export interface BlogPostContent {
  introduction: string;
  sections: BlogSection[];
  faq: FAQItem[];
  checklist: ChecklistItem[];
  conclusion: string;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string;
  subsections?: BlogSubsection[];
  table?: ComparisonTable;
}

export interface BlogSubsection {
  title: string;
  content: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: ComparisonTableRow[];
}

export interface ComparisonTableRow {
  cells: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChecklistItem {
  text: string;
  checked?: boolean;
}

// Tipo para perfil de usuário
export interface Profile {
  id: string;
  username?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}
