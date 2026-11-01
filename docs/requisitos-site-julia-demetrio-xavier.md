# Documento de Requisitos de Software — Site Profissional de Júlia Demetrio Xavier

| Campo | Valor |
|---|---|
| Projeto | Site profissional e de conteúdo ENEM — Júlia Demetrio Xavier |
| Versão do documento | 1.0 |
| Data | 29/10/2026 |
| Idioma do site | Português do Brasil (`pt-BR`) |
| Idioma deste documento | Português do Brasil |
| Público deste documento | Agentes/modelos de IA desenvolvedores e o desenvolvedor humano responsável |
| Hospedagem | GitHub Pages (domínio `*.github.io`) |
| Natureza do site | 100% estático (sem backend, sem banco de dados, sem login) |

---

## 0. Como usar este documento (instruções ao agente de IA)

### 0.1 Convenções

- **DEVE / NÃO DEVE** = obrigatório / proibido. **DEVERIA** = fortemente recomendado. **PODE** = opcional.
- Cada requisito tem um ID (ex.: `RF-HOME-03`) e uma prioridade: **P0** (MVP, obrigatório), **P1** (importante, entregar na mesma versão se possível), **P2** (desejável, fase seguinte).
- Valores concretos (cores, tamanhos, textos, rotas) são **decisões fechadas**. Não os substitua por preferências próprias, a menos que um arquivo fornecido (ex.: a logo) os contradiga; nesse caso, siga a regra da seção 4.3.
- Trechos marcados com `⚠ CONFIRMAR` dependem de informação que só a Júlia ou o desenvolvedor humano têm. Nesses casos: use o valor padrão indicado, deixe o item **configurável em um único arquivo** e liste-o no relatório final (seção 14.3).

### 0.2 Regras de ouro

1. **Não invente fatos.** Toda informação sobre a Júlia (formação, experiência, números, depoimentos, preços, prazos, formatos de aula, resultados de alunos) DEVE vir do currículo fornecido ou deste documento. Se não houver dado, não exiba.
2. **Não invente conteúdo de ENEM.** Temas passados, temas prováveis, repertórios e listas de exercícios serão fornecidos junto com o desenvolvimento. O agente DEVE normalizá-los segundo os schemas da seção 9, apontar lacunas e **nunca preencher dados ausentes por conta própria**.
3. **Sem backend.** Tudo deve funcionar em hospedagem estática. Interações (filtros, busca, formulário de contato) acontecem no navegador.
4. **Tudo que for texto editável fica fora dos componentes**, em arquivos de conteúdo/configuração (seção 3.4), para que a Júlia/desenvolvedor editem sem mexer em layout.
5. **Mobile first.** Projete e valide primeiro em 360–390 px de largura; depois expanda.
6. **Prefira simplicidade.** Pouco JavaScript no cliente, nenhuma biblioteca pesada sem necessidade, nenhuma dependência de serviço de terceiros para o site funcionar.
7. **Entregue em ordem** (seção 14) e valide cada critério de aceite (seção 13) antes de declarar concluído.

### 0.3 Insumos que serão fornecidos junto com este documento

| Insumo | Uso | Caminho sugerido no repositório |
|---|---|---|
| Currículo da Júlia (PDF) | Fonte única de verdade para a trajetória profissional | `docs/source/curriculo.pdf` |
| Foto da Júlia (PNG com fundo transparente, retrato vertical ~2:3, enquadramento da cabeça até aproximadamente os joelhos) | Destaque na Home e derivados (avatar, OG image) | `docs/source/julia-foto.png` |
| Logo | Cabeçalho, rodapé, OG image | `src/assets/brand/` |
| Favicon | Ícone do site | `public/` |
| Base de **temas de redação passados** | Página Temas Anteriores | formato livre; será normalizado para `src/content/temas-anteriores/` |
| Base de **possíveis temas de redação** | Página Temas Prováveis | normalizado para `src/content/temas-provaveis/` |
| Base de **repertórios** (textos, livros, filmes, etc.) | Página Repertório | normalizado para `src/content/repertorio/` |
| **Listas de exercícios** (PDFs/arquivos) | Página Exercícios | arquivos em `public/downloads/exercicios/` + metadados em `src/content/exercicios/` |

---

## 1. Visão geral

### 1.1 Contexto

Júlia Demetrio Xavier, 27 anos, é professora de Língua Portuguesa, Redação e Literatura (Ensino Fundamental II e Ensino Médio), formada em Letras (Bacharelado em Letras — Tecnologias de Edição, CEFET-MG), mestranda em Estudos de Linguagem (CEFET-MG), com experiência em preparação para ENEM e ENCEJA, correção de redações em concursos e ensino de Português para estrangeiros. Atende também como revisora/freelancer de trabalhos acadêmicos. Mora em Belo Horizonte – MG.

### 1.2 Objetivo do produto

Criar um site moderno e profissional que:

1. **Promova a imagem e o trabalho** da Júlia, com apresentação de impacto (foto em destaque, formação, experiência, card do LinkedIn).
2. **Converta visitantes em contatos via WhatsApp** (aulas particulares, correção de redações, revisão de trabalhos acadêmicos).
3. **Gere audiência qualificada** com conteúdo gratuito sobre o ENEM: temas de redação passados, possíveis temas, repertório sociocultural e listas de exercícios.

### 1.3 Público-alvo

| Persona | Necessidade | Ação desejada |
|---|---|---|
| Estudante do Ensino Médio / vestibulando / candidato ao ENEM e ENCEJA (16–30 anos) | Melhorar redação e Português, achar repertório e temas | Consumir conteúdo; chamar no WhatsApp para aulas/correção |
| Pais/responsáveis de alunos do Fundamental II e Médio | Reforço escolar confiável | Chamar no WhatsApp |
| Estudantes de graduação/pós | Revisão de TCC, artigos, dissertações | Chamar no WhatsApp |
| Escolas, cursinhos, contratantes | Avaliar credibilidade profissional | Ler trajetória, abrir LinkedIn |

### 1.4 Métricas de sucesso (indicadores, não requisitos de código)

- Cliques no botão de WhatsApp (se analytics ativado, seção 11.4).
- Lighthouse mobile ≥ 95 em Performance, Acessibilidade, Boas Práticas e SEO.
- Tempo até o primeiro conteúdo útil (LCP) < 2,5 s em 4G.

### 1.5 Fora do escopo (NÃO implementar)

Login/área do aluno, pagamentos, agendamento online, chat em tempo real, comentários, newsletter com backend, painel administrativo (CMS), blog com banco de dados, versão em outros idiomas, modo escuro (justificativa na seção 4.2), depoimentos fictícios, contadores/estatísticas inventadas.

---

## 2. Premissas, decisões fechadas e pendências

### 2.1 Decisões fechadas

| ID | Decisão |
|---|---|
| D-01 | Site 100% estático, publicado via **GitHub Pages** com deploy por **GitHub Actions**. |
| D-02 | Framework: **Astro** (saída estática), **TypeScript**, **CSS puro com custom properties** (sem Tailwind). Interatividade (filtros, menu, accordion) em **TypeScript vanilla** (ilhas mínimas, sem React/Vue). |
| D-03 | Contato exclusivamente por **WhatsApp** (CTA principal) com **e-mail** como secundário. |
| D-04 | A idade da Júlia **NÃO** aparece no site (dado volátil e desnecessário para promoção). |
| D-05 | Número de telefone, endereço de e-mail e URL/identificador do LinkedIn **NÃO** devem ficar expostos como texto visível em nenhum local do site; devem ser acionados exclusivamente por botões de ação e ícones SVG (`src/assets/icons/` e `assets/icons/`). |
| D-06 | Voz do site: **primeira pessoa**, tom profissional, acolhedor e direto. Todo texto em `src/content/site.ts` (rascunho sujeito à aprovação dela). |
| D-07 | Sem cookies, sem rastreadores por padrão. Analytics é opcional e desligado por padrão (seção 11.4). |
| D-08 | Apenas modo claro. A foto tem fundo transparente e roupa preta; em fundo escuro ela desapareceria. |
| D-09 | Fontes self-hosted via `@fontsource-variable` (sem requisição ao Google Fonts). |
| D-10 | Capas de livros, pôsteres de filmes e imagens de terceiros **NÃO** são usadas (direitos autorais). Use ícones por tipo de repertório. |

### 2.2 Observações sobre o currículo (a exibir exatamente como está)

- A graduação é **Bacharelado em Letras — Tecnologias de Edição**. A habilitação para docência consta como **Formação em Docência (CEFET-MG, jul/2025 – ago/2026)**. O site NÃO DEVE afirmar "licenciada" nem "licenciatura".
- **Mestrado em Estudos de Linguagem** está **em andamento** (desde mar/2025): exibir "em andamento".
- ⚠ CONFIRMAR: a *Formação em Docência* tem término em ago/2026 (já passou na data deste documento). Exibir conforme o currículo ("jul/2025 – ago/2026"); se ela confirmar a conclusão, ajustar rótulo para "Concluída em ago/2026" em `src/content/curriculo.ts`.

### 2.3 Pendências a obter (valores padrão indicados)

| ID | Pendência | Valor padrão enquanto pendente |
|---|---|---|
| P-01 | URL do perfil do LinkedIn | Extrair do hiperlink embutido na palavra "LinkedIn" no PDF do currículo (inspecionar anotações de link). Se não houver, **bloquear o build do card do LinkedIn** com mensagem clara e perguntar ao desenvolvedor. |
| P-02 | Nome do repositório e usuário GitHub | Variáveis `SITE_URL` e `BASE_PATH` (seção 3.3). |
| P-03 | Instagram ou outras redes | Não exibir. Suportar campo opcional `redes[]` em `site.ts`. |
| P-04 | Formato das aulas (online/presencial), valores, prazos de revisão | **Não exibir.** Usar "combinamos pelo WhatsApp". |
| P-05 | Se Português para estrangeiros é serviço ativo | Serviço presente em `servicos` com `ativo: false` (oculto). |
| P-06 | Se oferece normalização ABNT | Não citar. |
| P-07 | Depoimentos de alunos | Seção oculta até haver dados reais (`depoimentos: []`). |
| P-08 | Analytics desejado | Desligado. |
| P-09 | Leitura e ingestão do ENEM 2026 | Aguardando arquivos da prova e gabarito oficial em `docs/reference/materiais/provas_passadas/`. |
| P-10 | Revisão cromática integral do portal | Revisão completa nas cores dos cards, fundos, TAGs, botões e textos para harmonia refinada da paleta editorial. |

---

## 3. Arquitetura técnica

### 3.1 Stack

