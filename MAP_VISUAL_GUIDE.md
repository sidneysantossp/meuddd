# Guia Visual: Mapa Interativo

## 🗺️ Como o Mapa Aparece

### Desktop View
```
┌────────────────────────────────────────────────────────────┐
│ 🗺️ Mapa Interativo de Acrelândia                          │
│ Explore a localização e pontos de interesse                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 📍 Acrelândia                                      │   │
│  │ Acre • DDD 68                                      │   │
│  │ Coordenadas: -9.8253, -66.8806                     │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │                                                    │   │
│  │              🗺️ MAPA INTERATIVO                   │   │
│  │                                                    │   │
│  │    ┌─────────────────────────────────┐            │   │
│  │    │  Tiles do OpenStreetMap         │            │   │
│  │    │  Ruas, estradas, rios           │            │   │
│  │    │                                 │            │   │
│  │    │         📍 Marcador             │            │   │
│  │    │      (Acrelândia)               │            │   │
│  │    │                                 │            │   │
│  │    │  Clique para ver popup          │            │   │
│  │    └─────────────────────────────────┘            │   │
│  │                                                    │   │
│  │  [+] [-] Zoom controls (canto superior esquerdo)  │   │
│  │  © OpenStreetMap (canto inferior direito)         │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [📍 Centralizar Mapa] [+ Zoom] [- Zoom]            │   │
│  │ [🧭 Rota até aqui]                                 │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Clique e arraste para mover o mapa • Use a roda do mouse │
└────────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────────────────┐
│ 🗺️ Mapa Interativo       │
│ de Acrelândia            │
├──────────────────────────┤
│                          │
│ ┌──────────────────────┐ │
│ │ 📍 Acrelândia        │ │
│ │ Acre • DDD 68        │ │
│ │ Coord: -9.8253...    │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │                      │ │
│ │   🗺️ MAPA           │ │
│ │   INTERATIVO         │ │
│ │                      │ │
│ │   📍 Marcador        │ │
│ │                      │ │
│ │   Touch-friendly     │ │
│ │   Pinch to zoom      │ │
│ │                      │ │
│ └──────────────────────┘ │
│                          │
│ [📍 Centralizar]         │
│ [+ Zoom] [- Zoom]        │
│ [🧭 Rota até aqui]       │
│                          │
│ Arraste • Pinch zoom     │
└──────────────────────────┘
```

## 🎨 Elementos Visuais

### 1. Card de Informações
```
┌─────────────────────────────────┐
│ 📍 Acrelândia                   │ ← Nome da cidade (bold)
│ Acre • DDD 68                   │ ← Estado e DDD (muted)
│ Coordenadas: -9.8253, -66.8806  │ ← Coordenadas (mono)
└─────────────────────────────────┘
```
- Fundo: `bg-muted/50`
- Borda: `border-border`
- Ícone: `MapPin` (primary)

### 2. Container do Mapa
```
┌─────────────────────────────────┐
│                                 │
│         [MAPA AQUI]             │
│                                 │
│  - 400px de altura              │
│  - Bordas arredondadas          │
│  - Sombra suave                 │
│  - Borda sutil                  │
│                                 │
└─────────────────────────────────┘
```
- Altura: `400px`
- Borda: `border-border`
- Sombra: `shadow-md`
- Arredondamento: `rounded-lg`

### 3. Marcador no Mapa
```
    📍
   /│\
  / │ \
    │
    ●
```
- Ícone padrão do Leaflet
- Cor: Vermelho/laranja
- Sombra: Cinza
- Clicável: Sim
- Popup: Informações da cidade

### 4. Popup do Marcador
```
┌─────────────┐
│ Acrelândia  │ ← Nome (bold)
│ Acre        │ ← Estado (muted)
│ DDD: 68     │ ← DDD (muted)
└─────────────┘
      ▼
```
- Fundo: Branco
- Bordas arredondadas
- Sombra suave
- Texto centralizado

### 5. Controles de Zoom (Nativos)
```
┌───┐
│ + │ ← Zoom in
├───┤
│ - │ ← Zoom out
└───┘
```
- Posição: Canto superior esquerdo
- Cores: Integradas ao tema
- Hover: Destaque sutil

### 6. Botões de Controle
```
┌──────────────────┐  ┌────────┐  ┌────────┐
│ 📍 Centralizar   │  │ + Zoom │  │ - Zoom │
└──────────────────┘  └────────┘  └────────┘

┌──────────────────┐
│ 🧭 Rota até aqui │
└──────────────────┘
```

**Centralizar Mapa**:
- Variant: `default` (azul)
- Ícone: MapPin
- Ação: Retorna ao centro

**+ Zoom**:
- Variant: `outline` (borda)
- Ação: Aumenta zoom

**- Zoom**:
- Variant: `outline` (borda)
- Ação: Diminui zoom

**Rota até aqui**:
- Variant: `secondary` (verde)
- Ícone: Navigation
- Ação: Abre Google Maps

