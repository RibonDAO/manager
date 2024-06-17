import { AxiosResponse } from "axios";

import WarmglowMessage from "types/entities/WarmglowMessage";
import { apiGet, apiGetWithParams, apiPost, apiPut } from "..";

type warmglowMessagesParams = {
  perPage?: number;
  page?: number;
};

const warmglowMessagesApi = {
  getWarmglowMessages: ({
    perPage = 10,
    page = 3,
  }: warmglowMessagesParams): Promise<AxiosResponse<WarmglowMessage[]>> =>
    apiGetWithParams("warmglow_messages", {
      params: {
        per_page: perPage,
        page,
      },
    }),

  getWarmglowMessage: (id: any): Promise<AxiosResponse<WarmglowMessage>> =>
    apiGet(`warmglow_messages/${id}`),
  createWarmglowMessage: (data: any): Promise<AxiosResponse<WarmglowMessage>> =>
    apiPost("warmglow_messages", data),
  updateWarmglowMessage: (
    id: any,
    data: WarmglowMessage,
  ): Promise<AxiosResponse<WarmglowMessage>> =>
    apiPut(`warmglow_messages/${id}`, data),
};

export default warmglowMessagesApi;
