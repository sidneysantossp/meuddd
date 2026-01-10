import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Mostrar o popup após um pequeno delay para melhor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Salvar consentimento no localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    closePopup();
  };

  const handleReject = () => {
    // Salvar rejeição no localStorage
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    closePopup();
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <Card className="max-w-sm bg-card border-border shadow-lg">
        <div className="p-3 relative">
          {/* Botão Fechar */}
          <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col gap-2 pr-6">
            {/* Título compacto */}
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-primary shrink-0" />
              <h3 className="text-sm font-semibold text-foreground">
                Cookies
              </h3>
            </div>

            {/* Texto resumido */}
            <p className="text-xs text-muted-foreground leading-relaxed">
              Usamos cookies para melhorar sua experiência. Veja nossa{' '}
              <a 
                href="/politica-privacidade" 
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política
              </a>.
            </p>

            {/* Botões compactos */}
            <div className="flex gap-2">
              <Button
                onClick={handleReject}
                variant="outline"
                size="sm"
                className="flex-1 h-8 text-xs"
              >
                Recusar
              </Button>
              <Button
                onClick={handleAccept}
                size="sm"
                className="flex-1 h-8 text-xs"
              >
                Aceitar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
