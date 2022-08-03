import integrationsApi from "services/api/integrationsApi";
import Integration from "types/entities/Integration";

function useApiIntegrations() {
  async function getAllApiIntegrations() {
    const { data: integrations } = await integrationsApi.getIntegrationsList();

    return integrations;
  }

  async function getApiIntegration(id: any) {
    const { data: integration } = await integrationsApi.getIntegration(id);

    return integration;
  }

  async function updateApiIntegration(id: any, data: Integration) {
    const { data: integration } = await integrationsApi.updateIntegration(id, data);

    return integration;
  }

  return {
    getAllApiIntegrations,
    getApiIntegration,
    updateApiIntegration
  };
}

export default useApiIntegrations;
