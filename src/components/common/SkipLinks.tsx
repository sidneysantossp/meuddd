import { Link } from 'react-router-dom';

/**
 * Skip Links Component
 * Melhora a acessibilidade permitindo que usuários de teclado pulem para o conteúdo principal
 * Segue as diretrizes WCAG 2.1 para navegação por teclado
 */
export default function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a
        href="#main-content"
        className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground px-4 py-2 m-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>
      <a
        href="#navigation"
        className="fixed top-0 left-0 z-[9999] bg-primary text-primary-foreground px-4 py-2 m-2 mt-14 rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Pular para a navegação
      </a>
    </div>
  );
}
