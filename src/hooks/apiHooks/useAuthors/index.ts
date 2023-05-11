import { useCallback, useState } from "react";
import authorsApi from "services/api/authorsApi";
import { CreateAuthor, Author } from "@ribon.io/shared/types";

function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [page, setPage] = useState(1);

  const getAuthors = useCallback(async () => {
    const { data: allAuthors } = await authorsApi.getAuthorsList({
      page,
      perPage: 1000,
    });

    setAuthors((oldAuthors) => [...oldAuthors, ...allAuthors]);

    return allAuthors;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getAuthor(id: any) {
    const { data: author } = await authorsApi.getAuthor(id);

    return author;
  }

  async function createAuthor(data: CreateAuthor) {
    const author = authorsApi.createAuthor(data);
    return author;
  }

  async function updateAuthor(data: CreateAuthor) {
    const author = authorsApi.updateAuthor(data.id, data);
    return author;
  }

  return {
    authors,
    getAuthors,
    incrementPage,
    getAuthor,
    createAuthor,
    updateAuthor,
  };
}

export default useAuthors;