| Camada | Escolha |
|---|---|
| Framework | Astro (última versão estável), `output: 'static'` |
| Linguagem | TypeScript (`strict`) |
| Estilo | CSS com custom properties (`src/styles/tokens.css`, `base.css`, `components/*.css`); CSS escopado por componente do Astro permitido |
| Conteúdo | Astro Content Collections (Zod) com JSON/YAML/Markdown |
| Imagens | `astro:assets` (`<Image>`/`<Picture>`) gerando AVIF/WebP com alpha + fallback PNG |
| Ícones | SVG inline (Lucide para ícones de interface; SVG de marca para WhatsApp e LinkedIn) |
| Fontes | `@fontsource-variable/fraunces`, `@fontsource-variable/inter` |
| Busca/filtros | JS vanilla no cliente sobre JSON gerado no build (`/data/*.json`) |
| Sitemap/RSS | `@astrojs/sitemap` (RSS opcional P2 para Dicas) |
| Deploy | GitHub Actions (`withastro/action` + `actions/deploy-pages`) |

### 3.2 Estrutura de pastas

```
/
├─ .github/workflows/deploy.yml
├─ astro.config.mjs
├─ package.json
├─ README.md                      # como rodar, atualizar conteúdo e publicar
├─ docs/
│  ├─ requisitos.md               # este documento
│  └─ source/                     # insumos originais (currículo, foto) — não publicados
├─ public/
│  ├─ favicon.*  apple-touch-icon.png  manifest.webmanifest  robots.txt
│  ├─ og/og-default.png           # 1200×630
│  └─ downloads/exercicios/       # PDFs (e gabaritos)
├─ scripts/
│  ├─ validate-content.ts         # valida schemas, slugs, links internos, arquivos
│  └─ generate-og.ts              # (P1) gera imagem OG
├─ src/
│  ├─ assets/brand/               # logo, foto original e derivados
│  ├─ components/                 # ver seção 8
│  ├─ content/
│  │  ├─ config.ts                # schemas Zod (seção 9)
│  │  ├─ site.ts                  # textos, contatos, navegação, copy
│  │  ├─ curriculo.ts             # formação e experiência (seção 6)
│  │  ├─ taxonomias/eixos.json
│  │  ├─ temas-anteriores/  temas-provaveis/  repertorio/  exercicios/  dicas/
│  ├─ layouts/BaseLayout.astro
│  ├─ lib/                        # url.ts (base-aware), whatsapp.ts, normalize.ts, seo.ts
│  ├─ pages/                      # rotas (seção 5)
│  └─ styles/
└─ fixtures/                      # dados de teste, EXCLUÍDOS do build de produção
```

### 3.3 GitHub Pages, domínio e caminhos

- `RF-TEC-01 (P0)` O build DEVE ler `SITE_URL` (ex.: `https://usuario.github.io`) e `BASE_PATH` (`/` para repositório `usuario.github.io`; `/nome-do-repo` para site de projeto) e configurá-los em `astro.config.mjs` (`site`, `base`).
- `RF-TEC-02 (P0)` **Todos** os links internos e referências a assets DEVEM passar por um helper `url()` que respeita `base`. É proibido usar caminhos absolutos como `href="/enem"` fora desse helper.
- `RF-TEC-03 (P0)` O workflow de deploy DEVE rodar em push na branch `main`, executar `npm ci`, `npm run validate:content`, `npm run build` e publicar `dist/`.
- `RF-TEC-04 (P0)` DEVE existir `public/404.html` gerado a partir de `src/pages/404.astro`.
- `RF-TEC-05 (P1)` O README DEVE documentar: ativar Pages (Settings → Pages → Source: GitHub Actions), definir variáveis do repositório, e como atualizar cada tipo de conteúdo.

### 3.4 Conteúdo centralizado

`src/content/site.ts` DEVE exportar, tipado: `nome`, `tituloProfissional`, `whatsapp {numeroE164, mensagens{...}}`, `email`, `cidade`, `linkedinUrl`, `redes[]`, `navegacao`, `hero`, `sobre`, `servicos[]`, `comoFunciona[]`, `faq[]`, `depoimentos[]`, `ctaFinal`, `rodape`, `seo {titulo, descricao, ogImage}`. Nenhum componente deve conter texto de negócio fixo (exceto rótulos de interface genéricos).

---

## 4. Identidade visual

### 4.1 Conceito

**"Elegância editorial, calor humano."** A Júlia trabalha com palavra, texto, revisão e literatura. O visual deve lembrar uma publicação editorial contemporânea: tipografia serifada expressiva nos títulos, muito respiro, contraste forte entre tinta escura e fundos quentes, detalhes em **rosé/dourado champanhe**. Transmitir: **profissionalismo, confiança, modernidade e proximidade**. Evitar: visual infantil/escolar clichê (lousas, lápis desenhados, cores primárias), excesso de gradientes, ilustrações genéricas de banco de imagem.

### 4.2 Análise da foto de referência (determina o design)

- Retrato vertical, proporção ~2:3, **PNG com fundo transparente**.
- Júlia: cabelo longo castanho-escuro liso, óculos de armação translúcida **rosé/pêssego**, sorriso discreto, blazer preto sobre blusa preta, cinto preto com **fivela quadrada dourada-rosé**, calça preta de alfaiataria, mãos nos bolsos, postura confiante.
- **Enquadramento:** cabeça até aproximadamente os joelhos (corpo 3/4). **NÃO** tentar gerar/estender as pernas nem esticar a imagem. A solução de layout é **ancorar a base da imagem no limite inferior da seção Hero**, de modo que ela "nasça" da borda da seção (efeito intencional).
- **Paleta derivada:** preto quente + rosé/dourado (óculos e fivela) → esta é a base da paleta.
- **Fundo:** por ser roupa preta com fundo transparente, o Hero DEVE ter fundo **claro/quente** (nunca escuro).
- Não retocar rosto, corpo ou cor da pele. Permitido: recorte de bordas, redimensionamento, conversão de formato, `drop-shadow` suave.

### 4.3 Logo e favicon (fornecidos)

- Usar **sem redesenhar, recolorir ou distorcer**. Altura da logo no cabeçalho: 40 px (mobile) / 48 px (desktop). Espaço livre mínimo ao redor: 50% da altura.
- **Regra de precedência:** se as cores dominantes da logo forem incompatíveis com a paleta abaixo, ajustar `--color-accent-*` para harmonizar com a logo, **mantendo os contrastes exigidos** (seção 11.2). A logo prevalece sobre este documento.
- Se a logo não for legível sobre fundo escuro (rodapé/faixa CTA), colocá-la sobre um "selo" claro (`--color-cream-50`, raio 12 px, padding 12 px) ou solicitar variante clara; **nunca** aplicar filtro CSS de inversão sem validar visualmente.
- Gerar a partir do favicon fornecido: `favicon.ico` (32×32), `favicon.svg` (se houver vetor), `apple-touch-icon.png` (180×180), ícones 192 e 512 para `manifest.webmanifest`.

### 4.4 Paleta (tokens em `src/styles/tokens.css`)

```css
:root {
  /* Tinta (neutros escuros, levemente quentes) */
  --color-ink-950: #0F0D0E;
  --color-ink-900: #1C181B;   /* texto principal, seções escuras */
  --color-ink-800: #2A2428;
  --color-ink-600: #5E545B;   /* texto secundário em fundo claro (contraste ≥ 4.5:1 em cream) */
  --color-ink-400: #8F858C;   /* uso decorativo/ícones — NÃO usar para texto */

  /* Rosé / champanhe (acento da marca — vem dos óculos e da fivela) */
  --color-rose-700: #8F4F42;  /* links e texto de acento sobre fundo claro (contraste ≈ 5.9:1) */
  --color-rose-500: #C98B7B;  /* acento principal (bordas, ícones, detalhes) */
  --color-rose-400: #DBA897;
  --color-rose-300: #EBC7B8;  /* realce "marca-texto", formas decorativas */
  --color-rose-100: #F8EAE3;  /* fundos suaves */
  --color-gold-400: #D9B99B;  /* champanhe — filetes e brilhos discretos */

  /* Fundos claros quentes */
  --color-cream-50:  #FBF7F4; /* fundo base do site */
  --color-cream-100: #F4EDE8; /* seções alternadas */
  --color-white:     #FFFFFF; /* cards */

  /* Semânticas */
  --color-whatsapp-600: #0E7C4A;  /* botão WhatsApp (texto branco, contraste ≈ 5.2:1) */
  --color-whatsapp-700: #0A6439;  /* hover */
  --color-linkedin: #0A66C2;      /* somente no ícone/botão do card do LinkedIn */
  --color-success: #1F7A4D;  --color-warning: #8A5A00;  --color-danger: #A32D2D;
  --color-focus: #1C181B;         /* anel de foco: 3px sólido + 2px offset cream */

  /* Superfícies e linhas */
  --color-border: #E6DBD4;
  --shadow-sm: 0 1px 2px rgb(28 24 27 / .06), 0 2px 8px rgb(28 24 27 / .05);
  --shadow-md: 0 8px 24px rgb(28 24 27 / .10);
  --shadow-lg: 0 24px 56px rgb(28 24 27 / .16);

  /* Raios e espaçamento (base 4 px) */
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-xl: 28px; --radius-pill: 999px;
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem; --space-6: 1.5rem;
  --space-8: 2rem; --space-12: 3rem; --space-16: 4rem; --space-24: 6rem;
  --section-y: clamp(4rem, 3rem + 5vw, 7.5rem);

  color-scheme: light;
}
```

**Regras de uso**
- Fundo padrão: `cream-50`. Alternar seções com `cream-100`. Seções escuras (faixa CTA final, rodapé): `ink-900`, texto `cream-50`, acentos `rose-300`.
- Texto de acento/links sobre fundo claro: **`rose-700`** (nunca `rose-500`, que não atinge contraste para texto).
- **Motivo gráfico "marca-texto":** palavra-chave de títulos recebe realce `linear-gradient(transparent 58%, var(--color-rose-300) 58% 92%, transparent 92%)` — remete a revisão/grifo. Usar no máximo **1 realce por título** e 1 título por seção.
- Filete decorativo: linha de 1 px `gold-400` ou `border`.

### 4.5 Tipografia

| Papel | Fonte | Peso | Fallback |
|---|---|---|---|
| Títulos (display, H1–H3) | **Fraunces** (variável; eixos `opsz` e `wght`) | 500–650 | `Georgia, 'Times New Roman', serif` |
| Corpo, UI, botões | **Inter** (variável) | 400/500/600 | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |

| Token | Tamanho (fluido) | Entrelinha | Observações |
|---|---|---|---|
| `--text-display` (H1 do Hero) | `clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)` | 1.05 | Fraunces 600, tracking −0.02em |
| `--text-h1` (títulos de página) | `clamp(2rem, 1.5rem + 2vw, 3.25rem)` | 1.1 | Fraunces 600 |
| `--text-h2` | `clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)` | 1.15 | Fraunces 600 |
| `--text-h3` | `clamp(1.25rem, 1.1rem + .6vw, 1.5rem)` | 1.25 | Fraunces 600 |
| `--text-body` | `1.0625rem` (17 px) | 1.65 | Inter 400, cor `ink-900` |
| `--text-small` | `.875rem` | 1.5 | |
| `--text-kicker` | `.8125rem` | 1.3 | Inter 600, MAIÚSCULAS, tracking 0.12em, cor `rose-700` |

