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

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  return {
    warmglowMessages,
    getWarmglowMessages,
    getWarmglowMessage,

    incrementPage,
  };
}

export default useWarmglowMessages;
