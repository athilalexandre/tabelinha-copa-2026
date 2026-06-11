export type GroupId =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L";

export type Team = {
  id: string;
  name: string;
  flag: string;
  groupPosition: string;
  status: "placeholder" | "verified";
  qualificationNote?: string;
};

export type Standing = {
  teamId: string;
  pts: number;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
};

export type Match = {
  id: string;
  label: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  venue: string;
  sourceStatus: "placeholder" | "researched" | "verified";
};

export type Group = {
  id: GroupId;
  name: string;
  teams: Team[];
  matches: Match[];
  standings: Standing[];
};

export type KnockoutMatch = {
  id: string;
  label: string;
  matchNumber: string;
  homeSlot: string;
  awaySlot: string;
  date: string;
  pathHint?: string;
};

export type KnockoutRound = {
  id: string;
  name: string;
  matches: KnockoutMatch[];
};

type GroupFixtureSeed = {
  homeIndex: number;
  awayIndex: number;
  date: string;
};

type TeamSeed = {
  name: string;
  flag: string;
  qualificationNote?: string;
};

export const officialDataSources = [
  {
    label: "FIFA World Cup 2026 Teams",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams"
  },
  {
    label: "FIFA World Cup 2026 Standings",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings"
  },
  {
    label: "FIFA World Cup 2026 Scores & Fixtures",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures"
  }
] as const;

export const dataVerificationNote =
  "Grupos preenchidos em 2026-06-11 com a lista fornecida pelo usuário e conferida contra buscas públicas atuais. Horários em BRT a partir de tabela pública consultada. Resultados e caminhos finais do mata-mata devem ser revisados diretamente na FIFA.";