- Largura máxima de texto corrido: **68 ch**. Parágrafos de abertura ("lead") podem usar `1.25rem`.
- `font-display: swap`; pré-carregar apenas Fraunces (peso do H1) e Inter 400.

### 4.6 Grid, espaçamento e breakpoints

- Breakpoints: `360` (mínimo suportado), `640`, `768`, `1024`, `1280`, `1536`.
- Container: largura máx. **1200 px** (texto longo: 760 px), padding lateral 16 px (<640), 24 px (≥640), 32 px (≥1024).
- Grid: 4 colunas (<768), 8 (768–1023), 12 (≥1024); gutter 16/24/32 px.
- Espaçamento vertical entre seções: `--section-y`.

### 4.7 Componentes visuais (especificação)

| Componente | Especificação |
|---|---|
| **Botão primário (WhatsApp)** | Fundo `whatsapp-600`, texto branco 600, ícone WhatsApp à esquerda, altura 52 px (≥ 44 px de toque), raio `pill`, padding 0 28 px, sombra `sm`; hover: `whatsapp-700` + elevação 1–2 px; ativo: sem elevação. |
| **Botão secundário** | Fundo transparente, borda 1.5 px `ink-900`, texto `ink-900`; hover: fundo `ink-900`, texto `cream-50`. |
| **Botão terciário/link** | Texto `rose-700`, sublinhado por `text-decoration-thickness: 2px` + `text-underline-offset: 4px`, seta `→` que desloca 4 px no hover. |
| **Chip** | Pill, fundo `rose-100`, texto `ink-900` 500, borda `1px rose-300`, altura 32 px; versão selecionada: fundo `ink-900`, texto `cream-50`. |
| **Card** | Fundo branco, raio `lg`, borda `1px border`, padding 24 px, sombra `sm`; hover (se clicável): sombra `md` e `translateY(-2px)` (150–200 ms). |
| **Selo de vidro (glass chip)** | Fundo `rgb(255 255 255 / .72)`, `backdrop-filter: blur(12px)`, borda `1px rgb(255 255 255 / .6)`, raio `md`, sombra `md`. Usado sobre a foto no Hero (desktop). |
| **Callout** | Fundo `rose-100`, borda esquerda 4 px `rose-500`, raio `md`; ícone `info`. Usado para avisos (ex.: "temas prováveis não são previsões oficiais"). |
| **Linha do tempo** | Linha vertical 2 px `rose-300`, marcador circular 14 px `rose-500` com anel `cream-50`; título em Fraunces 600; período em `kicker`. |

### 4.8 Imagens e foto

- `RF-VIS-01 (P0)` Gerar a partir da foto original variantes responsivas em **AVIF e WebP com alfa** (larguras 480, 768, 1024, 1400) + PNG fallback; `sizes` coerente com o layout. O original em `src/assets/brand/julia-foto.png`.
- `RF-VIS-02 (P0)` A imagem do Hero DEVE usar `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, `width`/`height` explícitos (sem CLS), `alt`: *"Júlia Demetrio Xavier, professora de Língua Portuguesa, Redação e Literatura, sorrindo, de blazer preto e óculos rosé"*.
- `RF-VIS-03 (P0)` Efeito de profundidade: `filter: drop-shadow(0 28px 36px rgb(28 24 27 / .22))` na foto + forma decorativa atrás (arco: `border-radius: 999px 999px 0 0`, gradiente `rose-300 → rose-100`, com ~85% da altura da foto) + círculo menor `gold-400` a 35% de opacidade.
- `RF-VIS-04 (P1)` Gerar **avatar circular** (recorte do rosto: topo da imagem, `object-position: 50% 8%`, 160×160 e 320×320) para o card do LinkedIn e, opcionalmente, para o favicon social.
- `RF-VIS-05 (P1)` Gerar **OG image** 1200×630 (fundo `cream-50` → `rose-100`, foto à direita ancorada embaixo, logo e título "Júlia Demetrio Xavier — Professora de Língua Portuguesa, Redação e Literatura" à esquerda em Fraunces).

### 4.9 Movimento e interação

- Transições de 150–250 ms (`cubic-bezier(.2,.7,.2,1)`). Entrada de seções: fade + `translateY(12px)` via `IntersectionObserver`, executada uma vez.
- Hero: foto e arco entram com leve fade/slide (≤ 600 ms), sem bloquear o LCP (a imagem já deve estar visível no HTML; animação apenas em opacidade do arco e dos selos).
- `prefers-reduced-motion: reduce` → desabilitar todas as animações e transições não essenciais.
- Sem carrosséis automáticos, sem parallax pesado, sem vídeos em autoplay.

### 4.10 Tom de voz

Primeira pessoa, clara, acolhedora, sem jargão desnecessário, sem promessas de resultado ("nota 1000 garantida" é **proibido**). Verbos de ação nos CTAs ("Chamar no WhatsApp", "Ver temas", "Baixar lista").

---

## 5. Arquitetura de informação

### 5.1 Mapa do site

| Rota | Página | Prioridade |
|---|---|---|
| `/` | Home / Apresentação | P0 |
| `/servicos` | Serviços | P0 |
| `/contato` | Contato (WhatsApp, e-mail, mini-formulário que gera mensagem) | P0 |
| `/enem` | Hub ENEM | P0 |
| `/enem/temas-anteriores` e `/enem/temas-anteriores/[ano]` | Temas de redação passados (listagem + detalhe) | P0 |
| `/enem/temas-provaveis` | Possíveis temas | P0 |
| `/enem/repertorio` e `/enem/repertorio/[slug]` | Banco de repertório (listagem + detalhe) | P0 |
| `/enem/exercicios` | Listas de exercícios | P0 |
| `/enem/competencias` | Guia das 5 competências da redação | P1 |
| `/enem/dicas` e `/enem/dicas/[slug]` | Dicas em texto (Markdown) | P2 |
| `/privacidade` | Política de privacidade | P0 |
| `/404` | Página não encontrada | P0 |

Regra: **coleção vazia → página e item de menu ocultos** (não gerar rota; no Hub ENEM, não mostrar o card). Se `temas-anteriores` e demais coleções vierem preenchidas, tudo aparece normalmente.

### 5.2 Navegação

- **Cabeçalho** (sticky, fundo `cream-50` com 90% de opacidade + `backdrop-filter: blur(10px)`, borda inferior `border` ao rolar): logo (esq.) · links: **Início, Serviços, ENEM ▾, Contato** · botão "Fale comigo" (WhatsApp, primário compacto, ≥ 1024 px).
- **ENEM ▾** (desktop: menu suspenso acessível por teclado/hover/foco; mobile: acordeão no drawer): Visão geral, Temas anteriores, Temas prováveis, Repertório, Exercícios, Competências, Dicas.
- **Mobile (<1024 px):** botão hambúrguer (44×44) abre **drawer** em tela cheia (`role="dialog"`, `aria-modal`, foco preso, fecha com ESC e ao navegar), links grandes (Fraunces 1.5rem) e botão WhatsApp fixo na base do drawer.
- **Breadcrumb** (páginas internas de `/enem/*`): `Início › ENEM › Seção › Item`, com marcação `BreadcrumbList` (JSON-LD).
- **Rodapé:** ver 8.2.
- **Botão flutuante de WhatsApp (FAB):** ver 8.3.

---

## 6. Dados do currículo (fonte de verdade)

Salvar em `src/content/curriculo.ts`. Texto transcrito do currículo (não alterar fatos; ajustes de redação apenas de formatação).

```ts
export const curriculo = {
  nome: "Júlia Demetrio Xavier",
  titulo: "Professora de Língua Portuguesa, Redação e Literatura",
  niveis: ["Ensino Fundamental II", "Ensino Médio"],
  cidade: "Belo Horizonte – MG",
  contatos: { whatsappE164: "5531995072289", whatsappExibicao: "+55 (31) 99507-2289", email: "juliademetrio9@gmail.com" },
  linkedinUrl: "<EXTRAIR DO PDF — ver P-01>",
  resumo:
    "Professora de Língua Portuguesa, Redação e Literatura com experiência em docência para os anos finais do Ensino Fundamental e para o Ensino Médio. Atuação em planejamento pedagógico, elaboração de avaliações e provas, ensino de Língua Portuguesa e Redação, produção textual e correção de redações. Experiência com preparação para ENEM e ENCEJA, ensino das competências da redação modelo ENEM, conteúdos da área de Linguagens, gramática, Literatura e ensino de Português para estudantes estrangeiros.",
  experiencia: [
    {
      id: "rede-decisao",
      cargo: "Professora de Língua Portuguesa e Redação",
      organizacao: "Rede Decisão",
      local: "Belo Horizonte, MG",
      periodo: "out/2025 – atual",
      atual: true,
      tipo: "Docência",
      itens: [
        "Docência em Língua Portuguesa e Redação para o Ensino Fundamental II e Ensino Médio.",
        "Planejamento e organização de atividades pedagógicas voltadas ao desenvolvimento de competências de leitura, escrita e produção textual.",
        "Elaboração de provas e instrumentos de avaliação da aprendizagem."
      ]
    },
    {
      id: "corretora-autonoma",
      cargo: "Corretora de Redação Autônoma",
      organizacao: "IBGP Concursos",
      local: "",
      periodo: "2025",
      atual: false,
      tipo: "Correção de redações",
      itens: [
        "Correção de redações da Prova Paraná Mais 2025 (nov/2025).",
        "Correção de redações do Concurso para a Prefeitura de Betim/MG (abr/2025)."
      ]
    },
    {
      id: "escrita-de-si",
      cargo: "Professora Voluntária — Projeto Escrita de Si",
      organizacao: "CEFET-MG",
      local: "Belo Horizonte, MG",
      periodo: "mai/2022 – ago/2023",
      atual: false,
      tipo: "Voluntariado",
      itens: [
        "Ensino de Língua Portuguesa para servidores terceirizados do CEFET-MG com preparação para ENEM e ENCEJA.",
        "Elaboração e correção de redações.",
        "Ensino das competências da redação modelo ENEM e dos principais conteúdos da área de Linguagens relacionados ao ENEM e ENCEJA."
      ]
    },
    {
      id: "portugues-acolhimento",
      cargo: "Professora Voluntária — Projeto Português como Língua de Acolhimento",
      organizacao: "CEFET-MG",
      local: "Belo Horizonte, MG",
      periodo: "fev/2022 – ago/2023",
      atual: false,
      tipo: "Voluntariado",
      itens: [
        "Ensino de Português para estrangeiros em turmas de nível intermediário.",
        "Desenvolvimento de conteúdos relacionados ao ensino de gramática da Língua Portuguesa e aspectos culturais.",
        "Atuação voltada ao desenvolvimento da comunicação em Língua Portuguesa para estudantes em processo de cidadania brasileira."
      ]
    }
  ],
  formacao: [
    { id: "mestrado", curso: "Mestrado em Estudos de Linguagem", instituicao: "CEFET-MG", local: "Belo Horizonte, MG", periodo: "mar/2025 – atual", status: "Em andamento" },
    { id: "docencia", curso: "Formação em Docência", instituicao: "CEFET-MG", local: "", periodo: "jul/2025 – ago/2026", status: "" /* ⚠ CONFIRMAR conclusão */ },
    { id: "intercambio", curso: "Intercâmbio interdisciplinar — Escola Superior de Educação", instituicao: "Universidade Politécnica de Bragança", local: "Portugal", periodo: "set/2023 – fev/2024", status: "" },
    { id: "graduacao", curso: "Bacharelado em Letras — Tecnologias de Edição", instituicao: "CEFET-MG", local: "Belo Horizonte, MG", periodo: "jan/2020 – fev/2025", status: "" }
  ],
  competencias: [
    "Planejamento pedagógico", "Elaboração de provas e avaliações", "Produção textual e correção de redações",
    "Redação modelo ENEM", "Preparação para ENEM e ENCEJA", "Gramática e Literatura",
    "Língua Portuguesa para estrangeiros", "Revisão de textos"
  ]
} as const;
```

Notas de exibição:
- Ordem da experiência: do mais recente ao mais antigo (a ordem acima). Formação: do mais recente ao mais antigo, com **Mestrado em andamento** em primeiro.
- "Corretora de Redação Autônoma": rótulo de local omitido; exibir "IBGP Concursos" como contexto dos trabalhos.
- Tipo (`tipo`) vira chip no card (Docência / Correção de redações / Voluntariado).

---

## 7. Especificação página a página

### 7.1 Home (`/`) — Apresentação

**Objetivo:** causar impressão profissional imediata, comunicar quem é a Júlia, o que oferece e levar ao WhatsApp.

**Ordem das seções**
1. Cabeçalho
2. Hero
3. Faixa de credenciais
4. Sobre mim
5. Serviços (resumo)
6. Formação e experiência
7. Card do LinkedIn
8. Conteúdo ENEM (prévia)
9. Como funciona
10. Perguntas frequentes
11. Faixa CTA final (seção escura)
12. Rodapé (+ FAB de WhatsApp)

#### 7.1.1 Hero (P0)

- `RF-HOME-01` Layout desktop (≥ 1024 px): grid de 12 colunas. Texto nas colunas 1–7, **foto nas colunas 8–12, ancorada na base da seção** (a imagem toca o limite inferior do Hero, sem margem). Altura mínima do Hero: `min(100svh - header, 820px)`.
- `RF-HOME-02` Conteúdo do texto (de cima para baixo):
  1. **Kicker:** "Professora de Língua Portuguesa, Redação e Literatura"
  2. **H1:** "Escrever bem é uma habilidade que se *constrói*. Vamos construir juntos?" (palavra "constrói" com realce marca-texto)
  3. **Subtítulo (lead):** "Sou a Júlia Demetrio Xavier, professora e mestranda em Estudos de Linguagem no CEFET-MG. Aulas particulares, correção de redações e revisão de trabalhos acadêmicos para estudantes do Ensino Fundamental II, do Ensino Médio e candidatos ao ENEM."
  4. **CTAs:** primário "Chamar no WhatsApp" (mensagem geral) + secundário "Explorar conteúdos do ENEM" → `/enem`.
  5. **Chips de credencial** (máx. 4): "Letras · CEFET-MG", "Mestrado em andamento", "ENEM e ENCEJA", "Intercâmbio em Portugal".
- `RF-HOME-03` **Selos de vidro sobre a foto** (somente ≥ 1024 px, posicionados em volta da foto sem cobrir o rosto): (a) "Mestrado em Estudos de Linguagem — CEFET-MG (em andamento)"; (b) "Professora na Rede Decisão · Ensino Fundamental II e Médio"; (c) "Correção de redações · IBGP Concursos". Entrada escalonada de 100 ms. Em telas < 1024 px, esses selos NÃO aparecem (as informações estão nos chips).
- `RF-HOME-04` Mobile (<1024 px) ordem vertical: kicker → H1 → lead → CTAs (botão primário 100% de largura) → chips (rolagem horizontal ou quebra em linhas) → **foto ancorada na base** com o arco decorativo atrás (altura da foto ≈ 78 vw, máx. 520 px). Ao carregar em 390×844, o botão de WhatsApp DEVE estar visível sem rolagem (acima da dobra).
- `RF-HOME-05` Fundo do Hero: `cream-50` com gradiente radial `rose-100` no canto superior direito; sem imagens de fundo adicionais.

Wireframe (desktop):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [logo]        Início  Serviços  ENEM▾  Contato         [Fale comigo ◉]   │
├──────────────────────────────────────────────────────────────────────────┤
│  PROFESSORA DE LÍNGUA PORTUGUESA, REDAÇÃO E LITERATURA     ╭───────╮     │
│                                                          ╭─┤ arco  ├─╮   │
│  Escrever bem é uma habilidade                           │ │rosé   │ │   │
│  que se ▓constrói▓. Vamos construir                      │ │ FOTO  │ │   │
│  juntos?                                      [selo]     │ │ Júlia │ │   │
│                                                          │ │ (3/4) │ │   │
│  Sou a Júlia… (lead)                          [selo]     │ │       │ │   │
│                                                          │ │       │ │   │
│  [◉ Chamar no WhatsApp]  [Explorar ENEM]      [selo]     │ │       │ │   │
│  (Letras·CEFET) (Mestrado) (ENEM/ENCEJA) (Portugal)      └─┴───────┴─┘   │
└──────────────────────────────────────────────────────── foto toca aqui ──┘
```

