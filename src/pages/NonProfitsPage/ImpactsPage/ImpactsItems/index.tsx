import dateFormatter from "lib/dateFormatter";
import { NonProfitImpact } from "@ribon.io/shared/types";

type Props = {
  impacts: NonProfitImpact[];
  searchTerm: string;
};

function ImpactsItems({ impacts, searchTerm }: Props) {
  function filterImpacts(nonFilteredImpacts: NonProfitImpact[]) {
    return nonFilteredImpacts.filter((impactData: NonProfitImpact) => {
      if (searchTerm === "") {
        return impactData;
      } else if (impactData?.id?.toString().includes(searchTerm)) {
        return impactData;
      } else {
        return null;
      }
    });
  }

  function renderImpacts() {
    return (
      impacts &&
      filterImpacts(impacts).map((impact: NonProfitImpact) => (
        <tr key={impact?.id}>
          <th>{impact?.id}</th>
          <th>{impact?.usdCentsToOneImpactUnit}</th>
          <th>{dateFormatter(impact?.startDate)}</th>
          <th>{dateFormatter(impact?.endDate)}</th>
        </tr>
      ))
    );
  }

  return <tbody>{renderImpacts()}</tbody>;
}

export default ImpactsItems;
