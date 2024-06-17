import { useTranslation } from "react-i18next";

import * as S from "./styles";
import WarmglowMessagesListSection from "./WarmglowMessagesListSection";

function WarmglowMessagesPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "warmglowMessages",
  });

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>

      <WarmglowMessagesListSection />
    </S.Container>
  );
}

export default WarmglowMessagesPage;
