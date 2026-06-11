import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";

type MatchListProps = {
  group: Group;
  scores: ScoreMap;
  onUpdateScore: (matchId: string, side: "home" | "away", value: string) => void;
};

export function MatchList({ group, scores, onUpdateScore }: MatchListProps) {
  const teamById = new Map(group.teams.map((team) => [team.id, team]));

  return (
    <div className="matchList">
      <h3>Jogos</h3>
      {group.matches.map((match) => {
        const homeTeam = teamById.get(match.homeTeamId);
        const awayTeam = teamById.get(match.awayTeamId);

        return (
          <div className="matchRow" key={match.id}>
            <div className="matchMeta">
              <span>{match.label}</span>
              <small>{match.date}</small>
            </div>
            <div className="scoreLine">
              <span>
                <b aria-hidden="true">{homeTeam?.flag}</b>
                {homeTeam?.name}
              </span>
              <label>
                <span className="srOnly">Gols de {homeTeam?.name}</span>
                <input
                  inputMode="numeric"
                  min="0"
                  pattern="[0-9]*"
                  value={scores[match.id]?.home ?? ""}
                  onChange={(event) => onUpdateScore(match.id, "home", event.target.value)}
                  aria-label={`Placar de ${homeTeam?.name}`}
                />
              </label>
              <strong>x</strong>
              <label>
                <span className="srOnly">Gols de {awayTeam?.name}</span>
                <input
                  inputMode="numeric"
                  min="0"
                  pattern="[0-9]*"
                  value={scores[match.id]?.away ?? ""}
                  onChange={(event) => onUpdateScore(match.id, "away", event.target.value)}
                  aria-label={`Placar de ${awayTeam?.name}`}
                />
              </label>
              <span>
                <b aria-hidden="true">{awayTeam?.flag}</b>
                {awayTeam?.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
