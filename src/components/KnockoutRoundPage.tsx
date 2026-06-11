import type { ScoreMap } from "@/components/BookletApp";
import type { Group, KnockoutRound } from "@/data/worldCup2026";
import { resolveKnockoutSlot } from "@/lib/tournament";

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
                <strong>{match.matchNumber}</strong>
                <span>{match.label}</span>
                <small>{match.date}</small>
              </div>
              <div className="knockoutScoreLine">
                <TeamSlot label={home.label} flag={home.team?.flag} />
                <label>
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
                <strong>x</strong>
                <label>
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
                <TeamSlot label={away.label} flag={away.team?.flag} align="right" />
              </div>
              {match.pathHint ? <em>{match.pathHint}</em> : null}
            </div>
          );
        })}
      </div>

      <p className="finePrint">
        Slots 1/2/3 são preenchidos quando os grupos terminam. W/L avançam quando o placar do mata-mata tem vencedor.
      </p>
    </div>
  );
}

function TeamSlot({ label, flag, align = "left" }: { label: string; flag?: string; align?: "left" | "right" }) {
  return (
    <span className={`teamSlot ${align === "right" ? "alignRight" : ""}`}>
      {flag ? <b aria-hidden="true">{flag}</b> : null}
      {label}
    </span>
  );
}
