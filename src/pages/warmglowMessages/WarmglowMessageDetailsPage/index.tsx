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
import useWarmglowMessages from "hooks/apiHooks/useWarmglowMessages";
import WarmglowMessage from "types/entities/WarmglowMessage";
import * as S from "./styles";

function WarmglowMessageDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "warmglowMessages",
  });
  const { neutral } = theme.colors;
  const { primary, tertiary } = theme.colors.brand;

  const statusColors: { [key: string]: string } = {
    active: primary[300],
    inactive: tertiary[400],
  };

  const { getWarmglowMessage } = useWarmglowMessages();

  const [warmglowMessage, setWarmglowMessage] = useState<WarmglowMessage>();
  const { id } = useParams();

  const fetchWarmglowMessages = useCallback(async () => {
    try {
      const warmglowMessagesData = await getWarmglowMessage(id);
      setWarmglowMessage(warmglowMessagesData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchWarmglowMessages();
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
              color: `${
                statusColors[warmglowMessage?.status ? "active" : "inactive"]
              }`,
            }}
          >
            {t(`attributes.${warmglowMessage?.status ? "active" : "inactive"}`)}
          </S.InfoValue>
          <InfoName>{t("attributes.id")}</InfoName>
          <S.InfoValue>{id}</S.InfoValue>

          <InfoName>{t("attributes.message")}</InfoName>
          <S.InfoValue>{warmglowMessage?.message || "-"}</S.InfoValue>

          <InfoName>{t("attributes.createdAt")}</InfoName>
          <S.InfoValue>
            {dateFormatter(warmglowMessage?.createdAt ?? "")}
          </S.InfoValue>

          <InfoName>{t("attributes.lastEditedAt")}</InfoName>
          <S.InfoValue>
            {dateFormatter(warmglowMessage?.updatedAt ?? "")}
          </S.InfoValue>
        </S.LeftSection>
      </S.Container>
    </S.Content>
  );
}

export default WarmglowMessageDetailsPage;
