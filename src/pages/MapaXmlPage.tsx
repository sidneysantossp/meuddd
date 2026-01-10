import { useEffect, useState } from 'react';

export default function MapaXmlPage() {
  const [xmlContent, setXmlContent] = useState<string>('');

  useEffect(() => {
    // Carregar o sitemap.xml como texto
    fetch('/sitemap.xml')
      .then(response => response.text())
      .then(text => {
        setXmlContent(text);
      })
      .catch(error => {
        console.error('Erro ao carregar sitemap:', error);
        // Se falhar, mostrar mensagem
        setXmlContent('<?xml version="1.0" encoding="UTF-8"?>\n<error>Arquivo sitemap.xml não encontrado. Por favor, acesse /mapa-do-site para visualizar o mapa do site.</error>');
      });
  }, []);

  // Renderizar apenas o XML como texto
  if (!xmlContent) {
    return null;
  }

  return (
    <pre style={{ 
      fontFamily: 'monospace',
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      margin: 0,
      padding: 0,
      backgroundColor: 'transparent'
    }}>
      {xmlContent}
    </pre>
  );
}
