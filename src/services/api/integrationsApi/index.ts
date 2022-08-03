import { AxiosResponse } from "axios";
import Integration from "types/entities/Integration";
import { apiGet, apiPut } from "..";

const integrationsApi = {
  getIntegrationsList: (): Promise<AxiosResponse<Integration>> =>
    apiGet("integrations"),
  getIntegration: (id: any): Promise<AxiosResponse<Integration>> =>
    apiGet(`integrations/${id}`),
  updateIntegration: (id: any, data: Integration): Promise<AxiosResponse<Integration>> =>
    apiPut(`integrations/${id}`, data),
};

export default integrationsApi;
