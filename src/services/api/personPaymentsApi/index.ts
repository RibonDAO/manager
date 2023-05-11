import { AxiosResponse } from "axios";
import { CreateBigDonation, BigDonation, PersonPayment } from "@ribon.io/shared/types";
import { apiGet, apiGetWithParams, apiPost } from "..";

type PersonPaymentsParams = {
  perPage?: number;
  page?: number;
};

const personPaymentsApi = {
  getPersonPaymentsList: ({
    perPage = 10,
    page = 3,
  }: PersonPaymentsParams): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGetWithParams("person_payments", {
      params: {
        per_page: perPage,
        page,
      },
    }),

  getBigDonorsPayments: (): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet("person_payments/big_donors"),

  createBigDonation: (
    data: CreateBigDonation,
  ): Promise<AxiosResponse<BigDonation>> =>
    apiPost("manager/payments/cryptocurrency/big_donation", data),

  getBigDonorPersonPayment: (
    id: string,
  ): Promise<AxiosResponse<PersonPayment>> =>
    apiGet(`person_payments/big_donor_donation/${id}`),
};

export default personPaymentsApi;
