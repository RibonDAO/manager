import { AxiosResponse } from "axios";
import { BigDonor } from "@ribon.io/shared/types";
import { apiGet, apiPost, apiPut } from "..";

const bigDonorsApi = {
  getBigDonorsList: (): Promise<AxiosResponse<BigDonor[]>> =>
    apiGet("big_donors"),
  getBigDonor: (id: string | undefined): Promise<AxiosResponse<BigDonor>> =>
    apiGet(`big_donors/${id}`),
  updateBigDonor: (data: BigDonor): Promise<AxiosResponse<BigDonor>> =>
    apiPut(`big_donors/${data.id}`, data),
  createBigDonor: (data: BigDonor): Promise<AxiosResponse<BigDonor>> =>
    apiPost("big_donors", data),
};

export default bigDonorsApi;
