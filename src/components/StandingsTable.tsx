import type { Group, Standing } from "@/data/worldCup2026";

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
          {standings.map((standing, index) => (
            <tr key={standing.teamId} className={index < 2 ? "directZone" : index === 2 ? "thirdZone" : undefined}>
              <th scope="row">
                <span className="rankBadge">{index + 1}</span>
                <span className="teamFlag" aria-hidden="true">
                  {teamById.get(standing.teamId)?.flag}
                </span>
                {teamById.get(standing.teamId)?.name}
              </th>
              <td>{standing.pts}</td>
              <td>{standing.p}</td>
              <td>{standing.w}</td>
              <td>{standing.d}</td>
              <td>{standing.l}</td>
              <td>{standing.gf}</td>
              <td>{standing.ga}</td>
              <td>{standing.gd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
