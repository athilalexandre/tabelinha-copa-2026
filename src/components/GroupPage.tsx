import { MatchList } from "@/components/MatchList";
import { StandingsTable } from "@/components/StandingsTable";
import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";
import { calculateGroupStandings } from "@/lib/tournament";
import { Flag } from "@/components/Flag";

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
            <span className="posBadge">{team.groupPosition}</span>
            <div className="teamInfo">
              <Flag name={team.name} />
              <strong>{team.name}</strong>
            </div>
            {team.qualificationNote ? <small className="qualNote">{team.qualificationNote}</small> : null}
          </li>
        ))}
      </ul>

      <StandingsTable group={group} standings={standings} />
      <MatchList group={group} scores={scores} onUpdateScore={onUpdateScore} />
    </div>
  );
}
