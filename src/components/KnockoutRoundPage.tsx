import type { ScoreMap } from "@/components/BookletApp";
import type { Group, KnockoutRound } from "@/data/worldCup2026";
import { resolveKnockoutSlot } from "@/lib/tournament";
import { Flag } from "@/components/Flag";

type KnockoutRoundPageProps = {
  round: KnockoutRound;
  rounds: KnockoutRound[];
  groups: Group[];
  scores: ScoreMap;
  onUpdateScore: (matchId: string, side: "home" | "away", value: string) => void;
};

export function KnockoutRoundPage({ round, rounds, groups, scores, onUpdateScore }: KnockoutRoundPageProps) {
  return (
    <div className="knockoutPage">
      <header className="pageHeader">
        <span>KO</span>
        <h2>{round.name}</h2>
      </header>

      <div className="bracketList">
        {round.matches.map((match) => {
          const home = resolveKnockoutSlot(match.homeSlot, groups, rounds, scores);
          const away = resolveKnockoutSlot(match.awaySlot, groups, rounds, scores);

          return (
            <div className="bracketMatch" key={match.id}>
              <div className="bracketMeta">
                <strong className="matchNumber">{match.matchNumber}</strong>
                <span className="matchLabel">{match.label}</span>
                <small className="matchDate">{match.date}</small>
              </div>
              <div className="knockoutScoreLine">
                <TeamSlot label={home.label} teamName={home.team?.name} align="left" />
                
                <div className="scoreInputs">
                  <label className="scoreInputWrapper">
                    <span className="srOnly">Gols de {home.label}</span>
                    <input
                      inputMode="numeric"
                      min="0"
                      pattern="[0-9]*"
                      value={scores[match.id]?.home ?? ""}
                      onChange={(event) => onUpdateScore(match.id, "home", event.target.value)}
                      aria-label={`Placar de ${home.label}`}
                    />
                  </label>
                  <strong className="vsDivider">x</strong>
                  <label className="scoreInputWrapper">
                    <span className="srOnly">Gols de {away.label}</span>
                    <input
                      inputMode="numeric"
                      min="0"
                      pattern="[0-9]*"
                      value={scores[match.id]?.away ?? ""}
                      onChange={(event) => onUpdateScore(match.id, "away", event.target.value)}
                      aria-label={`Placar de ${away.label}`}
                    />
                  </label>
                </div>

                <TeamSlot label={away.label} teamName={away.team?.name} align="right" />
              </div>
              {match.pathHint ? <em className="pathHint">{match.pathHint}</em> : null}
            </div>
          );
        })}
      </div>

      <p className="finePrint">
        Os slots (ex: 2A, 1E) são preenchidos automaticamente conforme as partidas da fase de grupos terminam. W (Winner) e L (Loser) avançam quando a partida tem um vencedor definido.
      </p>
    </div>
  );
}

function TeamSlot({ label, teamName, align = "left" }: { label: string; teamName?: string; align?: "left" | "right" }) {
  const isPlaceholder = !teamName;
  return (
    <div className={`teamSide ${align === "right" ? "away" : "home"} ${isPlaceholder ? "isPlaceholderSlot" : ""}`}>
      {align === "left" && <span className="teamName">{label}</span>}
      {teamName ? (
        <Flag name={teamName} />
      ) : (
        <span className="placeholderLabel">({label})</span>
      )}
      {align === "right" && <span className="teamName">{label}</span>}
    </div>
  );
}
