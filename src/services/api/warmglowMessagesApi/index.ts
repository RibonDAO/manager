import { AxiosResponse } from "axios";

import WarmglowMessage from "types/entities/WarmglowMessage";
import { apiGet, apiGetWithParams } from "..";

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
};

export default warmglowMessagesApi;
