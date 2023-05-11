import { AxiosResponse } from "axios";
import { Integration } from "@ribon.io/shared/types";
import { apiGet, apiPost, apiPut } from "..";

const integrationsApi = {
  getIntegrationsList: (): Promise<AxiosResponse<Integration>> =>
    apiGet("integrations"),
  getMobilityAttributes: (): Promise<AxiosResponse<string[]>> =>
    apiGet("integrations_mobility_attributes"),
  getIntegration: (id: any): Promise<AxiosResponse<Integration>> =>
    apiGet(`integrations/${id}`),
  createIntegration: (data: any): Promise<AxiosResponse<Integration>> =>
    apiPost("integrations", data),
  updateIntegration: (
    id: any,
    data: Integration,
  ): Promise<AxiosResponse<Integration>> => apiPut(`integrations/${id}`, data),
};

export default integrationsApi;
