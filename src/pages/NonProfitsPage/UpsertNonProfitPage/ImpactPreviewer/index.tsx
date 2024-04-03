import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { impactNormalizer } from "@ribon.io/shared/lib";
import { useNonProfitImpact } from "@ribon.io/shared/hooks";
import useRibonConfig from "hooks/apiHooks/useRibonConfig";
import { Currencies } from "types/enums/Currencies";
import * as S from "./styles";

export type Props = {
  nonProfit: any;
  minimumNumberOfTickets: number;
  defaultAmountInUsd?: number;
};

function ImpactPreviewer({
  nonProfit,
  minimumNumberOfTickets,
  defaultAmountInUsd = 100,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits.upsert.impactPreviewer",
  });

  const { t: normalizerTranslations } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  const { nonProfitImpact } = useNonProfitImpact(
    nonProfit?.id,
    defaultAmountInUsd,
    Currencies.USD,
  );

  const { getConfig } = useRibonConfig();
  const [defaultTicket, setDefaultTicket] = useState<number>(0);

  async function fetchDefaultTicketValue() {
    const config = await getConfig();

    setDefaultTicket(config[0].defaultTicketValue);
  }

  useEffect(() => {
    fetchDefaultTicketValue();
  }, []);

  return (
    nonProfit?.nonProfitImpacts &&
    nonProfitImpact && (
      <S.Container>
        <S.Title>{t("previewTicket")}</S.Title>
        <S.Info>
          {minimumNumberOfTickets > 1
            ? t("tickets", { minimumNumberOfTickets })
            : t("oneTicket")}{" "}
          {impactNormalizer(
            nonProfit,
            Number(defaultTicket) * minimumNumberOfTickets,
            normalizerTranslations,
          ).join(" ")}
        </S.Info>
        <S.Title>{t("previewContribution")}</S.Title>
        <S.Info>
          ${defaultAmountInUsd} {t("fund")}{" "}
          {impactNormalizer(
            nonProfit,
            Number(nonProfitImpact?.roundedImpact),
            normalizerTranslations,
          ).join(" ")}
        </S.Info>
      </S.Container>
    )
  );
}

export default ImpactPreviewer;
