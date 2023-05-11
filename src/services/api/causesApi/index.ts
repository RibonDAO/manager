import { AxiosResponse } from "axios";
import { CreateCause, Cause } from "@ribon.io/shared/types";
import { apiPost, apiPut, apiGetWithParams, apiGet } from "..";

type CausesParams = {
  perPage?: number;
  page?: number;
};

const causesApi = {
  getCausesList: ({
    perPage = 10,
    page = 3,
  }: CausesParams): Promise<AxiosResponse<Cause[]>> =>
    apiGetWithParams("causes", {
      per_page: perPage,
      page,
    }),
  getCause: (id: any): Promise<AxiosResponse<Cause>> => apiGet(`causes/${id}`),
  createCause: (data: any): Promise<AxiosResponse<CreateCause>> =>
    apiPost("causes", data),
  updateCause: (id: any, data: CreateCause): Promise<AxiosResponse<Cause>> =>
    apiPut(`causes/${id}`, data),
};

export default causesApi;
