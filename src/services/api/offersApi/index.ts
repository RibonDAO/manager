import { AxiosResponse } from "axios";
import { Offer } from "@ribon.io/shared/types";
import { apiGet, apiGetWithParams, apiPost, apiPut } from "..";

type OffersParams = {
  perPage?: number;
  page?: number;
};

const offersApi = {
  getOffersList: ({
    perPage = 10,
    page = 3,
  }: OffersParams): Promise<AxiosResponse<Offer[]>> =>
    apiGetWithParams("givings/offers_manager", {
      params: {
        per_page: perPage,
        page,
      },
    }),

  getOffer: (id: any): Promise<AxiosResponse<Offer>> =>
    apiGet(`givings/offers/${id}`),

  createOffer: (data: any): Promise<AxiosResponse<Offer>> =>
    apiPost("givings/offers", data),
  updateOffer: (id: any, data: Offer): Promise<AxiosResponse<Offer>> =>
    apiPut(`givings/offers/${id}`, data),
};

export default offersApi;
