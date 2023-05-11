import LinkPage from "components/atomics/LinkPage";
import useNonProfits from "hooks/apiHooks/useNonProfits";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import { NonProfitImpact, NonProfit } from "@ribon.io/shared/types";
import arrowLeft from "assets/icons/arrow-left.svg";
import ImpactsItems from "../ImpactsItems";
import * as S from "./styles";

function ImpactsListSection(): JSX.Element {
  const [impacts, setImpacts] = useState<NonProfitImpact[]>([]);

  const { t } = useTranslation("translation", {
    keyPrefix: "impactsPage.impactsListSection",
  });
  const [currentImpacts, setCurrentImpacts] = useState<NonProfitImpact[]>([]);
  const [nonProfit, setNonProfits] = useState<NonProfit>();
  const { id } = useParams();
  const { getNonProfit } = useNonProfits();

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const fetchImpacts = useCallback(async () => {
    try {
      const nonProfitData = await getNonProfit(id);
      setNonProfits(nonProfitData);
      setImpacts(nonProfitData.nonProfitImpacts ?? []);
    } catch (e) {
      logError(e);
    }
  }, [setImpacts]);

  useEffect(() => {
    fetchImpacts();
  }, [fetchImpacts]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = impacts.slice(itemOffset, endOffset);

    setCurrentImpacts(allItems);

    setPageCount(Math.ceil(impacts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, impacts]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % impacts.length;

    setItemOffset(newOffset);
  };

  return (
    <S.Container>
      <LinkPage text={nonProfit?.name ?? ""} icon={arrowLeft} page={-1} />
      <S.ButtonContainer>
        <S.SearchBar
          placeholder={t("search")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </S.ButtonContainer>

      <S.Table>
        <thead>
          <tr>
            <th>{t("listColumns.id")}</th>
            <th>{t("listColumns.impactCost")}</th>
            <th>{t("listColumns.startDate")}</th>
            <th>{t("listColumns.endDate")}</th>
          </tr>
        </thead>
        <ImpactsItems searchTerm={searchTerm} impacts={currentImpacts} />
      </S.Table>

      <S.Pagination
        breakLabel="..."
        previousLabel={t("previous")}
        nextLabel={t("next")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
      />
    </S.Container>
  );
}

export default ImpactsListSection;
