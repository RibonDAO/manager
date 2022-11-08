import React, { useEffect, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNetwork } from "hooks/useNetwork";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import RibonAbi from "utils/abis/RibonAbi.json";
import { logError } from "services/crashReport";
import useContractBalance from "hooks/apiHooks/useContractBalance";
import useIntegrations from "hooks/apiTheGraphHooks/useIntegrations";
import { useContract } from "hooks/useContract";
import useTokenDecimals from "hooks/useTokenDecimals";
import { formatFromDecimals } from "lib/web3Helpers/etherFormatters";
import theme from "styles/theme";
import CardTextGraph from "components/moleculars/cards/CardTextGraph";
import * as S from "./styles";

function TreasureSection(): JSX.Element {
  const [assignedValue, setAssignedValue] = useState<number>(0);
  const { currentNetwork } = useNetwork();
  const { getAllIntegrations } = useIntegrations();
  const { tokenDecimals } = useTokenDecimals();
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
    currentNetwork.defaultPoolAddress,
  );

  const fetchAssignedBalance = useCallback(async () => {
    try {
      const allIntegrations = await getAllIntegrations();
      const assignedAmount = allIntegrations.integrations
        .map((item: any) => formatFromDecimals(item.balance, tokenDecimals))
        .reduce((prev: any, curr: any) => prev + curr, 0);
      setAssignedValue(assignedAmount);
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

    const labels = [
      "Enterpreneurship",
      "Sustentability",
      "Education",
      "Health Care",
      "Animals",
    ];

    const data = {
      labels,
      datasets: [
        {
          data: labels.map(() => Math.random() * 100),
          backgroundColor: theme.colors.green30,
          borderColor: theme.colors.green30,
          label: "Causes",
          borderRadius: 4,
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
        mainText={contractBalance.toFixed(2)}
        leftText={t("causesTitle")}
        rightSecondaryText={assignedValue.toFixed(2)}
      />
    </S.Container>
  );
}

export default TreasureSection;
