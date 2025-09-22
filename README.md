# Plataforma de Consulta DDD Brasil

Uma plataforma completa para consulta de códigos DDD do Brasil, desenvolvida com Next.js, TypeScript e Prisma.

## 🚀 Funcionalidades

- **Consulta DDD**: Busca rápida por código DDD ou cidade
- **Informações Detalhadas**: Dados completos sobre estados e cidades
- **Validação de DDD**: Ferramenta para validar números de telefone
- **Gerador de Números**: Geração aleatória de números de telefone
- **Busca por Voz**: Pesquisa usando comandos de voz
- **SEO Otimizado**: Dados estruturados Schema.org para melhor visibilidade
- **Design Responsivo**: Interface moderna e adaptável

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Banco de Dados**: Prisma ORM com SQLite
- **SEO**: Schema.org structured data, sitemap.xml
- **Deploy**: Vercel

## 📦 Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/sidneysantossp/meuddd.git
cd meuddd

# Instalar dependências
npm install

# Configurar banco de dados
npm run db:push
npm run db:seed

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:3000 para ver a aplicação.

## 🚀 Implantação na Vercel

### 1. Conectar com GitHub

1. Faça login na [Vercel](https://vercel.com)
2. Clique em "New Project"
3. Selecione o repositório `meuddd` do GitHub
4. Clique em "Import"

### 2. Configurar Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente nas configurações do projeto:

```env
# Database
DATABASE_URL=file:./dev.db

# NextAuth (se necessário)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-app.vercel.app

# Z-AI SDK (opcional)
ZAI_API_KEY=your-zai-api-key-here
```

### 3. Configurar Build Command

No painel de configurações do projeto Vercel:

- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Configurar Script de Build

Crie um arquivo `vercel.json` na raiz do projeto:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "buildCommand": "npm run vercel-build",
  "outputDirectory": ".next"
}
```

### 5. Deploy

Clique em "Deploy" para iniciar a implantação. A Vercel irá:

1. Instalar as dependências
2. Gerar o cliente Prisma
3. Configurar o banco de dados
4. Construir a aplicação Next.js
5. Implantar na Vercel Edge Network

## 🔧 Configurações Adicionais

### Banco de Dados

Para produção, considere usar um banco de dados mais robusto:

```env
# PostgreSQL (recomendado para produção)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# MySQL
DATABASE_URL="mysql://user:password@host:port/database"
```

### Domínio Personalizado

1. Após o deploy, vá para as configurações do projeto
2. Clique em "Domains"
3. Adicione seu domínio personalizado
4. Configure as configurações de DNS conforme as instruções

### SSL e HTTPS

A Vercel fornece certificado SSL automaticamente para todos os domínios.

## 📊 Monitoramento

A Vercel oferece:

- **Analytics**: Monitoramento de tráfego e performance
- **Logs**: Visualização de erros e atividades
- **Webhooks**: Notificações de deploy
- **Preview Deployments**: Testes em ambientes de staging

## 🔄 CI/CD

O projeto está configurado para implantação contínua:

- **Push para main**: Deploy automático em produção
- **Pull Requests**: Deploy automático em preview
- **Branches**: Deploy automático para cada branch

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de build do Prisma**:
   ```bash
   npm run db:generate
   npm run build
   ```

2. **Erro de conexão com banco de dados**:
   - Verifique as variáveis de ambiente
   - Execute `npm run db:push` para atualizar o schema

3. **Erro de permissões**:
   - Verifique as permissões do arquivo de banco de dados
   - Execute `chmod 644 prisma/dev.db`

### Logs de Erro

Acesse os logs na Vercel:
1. Vá para o projeto no painel da Vercel
2. Clique na aba "Logs"
3. Selecione o ambiente (production/preview)

## 📈 Performance

A plataforma está otimizada para:

- **Carregamento rápido**: Next.js com SSG/SSR
- **SEO**: Meta tags e dados estruturados
- **Imagens otimizadas**: Next.js Image component
- **Cache**: Estratégias de cache eficientes

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das suas mudanças
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma issue no GitHub
- Envie um email para o mantenedor

---

**Desenvolvido com ❤️ para a comunidade brasileira**