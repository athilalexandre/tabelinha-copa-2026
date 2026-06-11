import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";
import { Flag } from "@/components/Flag";

type MatchListProps = {
  group: Group;
  scores: ScoreMap;
  onUpdateScore: (matchId: string, side: "home" | "away", value: string) => void;
};

export function MatchList({ group, scores, onUpdateScore }: MatchListProps) {
  const teamById = new Map(group.teams.map((team) => [team.id, team]));

  return (
    <div className="matchList">
      <h3>Jogos do Grupo</h3>
      <div className="matchesGrid">
        {group.matches.map((match) => {
          const homeTeam = teamById.get(match.homeTeamId);
          const awayTeam = teamById.get(match.awayTeamId);

          return (
            <div className="matchRow" key={match.id}>
              <div className="matchMeta">
                <span className="matchLabel">{match.label}</span>
                <small className="matchDate">{match.date}</small>
              </div>
              <div className="scoreLine">
                <div className="teamSide home">
                  <span className="teamName">{homeTeam?.name}</span>
                  {homeTeam && <Flag name={homeTeam.name} />}
                </div>

                <div className="scoreInputs">
                  <label className="scoreInputWrapper">
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
                  <strong className="vsDivider">x</strong>
                  <label className="scoreInputWrapper">
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
                </div>

                <div className="teamSide away">
                  {awayTeam && <Flag name={awayTeam.name} />}
                  <span className="teamName">{awayTeam?.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
