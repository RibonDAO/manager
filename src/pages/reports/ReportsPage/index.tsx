import { useTranslation } from "react-i18next";
import * as S from "./styles";
import ReportsListSection from "./ReportsListSection";

function ReportsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "reports.list",
  });

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>

      <ReportsListSection />
    </S.Container>
  );
}

export default ReportsPage;
