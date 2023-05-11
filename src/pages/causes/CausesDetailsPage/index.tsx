import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import useCauses from "hooks/apiHooks/useCauses";
import usePools from "hooks/apiHooks/usePools";
import { logError } from "services/crashReport";

import { NonProfit, Cause, Pool } from "@ribon.io/shared/types";
import ArrowOutward from "assets/icons/arrow-outward.svg";

import CopyableAddress from "components/atomics/CopyableAddress";
import EditIcon from "assets/icons/editIcon";
import InfoName from "components/moleculars/infoName";
import theme from "styles/theme";
import * as S from "./styles";

function CausesDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "causes",
  });
  const { neutral } = theme.colors;

  const [cause, setCause] = useState<Cause>();
  const [pool, setPool] = useState<Pool>();

  const { getCause } = useCauses();
  const { getPools } = usePools();

  const navigate = useNavigate();

  const { id } = useParams();

  const handleClick = (causeId: string) => {
    navigate(`/ngos/${causeId}`);
  };

  const fetchCause = useCallback(async () => {
    try {
      const causeData = await getCause(id);

      setCause(causeData);

      const apiPools = await getPools();
      const poolData = apiPools.find(
        (p) =>
          p.address.toLowerCase() === causeData.pools[0].address.toLowerCase(),
      );

      setPool(poolData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchCause();
  }, []);

  return (
    <S.Content>
      <S.Title>{t("details.title")}</S.Title>

      <S.Container>
        <S.LeftSection>
          <S.Subtitle>{t("attributes.availableToDonation")}</S.Subtitle>
          <S.SubtitleInfo>{pool?.poolBalance?.balance ?? 0}</S.SubtitleInfo>

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

          <InfoName>{t("attributes.name")}</InfoName>
          <S.InfoValue>{cause?.name}</S.InfoValue>

          <InfoName>{t("attributes.poolAddress")}</InfoName>
          <CopyableAddress
            text={cause?.pools.length ? cause?.pools[0].address : "-"}
          />
        </S.LeftSection>

        <S.RightSection>
          <S.Subtitle>{t("details.linkedProjects")}</S.Subtitle>
          {cause?.nonProfits?.map((nonProfit: NonProfit) => (
            <S.CardProject onClick={() => handleClick(nonProfit.id.toString())}>
              <S.CardProjectInfo>{nonProfit.name}</S.CardProjectInfo>{" "}
              <S.ArrowOutward src={ArrowOutward} alt="project link" />
            </S.CardProject>
          ))}

          <S.ItemBox>
            <InfoName>{t("details.mainImage")}</InfoName>
            <S.CardImage src={cause?.mainImage} />
          </S.ItemBox>

          <S.ItemBox>
            <InfoName>{t("details.coverImage")}</InfoName>
            <S.CardImage src={cause?.coverImage} />
          </S.ItemBox>
        </S.RightSection>
      </S.Container>
    </S.Content>
  );
}

export default CausesDetailsPage;
