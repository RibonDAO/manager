import dateFormatter from "lib/dateFormatter";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import CopyableAddress from "components/atomics/CopyableAddress";
import { Link } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";
import useArticles from "hooks/apiHooks/useArticles";

import theme from "styles/theme";
import InfoName from "components/moleculars/infoName";
import { Button } from "@chakra-ui/react";
import { Article } from "@ribon.io/shared/types";
import dateFormatterWithMinutes from "lib/dateFormatterWithMinutes";
import * as S from "./styles";

function NewsDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "news",
  });
  const { neutral } = theme.colors;
  const { primary, tertiary } = theme.colors.brand;

  const { id } = useParams();

  const [article, setArticle] = useState<Article>();
  const { getArticle } = useArticles();

  const fetchArticle = useCallback(async () => {
    try {
      const articleData = await getArticle(id);

      setArticle(articleData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchArticle();
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
              {t("details.edit")}
            </Button>
          </Link>
          <S.Subtitle>{t("attributes.visibilityStatus")}</S.Subtitle>
          <S.InfoValue
            style={{
              color: `${article?.visible ? primary[300] : tertiary[400]}`,
            }}
          >
            <b>
              {article?.visible
                ? t("attributes.visibilityOptions.visible")
                : t("attributes.visibilityOptions.hidden")}
            </b>
          </S.InfoValue>

          <S.Subtitle>{t("details.details")}</S.Subtitle>

          <InfoName>{t("attributes.content")}</InfoName>
          <S.InfoValue>{article?.title}</S.InfoValue>

          <InfoName>{t("attributes.link")}</InfoName>
          <CopyableAddress text={article?.link ?? ""} />

          <InfoName>{t("attributes.author")}</InfoName>
          <S.InfoValue>{article?.author.name}</S.InfoValue>

          <InfoName>{t("attributes.language")}</InfoName>
          <S.InfoValue>{article?.language}</S.InfoValue>

          <InfoName>{t("attributes.publicationDate")}</InfoName>
          <S.InfoValue>
            {dateFormatterWithMinutes(article?.publishedAt ?? "")}
          </S.InfoValue>

          <InfoName>{t("attributes.createdAt")}</InfoName>
          <S.InfoValue>{dateFormatter(article?.createdAt ?? "")}</S.InfoValue>

          <InfoName>{t("attributes.updatedAt")}</InfoName>
          <S.InfoValue>{dateFormatter(article?.updatedAt ?? "")}</S.InfoValue>
        </S.LeftSection>

        <S.RightSection>
          {article?.imageUrl && (
            <div>
              <S.Subtitle>{t("attributes.image")}</S.Subtitle>
              <S.CardImage src={article?.imageUrl} />
            </div>
          )}
        </S.RightSection>
      </S.Container>
    </S.Content>
  );
}

export default NewsDetailsPage;
