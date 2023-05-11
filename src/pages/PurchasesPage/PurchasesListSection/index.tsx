import usePersonPayments from "hooks/apiHooks/usePersonPayments";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import { PersonPayment } from "@ribon.io/shared/types";
import PurchaseItems from "../PurchaseItems";
import * as S from "./styles";

interface StatusObject {
  [key: string]: boolean;
}

function PurchasesListSection(): JSX.Element {
  const [purchases, setPurchases] = useState<PersonPayment[]>([]);
  const defaultStatusSelection = {
    processing: true,
    refunded: true,
    paid: true,
    failed: true,
  };
  const [selectedStatus, setSelectedStatus] = useState<StatusObject>(
    defaultStatusSelection,
  );
  const { getPersonPayments } = usePersonPayments();
  const { t } = useTranslation("translation", {
    keyPrefix: "purchases",
  });
  const [currentPurchases, setCurrentPurchases] = useState<PersonPayment[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedStatus({ ...selectedStatus, [value]: !selectedStatus[value] });
  };

  const filterPurchasesByStatus = (nonFilteredPurchases: PersonPayment[]) =>
    nonFilteredPurchases.filter((purchaseData: PersonPayment) => {
      if (selectedStatus[purchaseData.status]) return purchaseData;
      return null;
    });

  const fetchPurchases = useCallback(async () => {
    try {
      const allPurchases = await getPersonPayments();
      setPurchases(allPurchases);
    } catch (e) {
      logError(e);
    }
  }, [setPurchases]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = purchases.slice(itemOffset, endOffset);

    setCurrentPurchases(allItems);

    setPageCount(Math.ceil(purchases.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, purchases, selectedStatus]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % purchases.length;

    setItemOffset(newOffset);
  };

  return (
    <S.Container>
      <S.CheckboxContainer>
        {Object.keys(defaultStatusSelection).map((status: any) => (
          <div key={status}>
            <S.Checkbox
              name="status"
              type="checkbox"
              value={status}
              onChange={handleStatusChange}
              checked={selectedStatus[status]}
            />
            <S.Span>{t(`attributes.${status}`)}</S.Span>
          </div>
        ))}
      </S.CheckboxContainer>
      <S.SearchBar
        placeholder={t("list.search")}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.date")}</th>
            <th>{t("attributes.stripeId")}</th>
            <th>{t("attributes.type")}</th>
            <th>{t("attributes.userIdentification")}</th>
            <th>{t("attributes.value")}</th>
            <th>{t("attributes.usdc")}</th>
            <th>{t("attributes.status")}</th>
          </tr>
        </thead>
        <PurchaseItems
          purchases={filterPurchasesByStatus(currentPurchases)}
          fetchPurchases={fetchPurchases}
          searchTerm={searchTerm}
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

export default PurchasesListSection;
