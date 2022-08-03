import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNetwork } from "hooks/useNetwork";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import RibonAbi from "utils/abis/RibonAbi.json";
import { logError } from "services/crashReport";
import useContractBalance from "hooks/apiHooks/useContractBalance";
import useIntegrations from "hooks/apiTheGraphHooks/useIntegrations";
import { useContract } from "hooks/useContract";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import theme from "styles/theme";
import CardTextGraph from "components/moleculars/cards/CardTextGraph";
import * as S from "./styles";

function TreasureSection(): JSX.Element {
  const [assignedValue, setAssignedValue] = useState<number>(0);
  const [unassignedValue, setUnassignedValue] = useState<number>(0);
  const { currentNetwork } = useNetwork();
  const { getAllIntegrations } = useIntegrations();

  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.treasureDashboard.treasureSection",
  });

  const donationTokenContract = useContract({
    address: currentNetwork.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
  });

  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });

  const { contractBalance, refetch: fetchContractBalance } = useContractBalance(
    donationTokenContract,
    currentNetwork.ribonContractAddress,
  );

  const fetchAssignedBalance = useCallback(async () => {
    try {
      const allIntegrations = await getAllIntegrations();
      const assignedAmount = allIntegrations.integrations
        .map((item: any) => parseFloat(formatFromWei(item.balance)))
        .reduce((prev: any, curr: any) => prev + curr, 0);
      setAssignedValue(assignedAmount);
      if (contractBalance) {
        setUnassignedValue(parseFloat(contractBalance) - assignedValue);
      }
    } catch (e) {
      logError(e);
    }
  }, [contractBalance, getAllIntegrations]);

  useEffect(() => {
    contract?.on("PoolBalanceIncreased", () => {
      fetchContractBalance();
    });
  }, []);

  function renderGraph() {
    fetchAssignedBalance();
    const data = {
      datasets: [
        {
          data: [assignedValue, unassignedValue],
          backgroundColor: [theme.colors.ribonBlue, theme.colors.lightGray],
          borderColor: [theme.colors.ribonBlue, theme.colors.lightGray],
        },
      ],
    };
    return data;
  }

  return (
    <S.Container>
      <CardTextGraph
        data={renderGraph()}
        title={t("mainText")}
        mainText={contractBalance}
        rightText={t("assignedText")}
        leftText={t("unassignedText")}
        rightSecondaryText={assignedValue}
        leftSecondaryText={unassignedValue.toFixed(2)}
      />
    </S.Container>
  );
}

export default TreasureSection;