#### 7.1.2 Faixa de credenciais (P1)

Faixa fina `cream-100` com 4 itens em linha (ícone + rótulo curto), sem números inventados: "Letras — CEFET-MG", "Mestrado em Estudos de Linguagem", "Ensinando desde 2022", "ENEM · ENCEJA · Redação". Em mobile: rolagem horizontal com snap ou grade 2×2.

#### 7.1.3 Sobre mim (P0)

- Layout: coluna de texto (lead + 2 parágrafos curtos) + coluna com 3 "pilares" em cards pequenos.
- Texto base (rascunho em `site.ts`, aprovado por ela depois): *"Sou formada em Letras pelo CEFET-MG e cursando o mestrado em Estudos de Linguagem na mesma instituição. Desde 2022 ensino Língua Portuguesa, Redação e Literatura — da sala de aula do Ensino Fundamental II e do Ensino Médio a projetos voluntários de preparação para o ENEM e de ensino de Português para estrangeiros. Também corrijo redações de concursos e faço revisão de textos. Meu objetivo é ajudar cada pessoa a ler com mais profundidade e escrever com mais segurança."*
- Pilares: **Ensino** (planejamento pedagógico, provas e avaliações), **Escrita** (produção textual, correção de redações, competências do ENEM), **Linguagem** (gramática, literatura, pesquisa acadêmica).
- `RF-HOME-06` Pode exibir uma **segunda composição da foto** (mesma imagem) recortada em retrato do busto com moldura arredondada `radius-xl` — **somente** se não gerar repetição visual incômoda com o Hero; caso contrário, usar apenas o texto.

#### 7.1.4 Serviços (resumo) (P0)

Cards (3–4, só os `ativo: true`) com ícone, título, 1–2 linhas e botão terciário "Saber mais" → `/servicos#slug`. Botão primário único da seção: "Solicitar pelo WhatsApp".

#### 7.1.5 Formação e experiência (P0)

- Duas colunas ≥ 1024 px (Experiência à esquerda, Formação à direita); empilhadas no mobile. Cada item = componente **Linha do tempo** (seção 4.7) com cargo/curso (H3), organização, local, período (kicker), chip de tipo e bullets (máx. 3 visíveis; "Ver detalhes" expande o restante — `<details>` acessível).
- Item "atual" recebe selo "Atual" (`rose-100`) e o Mestrado, selo "Em andamento".
- Fonte: `curriculo.ts` (seção 6). Botão secundário "Baixar currículo (PDF)" **somente** se a Júlia aprovar a publicação do PDF ⚠ CONFIRMAR (padrão: **não** publicar o PDF, pois contém telefone/e-mail em arquivo indexável).

#### 7.1.6 Card do LinkedIn (P0)

- **Não existe iframe oficial estável de perfil do LinkedIn** (embeds oficiais são para posts; o "badge" depende de script de terceiros que pode ser descontinuado). Portanto: implementar o **componente próprio `LinkedInCard`** (seção 8.4), estático, com fallback total. **PODE** (P2) ser complementado, como melhoria progressiva, pelo badge oficial se estiver disponível, sem que o site dependa dele.
- Seção: título "Vamos nos conectar?" + texto curto + o card ao lado/abaixo + texto "Veja minha trajetória completa e recomendações no LinkedIn."

#### 7.1.7 Prévia de conteúdo ENEM (P0)

Título "Conteúdo gratuito para o ENEM". Grade de até 4 cards de acesso rápido (ícone, título, contagem de itens calculada no build, ex.: "32 temas", "120 repertórios"): Temas anteriores, Temas prováveis, Repertório, Exercícios. Abaixo, "Adicionados recentemente" (até 3 itens mais recentes por `atualizadoEm`/`publicadoEm`, misturando coleções). Cards de coleções vazias não aparecem; se **todas** estiverem vazias, a seção inteira some.

#### 7.1.8 Como funciona (P1)

Três passos numerados (Fraunces grande em `rose-500`): 1. "Você me chama no WhatsApp" → 2. "Conversamos sobre seu objetivo e sua rotina" → 3. "Combinamos o melhor formato e começamos". Sem prazos, valores ou "avaliação gratuita".

#### 7.1.9 FAQ (P1)

Accordion acessível (botões com `aria-expanded`, painéis `role="region"`), com `FAQPage` JSON-LD. Perguntas padrão (respostas no `site.ts`, sem inventar políticas):
1. *Para quem são as aulas?* — Estudantes do Ensino Fundamental II e do Ensino Médio e pessoas que se preparam para ENEM e ENCEJA.
2. *Como solicito aulas, correção ou revisão?* — Pelo botão de WhatsApp; combinamos os detalhes por lá.
3. *Que trabalhos você revisa?* — Trabalhos acadêmicos; tipo e escopo combinados pelo WhatsApp.
4. *Posso receber retorno sobre minha redação do ENEM?* — Sim, a correção segue as cinco competências da matriz do ENEM.
5. *Os materiais do site são gratuitos?* — Sim, para uso pessoal e educacional.

#### 7.1.10 Faixa CTA final (P0)

Seção escura (`ink-900`), título em Fraunces cream "Pronto(a) para melhorar sua escrita?" + lead curto + botão WhatsApp primário + link de e-mail. Detalhe decorativo: grande aspas serifadas `rose-500` a 20% de opacidade.

