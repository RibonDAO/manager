import { useCallback, useState } from "react";
import causesApi from "services/api/causesApi";
import { CreateCause, Cause } from "@ribon.io/shared/types";

function useCauses() {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [page, setPage] = useState(1);

  const getCauses = useCallback(async () => {
    const { data: allCauses } = await causesApi.getCausesList({
      page,
      perPage: 15,
    });

    setCauses((oldCauses) => [...oldCauses, ...allCauses]);

    return allCauses;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  async function getCause(id: any) {
    const { data: cause } = await causesApi.getCause(id);

    return cause;
  }

  async function createCause(data: CreateCause) {
    const cause = causesApi.createCause(data);
    return cause;
  }

  async function updateCause(data: CreateCause) {
    const cause = causesApi.updateCause(data.id, data);
    return cause;
  }

  return {
    causes,
    getCauses,
    incrementPage,
    getCause,
    createCause,
    updateCause,
  };
}

export default useCauses;
