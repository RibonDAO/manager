import dateFormatter from "lib/dateFormatter";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import { Link } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";
import theme from "styles/theme";
import InfoName from "components/moleculars/infoName";
import { Button } from "@chakra-ui/react";
import useTags from "hooks/apiHooks/useTags";
import * as S from "./styles";

function TagDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "tags",
  });
  const { neutral } = theme.colors;
  const { primary, tertiary } = theme.colors.brand;

  const statusColors: { [key: string]: string } = {
    active: primary[300],
    inactive: tertiary[400],
  };

  const { getTag } = useTags();

  const [tag, setTag] = useState<any>([]);
  const { id } = useParams();

  const fetchTag = useCallback(async () => {
    try {
      const tagData = await getTag(id);
      setTag(tagData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchTag();
  }, []);

  return (
    <S.Content>
      <S.Title>{t("titleDetails")}</S.Title>
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
              color: `${statusColors[tag.status ? "active" : "inactive"]}`,
            }}
          >
            {t(`attributes.${tag.status ? "active" : "inactive"}`)}
          </S.InfoValue>
          <InfoName>{t("attributes.id")}</InfoName>
          <S.InfoValue>{id}</S.InfoValue>

          <InfoName>{t("attributes.name")}</InfoName>
          <S.InfoValue>{tag.name || "-"}</S.InfoValue>

          <InfoName>{t("attributes.nonProfits")}</InfoName>
          <S.InfoValue>
            {" "}
            {tag.nonProfits
              ? tag.nonProfits
                  .map((nonProfit: any) => nonProfit.name)
                  .join(", ")
              : "-"}
          </S.InfoValue>

          <InfoName>{t("attributes.createdAt")}</InfoName>
          <S.InfoValue>{dateFormatter(tag.createdAt)}</S.InfoValue>

          <InfoName>{t("attributes.lastEditedAt")}</InfoName>
          <S.InfoValue>{dateFormatter(tag.updatedAt)}</S.InfoValue>
        </S.LeftSection>
      </S.Container>
    </S.Content>
  );
}

export default TagDetailsPage;