---

### 7.2 Serviços (`/servicos`) — P0

- **Cabeçalho da página:** breadcrumb, H1 "Serviços", lead.
- **Lista de serviços** (cada um com `id` para âncora `#slug`; layout alternando imagem/ícone grande e texto em ≥ 1024 px): título, "O que é", "Para quem", "Como funciona" (apenas "combinamos pelo WhatsApp" quando não houver dado), botão **WhatsApp com mensagem específica do serviço**.

| Slug | Serviço | Descrição-base | Ativo |
|---|---|---|---|
| `aulas-particulares` | Aulas particulares de Língua Portuguesa, Literatura e Redação | Reforço e aprofundamento para Ensino Fundamental II e Médio; gramática, interpretação, literatura e produção textual. | Sim |
| `correcao-de-redacao` | Correção e orientação de redações (modelo ENEM) | Correção com base nas cinco competências da matriz do ENEM e orientação para evolução. | Sim |
| `revisao-academica` | Revisão de trabalhos acadêmicos | Revisão ortográfica, gramatical e textual, com atenção à clareza e à adequação à norma culta. | Sim |
| `portugues-para-estrangeiros` | Português para estrangeiros | Aulas de Português com foco em comunicação, gramática e aspectos culturais. | **Não** (P-05) |

- Seção "Níveis e exames atendidos": chips *Ensino Fundamental II, Ensino Médio, ENEM, ENCEJA*.
- Seção "Como funciona" e FAQ reaproveitados da Home (mesmos componentes).
- Nota ética (callout, texto em `site.ts`): "Presto revisão e orientação — o conteúdo e a autoria do trabalho continuam sendo seus." ⚠ CONFIRMAR com a Júlia.
- Faixa CTA final.
- SEO: `Service`/`ProfessionalService` JSON-LD.

### 7.3 Hub ENEM (`/enem`) — P0

- H1 "ENEM: conteúdo para escrever melhor", lead explicando o propósito (material autoral gratuito, feito por professora de Redação).
- Grade de cards (um por coleção disponível) com ícone, descrição de 1 linha e contagem.
- Bloco "Por onde começar?": 3 trilhas (links) — "Entender as competências" (→ `/enem/competencias`), "Ver temas que já caíram", "Montar meu repertório".
- Bloco "Atualizações recentes" (até 6 itens) com data.
- Callout de aviso: "Materiais autorais com finalidade educacional. Temas prováveis são apostas pedagógicas, não previsões oficiais do INEP."
- CTA contextual: "Quer correção da sua redação? Fale comigo" (mensagem `enem`).

### 7.4 Temas anteriores (`/enem/temas-anteriores`) — P0

**Listagem**
- Cabeçalho + contagem total ("N temas desde ANO").
- **Filtros:** busca por texto (tema e palavras-chave), eixo temático (multi), aplicação (regular/PPL/reaplicação), intervalo de anos (de/até). **Ordenação:** ano ↓ (padrão), ano ↑.
- **Visualização:** linha do tempo vertical por ano (desktop: coluna do ano à esquerda em Fraunces grande; mobile: ano acima do card). Cada card: ano (+ selo de aplicação se ≠ regular), **título do tema** (H3), chips de eixos, 1 linha de contexto e link "Ver análise e repertórios →".
- Estado vazio de filtro: "Nenhum tema encontrado" + botão "Limpar filtros".

**Detalhe** (`/[ano]` ou `/[ano]-[aplicacao]` quando houver mais de uma aplicação no mesmo ano)
- H1 com ano e tema; chips de eixos e palavras-chave.
- **Contexto do tema** (texto autoral).
- **Possíveis recortes** e **teses**.
- **Repertórios sugeridos** (cards linkando para `/enem/repertorio/[slug]`).
- **Proposta de intervenção — exemplo de estrutura** (os 5 elementos: agente, ação, meio, finalidade, detalhamento) se houver dado.
- Link "Fonte oficial (INEP)" se `fonteOficialUrl` existir.
- Navegação "Tema anterior / Próximo tema".
- **Direitos autorais:** NÃO reproduzir integralmente textos motivadores, provas ou redações de terceiros; usar apenas o título oficial do tema, comentários autorais e link para fonte oficial.

### 7.5 Temas prováveis (`/enem/temas-provaveis`) — P0

- Callout fixo no topo (obrigatório): *"Estes temas são apostas pedagógicas baseadas em atualidade e recorrência. O INEP não divulga o tema com antecedência — use-os para treinar repertório e argumentação, não como previsão."*
- Listagem em cards (grade 1/2/3 colunas): título do tema (formulado como frase-tema), eixos, selo "Em alta" se `destaque`, "Atualizado em dd/mm/aaaa".
- Filtros: busca, eixo. Ordenação: destaques primeiro, depois `atualizadoEm` ↓.
- **Cada card expande** (página de detalhe **não** necessária; usar `<details>`/acordeão ou modal acessível) mostrando: justificativa, recortes possíveis, teses, repertórios sugeridos (links), exemplo de proposta de intervenção (5 elementos).
- **NÃO** exibir porcentagens ou "probabilidade de cair" numéricas.

### 7.6 Repertório (`/enem/repertorio`) — P0

**Listagem**
- Barra de filtros fixa no topo da lista (sticky em desktop; em mobile, botão "Filtros" abre *bottom sheet* acessível com "Aplicar" e "Limpar"): busca por texto (título, autoria, resumo, tags); **tipo** (livro, filme, série, música, documentário, texto/artigo, dado/estatística, pensador/filósofo, fato histórico, lei/documento, obra de arte, outro); **eixo temático** (multi); **tema do ENEM relacionado** (ano). Ordenação: relevância (padrão: alfabética por título), mais recentes, tipo.
- Card: ícone do tipo (Lucide), título (H3), autoria e ano, tipo (chip), resumo curto (máx. 140 caracteres, truncado com `line-clamp: 3`), chips de eixos (máx. 2 + "+N").
- Contagem de resultados em região `aria-live="polite"` ("48 repertórios encontrados").
- Paginação por botão "Mostrar mais" (24 por vez). Estado dos filtros sincronizado com a URL (`?q=&tipo=&eixo=`), permitindo compartilhar.
- Se houver ≥ 1 item, o filtro de tipo mostra apenas tipos existentes, com contagem.

**Detalhe** (`/enem/repertorio/[slug]`)
- H1 (título), autoria, ano, tipo, eixos.
- **Resumo** (autoral), **Como usar na redação** (explicação + exemplo de parágrafo, se houver), **Cuidados** (ex.: erros comuns de uso), **Temas relacionados** (links), **Links externos** (rotulados; `rel="noopener noreferrer" target="_blank"`).
- "Repertórios relacionados" (mesmo eixo, até 3).
- Botão "Compartilhar no WhatsApp" (P2): `https://wa.me/?text=` com título e URL.
- JSON-LD `Article`/`CreativeWork` simples (P1).

### 7.7 Banco de Questões Comentadas (`/enem/exercicios`) — P0

- **Objetivo**: Ambiente de estudo, consulta e revisão pedagógica detalhada do acervo oficial de Linguagens, Códigos e suas Tecnologias do ENEM (edições 2017 a 2025).
- **Sem marcação de prova**: A interatividade temporária de clicar em opções e limpar seleções foi transferida exclusivamente para a aplicação de Simulado (`/enem/simulado`). O Banco de Questões exibe o gabarito oficial e comentário pedagógico detalhado via acordeão expansível (`<details class="q-resolution">`).
- **Carga Paginada de Alta Performance**: Para garantir fluidez e evitar sobrecarga no DOM com as 1.550 questões, a listagem utiliza renderização paginada sob demanda no cliente (opções de **15, 30 ou 50 questões por página**), com controles de paginação no topo e no rodapé da lista.
- **Filtros Dinâmicos Interdependentes (Cross-Filtering)**:
  - **Ano da Prova**: Todos os anos, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017.
  - **Cor do Caderno**: Todas as cores, Azul, Amarelo, Branco, Rosa.
  - **Idioma da Questão**: Todos os idiomas, Português, Inglês, Espanhol.
  - **Tópico de Linguagens**: Literatura e Expressão Artística, Variação Linguística, Interpretação e Análise Textual, Língua Estrangeira (Inglês/Espanhol), Artes Visuais e Patrimônio, Tecnologias da Informação e Mídias, Práticas Corporais.
  - **Busca Textual**: Busca por palavras-chave, autores, obras, termos ou número de questão.
  - **Interdependência em Todo o Site**: Os filtros de todas as páginas filtráveis (`/enem/exercicios`, `/enem/repertorio`, `/enem/temas-anteriores`, `/enem/temas-provaveis` e `/enem/simulado`) filtram entre si, ocultando automaticamente opções que não possuam itens compatíveis com os demais filtros ativos (ex.: cores de caderno inexistentes em determinado ano do ENEM).
- **Card de Questão**: Badges oficiais com Ano, Cor do Caderno, Número da Questão, Categoria e Habilidade da Matriz ENEM; texto-base com citação bibliográfica, comando do enunciado, 5 alternativas e resolução pedagógica fundamentada.
- **Card Flutuante Compacto de Simulado**: Card pequeno flutuante (`position: fixed`, canto inferior direito) convidando o aluno para o Simulado ENEM, com botão de fechar (`×`) persistido na sessão.

### 7.7.1 Simulado ENEM Online (`/enem/simulado`) — P0

- **Objetivo**: Aplicação interativa de prova cronometrada focada em Linguagens, Códigos e suas Tecnologias, proporcionando treino em condições reais de exame. Posicionado logo após a Página Inicial em toda a navegação do site.
- **Persistência Local de Simulados Recentes (`localStorage`)**:
  - Salva automaticamente no navegador do usuário (`window.localStorage`, chave `jdx_enem_simulados_v1`, zero banco de dados externo) os simulados em andamento e concluídos.
  - Na tela inicial do Simulado, a seção **"Simulados Recentes"** permite **retomar um simulado em andamento** exatamente da questão e tempo onde o aluno parou (preservando a ordem embaralhada das alternativas e as respostas marcadas) ou **rever o resultado e gabarito comentado** de simulados concluídos, além de excluir itens individuais ou limpar o histórico.
- **Fase 1 — Configuração**:
  - Escolha de modo com caixas de seleção modernas: **Prova Oficial** (seleção interdependente de Ano e Cor do Caderno) ou **Simulado Aleatório** (45 questões sorteadas representativas de todos os tópicos de Linguagens).
  - Opção de Língua Estrangeira: **Inglês** ou **Espanhol** para as questões 1 a 5.
