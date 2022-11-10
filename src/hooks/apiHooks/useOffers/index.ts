import { useCallback, useState } from "react";
import offersApi from "services/api/offersApi";

import Offer from "types/entities/Offer";

function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [page, setPage] = useState(1);

  const getOffers = useCallback(async () => {
    const { data: allOffers } = await offersApi.getOffersList({
      page,
      perPage: 15,
    });

    setOffers((oldOffers) => [...oldOffers, ...allOffers]);

    return allOffers;
  }, [page]);

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  return {
    offers,
    getOffers,
    incrementPage,
  };
}

export default useOffers;