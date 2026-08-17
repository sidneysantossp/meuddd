# Validação de partilha

Em 11 de agosto de 2026, os controlos de partilha foram verificados na página `/ddd/11` e na ficha municipal `/cidade/sp/sao-paulo`.

| Ação           | Resultado                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copiar ligação | A página municipal exibiu o estado visual **Copiado**, a mensagem acessível «Link copiado com sucesso» e a notificação «A rota está pronta para partilhar».               |
| WhatsApp       | As ações de DDD e municipal abriram o destino oficial com título e URL predefinidos, sem publicar conteúdo.                                                               |
| LinkedIn       | As ações municipal e de DDD encaminharam para a partilha com a URL correspondente codificada; o serviço apresentou autenticação, como esperado para a conta não iniciada. |
| X              | As ações municipal e de DDD abriram o endpoint de intenção de publicação com título e URL codificados, sem publicar conteúdo.                                             |

Os testes unitários cobrem os três destinos e a cópia do URL absoluto, incluindo o anúncio acessível de sucesso. A suite completa terminou com 5 ficheiros e 9 testes aprovados.