- **Fase 2 — Prova em Andamento**:
  - **Cronômetro em Tempo Real**: Marcador progressivo `HH:MM:SS` com opção de pausa/retomada e botão "Salvar e Sair".
  - **Embaralhamento de Alternativas (Fisher-Yates) e Caixa de Seleção Moderna**: As alternativas A–E são embaralhadas a cada tentativa para evitar memorização posicional, exibidas com indicador de seleção moderno, badge circular para a letra (`A`–`E`) nitidamente separado do texto da alternativa e opção de limpar a resposta da questão atual.
  - **Mapa de Questões (1 a 45) e Barra de Progresso**: Grade lateral para navegação direta que destaca visualmente em cor vinho as questões respondidas junto com a letra marcada, a questão atual e as pendentes.
  - Botões de navegação "Questão Anterior" e "Próxima Questão" e botão de entrega "Finalizar Simulado" (com confirmação caso restem questões em branco).
- **Fase 3 — Relatório de Desempenho e Revisão**:
  - Placar com total de acertos (`X / 45`), percentual de aproveitamento, tempo total de prova e tempo médio por questão.
  - Feedback pedagógico contextual com orientações de gestão de tempo e leitura.
  - Revisão questão a questão destacando a resposta marcada pelo aluno, o gabarito oficial e a resolução comentada detalhada.
  - Botão para voltar ao início e realizar novo simulado.

### 7.8 Competências da redação (`/enem/competencias`) — P1

Guia de leitura (conteúdo editorial factual, escrito pelo agente a partir do conhecimento público da matriz do ENEM; **marcar `revisado: false` no front matter e listar no relatório para revisão da Júlia antes de publicar**).

- Visão geral: a redação é avaliada em **5 competências**, cada uma de 0 a 200 pontos (**máx. 1000**).
- Uma seção (acordeão ou âncoras) por competência:
  1. **C1** — Domínio da modalidade escrita formal da língua portuguesa.
  2. **C2** — Compreensão da proposta de redação e aplicação de conceitos de várias áreas do conhecimento (inclui repertório sociocultural), desenvolvendo o tema nos limites do texto dissertativo-argumentativo.
  3. **C3** — Seleção, relação, organização e interpretação de informações, fatos, opiniões e argumentos em defesa de um ponto de vista.
  4. **C4** — Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação (coesão).
  5. **C5** — Elaboração de proposta de intervenção para o problema abordado, respeitando os direitos humanos.
- Para cada uma: "O que é avaliado", "Como ganhar pontos", "Erros comuns", mini-exemplo curto autoral.
- Bloco "Estrutura do texto dissertativo-argumentativo" (introdução, desenvolvimento, conclusão) e "Os 5 elementos da proposta de intervenção" (agente, ação, meio de execução, finalidade, detalhamento).
- Links cruzados para Temas anteriores e Repertório.
- CTA "Quer correção por competência?" (WhatsApp, mensagem `correcao`).

### 7.9 Dicas (`/enem/dicas`) — P2

- Coleção Markdown (schema na seção 9.6). Listagem em cards (título, descrição, data, tempo de leitura estimado, tags) + filtro por tag. Post com tipografia de leitura (largura 68 ch, `h2`/`h3`, citações em Fraunces itálico, `callout`), "Leia também" e CTA final.
- Coleção vazia → página oculta. Feed RSS (`/enem/dicas/rss.xml`) opcional.

### 7.10 Contato (`/contato`) — P0

- H1 "Vamos conversar?", lead curto.
- **Cartão principal de WhatsApp:** botão primário grande + número exibido (`+55 (31) 99507-2289`) + botão "Copiar número" (feedback "Número copiado" em *toast* `aria-live`).
- **Mini-formulário "Montar mensagem"** (sem envio a servidor): campos — Nome (opcional), **Assunto** (select: Aulas particulares, Correção de redação, Revisão de trabalho acadêmico, Outro), Nível/série (select: Ensino Fundamental II, Ensino Médio, ENEM/ENCEJA, Graduação/Pós, Outro), Prazo ou objetivo (texto curto, opcional), Mensagem (textarea opcional, máx. 500 caracteres). Ao clicar em "Abrir WhatsApp", o JS monta o texto e abre `wa.me` (nova aba). Validação: Assunto obrigatório; mensagens de erro vinculadas com `aria-describedby`. Nada é armazenado ou transmitido.
  - Texto gerado (exemplo): `Olá, Júlia! Vim pelo seu site. Meu nome é {nome}. Tenho interesse em: {assunto}. Nível: {nivel}. Objetivo/prazo: {prazo}. {mensagem}` (omitindo campos vazios).
- **E-mail:** link `mailto:` secundário (com assunto pré-preenchido). PODE ofuscar o endereço no HTML (montagem por JS com fallback via `<noscript>`).
- **Localização:** "Belo Horizonte – MG" (sem endereço, sem mapa).
- **LinkedIn:** link/botão secundário.
- Observação: "Respondo pelo WhatsApp." — sem prometer horário de resposta.

### 7.11 Privacidade (`/privacidade`) e 404 — P0

- **Privacidade:** linguagem simples (LGPD): quais dados o site coleta (nenhum por padrão), uso do WhatsApp (conversa ocorre no app, sujeita à política do WhatsApp), links externos, analytics (se ativado: qual, dados coletados, finalidade), contato do controlador (Júlia, e-mail). Data de atualização.
- **404:** mensagem acolhedora, busca rápida de links úteis (Início, ENEM, Contato), botão WhatsApp discreto.

---

## 8. Componentes globais

### 8.1 Cabeçalho
Conforme 5.2. `RF-GLB-01 (P0)` Link "Pular para o conteúdo" como primeiro elemento focável. `RF-GLB-02 (P0)` Item ativo do menu com `aria-current="page"` e sublinhado `rose-500`.

### 8.2 Rodapé
Fundo `ink-900`, 4 colunas ≥ 1024 px: (1) logo (com selo claro se necessário) + frase curta; (2) navegação; (3) ENEM (links das coleções ativas); (4) contato (WhatsApp, e-mail, cidade, LinkedIn). Faixa inferior: "© {ano atual} Júlia Demetrio Xavier. Todos os direitos reservados." · link Privacidade. O ano é calculado no build.

### 8.3 Botão flutuante de WhatsApp (FAB) — P0
- Posição: inferior direita (`right: max(16px, env(safe-area-inset-right))`, `bottom: max(16px, env(safe-area-inset-bottom))`), 56×56, círculo `whatsapp-600`, ícone branco, sombra `md`, `aria-label="Conversar com a Júlia no WhatsApp"`.
- Comportamento: aparece após 400 px de rolagem ou 6 s; some enquanto o Hero com CTA primário está visível; oculto em `/contato`; não cobre o botão "Mostrar mais" nem o rodapé (ao chegar ao rodapé, desloca-se para cima ou oculta). Desktop (≥ 1024 px): mostra rótulo "Fale comigo" ao lado (expande no hover/foco).

### 8.4 `LinkedInCard`
- Aparência: card branco, raio `lg`, borda `border`, sombra `md`, largura máx. 420 px. Topo: faixa de capa 88 px com gradiente `ink-900 → ink-800` e filete `gold-400`; **avatar circular** 88 px (borda branca 4 px) sobreposto; nome (Fraunces 600); título profissional; "Belo Horizonte, MG"; 3 chips (Letras · Mestrado · ENEM); botão "Ver perfil no LinkedIn" (fundo `linkedin`, texto branco, ícone oficial) abrindo `linkedinUrl` em nova aba com `rel="noopener noreferrer"`.
- Todos os dados vêm de `site.ts`/`curriculo.ts`. **Proibido** raspar o LinkedIn, exibir número de conexões/seguidores ou inventar recomendações.
- Acessível: o card inteiro **não** é link; apenas o botão. Texto alternativo do avatar.

### 8.5 `WhatsAppButton` e helper
- `src/lib/whatsapp.ts`: `whatsappUrl(mensagemKey | string)` → `https://wa.me/5531995072289?text=<encodeURIComponent(msg)>`.
- Mensagens padrão (chaves em `site.ts`):

| Chave | Texto |
|---|---|
| `geral` | Olá, Júlia! Vim pelo seu site e gostaria de saber mais sobre o seu trabalho. |
| `aulas` | Olá, Júlia! Vim pelo seu site e gostaria de solicitar aulas particulares. |
| `correcao` | Olá, Júlia! Vim pelo seu site e gostaria de solicitar a correção de uma redação. |
| `revisao` | Olá, Júlia! Vim pelo seu site e gostaria de solicitar a revisão de um trabalho acadêmico. |
| `estrangeiros` | Olá, Júlia! Vim pelo seu site e gostaria de saber mais sobre aulas de Português para estrangeiros. |
| `enem` | Olá, Júlia! Vim pelo seu site (conteúdo de ENEM) e gostaria de saber mais sobre aulas ou correção de redação. |

- Todo botão WhatsApp: `target="_blank" rel="noopener noreferrer"`, ícone SVG oficial, texto visível (nunca somente ícone, exceto FAB com `aria-label`). Atributo `data-cta="<local>"` (ex.: `hero`, `fab`, `servico-aulas`) para analytics opcional.

### 8.6 Demais componentes
`SectionHeader` (kicker + H2 + lead), `Chip`, `Card`, `Callout`, `Timeline`/`TimelineItem`, `Accordion`, `FilterBar` (+ `FilterSheet` mobile), `ThemeCard`, `RepertoireCard`, `ExerciseCard`, `Breadcrumb`, `Toast`, `EmptyState`, `Seo` (head), `JsonLd`.

---

## 9. Modelos de dados (Zod, em `src/content/config.ts`)

> Todos os textos longos são em Markdown autoral. `slug` em kebab-case ASCII, único por coleção. Datas em ISO `AAAA-MM-DD`. Campos `?` são opcionais.

### 9.1 Taxonomia de eixos (`src/content/taxonomias/eixos.json`)

```json
[
  {"id":"meio-ambiente","nome":"Meio ambiente e sustentabilidade","icone":"leaf"},
  {"id":"educacao","nome":"Educação","icone":"graduation-cap"},
  {"id":"saude","nome":"Saúde e bem-estar","icone":"heart-pulse"},
  {"id":"tecnologia","nome":"Tecnologia e redes","icone":"cpu"},
  {"id":"cidadania","nome":"Cidadania e direitos humanos","icone":"scale"},
  {"id":"desigualdade","nome":"Desigualdade e inclusão","icone":"users"},
  {"id":"cultura","nome":"Cultura e identidade","icone":"palette"},
  {"id":"trabalho","nome":"Trabalho e economia","icone":"briefcase"},
  {"id":"violencia","nome":"Violência e segurança","icone":"shield"},
  {"id":"comunicacao","nome":"Comunicação e mídia","icone":"megaphone"},
  {"id":"familia","nome":"Família e sociedade","icone":"home"},
  {"id":"ciencia","nome":"Ciência e conhecimento","icone":"flask-conical"}
]
```
O agente PODE ajustar esta lista **somente** para refletir os eixos presentes nos dados fornecidos (sem criar eixos sem uso).

### 9.2 `temas-anteriores`

