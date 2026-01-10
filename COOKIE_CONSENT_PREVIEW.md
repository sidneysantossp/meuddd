# Preview Visual do Pop-up de Consentimento de Cookies

## 🎨 Como Ficará na Prática

### Desktop (≥ 1280px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         CONTEÚDO DA PÁGINA                                   │
│                                                                              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────────┐  [X]│
│  │  ┌────┐                                                             │     │
│  │  │ 🍪 │  🍪 Política de Cookies                                     │     │
│  │  └────┘                                                             │     │
│  │         Utilizamos cookies para melhorar sua experiência de         │     │
│  │         navegação, personalizar conteúdo e analisar nosso tráfego.  │     │
│  │         Ao clicar em "Aceitar", você concorda com o uso de cookies  │     │
│  │         conforme nossa Política de Privacidade.                     │     │
│  │                                                                      │     │
│  │         ┌──────────┐  ┌─────────────────┐                          │     │
│  │         │ Rejeitar │  │ Aceitar Cookies │                          │     │
│  │         └──────────┘  └─────────────────┘                          │     │
│  └────────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 1280px)

```
┌─────────────────────────────────┐
│                                 │
│     CONTEÚDO DA PÁGINA          │
│                                 │
│                                 │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ ┌─────────────────────────┐ [X]│
│ │  ┌────┐                  │    │
│ │  │ 🍪 │                  │    │
│ │  └────┘                  │    │
│ │                          │    │
│ │  🍪 Política de Cookies  │    │
│ │                          │    │
│ │  Utilizamos cookies para │    │
│ │  melhorar sua experiência│    │
│ │  de navegação...         │    │
│ │  Política de Privacidade │    │
│ │                          │    │
│ │  ┌────────────────────┐  │    │
│ │  │     Rejeitar       │  │    │
│ │  └────────────────────┘  │    │
│ │  ┌────────────────────┐  │    │
│ │  │  Aceitar Cookies   │  │    │
│ │  └────────────────────┘  │    │
│ └─────────────────────────┘    │
└─────────────────────────────────┘
```

## 🎬 Animação de Entrada

### Estado Inicial (Oculto)
```
┌──────────────────────────────────┐
│                                  │
│     CONTEÚDO DA PÁGINA           │
│                                  │
│                                  │
└──────────────────────────────────┘
                                     
                                     ← Pop-up está abaixo da tela
                                       (translate-y-full, opacity-0)
```

### Após 1 Segundo (Aparecendo)
```
┌──────────────────────────────────┐
│                                  │
│     CONTEÚDO DA PÁGINA           │
│                                  │
└──────────────────────────────────┘
┌──────────────────────────────────┐
│  ┌────────────────────────────┐  │
│  │  🍪 Política de Cookies    │  │ ← Pop-up desliza para cima
│  │  [Conteúdo...]             │  │   (translate-y-0, opacity-100)
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

### Ao Fechar (Desaparecendo)
```
┌──────────────────────────────────┐
│                                  │
│     CONTEÚDO DA PÁGINA           │
│                                  │
│                                  │
└──────────────────────────────────┘
                                     
                                     ← Pop-up desliza para baixo
                                       (translate-y-full, opacity-0)
```

## 🎨 Cores e Estilos

### Paleta de Cores (usando design tokens)
```css
/* Card Principal */
background: var(--card)           /* Fundo do card */
border: var(--border)             /* Borda do card */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)  /* Sombra */

/* Ícone de Cookie */
background: hsl(var(--primary) / 0.1)  /* Fundo do círculo */
color: var(--primary)                   /* Cor do ícone */

/* Título */
color: var(--foreground)          /* Texto principal */
font-weight: 600                  /* Semibold */
font-size: 1.125rem (18px)        /* Desktop */
font-size: 1rem (16px)            /* Mobile */

/* Descrição */
color: var(--muted-foreground)    /* Texto secundário */
font-size: 0.875rem (14px)        /* Tamanho pequeno */

/* Link */
color: var(--primary)             /* Cor do link */
text-decoration: underline on hover

/* Botão Rejeitar */
variant: outline                  /* Borda com fundo transparente */
border: var(--border)
color: var(--foreground)

/* Botão Aceitar */
variant: default                  /* Botão primário */
background: var(--primary)
color: var(--primary-foreground)

