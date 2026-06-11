import type { Group, GroupId, KnockoutMatch, KnockoutRound, Standing, Team } from "@/data/worldCup2026";

export type TournamentScoreMap = Record<string, { home: string; away: string }>;

export type ResolvedTeam = Team & {
  groupId: GroupId;
  rank?: number;
  standing?: Standing;
};

export type ResolvedSlot = {
  label: string;
  team?: ResolvedTeam;
};

export function calculateGroupStandings(group: Group, scores: TournamentScoreMap): Standing[] {
  const teamOrder = new Map(group.teams.map((team, index) => [team.id, index]));
  const standingsByTeam = new Map<string, Standing>(
    group.teams.map((team) => [
      team.id,
      {
        teamId: team.id,
        pts: 0,
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0
      }
    ])
  );

  for (const match of group.matches) {
    const parsed = parseScore(scores[match.id]);
    if (!parsed) {
      continue;
    }

    const homeStanding = standingsByTeam.get(match.homeTeamId);
    const awayStanding = standingsByTeam.get(match.awayTeamId);
    if (!homeStanding || !awayStanding) {
      continue;
    }

    homeStanding.p += 1;
    awayStanding.p += 1;
    homeStanding.gf += parsed.home;
    homeStanding.ga += parsed.away;
    awayStanding.gf += parsed.away;
    awayStanding.ga += parsed.home;

    if (parsed.home > parsed.away) {
      homeStanding.w += 1;
      homeStanding.pts += 3;
      awayStanding.l += 1;
    } else if (parsed.home < parsed.away) {
      awayStanding.w += 1;
      awayStanding.pts += 3;
      homeStanding.l += 1;
    } else {
      homeStanding.d += 1;
      awayStanding.d += 1;
      homeStanding.pts += 1;
      awayStanding.pts += 1;
    }
  }

  return Array.from(standingsByTeam.values())
    .map((standing) => ({
      ...standing,
      gd: standing.gf - standing.ga
    }))
    .sort((a, b) => {
      return (
        b.pts - a.pts ||
        b.gd - a.gd ||
        b.gf - a.gf ||
        (teamOrder.get(a.teamId) ?? 0) - (teamOrder.get(b.teamId) ?? 0)
      );
    });
}

export function isGroupComplete(group: Group, scores: TournamentScoreMap) {
  return group.matches.every((match) => Boolean(parseScore(scores[match.id])));
}

export function getThirdPlaceRanking(groups: Group[], scores: TournamentScoreMap): ResolvedTeam[] {
  const ranking: ResolvedTeam[] = [];

  for (const group of groups) {
    const standing = calculateGroupStandings(group, scores)[2];
    const team = group.teams.find((item) => item.id === standing?.teamId);
    if (team && standing) {
      ranking.push({
        ...team,
        groupId: group.id,
        rank: 3,
        standing
      });
    }
  }

  return ranking.sort((a, b) => {
    return (
      (b.standing?.pts ?? 0) - (a.standing?.pts ?? 0) ||
      (b.standing?.gd ?? 0) - (a.standing?.gd ?? 0) ||
      (b.standing?.gf ?? 0) - (a.standing?.gf ?? 0) ||
      a.groupId.localeCompare(b.groupId)
    );
  });
}

export function resolveKnockoutSlot(
  slot: string,
  groups: Group[],
  rounds: KnockoutRound[],
  scores: TournamentScoreMap
): ResolvedSlot {
  const positionSlot = slot.match(/^([123])([A-L])$/);
  if (positionSlot) {
    const [, rankValue, groupId] = positionSlot;
    return resolveGroupPosition(Number(rankValue), groupId as GroupId, groups, scores) ?? { label: slot };
  }

  const thirdSlot = slot.match(/^3([A-L](?:\/[A-L])+)$/);
  if (thirdSlot) {
    const allowedGroups = thirdSlot[1].split("/") as GroupId[];
    const thirdTeam = getBestThirds(groups, scores).find((candidate) => allowedGroups.includes(candidate.groupId));
    return thirdTeam ? { label: thirdTeam.name, team: thirdTeam } : { label: slot };
  }

  const resultSlot = slot.match(/^([WL])(\d+)$/);
  if (resultSlot) {
    const [, kind, matchNumber] = resultSlot;
    return resolveKnockoutResult(kind as "W" | "L", matchNumber, groups, rounds, scores) ?? { label: slot };
  }

  return { label: slot };
}

function resolveGroupPosition(rank: number, groupId: GroupId, groups: Group[], scores: TournamentScoreMap): ResolvedSlot | undefined {
  const group = groups.find((item) => item.id === groupId);
  if (!group || !isGroupComplete(group, scores)) {
    return undefined;
  }

  const standing = calculateGroupStandings(group, scores)[rank - 1];
  const team = group.teams.find((item) => item.id === standing?.teamId);
  if (!team || !standing) {
    return undefined;
  }

  return {
    label: team.name,
    team: {
      ...team,
      groupId,
      rank,
      standing
    }
  };
}

function getBestThirds(groups: Group[], scores: TournamentScoreMap): ResolvedTeam[] {
  if (!groups.every((group) => isGroupComplete(group, scores))) {
    return [];
  }

  return getThirdPlaceRanking(groups, scores).slice(0, 8);
}

function resolveKnockoutResult(
  kind: "W" | "L",
  matchNumber: string,
  groups: Group[],
  rounds: KnockoutRound[],
  scores: TournamentScoreMap
): ResolvedSlot | undefined {
  const match = findKnockoutMatch(rounds, `M${matchNumber}`);
  if (!match) {
    return undefined;
  }

  const parsed = parseScore(scores[match.id]);
  if (!parsed || parsed.home === parsed.away) {
    return undefined;
  }

  const home = resolveKnockoutSlot(match.homeSlot, groups, rounds, scores);
  const away = resolveKnockoutSlot(match.awaySlot, groups, rounds, scores);
  const homeWins = parsed.home > parsed.away;
  const selected = kind === "W" ? (homeWins ? home : away) : homeWins ? away : home;

  return selected.team ? selected : undefined;
}

function findKnockoutMatch(rounds: KnockoutRound[], matchNumber: string): KnockoutMatch | undefined {
  for (const round of rounds) {
    const match = round.matches.find((item) => item.matchNumber === matchNumber);
    if (match) {
      return match;
    }
  }

  return undefined;
}

function parseScore(score: { home: string; away: string } | undefined) {
  if (!score || score.home === "" || score.away === "") {
    return undefined;
  }

  const home = Number.parseInt(score.home, 10);
  const away = Number.parseInt(score.away, 10);

  if (Number.isNaN(home) || Number.isNaN(away)) {
    return undefined;
  }

  return { home, away };
}
