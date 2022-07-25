import { useTranslation } from "react-i18next";
import { Grid } from "@chakra-ui/react";
import IntegrationCard from "assets/atomics/Cards/IntegrationCard";
import { useCallback, useEffect, useState } from "react";
import useIntegrations from "hooks/apiTheGraphHooks/useIntegrations";
import useApiIntegrations from "hooks/apiHooks/useApiIntegrations";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";
import { logError } from "services/crashReport";
import { useContract } from "hooks/useContract";
import { useNetwork } from "hooks/useNetwork";
import RibonAbi from "utils/abis/RibonAbi.json";

function IntegrationsSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.treasureDashboard.integrationsSection",
  });
  const { currentNetwork } = useNetwork();
  const { getAllIntegrations } = useIntegrations();
  const { getAllApiIntegrations } = useApiIntegrations();
  const [apiIntegrations, setApiIntegrations] = useState<any>([]);
  const [blockchainIntegrations, setBlockchainIntegrations] = useState<any[]>([]);

  const contract = useContract({
    address: currentNetwork.ribonContractAddress,
    ABI: RibonAbi.abi,
  });

  const fetchApiIntegrations = useCallback(async () => {
    try {
      const integrations = await getAllApiIntegrations();
      setApiIntegrations(integrations);
    } catch (e) {
      logError(e);
    }
  }, [apiIntegrations]);

  useEffect(() => {
    fetchApiIntegrations();
  }, []);

  const fetchBlockchainIntegrations = useCallback(async () => {
    try {
      const integrations = await getAllIntegrations();
      setBlockchainIntegrations(integrations.integrations);
    } catch (e) {
      logError(e);
    }
  }, [getAllIntegrations]);

  useEffect(() => {
    fetchBlockchainIntegrations();

    contract?.on("PoolBalanceIncreased", () => {
      fetchBlockchainIntegrations();
    });
  }, []);

  function getIntegrationName(id: any): string {
    const integration = apiIntegrations.find((item: any) => item?.walletAddress.toLowerCase() === id.toString().toLowerCase());
    return integration.name;
  }

  return (
    <Grid
      maxH="600px"
      marginLeft="264px"
      overflowY="auto"
      fontFamily="Inter"
      templateColumns="repeat(4, 176px)"
      gridAutoRows="max-content"
      gap="8px"
    >
      {blockchainIntegrations
        .sort((a, b) => b.balance - a.balance)
        .reverse()
        .map((integration) => (
          <IntegrationCard
            key={integration.id}
            title={getIntegrationName(integration.id)}
            subtitle={t("subtitle")}
            value={formatFromWei(integration.balance)}
          />
        ))}
    </Grid>
  );
}
export default IntegrationsSection;