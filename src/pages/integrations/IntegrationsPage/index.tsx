import { useTranslation } from "react-i18next";
import IntegrationsListSection from "./IntegrationsListSection";
import * as S from "./styles";

function IntegrationsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.integrationsList",
  });

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <IntegrationsListSection />
    </S.Container>
  );
}

export default IntegrationsPage;
