import { useCallback, useState } from "react";
import offersApi from "services/api/offersApi";

import { Offer } from "@ribon.io/shared/types";

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

  async function getOffer(id: any) {
    const { data: offer } = await offersApi.getOffer(id);

    return offer;
  }

  async function createOffer(create: any) {
    const { data: offer } = await offersApi.createOffer(create);

    return offer;
  }

  async function updateOffer(data: any) {
    const { data: offer } = await offersApi.updateOffer(data.id, data);

    return offer;
  }

  function incrementPage() {
    setPage((oldPage) => oldPage + 1);
  }

  return {
    offers,
    getOffers,
    getOffer,
    createOffer,
    updateOffer,
    incrementPage,
  };
}

export default useOffers;
