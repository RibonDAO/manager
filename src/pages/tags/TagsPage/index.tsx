import { useTranslation } from "react-i18next";

import TagsListSection from "./TagsListSection";
import * as S from "./styles";

function TagsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "tags",
  });

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>

      <TagsListSection />
    </S.Container>
  );
}

export default TagsPage;
