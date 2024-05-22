import { useCallback, useState } from "react";
import tagsApi from "services/api/tagsApi";

import Tag from "types/entities/Tag";

function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState(1);

  const getTags = useCallback(async () => {
    const { data: allTags } = await tagsApi.getTags({
      page,
      perPage: 15,
    });

    setTags((oldTags) => [...oldTags, ...allTags]);

    return allTags;
  }, [page]);

  async function getTag(id: any) {
    const { data: tag } = await tagsApi.getTag(id);

    return tag;
  }

  async function createTag(create: any) {
    const { data: offer } = await tagsApi.createTag(create);

    return offer;
  }

  async function updateTag(data: any) {
    const { data: tag } = await tagsApi.updateTag(data.id, data);

    return tag;
  }

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  return {
    tags,
    getTags,
    getTag,
    createTag,
    updateTag,
    incrementPage,
  };
}

export default useTags;