/* Botão Fechar (X) */
color: var(--muted-foreground)    /* Cinza claro */
hover: var(--foreground)          /* Escurece no hover */
```

## 📐 Dimensões e Espaçamentos

### Container Principal
```css
max-width: 56rem (896px)          /* Desktop */
padding: 1.5rem (24px)            /* Desktop */
padding: 1rem (16px)              /* Mobile */
border-radius: 0.5rem (8px)       /* Bordas arredondadas */
```

### Ícone de Cookie
```css
width: 3rem (48px)
height: 3rem (48px)
border-radius: 9999px             /* Círculo perfeito */
icon-size: 1.5rem (24px)
```

### Espaçamentos
```css
gap: 1rem (16px)                  /* Entre elementos */
margin-bottom: 0.5rem (8px)       /* Entre título e descrição */
```

### Botões
```css
height: 2.5rem (40px)             /* Altura padrão */
padding: 0.5rem 1rem              /* Padding interno */
border-radius: 0.375rem (6px)     /* Bordas arredondadas */
font-size: 0.875rem (14px)        /* Texto pequeno */
```

## 🔄 Estados Interativos

### Botão Aceitar (Hover)
```
┌─────────────────┐
│ Aceitar Cookies │  ← Fundo escurece levemente
└─────────────────┘     Cursor: pointer
                        Transição: 150ms
```

### Botão Rejeitar (Hover)
```
┌──────────┐
│ Rejeitar │  ← Fundo fica levemente colorido
└──────────┘     Cursor: pointer
                 Transição: 150ms
```

### Link Política (Hover)
```
Política de Privacidade
─────────────────────── ← Sublinhado aparece
Cursor: pointer
Color: mantém primary
```

### Botão Fechar X (Hover)
```
[X]  ← Cor muda de muted-foreground para foreground
     Cursor: pointer
     Transição: 150ms
```

## 📱 Breakpoints Responsivos

### Mobile First Approach
```css
/* Base (Mobile) */
.container {
  flex-direction: column;
  gap: 1rem;
}

.buttons {
  flex-direction: column;
  width: 100%;
}

/* Desktop (xl: 1280px+) */
@media (min-width: 1280px) {
  .container {
    flex-direction: row;
    align-items: center;
  }
  
  .buttons {
    flex-direction: row;
    width: auto;
  }
}
```

## 🎯 Posicionamento Z-Index

```
┌─────────────────────────────────┐
│  Conteúdo da Página (z-0)       │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Toaster (z-50)         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Cookie Consent (z-50)  │   │ ← Mesmo nível do Toaster
│  └─────────────────────────┘   │   Não conflita
└─────────────────────────────────┘
```

## ✨ Detalhes de UX

### 1. Delay de Aparecimento
- **Tempo**: 1 segundo após carregamento
- **Motivo**: Não interrompe imediatamente a navegação
- **Benefício**: Usuário vê o conteúdo primeiro

### 2. Animação Suave
- **Duração**: 300ms
- **Easing**: ease-in-out (padrão Tailwind)
- **Efeito**: Slide-up + fade-in simultâneos

### 3. Posição Inferior
- **Motivo**: Menos intrusivo que modal central
- **Benefício**: Usuário ainda vê conteúdo principal
- **Acessibilidade**: Fácil de ignorar se necessário

### 4. Botão Fechar Visível
- **Posição**: Canto superior direito
- **Tamanho**: 20x20px (fácil de clicar)
- **Cor**: Discreta mas visível

### 5. Link Externo
- **Comportamento**: Abre em nova aba
- **Atributos**: `target="_blank" rel="noopener noreferrer"`
- **Segurança**: Previne vulnerabilidades

## 🧪 Como Testar Visualmente

### 1. Primeira Visita
```javascript
// No console do navegador
localStorage.clear()
location.reload()
// Aguarde 1 segundo → Pop-up aparece
```

### 2. Testar Aceitar
```javascript
// Clique em "Aceitar Cookies"
// Pop-up desaparece com animação
localStorage.getItem('cookieConsent')  // → 'accepted'
```

### 3. Testar Rejeitar
```javascript
localStorage.clear()
location.reload()
// Clique em "Rejeitar"
// Pop-up desaparece com animação
localStorage.getItem('cookieConsent')  // → 'rejected'
```

### 4. Testar Responsividade
```javascript
// Redimensione a janela do navegador
// < 1280px: Layout vertical
// ≥ 1280px: Layout horizontal
```

## 📸 Capturas de Tela Esperadas

### Desktop - Estado Normal
- Pop-up na parte inferior
- Layout horizontal
- Botões lado a lado
- Ícone à esquerda
- X no canto superior direito

### Mobile - Estado Normal
- Pop-up na parte inferior
- Layout vertical
- Botões empilhados
- Ícone no topo
- X no canto superior direito

### Desktop - Hover no Botão Aceitar
- Fundo do botão levemente mais escuro
- Cursor pointer
- Transição suave

### Mobile - Tocando no Link
- Link sublinhado
- Cor primary mantida
- Abre em nova aba

## 🎉 Resultado Final

O pop-up de cookies é:
- ✅ **Discreto**: Não bloqueia conteúdo principal
- ✅ **Responsivo**: Adapta-se a qualquer tela
- ✅ **Animado**: Transições suaves e profissionais
- ✅ **Acessível**: Fácil de usar e entender
- ✅ **Legal**: Conforme LGPD/GDPR
- ✅ **Bonito**: Design moderno e limpo

**Pronto para impressionar os usuários!** 🚀
