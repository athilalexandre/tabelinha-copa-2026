import type { Group, Standing } from "@/data/worldCup2026";
import { Flag } from "@/components/Flag";

type StandingsTableProps = {
  group: Group;
  standings?: Standing[];
};

export function StandingsTable({ group, standings = group.standings }: StandingsTableProps) {
  const teamById = new Map(group.teams.map((team) => [team.id, team]));

  return (
    <div className="tableWrap">
      <table className="standingsTable">
        <caption>Classificação</caption>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Pts</th>
            <th scope="col">P</th>
            <th scope="col">W</th>
            <th scope="col">D</th>
            <th scope="col">L</th>
            <th scope="col">GF</th>
            <th scope="col">GA</th>
            <th scope="col">GD</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => {
            const team = teamById.get(standing.teamId);
            return (
              <tr key={standing.teamId} className={index < 2 ? "directZone" : index === 2 ? "thirdZone" : undefined}>
                <th scope="row" className="teamRowHeader">
                  <span className="rankBadge">{index + 1}</span>
                  {team && <Flag name={team.name} />}
                  <span className="teamNameLabel">{team?.name}</span>
                </th>
                <td className="statPts">{standing.pts}</td>
                <td>{standing.p}</td>
                <td>{standing.w}</td>
                <td>{standing.d}</td>
                <td>{standing.l}</td>
                <td>{standing.gf}</td>
                <td>{standing.ga}</td>
                <td className="statGd">{standing.gd}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
