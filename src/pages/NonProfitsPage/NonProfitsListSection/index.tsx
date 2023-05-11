import useNonProfits from "hooks/apiHooks/useNonProfits";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { NonProfit } from "@ribon.io/shared/types";
import NonProfitItems from "../NonProfitItems";
import * as S from "./styles";

function NonProfitsListSection(): JSX.Element {
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([]);
  const { getNonProfits } = useNonProfits();
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits",
  });
  const [currentNonProfits, setCurrentNonProfits] = useState<NonProfit[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNonProfits = useCallback(async () => {
    try {
      const allNonProfits = await getNonProfits();
      setNonProfits(allNonProfits);
    } catch (e) {
      logError(e);
    }
  }, [setNonProfits]);

  useEffect(() => {
    fetchNonProfits();
  }, [fetchNonProfits]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = nonProfits.slice(itemOffset, endOffset);

    setCurrentNonProfits(allItems);

    setPageCount(Math.ceil(nonProfits.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, nonProfits]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % nonProfits.length;

    setItemOffset(newOffset);
  };

  return (
    <S.Container>
      <S.SearchBar
        placeholder={t("list.search")}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.id")}</th>
            <th>{t("attributes.name")}</th>
            <th>{t("attributes.walletAddress")}</th>
            <th>{t("attributes.status")}</th>
          </tr>
        </thead>
        <NonProfitItems
          searchTerm={searchTerm}
          nonProfits={currentNonProfits}
        />
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

export default NonProfitsListSection;
