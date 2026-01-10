/**
 * Converte texto para formato slug URL-friendly
 * Remove acentos, converte para minúsculas e substitui espaços por hífens
 * 
 * @param text - Texto para converter
 * @returns String no formato slug
 * 
 * @example
 * slugify('São Paulo') // 'sao-paulo'
 * slugify('Espírito Santo') // 'espirito-santo'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

/**
 * Converte slug de volta para formato de título
 * 
 * @param slug - Slug para converter
 * @returns String formatada como título
 * 
 * @example
 * deslugify('sao-paulo') // 'Sao Paulo'
 */
export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
