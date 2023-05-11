import { useCallback, useState } from "react";
import nonProfitsApi from "services/api/nonProfitsApi";
import { CreateNonProfit, NonProfit } from "@ribon.io/shared/types";

function useNonProfits() {
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([]);
  const [page, setPage] = useState(1);

  const getNonProfits = useCallback(async () => {
    const { data: allNonProfits } = await nonProfitsApi.getNonProfitsList({
      page,
      perPage: 15,
    });

    setNonProfits((oldNonProfits) => [...oldNonProfits, ...allNonProfits]);

    return allNonProfits;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getNonProfit(id: any) {
    const { data: nonProfit } = await nonProfitsApi.getNonProfit(id);

    return nonProfit;
  }

  async function createNonProfit(data: CreateNonProfit) {
    const nonProfit = nonProfitsApi.createNonProfit({
      ...data,
    });
    return nonProfit;
  }

  async function updateNonProfit(data: CreateNonProfit) {
    const nonProfit = nonProfitsApi.updateNonProfit(data.id, {
      ...data,
    });

    return nonProfit;
  }

  return {
    nonProfits,
    getNonProfits,
    incrementPage,
    getNonProfit,
    createNonProfit,
    updateNonProfit,
  };
}

export default useNonProfits;
