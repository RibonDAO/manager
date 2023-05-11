import { AxiosResponse } from "axios";
import { Story, CreateStory } from "@ribon.io/shared/types";
import { apiDelete, apiGet, apiPost, apiPut } from "..";

const storiesApi = {
  getNonProfitStories: (id: number | string): Promise<AxiosResponse<Story[]>> =>
    apiGet(`non_profits/${id}/stories`),

  getStory: (id: string): Promise<AxiosResponse<Story>> =>
    apiGet(`stories/${id}`),

  createStory: (data: CreateStory): Promise<AxiosResponse<Story>> =>
    apiPost("stories", data),

  updateStory: (id: any, data: CreateStory): Promise<AxiosResponse<Story>> =>
    apiPut(`stories/${id}`, data),

  deleteStory: (id: any): Promise<AxiosResponse<Story>> =>
    apiDelete(`stories/${id}`),
};

export default storiesApi;
