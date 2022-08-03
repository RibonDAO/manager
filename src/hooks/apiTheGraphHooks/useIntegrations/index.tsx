import integrationsApi from "services/apiTheGraph/integrationsApi";

function useIntegrations() {
  async function getAllIntegrations() {
    const { data: integrations } = await integrationsApi.fetchAllIntegrations();
    return integrations;
  }
  return { getAllIntegrations };
}

export default useIntegrations;
