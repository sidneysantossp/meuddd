/**
 * Utilitário de Analytics para Google Analytics 4 e Google Tag Manager
 * 
 * Este arquivo fornece funções para rastrear eventos, pageviews e conversões
 * no Google Analytics 4 e Google Tag Manager.
 */

// Declaração de tipos para o gtag global
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Verifica se o Google Analytics está disponível
 */
export const isAnalyticsAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Rastreia uma visualização de página
 * @param path - Caminho da página (ex: '/estados/sao-paulo')
 * @param title - Título da página (ex: 'São Paulo - DDD 11, 12, 13...')
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsAvailable()) {
    console.warn('Google Analytics não está disponível');
    return;
  }

  try {
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });

    console.log('📊 Pageview rastreada:', { path, title });
  } catch (error) {
    console.error('Erro ao rastrear pageview:', error);
  }
};

/**
 * Rastreia um evento customizado
 * @param eventName - Nome do evento (ex: 'search', 'click_state', 'filter_region')
 * @param eventParams - Parâmetros adicionais do evento
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!isAnalyticsAvailable()) {
    console.warn('Google Analytics não está disponível');
    return;
  }

  try {
    window.gtag?.('event', eventName, eventParams);
    console.log('📊 Evento rastreado:', eventName, eventParams);
  } catch (error) {
    console.error('Erro ao rastrear evento:', error);
  }
};

/**
 * Rastreia uma busca
 * @param searchTerm - Termo buscado
 * @param resultsCount - Número de resultados encontrados
 */
export const trackSearch = (searchTerm: string, resultsCount: number): void => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Rastreia clique em um estado
 * @param stateName - Nome do estado (ex: 'São Paulo')
 * @param stateId - ID do estado (ex: 'sao-paulo')
 */
export const trackStateClick = (stateName: string, stateId: string): void => {
  trackEvent('click_state', {
    state_name: stateName,
    state_id: stateId,
  });
};

/**
 * Rastreia clique em uma cidade
 * @param cityName - Nome da cidade (ex: 'São Paulo')
 * @param cityId - ID da cidade (ex: 'sao-paulo')
 * @param stateName - Nome do estado (ex: 'São Paulo')
 */
export const trackCityClick = (
  cityName: string,
  cityId: string,
  stateName: string
): void => {
  trackEvent('click_city', {
    city_name: cityName,
    city_id: cityId,
    state_name: stateName,
  });
};

/**
 * Rastreia filtro por região
 * @param region - Região selecionada (ex: 'Nordeste', 'Sudeste')
 */
export const trackRegionFilter = (region: string): void => {
  trackEvent('filter_region', {
    region: region,
  });
};

/**
 * Rastreia validação de DDD
 * @param dddCode - Código DDD validado (ex: '11', '82')
 * @param isValid - Se o DDD é válido
 */
export const trackDDDValidation = (dddCode: string, isValid: boolean): void => {
  trackEvent('validate_ddd', {
    ddd_code: dddCode,
    is_valid: isValid,
  });
};

/**
 * Rastreia uso da busca por voz
 * @param transcript - Texto transcrito da voz
 * @param success - Se a transcrição foi bem-sucedida
 */
export const trackVoiceSearch = (transcript: string, success: boolean): void => {
  trackEvent('voice_search', {
    transcript: transcript,
    success: success,
  });
};

/**
 * Rastreia geração de número de telefone
 * @param dddCode - Código DDD usado (ex: '11')
 * @param generatedNumber - Número gerado
 */
export const trackPhoneGeneration = (
  dddCode: string,
  generatedNumber: string
): void => {
  trackEvent('generate_phone', {
    ddd_code: dddCode,
    generated_number: generatedNumber,
  });
};

/**
 * Rastreia clique em link externo
 * @param url - URL do link externo
 * @param linkText - Texto do link
 */
export const trackExternalLink = (url: string, linkText: string): void => {
  trackEvent('click_external_link', {
    link_url: url,
    link_text: linkText,
  });
};

/**
 * Rastreia leitura de post do blog
 * @param postId - ID do post
 * @param postTitle - Título do post
 */
export const trackBlogPostView = (postId: string, postTitle: string): void => {
  trackEvent('view_blog_post', {
    post_id: postId,
    post_title: postTitle,
  });
};

/**
 * Rastreia interação com o mapa
 * @param action - Ação realizada (ex: 'zoom', 'click_marker', 'pan')
 * @param details - Detalhes adicionais
 */
export const trackMapInteraction = (
  action: string,
  details?: Record<string, unknown>
): void => {
  trackEvent('map_interaction', {
    action: action,
    ...details,
  });
};

/**
 * Rastreia envio de formulário de contato
 * @param formName - Nome do formulário (ex: 'contact_form')
 * @param success - Se o envio foi bem-sucedido
 */
export const trackFormSubmission = (
  formName: string,
  success: boolean
): void => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  });
};

/**
 * Rastreia erro na aplicação
 * @param errorMessage - Mensagem de erro
 * @param errorLocation - Localização do erro (componente/página)
 */
export const trackError = (errorMessage: string, errorLocation: string): void => {
  trackEvent('app_error', {
    error_message: errorMessage,
    error_location: errorLocation,
  });
};

/**
 * Rastreia tempo de permanência na página
 * @param pagePath - Caminho da página
 * @param timeInSeconds - Tempo em segundos
 */
export const trackTimeOnPage = (pagePath: string, timeInSeconds: number): void => {
  trackEvent('time_on_page', {
    page_path: pagePath,
    time_seconds: timeInSeconds,
  });
};

/**
 * Rastreia scroll da página
 * @param scrollPercentage - Porcentagem de scroll (ex: 25, 50, 75, 100)
 */
export const trackScroll = (scrollPercentage: number): void => {
  trackEvent('scroll', {
    scroll_percentage: scrollPercentage,
  });
};

/**
 * Inicializa o rastreamento de scroll automático
 */
export const initScrollTracking = (): (() => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const scrollThresholds = [25, 50, 75, 100];
  const triggeredThresholds = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

    for (const threshold of scrollThresholds) {
      if (scrollPercentage >= threshold && !triggeredThresholds.has(threshold)) {
        triggeredThresholds.add(threshold);
        trackScroll(threshold);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Retorna função de cleanup
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Rastreia conversão (objetivo alcançado)
 * @param conversionName - Nome da conversão (ex: 'newsletter_signup', 'contact_form_submit')
 * @param value - Valor da conversão (opcional)
 */
export const trackConversion = (
  conversionName: string,
  value?: number
): void => {
  trackEvent('conversion', {
    conversion_name: conversionName,
    value: value,
  });
};

// Exporta todas as funções como um objeto para facilitar importação
export const analytics = {
  isAvailable: isAnalyticsAvailable,
  pageView: trackPageView,
  event: trackEvent,
  search: trackSearch,
  stateClick: trackStateClick,
  cityClick: trackCityClick,
  regionFilter: trackRegionFilter,
  dddValidation: trackDDDValidation,
  voiceSearch: trackVoiceSearch,
  phoneGeneration: trackPhoneGeneration,
  externalLink: trackExternalLink,
  blogPostView: trackBlogPostView,
  mapInteraction: trackMapInteraction,
  formSubmission: trackFormSubmission,
  error: trackError,
  timeOnPage: trackTimeOnPage,
  scroll: trackScroll,
  initScrollTracking: initScrollTracking,
  conversion: trackConversion,
};

export default analytics;
