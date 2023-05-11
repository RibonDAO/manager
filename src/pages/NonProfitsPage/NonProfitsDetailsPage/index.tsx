import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";

import InfoName from "components/moleculars/infoName";
import { Button } from "@chakra-ui/react";
import theme from "styles/theme";
import { useCallback, useEffect, useState } from "react";
import { logError } from "services/crashReport";
import { NonProfit , Story } from "@ribon.io/shared/types";
import useNonProfits from "hooks/apiHooks/useNonProfits";

import dateFormatter from "lib/dateFormatter";
import LinkPage from "components/atomics/LinkPage";
import snakeToCamelCase from "lib/snakeToCamelCase";
import * as S from "./styles";
import StoriesCard from "../UpsertNonProfitPage/StoriesCard";

function NonProfitsDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits",
  });
  const { neutral } = theme.colors;

  const [nonProfit, setNonProfits] = useState<NonProfit>();

  const { getNonProfit } = useNonProfits();

  const { id } = useParams();

  const fetchNonProfit = useCallback(async () => {
    try {
      const nonProfitData = await getNonProfit(id);

      setNonProfits(nonProfitData);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchNonProfit();
  }, []);

  return (
    <S.Content>
      <S.Title>{nonProfit?.name}</S.Title>

      <S.Container>
        <S.LeftSection>
          <Link to="edit">
            <Button
              color={neutral[50]}
              background={neutral[800]}
              _hover={{ bg: neutral[500] }}
              marginBottom="32px"
              leftIcon={<EditIcon />}
            >
              {t("details.edit")}
            </Button>
          </Link>
          <S.Subtitle>{t("details.details")}</S.Subtitle>
          <InfoName>{t("details.attributes.name")}</InfoName>
          <S.InfoValue>{nonProfit?.name}</S.InfoValue>
          <InfoName>{t("attributes.cause")}</InfoName>
          <LinkPage
            page={`/causes/${nonProfit?.cause.id}`}
            text={nonProfit?.cause.name ?? ""}
          />
          <InfoName>{t("details.attributes.walletAddress")}</InfoName>
          <S.InfoValue>{nonProfit?.walletAddress}</S.InfoValue>
          <InfoName>{t("details.attributes.createdAt")}</InfoName>
          <S.InfoValue>{dateFormatter(nonProfit?.createdAt ?? "")}</S.InfoValue>
          <InfoName>{t("details.attributes.updatedAt")}</InfoName>
          <S.InfoValue>{dateFormatter(nonProfit?.updatedAt ?? "")}</S.InfoValue>

          <S.ContainerStories>
            {nonProfit?.stories?.sort(
                (story1, story2) =>
                  Number(story1.position) - Number(story2.position),
              )
              .map((story: Story) => (
                <StoriesCard
                  key={story.id}
                  title={story.title}
                  description={story.description}
                  image={story.image}
                />
              ))}
          </S.ContainerStories>
        </S.LeftSection>

        <S.RightSection>
          <S.Subtitle>{t("details.impact")}</S.Subtitle>

          <InfoName>{t("details.attributes.costForOneImpact")}</InfoName>
          <S.InfoValue>{nonProfit?.impactByTicket}</S.InfoValue>

          <InfoName>{t("upsert.impactsForm.attributes.unit")}</InfoName>
          <S.InfoValue>
            {t(
              `upsert.impactsForm.attributes.${snakeToCamelCase(
                nonProfit?.nonProfitImpacts![
                  nonProfit.nonProfitImpacts!.length - 1
                ].measurementUnit ?? "",
              )}`,
            )}
          </S.InfoValue>

          <InfoName>{t("upsert.impactsForm.attributes.startDate")}</InfoName>
          <S.InfoValue>
            {
              nonProfit?.nonProfitImpacts![
                nonProfit.nonProfitImpacts!.length - 1
              ].startDate
            }
          </S.InfoValue>

          <InfoName>{t("upsert.impactsForm.attributes.endDate")}</InfoName>
          <S.InfoValue>
            {
              nonProfit?.nonProfitImpacts![
                nonProfit.nonProfitImpacts!.length - 1
              ].endDate
            }
          </S.InfoValue>

          <InfoName>
            {t("upsert.impactsForm.attributes.impactDescription")}
          </InfoName>
          <S.InfoValue>
            {
              nonProfit?.nonProfitImpacts![
                nonProfit.nonProfitImpacts!.length - 1
              ].impactDescription
            }
          </S.InfoValue>

          <InfoName>
            {t("upsert.impactsForm.attributes.donorRecipients")}
          </InfoName>
          <S.InfoValue>
            {
              nonProfit?.nonProfitImpacts![
                nonProfit.nonProfitImpacts!.length - 1
              ].donorRecipient
            }
          </S.InfoValue>

          <S.Container>
            <LinkPage page={`/ngos/${id}/impacts`} text={t("viewHistory")} />
          </S.Container>

          <S.Subtitle>{t("details.images")}</S.Subtitle>
          <S.Container>
            <S.LeftSection>
              <S.ItemBox>
                <InfoName>{t("details.attributes.logo")}</InfoName>
                <S.CardImage src={nonProfit?.logo} />
              </S.ItemBox>

              <S.ItemBox>
                <InfoName>{t("details.attributes.backgroundImage")}</InfoName>
                <S.CardImage src={nonProfit?.backgroundImage} />
              </S.ItemBox>
            </S.LeftSection>

            <S.RightSection>
              <S.ItemBox>
                <InfoName>{t("details.attributes.cardCause")}</InfoName>
                <S.CardImage src={nonProfit?.mainImage} />
              </S.ItemBox>
            </S.RightSection>
          </S.Container>
        </S.RightSection>
      </S.Container>
    </S.Content>
  );
}

export default NonProfitsDetailsPage;
