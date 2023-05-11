import { Link } from "react-router-dom";
import { Cause, Pool } from "@ribon.io/shared/types";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import CopyableAddress from "components/atomics/CopyableAddress";
import { useCallback, useEffect, useState } from "react";
import usePools from "hooks/apiHooks/usePools";
import { logError } from "services/crashReport";
import * as S from "./styles";

type Props = {
  causes: Cause[];
  searchTerm: string;
};

function CauseItems({ causes, searchTerm }: Props) {
  const { getPools } = usePools();

  const [pools, setPools] = useState<Pool[]>();

  function filterCauses(nonFilteredCauses: Cause[]) {
    return nonFilteredCauses.filter((causeData: Cause) => {
      if (searchTerm === "") {
        return causeData;
      } else if (
        causeData?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return causeData;
      } else {
        return null;
      }
    });
  }

  const fetchApiPools = useCallback(async () => {
    try {
      const apiPools = await getPools();
      setPools(apiPools);
    } catch (e) {
      logError(e);
    }
  }, [pools]);

  useEffect(() => {
    fetchApiPools();
  }, []);

  const handleBalance = (address: string) => {
    const pool = pools?.find(
      (p) => p.address.toLowerCase() === address.toLowerCase(),
    );
    if (pool) {
      return pool.poolBalance?.balance || 0;
    }
    return 0;
  };

  function renderCauses() {
    return (
      causes &&
      filterCauses(causes).map((cause: Cause) => (
        <tr key={cause.id}>
          <th>{cause?.name}</th>
          <th>{cause?.pools.length ? cause?.pools[0].token.name : "-"}</th>
          <th>
            {handleBalance(cause?.pools.length ? cause?.pools[0].address : "-")}
          </th>
          <th>
            <CopyableAddress
              text={cause?.pools.length ? cause?.pools[0].address : "-"}
            />
          </th>
          <th>
            <S.ActionsTableCell>
              <Link to={`/causes/${cause.id}`}>
                <img src={infoIcon} alt="view cause info" />
              </Link>

              <Link to={`/causes/${cause.id}/edit`}>
                <img src={editIcon} alt="edit cause info" />
              </Link>
            </S.ActionsTableCell>
          </th>
        </tr>
      ))
    );
  }

  return <tbody>{renderCauses()}</tbody>;
}

export default CauseItems;
