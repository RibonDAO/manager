import { AxiosResponse } from "axios";
import { CreateArticle, Article } from "@ribon.io/shared/types";
import { apiPost, apiPut, apiGetWithParams, apiGet } from "..";

type ArticlesList = {
  perPage?: number;
  page?: number;
};

const articlesApi = {
  getArticlesList: ({
    perPage = 10,
    page = 1,
  }: ArticlesList): Promise<AxiosResponse<Article[]>> =>
    apiGetWithParams("news/articles", {
      per: perPage,
      page,
      show_hidden_articles: true,
    }),
  getArticle: (id: any): Promise<AxiosResponse<Article>> =>
    apiGet(`news/articles/${id}`),
  createArticle: (data: any): Promise<AxiosResponse<CreateArticle>> =>
    apiPost("news/articles", data),
  updateArticle: (
    id: any,
    data: CreateArticle,
  ): Promise<AxiosResponse<Article>> => apiPut(`news/articles/${id}`, data),
};

export default articlesApi;
