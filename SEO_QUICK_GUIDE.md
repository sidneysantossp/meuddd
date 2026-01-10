# 🚀 Guia Rápido - SEO e Analytics

## 📋 Arquivos Criados

```
public/
├── sitemap.xml          # Sitemap com todas as URLs
└── robots.txt           # Configuração de rastreamento

scripts/
└── generate-sitemap.cjs # Script para gerar sitemap

src/utils/
└── sitemap.ts          # Utilitário TypeScript para sitemap

index.html              # Google Analytics instalado
```

## ⚡ Comandos Rápidos

### Regenerar Sitemap
```bash
npm run generate:sitemap
```

### Verificar Arquivos
```bash
# Ver sitemap
cat public/sitemap.xml | head -20

# Ver robots.txt
cat public/robots.txt
```

## 🔗 URLs Importantes

### Produção
- **Sitemap**: https://meuddd.com.br/sitemap.xml
- **Robots**: https://meuddd.com.br/robots.txt

### Dashboards
- **Google Analytics**: https://analytics.google.com/
- **Search Console**: https://search.google.com/search-console/

## ✅ Checklist de Deploy

### Antes do Deploy
- [ ] Atualizar domínio em `scripts/generate-sitemap.cjs` (linha 30)
- [ ] Atualizar domínio em `public/robots.txt` (linha 8)
- [ ] Regenerar sitemap: `npm run generate:sitemap`
- [ ] Obter código de verificação do Google Search Console
- [ ] Adicionar meta tag de verificação no `index.html` (linha 21)

### Após o Deploy
- [ ] Verificar propriedade no Google Search Console
- [ ] Enviar sitemap no Search Console
- [ ] Testar Analytics (abrir site e verificar em tempo real)
- [ ] Verificar robots.txt: `https://seu-dominio.com.br/robots.txt`
- [ ] Verificar sitemap: `https://seu-dominio.com.br/sitemap.xml`

## 📊 Estatísticas do Sitemap

```
Total de URLs: 42
├── Páginas principais: 10
│   ├── / (Início)
│   ├── /estados
│   ├── /validar
│   ├── /busca-voz
│   ├── /gerador
│   ├── /blog
│   ├── /sobre
│   └── /contato
├── Estados: 27
│   └── /estado/{id}
└── Blog: 5
    └── /blog/{id}
```

## 🔧 Configurações

### Google Analytics
- **ID**: G-JBGCDM7PFC
- **Localização**: `index.html` (linhas 10-17)
- **Status**: ✅ Instalado

### Google Search Console
- **Localização**: `index.html` (linha 21)
- **Status**: ⏳ Pendente (adicionar código de verificação)

### Sitemap
- **Formato**: XML
- **Protocolo**: Sitemaps 0.9
- **Frequência**: Daily (home), Weekly (estados), Monthly (outras)
- **Prioridades**: 0.5 a 1.0

### Robots.txt
- **Acesso**: Permitido para todos os bots
- **Bloqueios**: Nenhum
- **Sitemap**: Declarado

## 🎯 Prioridades do Sitemap

| Página | Priority | Changefreq |
|--------|----------|------------|
| Início | 1.0 | daily |
| Estados (lista) | 0.9 | weekly |
| Estados (detalhes) | 0.8 | weekly |
| Blog (lista) | 0.8 | weekly |
| Blog (artigos) | 0.7 | monthly |
| Validar/Busca/Gerador | 0.7 | monthly |
| Sobre/Contato | 0.5 | monthly |

## 📝 Notas Importantes

1. **Domínio**: Atualmente configurado para `https://meuddd.com.br`
   - Altere em 2 lugares se o domínio for diferente

2. **Páginas de Cidades**: Não incluídas no sitemap estático
   - São geradas dinamicamente
   - Total estimado: ~730 cidades

3. **Regeneração**: Execute após adicionar novos conteúdos
   - Novos artigos do blog
   - Novas páginas principais
   - Mudanças na estrutura de URLs

4. **Analytics**: Rastreamento automático ativo
   - Eventos personalizados podem ser adicionados
   - Ver exemplos em `SEO_ANALYTICS_SETUP.md`

## 🆘 Solução de Problemas

### Sitemap não aparece no Search Console
- Verifique se o arquivo existe: `public/sitemap.xml`
- Verifique se o domínio está correto
- Aguarde 24-48h após envio
- Teste a URL diretamente no navegador

### Analytics não rastreia
- Verifique se o ID está correto: `G-JBGCDM7PFC`
- Limpe o cache do navegador
- Verifique em modo anônimo
- Aguarde 24h para dados aparecerem

### Robots.txt não funciona
- Verifique se o arquivo existe: `public/robots.txt`
- Teste no Search Console > Testador de robots.txt
- Verifique sintaxe (sem erros de digitação)

## 📚 Documentação Completa

Para informações detalhadas, consulte:
- **SEO_ANALYTICS_SETUP.md** - Documentação completa
- **scripts/generate-sitemap.cjs** - Código do gerador
- **src/utils/sitemap.ts** - Utilitário TypeScript

---

**Última atualização**: 2025-12-23