```ts
z.object({
  ano: z.number().int().min(1998),
  aplicacao: z.enum(["regular","ppl","reaplicacao"]).default("regular"),
  tema: z.string(),                         // título oficial do tema
  eixos: z.array(z.string()).min(1),        // ids de eixos.json
  palavrasChave: z.array(z.string()).default([]),
  contexto: z.string().optional(),          // markdown autoral
  recortes: z.array(z.string()).default([]),
  teses: z.array(z.string()).default([]),
  repertoriosSugeridos: z.array(z.string()).default([]),   // slugs de repertorio
  propostaIntervencao: z.object({
    agente: z.string(), acao: z.string(), meio: z.string(), finalidade: z.string(), detalhamento: z.string()
  }).optional(),
  fonteOficialUrl: z.string().url().optional()
})
```

### 9.3 `temas-provaveis`

```ts
z.object({
  titulo: z.string(),
  eixos: z.array(z.string()).min(1),
  justificativa: z.string(),                // por que é plausível (atualidade/recorrência)
  recortes: z.array(z.string()).default([]),
  teses: z.array(z.string()).default([]),
  repertoriosSugeridos: z.array(z.string()).default([]),
  propostaIntervencao: z.object({ agente: z.string(), acao: z.string(), meio: z.string(), finalidade: z.string(), detalhamento: z.string() }).optional(),
  destaque: z.boolean().default(false),
  atualizadoEm: z.coerce.date()
})
```

### 9.4 `repertorio`

```ts
z.object({
  titulo: z.string(),
  tipo: z.enum(["livro","filme","serie","musica","documentario","texto","dado","pensador","fato-historico","lei","obra-de-arte","outro"]),
  autoria: z.string().optional(),           // autor/diretor/artista/instituição
  ano: z.number().int().optional(),
  idioma: z.string().optional(),            // usado em lang="" quando ≠ pt
  resumo: z.string(),                       // autoral, curto
  comoUsar: z.string(),                     // markdown autoral
  exemploParagrafo: z.string().optional(),
  cuidados: z.string().optional(),
  eixos: z.array(z.string()).min(1),
  temasRelacionados: z.array(z.number().int()).default([]),   // anos de temas-anteriores
  tags: z.array(z.string()).default([]),
  links: z.array(z.object({ rotulo: z.string(), url: z.string().url() })).default([]),
  atualizadoEm: z.coerce.date().optional()
})
```

### 9.5 `exercicios`

```ts
z.object({
  titulo: z.string(),
  area: z.string(),                         // valor de lista controlada derivada dos dados
  nivel: z.enum(["EF2","EM","ENEM","ENCEJA"]),
  assuntos: z.array(z.string()).default([]),
  numeroQuestoes: z.number().int().optional(),
  descricao: z.string(),
  arquivo: z.string(),                      // caminho em /downloads/exercicios/
  gabarito: z.string().optional(),
  publicadoEm: z.coerce.date()
})
```

### 9.6 `dicas` (Markdown + front matter)

```ts
z.object({
  titulo: z.string(), descricao: z.string(), data: z.coerce.date(),
  tags: z.array(z.string()).default([]), destaque: z.boolean().default(false),
  revisado: z.boolean().default(true)
})
```

---

## 10. Funcionalidades de busca e filtro (comportamento comum)

- `RF-FIL-01 (P0)` Busca **insensível a acentos e caixa** (`normalize('NFD')` + remoção de diacríticos), por substring em campos indexados; *debounce* de 150 ms.
- `RF-FIL-02 (P0)` Combinação de filtros: **E** entre grupos, **OU** dentro do mesmo grupo.
- `RF-FIL-03 (P0)` Estado sincronizado com a URL por `history.replaceState` (parâmetros curtos e legíveis), restaurado no carregamento.
- `RF-FIL-04 (P0)` **Melhoria progressiva:** sem JavaScript, a listagem completa aparece renderizada no HTML (filtros ocultos via `<noscript>` aviso); com JS, filtra no cliente.
- `RF-FIL-05 (P0)` Atualizar contagem em região `aria-live="polite"` e, ao filtrar, **não** mover o foco do usuário.
- `RF-FIL-06 (P1)` Botão "Limpar filtros" visível quando houver filtro ativo; *empty state* com sugestão.
- `RF-FIL-07 (P2)` "Salvar repertório" (favoritos) com `localStorage` (try/catch), exibido na própria listagem; sem sincronização.
- Performance: dados de listagem emitidos como JSON mínimo (`/data/repertorio.json`) apenas com campos necessários; detalhe completo vem do HTML da página do item.

---

## 11. Requisitos não funcionais

### 11.1 Desempenho (P0)
- Lighthouse **mobile** (Moto G Power, 4G lento): Performance ≥ 95 (Home e páginas de listagem); LCP < 2,5 s; CLS < 0,1; INP < 200 ms; TBT < 150 ms.
- JavaScript por página: ≤ 60 KB gzip na Home e ≤ 100 KB gzip nas listagens (excluindo dados JSON). Sem frameworks de UI no cliente.
- Imagens: formatos modernos, `srcset`/`sizes`, `loading="lazy"` abaixo da dobra; peso da foto do Hero ≤ 120 KB (AVIF/WebP, versão mobile ≤ 60 KB).
- Fontes variáveis em subset latino (`latin`, `latin-ext`); `preload` somente das essenciais.
- CSS crítico inline; sem CSS não utilizado em excesso.

### 11.2 Acessibilidade (P0) — WCAG 2.2 AA
- Contraste: texto normal ≥ 4,5:1; texto grande e componentes de UI ≥ 3:1. **Proibido** usar `rose-500`, `ink-400`, `gold-400` para texto.
- Navegação 100% por teclado; ordem lógica; **foco visível** (anel 3 px `ink-900` + 2 px offset); sem armadilha de foco (exceto drawer/modais, com ESC).
- Landmarks (`header`, `nav`, `main`, `footer`), hierarquia de títulos sem saltos (um `h1` por página), `lang="pt-BR"` na raiz e `lang` em trechos estrangeiros (títulos de filmes, livros em outro idioma).
- Alvos de toque ≥ 44×44 px; espaçamento mínimo entre alvos de 8 px.
- Imagens decorativas com `alt=""`/`aria-hidden`; informativas com alt descritivo.
- Formulário com `label` associados, mensagens de erro anunciadas, sem depender só da cor.
- `prefers-reduced-motion` respeitado; conteúdo nunca depende de hover.
- Links externos: indicar "(abre em nova aba)" via texto visualmente oculto.
- Teste: `axe-core` sem violações críticas/sérias; verificação manual com leitor de tela (VoiceOver ou NVDA) nos fluxos Home → WhatsApp e Repertório → filtro.

### 11.3 SEO (P0)
- `<title>` único (≤ 60 caracteres) e `meta description` (≤ 155) por página; `canonical` absoluto; `lang`.
- Open Graph e Twitter Card (`summary_large_image`) com `og-default.png`; imagens OG específicas por seção PODEM vir em P2.
- `sitemap.xml` e `robots.txt` (permitir tudo; apontar sitemap).
- **JSON-LD:** `Person` na Home (`name`, `jobTitle`, `alumniOf` CEFET-MG, `knowsAbout`, `sameAs` [LinkedIn], `image`, `url`), `ProfessionalService` em `/servicos` (`areaServed` Belo Horizonte, MG), `BreadcrumbList` em páginas internas, `FAQPage` onde houver FAQ.
- URLs limpas em kebab-case; um `h1` por página; textos âncora descritivos.
- Títulos sugeridos: Home — "Júlia Demetrio Xavier | Professora de Português, Redação e Literatura"; ENEM — "Conteúdo ENEM: temas de redação, repertório e exercícios | Júlia Demetrio Xavier".

### 11.4 Privacidade, segurança e analytics
- Sem cookies e sem scripts de terceiros por padrão. Fontes self-hosted.
- Analytics: variável `ANALYTICS_PROVIDER` (`none` | `goatcounter` | `plausible` | `cloudflare`) e `ANALYTICS_ID`; padrão `none`. Se ativado, atualizar `/privacidade` automaticamente e registrar eventos `data-cta` de clique em WhatsApp.
- Links externos com `rel="noopener noreferrer"`. Sem `eval`, sem `innerHTML` com dados não sanitizados.
- Política de segurança de conteúdo via `<meta http-equiv="Content-Security-Policy">` restritiva compatível com Pages (default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors não é aplicável via meta).
- Não publicar o PDF do currículo por padrão (D-05/7.1.5). `docs/source/` não vai para `dist/`.

### 11.5 Compatibilidade
Últimas 2 versões de Chrome, Edge, Firefox, Safari (iOS ≥ 15 / macOS) e Samsung Internet. Layout testado em 360×740, 390×844, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080. Uso de `dvh/svh` com *fallback* para `vh`.

### 11.6 Manutenibilidade
- TypeScript estrito; ESLint + Prettier; nomes de arquivos em kebab-case; componentes pequenos e documentados com comentário de props.
- `npm run validate:content` falha o build em: schema inválido, slug duplicado, referência quebrada (`repertoriosSugeridos`, `temasRelacionados`, `eixos`), arquivo de exercício/gabarito inexistente, URL inválida, link interno quebrado.
- README com tutorial "Como adicionar um repertório / tema / lista de exercícios / dica / alterar textos".

---

## 12. Ingestão e normalização dos dados fornecidos

1. **Inventário:** listar arquivos recebidos e formato (planilha, doc, PDF, JSON...).
2. **Mapeamento:** converter cada base para os schemas da seção 9. Registrar em `docs/ingestao-relatorio.md`: quantos itens por coleção, campos ausentes, ambiguidades, duplicidades.
3. **Regras:** não inventar valores; campo obrigatório ausente → marcar o item como pendente no relatório e **excluí-lo do build** (não preencher com texto genérico); normalizar eixos para os ids de `eixos.json`; normalizar tipos de repertório para o enum; gerar `slug` (minúsculas, sem acentos, hífens, único); texto em Markdown limpo (sem formatação residual de Word/PDF).
4. **Direitos autorais:** conteúdo de terceiros (trechos longos de livros, letras de música, textos motivadores integrais, capas, pôsteres) **NÃO** deve ser reproduzido; manter somente referência, resumo autoral e link. Sinalizar no relatório qualquer trecho suspeito.
5. **Idempotência:** o processo de conversão (script em `scripts/`) deve poder ser reexecutado quando a Júlia atualizar as bases.
6. **Dados de teste:** durante o desenvolvimento, usar `fixtures/` claramente marcados "EXEMPLO" e **garantir que não vão para produção** (flag de ambiente).

---

## 13. Critérios de aceite e plano de testes

