import { AxiosResponse } from "axios";
import { Pool } from "@ribon.io/shared/types";
import { apiGet } from "..";

const poolsApi = {
  getPools: (): Promise<AxiosResponse<Pool[]>> =>
    apiGet("manager/pools_manager"),
};

export default poolsApi;
