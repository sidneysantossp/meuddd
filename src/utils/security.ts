/**
 * Utilitários de Segurança e Sanitização
 * Funções para proteger a aplicação contra XSS, injeção de código e outros ataques
 */

/**
 * Sanitiza uma string removendo caracteres HTML perigosos
 * Previne ataques XSS (Cross-Site Scripting)
 */
export function sanitizeHTML(input: string): string {
  if (!input) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Sanitiza entrada de busca removendo caracteres especiais perigosos
 * Mantém apenas letras, números, espaços e acentos
 */
export function sanitizeSearchInput(input: string): string {
  if (!input) return '';
  
  // Remove caracteres especiais perigosos, mantém letras, números, espaços e acentos
  return input
    .replace(/[<>{}[\]\\\/]/g, '') // Remove caracteres perigosos
    .trim()
    .slice(0, 100); // Limita o tamanho da busca
}

/**
 * Valida e sanitiza código DDD
 * Retorna apenas números de 2 dígitos
 */
export function sanitizeDDD(input: string): string {
  if (!input) return '';
  
  // Remove tudo que não é número e limita a 2 dígitos
  return input.replace(/\D/g, '').slice(0, 2);
}

/**
 * Valida se um código DDD é válido
 * DDDs válidos no Brasil: 11-99
 */
export function isValidDDD(ddd: string): boolean {
  const sanitized = sanitizeDDD(ddd);
  const num = Number.parseInt(sanitized, 10);
  
  // DDDs válidos no Brasil vão de 11 a 99
  return sanitized.length === 2 && num >= 11 && num <= 99;
}

/**
 * Sanitiza número de telefone
 * Remove tudo que não é número e limita ao tamanho máximo
 */
export function sanitizePhoneNumber(input: string): string {
  if (!input) return '';
  
  // Remove tudo que não é número e limita a 11 dígitos (DDD + número)
  return input.replace(/\D/g, '').slice(0, 11);
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
}

/**
 * Sanitiza URL removendo protocolos perigosos
 */
export function sanitizeURL(url: string): string {
  if (!url) return '';
  
  // Remove espaços
  const trimmed = url.trim();
  
  // Bloqueia protocolos perigosos
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = trimmed.toLowerCase();
  
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }
  
  return trimmed;
}

/**
 * Valida se uma URL é segura para redirecionamento
 * Previne Open Redirect vulnerabilities
 */
export function isSafeRedirectURL(url: string): boolean {
  if (!url) return false;
  
  try {
    // URLs relativas são seguras
    if (url.startsWith('/') && !url.startsWith('//')) {
      return true;
    }
    
    // Verifica se é uma URL absoluta do mesmo domínio
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Debounce function para limitar chamadas de função
 * Útil para otimizar buscas e prevenir sobrecarga
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function para limitar taxa de execução
 * Útil para eventos de scroll e resize
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Valida parâmetros de URL
 * Previne injeção através de query strings
 */
export function sanitizeURLParam(param: string): string {
  if (!param) return '';
  
  return decodeURIComponent(param)
    .replace(/[<>{}[\]\\]/g, '')
    .trim()
    .slice(0, 200);
}

/**
 * Valida slug de URL (para estados e cidades)
 */
export function isValidSlug(slug: string): boolean {
  if (!slug) return false;
  
  // Slugs devem conter apenas letras minúsculas, números e hífens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length <= 100;
}

/**
 * Sanitiza nome de cidade ou estado
 */
export function sanitizePlaceName(name: string): string {
  if (!name) return '';
  
  // Permite letras (incluindo acentuadas), espaços, hífens e apóstrofos
  return name
    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '')
    .trim()
    .slice(0, 100);
}

/**
 * Rate limiting simples baseado em localStorage
 * Previne abuso de funcionalidades
 */
export class RateLimiter {
  private key: string;
  private maxAttempts: number;
  private windowMs: number;

  constructor(key: string, maxAttempts: number, windowMs: number) {
    this.key = `ratelimit_${key}`;
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Verifica se a ação é permitida
   */
  isAllowed(): boolean {
    try {
      const data = localStorage.getItem(this.key);
      const now = Date.now();

      if (!data) {
        this.recordAttempt(now, 1);
        return true;
      }

      const { timestamp, attempts } = JSON.parse(data);

      // Se a janela de tempo expirou, reseta
      if (now - timestamp > this.windowMs) {
        this.recordAttempt(now, 1);
        return true;
      }

      // Se ainda está dentro da janela, verifica o limite
      if (attempts >= this.maxAttempts) {
        return false;
      }

      // Incrementa tentativas
      this.recordAttempt(timestamp, attempts + 1);
      return true;
    } catch {
      // Se houver erro com localStorage, permite a ação
      return true;
    }
  }

  private recordAttempt(timestamp: number, attempts: number): void {
    try {
      localStorage.setItem(
        this.key,
        JSON.stringify({ timestamp, attempts })
      );
    } catch {
      // Ignora erros de localStorage
    }
  }

  /**
   * Reseta o rate limiter
   */
  reset(): void {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // Ignora erros de localStorage
    }
  }
}

/**
 * Valida entrada de formulário genérica
 */
export function validateFormInput(
  value: string,
  minLength = 0,
  maxLength = 1000
): { isValid: boolean; error?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Campo obrigatório' };
  }

  if (value.length < minLength) {
    return {
      isValid: false,
      error: `Mínimo de ${minLength} caracteres`,
    };
  }

  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `Máximo de ${maxLength} caracteres`,
    };
  }

  return { isValid: true };
}

/**
 * Remove espaços extras e normaliza texto
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  
  return text
    .trim()
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .replace(/\n+/g, '\n'); // Remove quebras de linha múltiplas
}
