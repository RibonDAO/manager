import { Button } from "@chakra-ui/react";
import useOffers from "hooks/apiHooks/useOffers";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logError } from "services/crashReport";
import { Offer } from "@ribon.io/shared/types";
import AddIcon from "assets/icons/addIcon";
import theme from "styles/theme";
import OffersItems from "../OffersItems";
import * as S from "./styles";

function OffersListSection(): JSX.Element {
  const [offers, setOffers] = useState<Offer[]>([]);
  const { getOffers } = useOffers();
  const { t } = useTranslation("translation", {
    keyPrefix: "offers",
  });
  const [currentOffers, setCurrentOffers] = useState<Offer[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/offers/new");
  };

  const fetchOffers = useCallback(async () => {
    try {
      const allOffers = await getOffers();
      setOffers(allOffers);
    } catch (e) {
      logError(e);
    }
  }, [setOffers]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = offers.slice(itemOffset, endOffset);

    setCurrentOffers(allItems);

    setPageCount(Math.ceil(offers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, offers]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % offers.length;

    setItemOffset(newOffset);
  };

  return (
    <S.Container>
      <S.ButtonContainer>
        <Button
          color={neutral[50]}
          backgroundColor={neutral[800]}
          _hover={{ bg: neutral[500] }}
          marginLeft="8px"
          marginRight="8px"
          onClick={handleAddNew}
          leftIcon={AddIcon()}
        >
          {t("list.createNew")}
        </Button>
        <S.SearchBar
          placeholder={t("list.search")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </S.ButtonContainer>

      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.id")}</th>
            <th>{t("attributes.currency")}</th>
            <th>{t("attributes.price")}</th>
            <th>{t("attributes.gateway")}</th>
            <th>{t("attributes.externalId")}</th>
            <th>{t("attributes.status")}</th>
          </tr>
        </thead>
        <OffersItems searchTerm={searchTerm} offers={currentOffers} />
      </S.Table>

      <S.Pagination
        breakLabel="..."
        previousLabel={t("list.previous")}
        nextLabel={t("list.next")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
      />
    </S.Container>
  );
}

export default OffersListSection;
