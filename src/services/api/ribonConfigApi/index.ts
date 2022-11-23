import { AxiosResponse } from "axios";
import { RibonConfig } from "types/entities/RibonConfig";
import { apiGet, apiPut } from "..";

const ribonConfigApi = {
  getConfig: (): Promise<AxiosResponse<RibonConfig[]>> =>
    apiGet("configs/settings"),

  updateConfig: (
    id: any,
    data: RibonConfig,
  ): Promise<AxiosResponse<RibonConfig>> =>
    apiPut(`configs/settings/${id}`, data),
};

export default ribonConfigApi;
