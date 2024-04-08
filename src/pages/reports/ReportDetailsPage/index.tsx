import dateFormatter from "lib/dateFormatter";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import CopyableAddress from "components/atomics/CopyableAddress";
import { Link } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";
import theme from "styles/theme";
import InfoName from "components/moleculars/infoName";
import { Button } from "@chakra-ui/react";
import useReports from "hooks/apiHooks/useReports";
import * as S from "./styles";

function ReportDetailPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "reports",
  });
  const { neutral } = theme.colors;
  const { primary, tertiary } = theme.colors.brand;

  const statusColors: { [key: string]: string } = {
    active: primary[300],
    inactive: tertiary[400],
  };

  const { getReport } = useReports();

  const [report, setReport] = useState<any>([]);
  const { id } = useParams();

  const fetchReport = useCallback(async () => {
    try {
      const reportData = await getReport(id);
      setReport(reportData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <S.Content>
      <S.Title>{t("details.title")}</S.Title>

      <S.Container>
        <S.LeftSection>
          <Link to="edit">
            <Button
              color={neutral[50]}
              background={neutral[800]}
              _hover={{ bg: neutral[500] }}
              leftIcon={<EditIcon />}
            >
              {t("edit")}
            </Button>
          </Link>

          <InfoName>{t("attributes.status")}</InfoName>
          <S.InfoValue
            style={{
              color: `${statusColors[report.active ? "active" : "inactive"]}`,
            }}
          >
            {t(`attributes.${report.active ? "active" : "inactive"}`)}
          </S.InfoValue>

          <InfoName>{t("attributes.name")}</InfoName>
          <S.InfoValue>{report.name}</S.InfoValue>

          <InfoName>{t("attributes.link")}</InfoName>
          <CopyableAddress text={report.link} />

          <InfoName>{t("attributes.createdAt")}</InfoName>
          <S.InfoValue>{dateFormatter(report.createdAt)}</S.InfoValue>

          <InfoName>{t("attributes.lastEditedAt")}</InfoName>
          <S.InfoValue>{dateFormatter(report.updatedAt)}</S.InfoValue>
        </S.LeftSection>
      </S.Container>
    </S.Content>
  );
}

export default ReportDetailPage;
