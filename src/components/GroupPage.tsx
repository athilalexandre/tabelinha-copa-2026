import { MatchList } from "@/components/MatchList";
import { StandingsTable } from "@/components/StandingsTable";
import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";
import { calculateGroupStandings } from "@/lib/tournament";

type GroupPageProps = {
  group: Group;
  scores: ScoreMap;
  onUpdateScore: (matchId: string, side: "home" | "away", value: string) => void;
};

export function GroupPage({ group, scores, onUpdateScore }: GroupPageProps) {
  const standings = calculateGroupStandings(group, scores);

  return (
    <div className="groupPage">
      <header className="pageHeader">
        <span>{group.id}</span>
        <h2>{group.name}</h2>
      </header>

      <ul className="teamList" aria-label={`Times do ${group.name}`}>
        {group.teams.map((team) => (
          <li key={team.id}>
            <span>{team.groupPosition}</span>
            <strong>
              <b aria-hidden="true">{team.flag}</b>
              {team.name}
            </strong>
            {team.qualificationNote ? <small>{team.qualificationNote}</small> : null}
          </li>
        ))}
      </ul>

      <StandingsTable group={group} standings={standings} />
      <MatchList group={group} scores={scores} onUpdateScore={onUpdateScore} />
    </div>
  );
}
