import { AxiosResponse } from "axios";
import { NonProfit, CreateNonProfit } from "@ribon.io/shared/types";
import { apiGet, apiGetWithParams, apiPost, apiPut } from "..";

type NonProfitsParams = {
  perPage?: number;
  page?: number;
};

const nonProfitsApi = {
  getNonProfitsList: ({
    perPage = 10,
    page = 1,
  }: NonProfitsParams): Promise<AxiosResponse<NonProfit[]>> =>
    apiGetWithParams("non_profits", {
      params: {
        per_page: perPage,
        page,
      },
    }),

  getNonProfit: (id: string): Promise<AxiosResponse<NonProfit>> =>
    apiGet(`non_profits/${id}`),

  createNonProfit: (data: CreateNonProfit): Promise<AxiosResponse<NonProfit>> =>
    apiPost("non_profits", data),

  updateNonProfit: (
    id: any,
    data: CreateNonProfit,
  ): Promise<AxiosResponse<NonProfit>> => apiPut(`non_profits/${id}`, data),
};

export default nonProfitsApi;
