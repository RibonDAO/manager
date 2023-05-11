import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import useCauses from "hooks/apiHooks/useCauses";
import usePools from "hooks/apiHooks/usePools";
import { Pool, Cause } from "@ribon.io/shared/types";
import CardTextGraph from "./CardTextGraph";
import * as S from "./styles";
import WalletCard from "./WalletCard";

function TreasureSection(): JSX.Element {
  const [causes, setCauses] = useState<Cause[]>([]);
  const { getPools } = usePools();
  const [pools, setPools] = useState<Pool[]>([]);
  const { getCauses } = useCauses();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.treasureDashboard.treasureSection",
  });

  const fetchCauses = async () => {
    try {
      const allCauses = await getCauses();
      setCauses(allCauses);
    } catch (e) {
      logError(e);
    }
  };

  const fetchPools = async () => {
    try {
      const poolsData = await getPools();
      setPools(poolsData);
    } catch (e) {
      logError(e);
    }
  };

  const assignedAmount = pools.reduce((acc, curr) => {
    if (curr.poolBalance && curr.poolBalance.balance) {
      return acc + Number(curr.poolBalance.balance);
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    fetchCauses();
    fetchPools();
  }, []);

  return (
    <S.Container>
      <CardTextGraph
        causes={causes}
        pools={pools}
        title={t("mainText")}
        leftText={t("causesTitle")}
        treasureBalance={assignedAmount}
      />
      <WalletCard />
    </S.Container>
  );
}

export default TreasureSection;
