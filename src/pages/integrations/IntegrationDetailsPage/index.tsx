import IntegrationCard from "components/moleculars/cards/IntegrationCard";
import useApiIntegrations from "hooks/apiHooks/useApiIntegrations";
import dateFormatter from "lib/dateFormatter";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import CopyableAddress from "components/atomics/CopyableAddress";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";
import theme from "styles/theme";
import * as S from "./styles";

function IntegrationDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.integrationDetailsPage",
  });
  const { ribonBlue, lgRed, ribonBlack, bgGray } = theme.colors;
  const statusColors: { [key: string]: string } = {
    active: ribonBlue,
    inactive: lgRed,
  };

  const [integration, setIntegration] = useState<any>([]);
  const { getApiIntegration } = useApiIntegrations();
  const { id } = useParams();

  const fetchIntegration = useCallback(async () => {
    try {
      const integrationData = await getApiIntegration(id);
      setIntegration(integrationData);
    } catch (e) {
      logError(e);
    }
  }, []);

  const integrationName = integration?.name;
  const {
    status,
    name,
    walletAddress,
    integrationAddress,
    createdAt,
    updatedAt,
  } = integration;

  useEffect(() => {
    fetchIntegration();
  }, []);

  return (
    <S.Container>
      <S.Title>{t("title", { integrationName })}</S.Title>
      <IntegrationCard title={integrationName} value="12" />
      <br />

      <Link to="edit">
        <Button
          color={bgGray}
          backgroundColor={ribonBlack}
          leftIcon={<EditIcon />}
        >
          {t("edit")}
        </Button>
      </Link>

      <S.InfoName>{t("status")}</S.InfoName>
      <S.InfoValue style={{ color: `${statusColors[status]}` }}>
        {status}
      </S.InfoValue>

      <S.InfoName>{t("id")}</S.InfoName>
      <S.InfoValue>{id}</S.InfoValue>

      <S.InfoName>{t("name")}</S.InfoName>
      <S.InfoValue>{name}</S.InfoValue>

      <S.InfoName>{t("walletAddress")}</S.InfoName>
      <CopyableAddress text={walletAddress} />

      <S.InfoName>{t("integrationAddress")}</S.InfoName>
      <CopyableAddress text={integrationAddress} />

      <S.InfoName>{t("createdAt")}</S.InfoName>
      <S.InfoValue>{dateFormatter(createdAt)}</S.InfoValue>

      <S.InfoName>{t("lastEditedAt")}</S.InfoName>
      <S.InfoValue>{dateFormatter(updatedAt)}</S.InfoValue>
    </S.Container>
  );
}

export default IntegrationDetailsPage;
