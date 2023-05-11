import { useCallback, useState } from "react";
import articlesApi from "services/api/articlesApi";
import { CreateArticle, Article } from "@ribon.io/shared/types";

function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);

  const getArticles = useCallback(async () => {
    const { data: allArticles } = await articlesApi.getArticlesList({
      page,
      perPage: 15,
    });

    setArticles((oldArticles) => [...oldArticles, ...allArticles]);

    return allArticles;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getArticle(id: any) {
    const { data: article } = await articlesApi.getArticle(id);

    return article;
  }

  async function createArticle(data: CreateArticle) {
    const article = articlesApi.createArticle(data);
    return article;
  }

  async function updateArticle(data: CreateArticle) {
    const article = articlesApi.updateArticle(data.id, data);
    return article;
  }

  return {
    articles,
    getArticles,
    incrementPage,
    getArticle,
    createArticle,
    updateArticle,
  };
}

export default useArticles;
