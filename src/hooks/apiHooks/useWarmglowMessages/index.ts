import { useCallback, useState } from "react";
import warmglowMessagesApi from "services/api/warmglowMessagesApi";

import WarmglowMessage from "types/entities/WarmglowMessage";

function useWarmglowMessages() {
  const [warmglowMessages, setWarmglowMessages] = useState<WarmglowMessage[]>(
    [],
  );
  const [page, setPage] = useState(1);

  const getWarmglowMessages = useCallback(async () => {
    const { data: allWarmglowMessages } =
      await warmglowMessagesApi.getWarmglowMessages({
        page,
        perPage: 15,
      });

    setWarmglowMessages((oldWarmglowMessages) => [
      ...oldWarmglowMessages,
      ...allWarmglowMessages,
    ]);

    return allWarmglowMessages;
  }, [page]);

  async function getWarmglowMessage(id: any) {
    const { data: warmglowMessage } =
      await warmglowMessagesApi.getWarmglowMessage(id);

    return warmglowMessage;
  }

  async function createWarmglowMessage(create: any) {
    const { data: offer } = await warmglowMessagesApi.createWarmglowMessage(
      create,
    );

    return offer;
  }

  async function updateWarmglowMessage(data: any) {
    const { data: tag } = await warmglowMessagesApi.updateWarmglowMessage(
      data.id,
      data,
    );

    return tag;
  }

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  return {
    warmglowMessages,
    getWarmglowMessages,
    getWarmglowMessage,
    createWarmglowMessage,
    updateWarmglowMessage,
    incrementPage,
  };
}

export default useWarmglowMessages;
