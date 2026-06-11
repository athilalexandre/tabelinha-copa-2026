import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";
import { getThirdPlaceRanking, isGroupComplete } from "@/lib/tournament";

type BestThirdPlacePageProps = {
  groups: Group[];
  scores: ScoreMap;
};

export function BestThirdPlacePage({ groups, scores }: BestThirdPlacePageProps) {
  const ranking = getThirdPlaceRanking(groups, scores);
  const allGroupsComplete = groups.every((group) => isGroupComplete(group, scores));

  return (
    <div className="bestThirdPage">
      <header className="pageHeader">
        <span>3</span>
        <h2>Melhores 3º</h2>
      </header>

      <div className="tableWrap">
        <table className="standingsTable">
          <caption>Ranking dos melhores 3º</caption>
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Pts</th>
              <th scope="col">P</th>
              <th scope="col">GD</th>
              <th scope="col">GF</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((team, index) => (
              <tr key={team.id} className={index < 8 && allGroupsComplete ? "directZone" : undefined}>
                <th scope="row">
                  <span className="rankBadge">{index + 1}</span>
                  <span className="teamFlag" aria-hidden="true">
                    {team.flag}
                  </span>
                  {team.name}
                  <small className="groupMarker">Grupo {team.groupId}</small>
                </th>
                <td>{team.standing?.pts ?? 0}</td>
                <td>{team.standing?.p ?? 0}</td>
                <td>{team.standing?.gd ?? 0}</td>
                <td>{team.standing?.gf ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="finePrint">
        {allGroupsComplete
          ? "Os oito primeiros avançam para a Fase de 32."
          : "Complete todos os placares da fase de grupos para travar os oito melhores 3º."}
      </p>
    </div>
  );
}
