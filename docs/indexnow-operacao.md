# Operação do IndexNow

O Meu DDD utiliza a chave pública `282752bf-8a95-4e8f-8504-771d734634f1`, verificada no endereço canónico `https://www.meuddd.com.br/282752bf-8a95-4e8f-8504-771d734634f1.txt`. O ficheiro contém apenas a própria chave, em UTF-8, e deve permanecer publicado na raiz enquanto a chave estiver ativa.

Após publicar uma alteração substancial em páginas públicas, envie apenas as URLs diretamente afetadas. O comando abaixo aceita entre uma e 10.000 URLs do host canónico e recusa domínios externos:

```bash
pnpm indexnow:submit https://www.meuddd.com.br/guia/como-ligar-para-outro-estado
```

O endpoint global pode responder `202` na primeira notificação, enquanto verifica a chave, e `200` em submissões posteriores. A aceitação confirma o recebimento, não a indexação imediata. Evite reenviar uma URL sem mudança editorial ou territorial material.

## Referências

[1] [Documentação do protocolo IndexNow](https://www.indexnow.org/documentation)

[2] [FAQ oficial do IndexNow](https://www.indexnow.org/faq)
