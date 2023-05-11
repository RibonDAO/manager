import { Link } from "react-router-dom";
import { NonProfit } from "@ribon.io/shared/types";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import CopyableAddress from "components/atomics/CopyableAddress";
import * as S from "./styles";

type Props = {
  nonProfits: NonProfit[];
  searchTerm: string;
};

function NonProfitItems({ nonProfits, searchTerm }: Props) {
  function filterNonProfits(nonFilteredNonProfits: any) {
    return nonFilteredNonProfits.filter((nonProfitData: any) => {
      if (searchTerm === "") {
        return nonProfitData;
      } else if (
        nonProfitData?.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return nonProfitData;
      } else {
        return null;
      }
    });
  }

  function renderNonProfits() {
    return (
      nonProfits &&
      filterNonProfits(nonProfits).map((nonProfit: any) => (
        <tr key={nonProfit.id}>
          <th>{nonProfit?.id}</th>
          <th>{nonProfit?.name}</th>
          <th>
            <CopyableAddress text={nonProfit?.walletAddress} />
          </th>
          <th>{nonProfit?.status}</th>
          <th>
            <S.ActionsTableCell>
              <Link to={`/ngos/${nonProfit.id}`}>
                <img src={infoIcon} alt="view Non Profit info" />
              </Link>

              <Link to={`/ngos/${nonProfit.id}/edit`}>
                <img src={editIcon} alt="edit Non Profit info" />
              </Link>
            </S.ActionsTableCell>
          </th>
        </tr>
      ))
    );
  }

  return <tbody>{renderNonProfits()}</tbody>;
}

export default NonProfitItems;
