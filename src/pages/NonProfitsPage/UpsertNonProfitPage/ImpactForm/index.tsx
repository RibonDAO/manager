import Dropdown from "components/atomics/Dropdown";
import InfoName from "components/moleculars/infoName";
import snakeToCamelCase from "lib/snakeToCamelCase";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { NonProfitImpact } from "types/entities/NonProfitImpact";
import { CreateNonProfit } from "types/apiResponses/nonProfit";
import * as S from "./styles";

export type Props = {
  nonProfitImpactForm: UseFormReturn<NonProfitImpact>;
  nonProfitForm: UseFormReturn<CreateNonProfit>;
  setCurrentUnit: Dispatch<SetStateAction<string>>;
  currentUnit: string;
};

function ImpactsForm({
  nonProfitImpactForm,
  nonProfitForm,
  setCurrentUnit,
  currentUnit,
}: Props) {
  const {
    register: registerImpact,
    setValue: setValueImpact,
    formState: formStateImpact,
  } = nonProfitImpactForm;

  const { register: registerNonProfit, formState: formStateNonProfit } =
    nonProfitForm;

  const { t } = useTranslation("translation", {
    keyPrefix: "nonProfits.upsert.impactsForm",
  });

  const onUnitChanged = (unit: string) => {
    setCurrentUnit(unit);
    setValueImpact("measurementUnit", unit);
  };

  const unitText = (value: any) => t(`attributes.${snakeToCamelCase(value)}`);

  return (
    <>
      <S.DoubleItemSection>
        <S.ItemBox>
          <InfoName>{t("attributes.impactTitle")}</InfoName>
          <S.TextInput
            {...registerNonProfit("impactTitle", {
              required: t("upsert.required"),
            })}
          />
          {formStateNonProfit?.errors.impactTitle &&
            formStateNonProfit?.errors.impactTitle.type && (
              <S.Error>
                {formStateNonProfit?.errors.impactTitle.message}
              </S.Error>
            )}
        </S.ItemBox>
      </S.DoubleItemSection>
      <S.DoubleItemSection>
        <S.ItemBox>
          <InfoName>{t("attributes.costForOneImpact")}</InfoName>
          <S.TextInput
            {...registerImpact("usdCentsToOneImpactUnit", {
              required: t("upsert.required"),
            })}
          />
          {formStateImpact?.errors.usdCentsToOneImpactUnit &&
            formStateImpact?.errors.usdCentsToOneImpactUnit.type && (
              <S.Error>
                {formStateImpact?.errors.usdCentsToOneImpactUnit.message}
              </S.Error>
            )}
        </S.ItemBox>
        <S.ItemBox>
          <InfoName>{t("attributes.unit")}</InfoName>
          <Dropdown
            values={["quantity_without_decimals", "days_months_and_years"]}
            onOptionChanged={onUnitChanged}
            valueText={unitText}
            defaultValue={currentUnit}
            containerId="unit-dropdown"
            name="unit"
          />
          {formStateImpact?.errors.measurementUnit &&
            formStateImpact?.errors.measurementUnit.type && (
              <S.Error>
                {formStateImpact?.errors.measurementUnit.message}
              </S.Error>
            )}
        </S.ItemBox>
      </S.DoubleItemSection>
      <S.DoubleItemSection>
        <S.ItemBox>
          <InfoName>{t("attributes.startDate")}</InfoName>
          <S.TextInput
            type="date"
            {...registerImpact("startDate", {
              required: t("upsert.required"),
            })}
          />
          {formStateImpact?.errors.startDate &&
            formStateImpact?.errors.startDate.type && (
              <S.Error>{formStateImpact?.errors.startDate.message}</S.Error>
            )}
        </S.ItemBox>
        <S.ItemBox>
          <InfoName>{t("attributes.endDate")}</InfoName>
          <S.TextInput
            type="date"
            {...registerImpact("endDate", {
              required: t("upsert.required"),
            })}
          />
          {formStateImpact?.errors.endDate &&
            formStateImpact?.errors.endDate.type && (
              <S.Error>{formStateImpact?.errors.endDate.message}</S.Error>
            )}
        </S.ItemBox>
      </S.DoubleItemSection>
      <S.DoubleItemSection>
        <S.ItemBox>
          <InfoName hasTranslation>
            {t("attributes.impactDescription")}
          </InfoName>
          <S.AreaInput
            {...registerImpact("impactDescription", {
              required: t("upsert.required"),
            })}
          />
          {formStateImpact?.errors.impactDescription &&
            formStateImpact?.errors.impactDescription.type && (
              <S.Error>
                {formStateImpact?.errors.impactDescription.message}
              </S.Error>
            )}
        </S.ItemBox>
        <S.ItemBox>
          <InfoName hasTranslation>{t("attributes.donorRecipients")}</InfoName>
          <S.AreaInput
            {...registerImpact("donorRecipient", {
              required: t("upsert.required"),
            })}
          />
          {formStateImpact?.errors.donorRecipient &&
            formStateImpact?.errors.donorRecipient.type && (
              <S.Error>
                {formStateImpact?.errors.donorRecipient.message}
              </S.Error>
            )}
        </S.ItemBox>
      </S.DoubleItemSection>

      <S.Info>{t("attributes.impactInfo")}</S.Info>
    </>
  );
}

export default ImpactsForm;
