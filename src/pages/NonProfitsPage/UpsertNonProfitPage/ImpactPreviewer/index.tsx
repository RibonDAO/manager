import { useTranslation } from "react-i18next";
import { impactNormalizer } from "@ribon.io/shared/lib";
import { useNonProfitImpact } from "@ribon.io/shared/hooks";
import { Currencies } from "types/enums/Currencies";
import useRibonConfig from "hooks/apiHooks/useRibonConfig";
import { useEffect, useState } from "react";
import * as S from "./styles";

export type Props = {
  nonProfit: any;
  usdCentsToOneImpactUnit: string;
  defaultAmountInUsd?: number;
};

function ImpactPreviewer({
  nonProfit,
  usdCentsToOneImpactUnit,
  defaultAmountInUsd = 100,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits.upsert.impactPreviewer",
  });

  const { t: normalizerTranslations } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  const { getConfig } = useRibonConfig();
  const [defaultTicket, setDefaultTicket] = useState<number>(0);

  async function fetchdefaultTicketValue() {
    const config = await getConfig();

    setDefaultTicket(config[0].defaultTicketValue);
  }
  useEffect(() => {
    fetchdefaultTicketValue();
  }, []);

  const { nonProfitImpact } = useNonProfitImpact(
    nonProfit?.id,
    defaultAmountInUsd,
    Currencies.USD,
  );

  return (
    nonProfit?.nonProfitImpacts &&
    nonProfitImpact && (
      <S.Container>
        <S.Title>{t("previewTicket")}</S.Title>
        <S.Info>
          {t("oneTicket")}{" "}
          {impactNormalizer(
            nonProfit,
            defaultTicket / parseFloat(usdCentsToOneImpactUnit),
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
