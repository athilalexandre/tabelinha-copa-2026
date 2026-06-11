# Tabelinha Copa 2026

Uma experiência web moderna e responsiva para acompanhar a Copa do Mundo 2026 em formato de “tabelinha de bolso”: grupos, jogos, classificação, melhores 3º e mata-mata em uma navegação compacta por seções.

Este é um projeto fan-made, não oficial, e não é afiliado à FIFA.

## Status dos Dados

Em 11 de junho de 2026, foram consultadas as páginas oficiais abaixo como fonte de verdade pretendida:

- FIFA World Cup 2026 Teams: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams
- FIFA World Cup 2026 Standings: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings
- FIFA World Cup 2026 Scores & Fixtures: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures

As páginas responderam, mas não expuseram dados estruturados extraíveis neste ambiente. Os grupos foram preenchidos com a lista fornecida pelo usuário e conferida contra buscas públicas atuais. A fase de grupos e o mata-mata receberam horários em BRT a partir do contexto fornecido pelo usuário e de tabela pública consultada em 11 de junho de 2026.

Formato modelado:

- 48 seleções
- 12 grupos de 4
- Top 2 de cada grupo avançam
- 8 melhores 3º também avançam
- Mata-mata começa na Fase de 32
- Depois vêm Oitavas, Quartas, Semifinais, 3º Lugar e Final

## Onde Editar os Dados

Atualize `src/data/worldCup2026.ts` quando os dados oficiais puderem ser revisados:

- `groups`: seleções, grupos, partidas e classificação
- `bestThirdPlaceRows`: ranking dos melhores 3º
- `knockoutRounds`: números M73-M104, horários, caminhos do mata-mata e resultados
- `officialDataSources`: links de referência
- `dataVerificationNote`: nota exibida no app

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Comandos

```bash
npm run typecheck
npm run build
npm run start
```

## Estrutura

- `src/app/page.tsx`: rota principal
- `src/app/layout.tsx`: metadados e shell HTML
- `src/app/globals.css`: tema visual, layout, responsividade e estados acessíveis
- `src/components/BookletApp.tsx`: estado principal, localStorage e layout geral
- `src/components/AccordionBooklet.tsx`: navegação por seções e página atual
- `src/components/BookletCover.tsx`: estado fechado / capa
- `src/components/BookletPage.tsx`: superfície da seção atual
- `src/components/GroupPage.tsx`: página de grupo
- `src/components/StandingsTable.tsx`: tabela de classificação
- `src/components/MatchList.tsx`: lista de jogos com placares editáveis
- `src/components/BestThirdPlacePage.tsx`: melhores 3º
- `src/components/KnockoutRoundPage.tsx`: rodadas do mata-mata
- `src/data/worldCup2026.ts`: dados editáveis da Copa

## Persistência Local

O app salva no `localStorage`:

- estado aberto/fechado
- página focada
- placares digitados pelo usuário

Não há autenticação nem backend.

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Na Vercel, escolha **Add New Project** e importe `athilalexandre/tabelinha-copa-2026`.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: padrão da Vercel para Next.js.
6. Deploy.

Nenhuma configuração especial da Vercel é necessária neste MVP.

## Limitações Conhecidas

- Resultados devem ser revisados contra a página oficial da FIFA.
- A tabela de classificação ainda não recalcula automaticamente a partir dos placares digitados.
- Os caminhos do mata-mata devem ser revisados se a FIFA alterar a estrutura oficial.
