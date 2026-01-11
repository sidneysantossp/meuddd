/**
 * Utilitários para geração de slugs consistentes
 */

/**
 * Gera slug a partir do nome da cidade
 * Usa a mesma lógica em toda a aplicação para garantir consistência
 */
export function createCitySlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Gera slug a partir do nome do estado
 */
export function createStateSlug(stateName: string): string {
  return stateName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