export const groupIds: GroupId[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const groupSeedData: Record<GroupId, TeamSeed[]> = {
  A: [
    { name: "México", flag: "🇲🇽" },
    { name: "África do Sul", flag: "🇿🇦" },
    { name: "Coreia do Sul", flag: "🇰🇷" },
    { name: "República Tcheca", flag: "🇨🇿", qualificationNote: "Repescagem UEFA" }
  ],
  B: [
    { name: "Canadá", flag: "🇨🇦" },
    { name: "Bósnia e Herzegovina", flag: "🇧🇦", qualificationNote: "Repescagem UEFA" },
    { name: "Catar", flag: "🇶🇦" },
    { name: "Suíça", flag: "🇨🇭" }
  ],
  C: [
    { name: "Brasil", flag: "🇧🇷" },
    { name: "Marrocos", flag: "🇲🇦" },
    { name: "Haiti", flag: "🇭🇹" },
    { name: "Escócia", flag: "🏴" }
  ],
  D: [
    { name: "Estados Unidos", flag: "🇺🇸" },
    { name: "Paraguai", flag: "🇵🇾" },
    { name: "Austrália", flag: "🇦🇺" },
    { name: "Turquia", flag: "🇹🇷", qualificationNote: "Repescagem UEFA" }
  ],
  E: [
    { name: "Alemanha", flag: "🇩🇪" },
    { name: "Curaçao", flag: "🇨🇼" },
    { name: "Costa do Marfim", flag: "🇨🇮" },
    { name: "Equador", flag: "🇪🇨" }
  ],
  F: [
    { name: "Holanda", flag: "🇳🇱" },
    { name: "Japão", flag: "🇯🇵" },
    { name: "Suécia", flag: "🇸🇪", qualificationNote: "Repescagem UEFA" },
    { name: "Tunísia", flag: "🇹🇳" }
  ],
  G: [
    { name: "Bélgica", flag: "🇧🇪" },
    { name: "Egito", flag: "🇪🇬" },
    { name: "Irã", flag: "🇮🇷" },
    { name: "Nova Zelândia", flag: "🇳🇿" }
  ],
  H: [
    { name: "Espanha", flag: "🇪🇸" },
    { name: "Cabo Verde", flag: "🇨🇻" },
    { name: "Arábia Saudita", flag: "🇸🇦" },
    { name: "Uruguai", flag: "🇺🇾" }
  ],
  I: [
    { name: "França", flag: "🇫🇷" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Iraque", flag: "🇮🇶", qualificationNote: "Repescagem intercontinental 2" },
    { name: "Noruega", flag: "🇳🇴" }
  ],
  J: [
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Argélia", flag: "🇩🇿" },
    { name: "Áustria", flag: "🇦🇹" },
    { name: "Jordânia", flag: "🇯🇴" }
  ],
  K: [
    { name: "Portugal", flag: "🇵🇹" },
    { name: "RD Congo", flag: "🇨🇩" },
    { name: "Uzbequistão", flag: "🇺🇿" },
    { name: "Colômbia", flag: "🇨🇴" }
  ],
  L: [
    { name: "Inglaterra", flag: "🏴" },
    { name: "Croácia", flag: "🇭🇷" },
    { name: "Gana", flag: "🇬🇭" },
    { name: "Panamá", flag: "🇵🇦" }
  ]
};

const groupFixtureData: Record<GroupId, GroupFixtureSeed[]> = {
  A: [
    { homeIndex: 0, awayIndex: 1, date: "11/06, 16:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "11/06, 23:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "18/06, 13:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "18/06, 22:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "24/06, 22:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "24/06, 22:00 BRT" }
  ],
  B: [
    { homeIndex: 0, awayIndex: 1, date: "12/06, 16:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "13/06, 16:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "18/06, 16:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "18/06, 19:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "24/06, 16:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "24/06, 16:00 BRT" }
  ],
  C: [
    { homeIndex: 0, awayIndex: 1, date: "13/06, 19:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "13/06, 22:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "19/06, 19:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "19/06, 21:30 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "24/06, 19:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "24/06, 19:00 BRT" }
  ],
  D: [
    { homeIndex: 0, awayIndex: 1, date: "12/06, 22:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "14/06, 01:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "19/06, 16:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "20/06, 00:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "25/06, 23:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "25/06, 23:00 BRT" }
  ],
  E: [
    { homeIndex: 0, awayIndex: 1, date: "14/06, 14:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "14/06, 20:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "20/06, 17:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "20/06, 21:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "25/06, 17:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "25/06, 17:00 BRT" }
  ],
  F: [
    { homeIndex: 0, awayIndex: 1, date: "14/06, 17:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "14/06, 23:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "20/06, 14:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "21/06, 01:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "25/06, 20:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "25/06, 20:00 BRT" }
  ],
  G: [
    { homeIndex: 0, awayIndex: 1, date: "15/06, 16:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "15/06, 22:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "21/06, 16:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "21/06, 22:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "27/06, 00:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "27/06, 00:00 BRT" }
  ],
  H: [
    { homeIndex: 0, awayIndex: 1, date: "15/06, 13:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "15/06, 19:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "21/06, 13:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "21/06, 19:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "26/06, 21:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "26/06, 21:00 BRT" }
  ],
  I: [
    { homeIndex: 0, awayIndex: 1, date: "16/06, 16:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "16/06, 19:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "22/06, 18:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "22/06, 21:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "26/06, 16:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "26/06, 16:00 BRT" }
  ],
  J: [
    { homeIndex: 0, awayIndex: 1, date: "16/06, 22:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "17/06, 01:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "22/06, 14:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "23/06, 00:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "27/06, 23:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "27/06, 23:00 BRT" }
  ],
  K: [
    { homeIndex: 0, awayIndex: 1, date: "17/06, 14:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "17/06, 23:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "23/06, 14:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "23/06, 23:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "27/06, 20:30 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "27/06, 20:30 BRT" }
  ],
  L: [
    { homeIndex: 0, awayIndex: 1, date: "17/06, 17:00 BRT" },
    { homeIndex: 2, awayIndex: 3, date: "17/06, 20:00 BRT" },
    { homeIndex: 0, awayIndex: 2, date: "23/06, 17:00 BRT" },
    { homeIndex: 3, awayIndex: 1, date: "23/06, 20:00 BRT" },
    { homeIndex: 3, awayIndex: 0, date: "27/06, 18:00 BRT" },
    { homeIndex: 1, awayIndex: 2, date: "27/06, 18:00 BRT" }
  ]
};

function makeTeams(groupId: GroupId, teamSeeds: TeamSeed[]): Team[] {
  return teamSeeds.map((team, index) => ({
    id: `${groupId}${index + 1}`,
    name: team.name,
    flag: team.flag,
    groupPosition: `${groupId}${index + 1}`,
    status: "verified",
    qualificationNote: team.qualificationNote
  }));
}

function makeMatches(groupId: GroupId, teams: Team[]): Match[] {
  return groupFixtureData[groupId].map((fixture, index) => {
    const home = teams[fixture.homeIndex];
    const away = teams[fixture.awayIndex];

    return {
      id: `${groupId}-match-${index + 1}`,
      label: `Rodada ${Math.floor(index / 2) + 1} · Jogo ${index + 1}`,
      homeTeamId: home.id,
      awayTeamId: away.id,
      date: fixture.date,
      venue: "",
      sourceStatus: "researched"
    };
  });
}

function makeStandings(teams: Team[]): Standing[] {
  return teams.map((team) => ({
    teamId: team.id,
    pts: 0,
    p: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
    gd: 0
  }));
}

export const groups: Group[] = groupIds.map((id) => {
  const teams = makeTeams(id, groupSeedData[id]);

  return {
    id,
    name: `Grupo ${id}`,
    teams,
    matches: makeMatches(id, teams),
    standings: makeStandings(teams)
  };
});

export const bestThirdPlaceRows = groupIds.map((id) => ({
  id: `third-${id}`,
  slot: `3º do Grupo ${id}`,
  pts: 0,
  p: 0,
  gd: 0,
  gf: 0,
  status: "A confirmar"
}));

export const knockoutRounds: KnockoutRound[] = [
  {
    id: "round-of-32",
    name: "Fase de 32",
    matches: [
      { id: "m73", matchNumber: "M73", label: "Fase de 32", homeSlot: "2A", awaySlot: "2B", date: "28/06, 16:00 BRT", pathHint: "Vice A x Vice B" },
      { id: "m74", matchNumber: "M74", label: "Fase de 32", homeSlot: "1E", awaySlot: "3A/B/C/D/F", date: "29/06, 14:00 BRT", pathHint: "Líder E x melhor 3º" },
      { id: "m75", matchNumber: "M75", label: "Fase de 32", homeSlot: "1F", awaySlot: "2C", date: "29/06, 17:30 BRT", pathHint: "Líder F x vice C" },
      { id: "m76", matchNumber: "M76", label: "Fase de 32", homeSlot: "1C", awaySlot: "2F", date: "29/06, 22:00 BRT", pathHint: "Líder C x vice F" },
      { id: "m77", matchNumber: "M77", label: "Fase de 32", homeSlot: "1I", awaySlot: "3C/D/F/G/H", date: "30/06, 14:00 BRT", pathHint: "Líder I x melhor 3º" },
      { id: "m78", matchNumber: "M78", label: "Fase de 32", homeSlot: "2E", awaySlot: "2I", date: "30/06, 18:00 BRT", pathHint: "Vice E x vice I" },
      { id: "m79", matchNumber: "M79", label: "Fase de 32", homeSlot: "1A", awaySlot: "3C/E/F/H/I", date: "30/06, 22:00 BRT", pathHint: "Líder A x melhor 3º" },
      { id: "m80", matchNumber: "M80", label: "Fase de 32", homeSlot: "1L", awaySlot: "3E/H/I/J/K", date: "01/07, 13:00 BRT", pathHint: "Líder L x melhor 3º" },
      { id: "m81", matchNumber: "M81", label: "Fase de 32", homeSlot: "1D", awaySlot: "3B/E/F/I/J", date: "01/07, 17:00 BRT", pathHint: "Líder D x melhor 3º" },
      { id: "m82", matchNumber: "M82", label: "Fase de 32", homeSlot: "1G", awaySlot: "3A/E/H/I/J", date: "01/07, 21:00 BRT", pathHint: "Líder G x melhor 3º" },
      { id: "m83", matchNumber: "M83", label: "Fase de 32", homeSlot: "2K", awaySlot: "2L", date: "02/07, 16:00 BRT", pathHint: "Vice K x vice L" },
      { id: "m84", matchNumber: "M84", label: "Fase de 32", homeSlot: "1H", awaySlot: "2J", date: "02/07, 20:00 BRT", pathHint: "Líder H x vice J" },
      { id: "m85", matchNumber: "M85", label: "Fase de 32", homeSlot: "1B", awaySlot: "3E/F/G/I/J", date: "03/07, 00:00 BRT", pathHint: "Líder B x melhor 3º" },
      { id: "m86", matchNumber: "M86", label: "Fase de 32", homeSlot: "1J", awaySlot: "2H", date: "03/07, 15:00 BRT", pathHint: "Líder J x vice H" },
      { id: "m87", matchNumber: "M87", label: "Fase de 32", homeSlot: "1K", awaySlot: "3D/E/I/J/L", date: "03/07, 19:00 BRT", pathHint: "Líder K x melhor 3º" },
      { id: "m88", matchNumber: "M88", label: "Fase de 32", homeSlot: "2D", awaySlot: "2G", date: "03/07, 22:30 BRT", pathHint: "Vice D x vice G" }
    ]
  },
  {
    id: "round-of-16",
    name: "Oitavas",
    matches: [
      { id: "m89", matchNumber: "M89", label: "Oitavas", homeSlot: "W74", awaySlot: "W77", date: "04/07, 14:00 BRT", pathHint: "Vencedores M74 e M77" },
      { id: "m90", matchNumber: "M90", label: "Oitavas", homeSlot: "W73", awaySlot: "W75", date: "04/07, 18:00 BRT", pathHint: "Vencedores M73 e M75" },
      { id: "m91", matchNumber: "M91", label: "Oitavas", homeSlot: "W76", awaySlot: "W78", date: "05/07, 17:00 BRT", pathHint: "Vencedores M76 e M78" },
      { id: "m92", matchNumber: "M92", label: "Oitavas", homeSlot: "W79", awaySlot: "W80", date: "05/07, 21:00 BRT", pathHint: "Vencedores M79 e M80" },
      { id: "m93", matchNumber: "M93", label: "Oitavas", homeSlot: "W83", awaySlot: "W84", date: "06/07, 16:00 BRT", pathHint: "Vencedores M83 e M84" },
      { id: "m94", matchNumber: "M94", label: "Oitavas", homeSlot: "W81", awaySlot: "W82", date: "06/07, 21:00 BRT", pathHint: "Vencedores M81 e M82" },
      { id: "m95", matchNumber: "M95", label: "Oitavas", homeSlot: "W86", awaySlot: "W88", date: "07/07, 13:00 BRT", pathHint: "Vencedores M86 e M88" },
      { id: "m96", matchNumber: "M96", label: "Oitavas", homeSlot: "W85", awaySlot: "W87", date: "07/07, 17:00 BRT", pathHint: "Vencedores M85 e M87" }
    ]
  },
  {
    id: "quarter-finals",
    name: "Quartas",
    matches: [
      { id: "m97", matchNumber: "M97", label: "Quartas", homeSlot: "W89", awaySlot: "W90", date: "09/07, 17:00 BRT", pathHint: "Vencedores M89 e M90" },
      { id: "m98", matchNumber: "M98", label: "Quartas", homeSlot: "W93", awaySlot: "W94", date: "10/07, 16:00 BRT", pathHint: "Vencedores M93 e M94" },
      { id: "m99", matchNumber: "M99", label: "Quartas", homeSlot: "W91", awaySlot: "W92", date: "11/07, 18:00 BRT", pathHint: "Vencedores M91 e M92" },
      { id: "m100", matchNumber: "M100", label: "Quartas", homeSlot: "W95", awaySlot: "W96", date: "11/07, 22:00 BRT", pathHint: "Vencedores M95 e M96" }
    ]
  },
  {
    id: "semi-finals",
    name: "Semifinais",
    matches: [
      { id: "m101", matchNumber: "M101", label: "Semifinal", homeSlot: "W97", awaySlot: "W98", date: "14/07, 16:00 BRT", pathHint: "Vencedores M97 e M98" },
      { id: "m102", matchNumber: "M102", label: "Semifinal", homeSlot: "W99", awaySlot: "W100", date: "15/07, 16:00 BRT", pathHint: "Vencedores M99 e M100" }
    ]
  },
  {
    id: "third-place",
    name: "3º Lugar",
    matches: [
      { id: "m103", matchNumber: "M103", label: "3º Lugar", homeSlot: "L101", awaySlot: "L102", date: "18/07, 18:00 BRT", pathHint: "Perdedores das semifinais" }
    ]
  },
  {
    id: "final",
    name: "Final",
    matches: [
      { id: "m104", matchNumber: "M104", label: "Final", homeSlot: "W101", awaySlot: "W102", date: "19/07, 16:00 BRT", pathHint: "Vencedores das semifinais" }
    ]
  }
];

export const tournamentFormat = {
  teams: 48,
  groups: 12,
  teamsPerGroup: 4,
  groupAdvancement: "Top 2 de cada grupo + 8 melhores 3º",
  knockoutStart: "Fase de 32"
};
