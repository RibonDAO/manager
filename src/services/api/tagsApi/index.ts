import { AxiosResponse } from "axios";

import Tag from "types/entities/Tag";
import { apiGet, apiGetWithParams, apiPost, apiPut } from "..";

type TagsParams = {
  perPage?: number;
  page?: number;
};

const tagsApi = {
  getTags: ({
    perPage = 10,
    page = 3,
  }: TagsParams): Promise<AxiosResponse<Tag[]>> =>
    apiGetWithParams("tags", {
      params: {
        per_page: perPage,
        page,
      },
    }),

  getTag: (id: any): Promise<AxiosResponse<Tag>> => apiGet(`tags/${id}`),
  createTag: (data: any): Promise<AxiosResponse<Tag>> => apiPost("tags", data),
  updateTag: (id: any, data: Tag): Promise<AxiosResponse<Tag>> =>
    apiPut(`tags/${id}`, data),
};

export default tagsApi;
