# DDD Brasil — Direção visual e experiência

## Abordagens consideradas

### Atlas Vivo

Uma plataforma editorial com linguagem de cartografia contemporânea: fundo verde floresta, papel quente, coral de sinalização e tipografia expressiva. A pesquisa parece uma ferramenta de orientação, não apenas um formulário.

**Probabilidade:** 0,06

### Circuito Solar

Uma experiência clara e energética inspirada em sistemas de comunicação: superfícies brancas, laranja solar, linhas de fluxo e microinterações rápidas. O foco seria utilidade imediata com um toque tecnológico.

**Probabilidade:** 0,03

### Arquivo de Bolso

Uma interface compacta e tipográfica, quase um guia de bolso digital, com blocos monocromáticos, índices laterais e grande foco em leitura. A inovação estaria na sensação de arquivo vivo e navegável.

**Probabilidade:** 0,08

## Abordagem escolhida: Atlas Vivo

### Design Movement

Cartografia editorial contemporânea com referências de atlas impressos, sistemas de wayfinding e design de informação de revistas independentes.

### Core Principles

1. **Orientação antes de ornamentação:** cada elemento deve ajudar a pessoa a descobrir um código com confiança.
2. **Contraste entre território e sinal:** verde profundo e marfim criam o território; coral e teal indicam movimento, localização e ação.
3. **Assimetria funcional:** a composição usa eixos deslocados, colunas editoriais e respiros largos para fugir do dashboard genérico.
4. **Textura humana:** ruído de papel, linhas topográficas e microdetalhes de índice dão personalidade sem reduzir a legibilidade.

### Color Philosophy

O verde floresta representa cobertura e estabilidade; o marfim funciona como uma página de atlas; o coral é reservado aos pontos de decisão, enquanto o teal identifica dados e conexões. A cor não é decorativa: ela informa a camada de leitura.

### Layout Paradigm

Uma página em fluxo vertical com hero assimétrico, uma faixa estatística contínua e uma área de pesquisa dividida em índice lateral + resultados. Os elementos de apoio se aproximam de margens editoriais, enquanto a busca ocupa o centro funcional da experiência.

### Signature Elements

- Linhas topográficas e pequenos pontos de sinal como textura de fundo.
- Um índice lateral numerado que organiza estados e resultados.
- Pílulas de código em coral, como marcadores de mapa que podem ser copiados.

### Interaction Philosophy

As interações devem parecer decisões rápidas em um mapa: foco visual claro, feedback imediato e pouca fricção. Digitar, escolher um estado e copiar um DDD são ações curtas, com estados de foco, hover e confirmação que não interrompem o fluxo.

### Animation

Entradas suaves em cascata de 40–60ms, transições curtas de 180ms e deslocamentos mínimos. Cartões sobem 4px no hover; botões reduzem para 0,97 no active; o mapa se move quase imperceptivelmente em loop lento. Respeitar `prefers-reduced-motion` em todas as animações não essenciais.

### Typography System

**Fraunces** para títulos e números expressivos, com itálicos pontuais que dão uma nota editorial; **DM Sans** para interface, navegação, dados e textos longos. Headline com peso 600 e tracking negativo; labels em caixa alta com tracking amplo; números de DDD em Fraunces para funcionarem como marcadores visuais.

### Brand Essence

O atlas digital que encontra o DDD certo para cada lugar do Brasil — para quem precisa ligar, localizar ou entender o território com rapidez. **Próxima, precisa, curiosa.**

### Brand Voice

Headlines são convidativas e concretas; CTAs usam verbos diretos; microcopy explica sem burocracia e evita jargão técnico.

> “Encontre o código por onde a cidade começa.”

> “Digite um lugar. A gente aponta o caminho.”

### Wordmark & Logo

O logotipo combina uma palavra em serif editorial com um símbolo compacto de pin + arco de rádio + contorno territorial. O símbolo deve sobreviver sozinho em favicon e avatar; a palavra “DDD Brasil” aparece com composição própria, nunca como texto genérico de sistema.

### Signature Brand Color

**Coral Sinal — `#F06A4D`**, usado com parcimônia para transformar código, foco e confirmação em um mesmo gesto visual.

## Style Decisions

- Todas as rotas usam a paleta verde floresta, marfim e Coral Sinal, com voz em português e pelo menos um motivo cartográfico.
- A listagem é tratada como índice de atlas: agrupamento por região, contagens, marcadores numerados e navegação marginal.
- O Coral Sinal fica reservado a códigos, focos, confirmações e decisões principais; não há azul concorrendo com a marca.
