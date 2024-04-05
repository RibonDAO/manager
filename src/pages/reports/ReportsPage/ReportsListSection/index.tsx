import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/react";
import AddIcon from "assets/icons/addIcon";
import { logError } from "services/crashReport";
import { useNavigate } from "react-router";
import theme from "styles/theme";
import Report from "types/entities/Report";
import useReports from "hooks/apiHooks/useReports";
import * as S from "./styles";
import ReportsItems from "../ReportsItems";

function ReportsListSection(): JSX.Element {
  const [reports, setReports] = useState<Report[]>([]);
  const { getReports } = useReports();
  const { t } = useTranslation("translation", {
    keyPrefix: "reports",
  });
  const [currentReports, setCurrentReports] = useState<Report[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const fetchReports = useCallback(async () => {
    try {
      const allReports = await getReports();
      setReports(allReports);
    } catch (e) {
      logError(e);
    }
  }, [setReports]);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = reports.slice(itemOffset, endOffset);

    setCurrentReports(allItems);
    setPageCount(Math.ceil(reports.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, reports]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % reports.length;

    setItemOffset(newOffset);
  };

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/reports/new");
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
      </S.ButtonContainer>
      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.name")}</th>
            <th>{t("attributes.link")}</th>
            <th>{t("attributes.status")}</th>
          </tr>
        </thead>
        <ReportsItems reports={currentReports} />
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

export default ReportsListSection;