### 13.1 Critérios globais (todos P0)
- [ ] `npm run validate:content && npm run build` passam sem erros ou avisos críticos.
- [ ] Site funciona publicado em `https://<usuario>.github.io/` **e** em `https://<usuario>.github.io/<repo>/` (teste de `BASE_PATH`); nenhum link/asset quebrado.
- [ ] Lighthouse mobile ≥ 95 (Performance, Acessibilidade, Boas Práticas, SEO) na Home, em `/enem/repertorio` e em `/servicos`.
- [ ] `axe-core` sem violações críticas/sérias nas rotas principais.
- [ ] Todos os botões de WhatsApp abrem `wa.me/5531995072289` com mensagem correta e codificada.
- [ ] Nenhuma informação sobre a Júlia que não esteja no currículo/neste documento.
- [ ] Idade da Júlia **não** aparece em lugar nenhum do site.
- [ ] Sem requisições a domínios de terceiros em tempo de execução (verificar aba Network), exceto ao clicar em links externos.

### 13.2 Home
- [ ] Em 390×844, H1, CTA primário e topo da foto visíveis sem rolagem.
- [ ] Foto com fundo transparente sobre fundo claro, **sem halo/borda branca**, base alinhada ao limite inferior do Hero, sem distorção (proporção preservada).
- [ ] Selos de vidro visíveis ≥ 1024 px e **não cobrem o rosto**.
- [ ] Formação e experiência coincidem 100% com o currículo (datas, nomes de instituições, "em andamento" no Mestrado).
- [ ] `LinkedInCard` exibe avatar, nome, título e botão; link correto; abre em nova aba.
- [ ] Seção de conteúdo ENEM oculta quando todas as coleções estão vazias.

### 13.3 ENEM
- [ ] Filtros e busca funcionam sem acento/caixa, combinam corretamente e atualizam a URL.
- [ ] Contagem anunciada em `aria-live`; "Limpar filtros" restaura a lista completa.
- [ ] Sem JavaScript, as listagens continuam legíveis.
- [ ] Referências cruzadas (repertório ↔ temas) levam a páginas existentes.
- [ ] Aviso de "Temas prováveis" sempre visível; nenhuma porcentagem exibida.
- [ ] Todo PDF/gabarito linkado existe e abre; tamanho exibido corresponde ao arquivo.

### 13.4 Responsividade e navegação
- [ ] Menu mobile abre/fecha por toque e ESC, prende foco e restaura foco no botão.
- [ ] Menu suspenso ENEM acessível por teclado (Enter/Espaço, setas opcionais, ESC fecha).
- [ ] FAB aparece/oculta conforme 8.3 e não cobre conteúdo essencial.
- [ ] Nenhuma rolagem horizontal em 360 px.

### 13.5 Plano de testes (mínimo)
1. Revisão visual nos 7 viewports da seção 11.5.
2. Lighthouse CI (ou execução manual) nas rotas: `/`, `/servicos`, `/enem`, `/enem/repertorio`, `/contato`.
3. `axe-core` (CLI ou Playwright) em todas as rotas estáticas.
4. Teste de teclado completo na Home e no formulário de Contato.
5. Teste de links (internos e externos) com verificador no CI.
6. (P1) Testes Playwright de fumaça: abre Home, clica no CTA e verifica URL `wa.me`; filtra repertório e verifica contagem.

---

## 14. Entregáveis e ordem de implementação

### 14.1 Fases

| Fase | Escopo | Prioridade |
|---|---|---|
| 1. Fundação | Projeto Astro, tokens, layout base, fontes, helper `url()`, SEO base, workflow de deploy, CI de validação | P0 |
| 2. Marca e Home | Logo/favicon, tratamento da foto, Hero, credenciais, Sobre, Serviços (resumo), Formação/Experiência, `LinkedInCard`, CTA final, rodapé, FAB | P0 |
| 3. Serviços e Contato | `/servicos`, `/contato`, helper WhatsApp, mini-formulário, privacidade, 404 | P0 |
| 4. Dados ENEM | Schemas, ingestão (seção 12), listagens e detalhes de Temas anteriores, Temas prováveis, Repertório, Exercícios, filtros | P0 |
| 5. Polimento | Competências, FAQ, Como funciona, JSON-LD, OG image, animações, auditorias de acessibilidade/performance | P0/P1 |
| 6. Extras | Dicas (blog), favoritos, RSS, compartilhar no WhatsApp, imagens OG por seção | P2 |

### 14.2 Entregáveis
Repositório completo e funcional; `README.md`; workflow `deploy.yml`; `docs/ingestao-relatorio.md`; `docs/auditoria.md` (resultados Lighthouse e axe com data); site publicado e URL informada.

### 14.3 Relatório final do agente (obrigatório)
Listar: (a) o que foi implementado por seção do documento; (b) itens `⚠ CONFIRMAR` e pendências P-01…P-08 com o valor padrão adotado; (c) lacunas/ambiguidades nos dados de ENEM; (d) conteúdo editorial criado pelo agente (ex.: Competências) que **requer revisão da Júlia**; (e) decisões tomadas fora do documento, com justificativa.

---

## 15. Anexos

### 15.1 Exemplo de JSON-LD (Home)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Júlia Demetrio Xavier",
  "jobTitle": "Professora de Língua Portuguesa, Redação e Literatura",
  "url": "https://<usuario>.github.io/",
  "image": "https://<usuario>.github.io/og/og-default.png",
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "CEFET-MG" },
  "knowsAbout": ["Língua Portuguesa", "Redação", "Literatura", "ENEM", "ENCEJA", "Revisão de textos"],
  "address": { "@type": "PostalAddress", "addressLocality": "Belo Horizonte", "addressRegion": "MG", "addressCountry": "BR" },
  "sameAs": ["<linkedinUrl>"]
}
```

### 15.2 Esqueleto do `site.ts` (campos obrigatórios)

```ts
export const site = {
  nome: "Júlia Demetrio Xavier",
  tituloProfissional: "Professora de Língua Portuguesa, Redação e Literatura",
  whatsapp: { numeroE164: "5531995072289", exibicao: "+55 (31) 99507-2289", mensagens: { /* seção 8.5 */ } },
  email: "juliademetrio9@gmail.com",
  cidade: "Belo Horizonte – MG",
  linkedinUrl: "<P-01>",
  redes: [],
  depoimentos: [],            // vazio = seção oculta
  navegacao: [
    { rotulo: "Início", href: "/" },
    { rotulo: "Serviços", href: "/servicos" },
    { rotulo: "ENEM", href: "/enem", filhos: "auto" },   // gerado a partir das coleções não vazias
    { rotulo: "Contato", href: "/contato" }
  ],
  seo: { titulo: "Júlia Demetrio Xavier | Professora de Português, Redação e Literatura",
         descricao: "Aulas particulares de Português, Redação e Literatura, correção de redações e revisão de trabalhos acadêmicos. Conteúdo gratuito para o ENEM.",
         ogImage: "/og/og-default.png" }
  // hero, sobre, servicos, comoFunciona, faq, ctaFinal, rodape — textos das seções 7.1 e 7.2
};
```

### 15.3 Checklist rápido de "não fazer"

- ❌ Idade, endereço ou exposição direta em texto do número de telefone, endereço de e-mail ou URL/handle do LinkedIn (utilizar sempre botões de ação ou botões de ícone SVG).
- ❌ Depoimentos, números de alunos, taxas de aprovação, notas ou promessas de resultado.
- ❌ Preços, prazos, formatos de aula não fornecidos.
- ❌ Fundo escuro no Hero; foto distorcida/esticada; pernas "geradas".
- ❌ Tailwind, React/Vue no cliente, jQuery, bibliotecas de UI pesadas.
- ❌ Google Fonts remoto, CDNs de terceiros, cookies, pixels de rastreamento por padrão.
- ❌ Capas/pôsteres/imagens de terceiros; reprodução integral de textos motivadores, letras ou obras.
- ❌ Links internos absolutos sem o helper `url()`.
- ❌ Inventar dados de ENEM ausentes; tratar "temas prováveis" como previsão oficial.
- ❌ Incluir questões de Ciências Humanas, Matemática ou Ciências da Natureza no banco de questões do Portal ENEM (foco restrito a Linguagens, Códigos e suas Tecnologias).

---

## 16. Histórico de Evoluções e Ajustes Implementados

### Atualização de 31/10/2026
1. **Favicon Circular (`public/favicon.png` e `assets/favicon.png`)**:
   - Recorte circular na borda externa do anel dourado com transparência RGBA (remoção dos cantos brancos quadrados) e otimização para `512x512 px`.
2. **Correção do Menu de Navegação Mobile (`src/components/layout/Header.astro`)**:
   - O elemento `.mobile-drawer` foi movido para fora de `<header class="site-header">` para evitar que a propriedade `backdrop-filter: blur(12px)` restringisse a altura do painel `position: fixed` aos `72px` do cabeçalho. Adicionado `height: 100dvh` e `flex: 1 0 auto` na listagem de links.
3. **Ocultação de Dados Diretos de Contato e Biblioteca de Ícones SVG (`src/assets/icons/` e `assets/icons/`)**:
   - Criados os ícones vetoriais `whatsapp.svg`, `linkedin.svg`, `email.svg`, `copy.svg`, `menu.svg`, `close.svg`, `chevron-down.svg` e `arrow-right.svg`.
   - Removida toda exibição textual direta do telefone (`+55 (31) 99507-2289`), e-mail (`juliademetrio9@gmail.com`) e handle do LinkedIn (`in/julia-demetrio`) nas páginas `sobre.astro`, `privacidade.astro` e no componente `Footer.astro`.
   - No rodapé (`Footer.astro`), os links textuais de contato foram substituídos por botões circulares de ícones SVG das respectivas plataformas.
4. **Créditos de Desenvolvimento no Rodapé (`src/components/layout/Footer.astro`)**:
   - Adicionada indicação `"Desenvolvido por Lucas Daniel de Melo Borges"` com link externo para `https://www.linkedin.com/in/ldmelo`.
5. **Créditos Institucionais do IFMG no Banco de Repertório (`src/pages/enem/repertorio.astro`)**:
   - Inclusão de banner com disclaimer institucional e modal acessível (`<dialog>`) prestando os devidos créditos aos 7 professores, pesquisadores e estudantes do IFMG autores da coletânea *"Rumo à Nota Mil: Repertórios para Redação do Enem"*, com link direto para o PDF oficial no portal do IFMG.
6. **Simplificação da Nomenclatura para "Serviços"**:
   - Substituição unificada de *"Serviços Pedagógicos & Editoriais"* por apenas *"Serviços"* no rodapé, página Sobre e metatags.
7. **Remoção Integral de Menções a "Atendimento Online"**:
   - Exclusão do texto e de propriedades ligadas a *"Atendimento online"* no site (`SITE.contact.modality`, rodapé, hero de serviços e mentoria).
8. **Atualização e Destaque dos Logotipos (`src/assets/images/`)**:
   - Substituição no cabeçalho por `logo-horizontal.png` com proporção 3:1.
   - Posicionamento da nova `logo.png` em alta definição em destaque no Hero da página inicial do Portal ENEM e em destaque menor/refinado na página Sobre.

---

*Fim do documento.*
