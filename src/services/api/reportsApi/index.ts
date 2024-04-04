import { AxiosResponse } from "axios";
import Report from "types/entities/Report";
import { CreateReport } from "types/apiResponses/report";
import { apiGet, apiGetWithParams, apiPost, apiPut } from "..";

type ReportsList = {
  perPage?: number;
  page?: number;
};

const reportsApi = {
  getReportsList: ({
    perPage = 10,
    page = 1,
  }: ReportsList): Promise<AxiosResponse<Report[]>> =>
    apiGetWithParams("reports", {
      per: perPage,
      page,
      active: true,
    }),
  getReport: (id: any): Promise<AxiosResponse<Report>> =>
    apiGet(`reports/${id}`),
  createReport: (data: any): Promise<AxiosResponse<CreateReport>> =>
    apiPost("reports", data),
  updateReport: (
    id: any,
    data: CreateReport,
  ): Promise<AxiosResponse<Report>> => apiPut(`reports/${id}`, data),
};

export default reportsApi;
