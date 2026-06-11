import type { ScoreMap } from "@/components/BookletApp";
import type { Group } from "@/data/worldCup2026";
import { getThirdPlaceRanking, isGroupComplete } from "@/lib/tournament";
import { Flag } from "@/components/Flag";

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
        <h2>Melhores 3º Colocados</h2>
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
                <th scope="row" className="teamRowHeader">
                  <span className="rankBadge">{index + 1}</span>
                  <Flag name={team.name} />
                  <div className="teamInfoWrapper">
                    <span className="teamNameLabel">{team.name}</span>
                    <small className="groupMarker">Grupo {team.groupId}</small>
                  </div>
                </th>
                <td className="statPts">{team.standing?.pts ?? 0}</td>
                <td>{team.standing?.p ?? 0}</td>
                <td className="statGd">{team.standing?.gd ?? 0}</td>
                <td>{team.standing?.gf ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="finePrint">
        {allGroupsComplete
          ? "Os 8 melhores terceiros colocados avançam para a Fase de 32."
          : "Complete todos os placares da fase de grupos para travar a classificação final dos terceiros colocados."}
      </p>
    </div>
  );
}