### 7. Instruções
```
Clique e arraste para mover o mapa • Use a roda do mouse para zoom
```
- Tamanho: `text-xs`
- Cor: `text-muted-foreground`
- Alinhamento: Centro

## 🎯 Estados Interativos

### Estado Normal
```
┌─────────────────┐
│   [MAPA ATIVO]  │
│   - Interativo  │
│   - Responsivo  │
└─────────────────┘
```

### Hover no Marcador
```
┌─────────────────┐
│   [MAPA ATIVO]  │
│      📍         │ ← Cursor: pointer
│   (hover)       │
└─────────────────┘
```

### Popup Aberto
```
┌─────────────────┐
│   [MAPA ATIVO]  │
│   ┌─────────┐   │
│   │ Popup   │   │
│   └────▼────┘   │
│      📍         │
└─────────────────┘
```

### Dragging (Arrastando)
```
┌─────────────────┐
│   [MAPA ATIVO]  │
│   ← → ↑ ↓       │ ← Cursor: grab/grabbing
│   (movendo)     │
└─────────────────┘
```

### Zooming
```
┌─────────────────┐
│   [MAPA ATIVO]  │
│   🔍 Zoom 15    │ ← Nível de zoom mudando
│   (ampliando)   │
└─────────────────┘
```

## 🎨 Paleta de Cores

### Mapa
- **Tiles**: Cores do OpenStreetMap
  - Ruas: Branco/cinza claro
  - Estradas: Amarelo/laranja
  - Água: Azul claro
  - Vegetação: Verde claro
  - Construções: Cinza

### Marcador
- **Ícone**: Vermelho (#D63E2A)
- **Sombra**: Cinza semi-transparente

### Controles
- **Fundo**: `hsl(var(--background))`
- **Texto**: `hsl(var(--foreground))`
- **Borda**: `hsl(var(--border))`
- **Hover**: `hsl(var(--muted))`

### Popup
- **Fundo**: Branco
- **Texto**: Preto/cinza escuro
- **Sombra**: Cinza claro

### Botões
- **Default**: Azul (`--primary`)
- **Outline**: Transparente com borda
- **Secondary**: Verde (`--secondary`)

## 📱 Interações

### Desktop

**Mouse**:
- **Clique e arraste**: Mover mapa
- **Scroll wheel**: Zoom in/out
- **Clique no marcador**: Abrir popup
- **Clique nos botões**: Executar ação

**Teclado**:
- **Tab**: Navegar entre botões
- **Enter**: Ativar botão focado
- **+/-**: Zoom (controles nativos)

### Mobile

**Touch**:
- **Toque e arraste**: Mover mapa
- **Pinch**: Zoom in/out
- **Toque no marcador**: Abrir popup
- **Toque nos botões**: Executar ação

**Gestos**:
- **Pinch out**: Zoom in (ampliar)
- **Pinch in**: Zoom out (afastar)
- **Swipe**: Mover mapa rapidamente

## 🎬 Animações

### Zoom
```
Zoom 13 → 14 → 15
[Transição suave de 0.25s]
```

### Pan (Mover)
```
Posição A → Posição B
[Transição suave de 0.25s]
```

### Popup
```
Fechado → Aberto
[Fade in + Scale up]
```

### Botões
```
Normal → Hover
[Transição de cor 0.2s]
```

## 🎯 Fluxo de Uso

### Cenário 1: Visualizar Localização
```
1. Usuário acessa página da cidade
2. Clica na aba "Turismo"
3. Rola até "Mapa Interativo"
4. Vê o mapa carregado
5. Explora arrastando e dando zoom
```

### Cenário 2: Obter Direções
```
1. Usuário vê o mapa
2. Clica em "Rota até aqui"
3. Google Maps abre em nova aba
4. Direções são mostradas
5. Usuário pode navegar
```

### Cenário 3: Explorar Região
```
1. Usuário vê o mapa
2. Dá zoom out (- Zoom)
3. Arrasta para ver cidades vizinhas
4. Dá zoom in (+ Zoom) em área de interesse
5. Clica em "Centralizar" para voltar
```

## ✨ Destaques Visuais

### Antes (Placeholder)
```
┌─────────────────┐
│   📍 Ícone      │
│   Estático      │
│   Sem função    │
│   [Botões fake] │
└─────────────────┘
```
❌ Não funcional
❌ Apenas visual
❌ Sem interação

### Depois (Mapa Real)
```
┌─────────────────┐
│ 📍 Info real    │
│ [MAPA VIVO]     │
│ - Interativo    │
│ - Funcional     │
│ [Botões reais]  │
└─────────────────┘
```
✅ Totalmente funcional
✅ Interativo
✅ Profissional

## 🎉 Resultado Final

**Visual**: Moderno e profissional
**Funcionalidade**: Completa
**UX**: Intuitiva e responsiva
**Performance**: Rápida e suave
**Integração**: Perfeita com o design

**Status**: ✅ PRONTO PARA USO
