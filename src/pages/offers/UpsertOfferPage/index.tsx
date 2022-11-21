import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";

import Offer from "types/entities/Offer";
import useOffers from "hooks/apiHooks/useOffers";
import { Currencies } from "types/enums/Currencies";
import { Gateways } from "types/enums/Gateways";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertOfferPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "offers",
  });

  const mode = isEdit ? "edit" : "create";

  const { gray10, gray40, gray30 } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { getOffer, createOffer, updateOffer } = useOffers();
  const {
    register,
    setValue,
    getValues: offer,
    reset,
    handleSubmit,
    formState,
  } = useForm<Offer>({ mode: "onChange", reValidateMode: "onChange" });

  const [statusCheckbox, setStatusCheckbox] = useState(true);

  const fetchOffer = useCallback(async () => {
    try {
      const apiOffer = await getOffer(id);
      setStatusCheckbox(apiOffer.active === true);

      reset(apiOffer);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("active", !!checked);
    setStatusCheckbox(!statusCheckbox);
  };

  const handleSave = async () => {
    if (offer()) {
      const offerObject = {
        id: offer().id,
        currency: offer().currency,
        priceCents: offer().priceCents,
        active: offer().active,
        offerGatewayAttributes: {
          gateway: offer().gateway,
          id: offer().id,
          externalId: offer().externalId,
        },
      };

      try {
        if (isEdit) {
          await updateOffer(offerObject);
        } else {
          await createOffer(offerObject);
        }
        navigate("/offers");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/offers");
  };

  useEffect(() => {
    if (isEdit) {
      fetchOffer();
    } else {
      const newOffer: Offer = {
        priceCents: 123,
        currency: "brl",
        gateway: "stripe",
        externalId: "34324",
        active: true,
      };
      reset(newOffer);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.Container>
          <S.Subtitle>{t("attributes.activityStatus")}</S.Subtitle>
          <S.CheckboxContainer>
            <S.Checkbox
              name="status"
              type="checkbox"
              onChange={handleActivityCheckboxChange}
              checked={statusCheckbox}
            />
            <S.Span>
              {offer().active
                ? t("upsert.activeOffer")
                : t("upsert.inactiveOffer")}
            </S.Span>
          </S.CheckboxContainer>
          <br />
          <S.Subtitle>{t("details.details")}</S.Subtitle>
          <S.ContentSection>
            <S.LeftSection>
              <S.SubtitleDescription>
                {t("attributes.price")}
              </S.SubtitleDescription>
              <S.TextInput
                type="number"
                {...register("priceCents", { required: t("upsert.required") })}
              />
              {formState?.errors.priceCents &&
                formState?.errors.priceCents.type && (
                  <S.Error>{formState?.errors.priceCents.message}</S.Error>
                )}
            </S.LeftSection>
            <S.RightSection>
              <S.SubtitleDescription>
                {t("attributes.currency")}
              </S.SubtitleDescription>
              <S.SelectInput
                values={[Currencies.BRL, Currencies.USD]}
                name="currency"
                onOptionChanged={(value) =>
                  setValue("currency", value.toLowerCase())
                }
                defaultValue={Currencies.BRL}
                containerId="currencies-dropdown"
              />

              {formState?.errors.currency &&
                formState?.errors.currency.type && (
                  <S.Error>{formState?.errors.currency.message}</S.Error>
                )}
            </S.RightSection>
          </S.ContentSection>
          <S.Subtitle>{t("details.gatewayInfo")}</S.Subtitle>
          <S.ContentSection>
            <S.LeftSection>
              <S.SubtitleDescription>
                {t("attributes.gateway")}
              </S.SubtitleDescription>
              <S.SelectInput
                values={[Gateways.stripe]}
                name="currency"
                onOptionChanged={(value) =>
                  setValue("gateway", value.toLowerCase())
                }
                defaultValue={Gateways.stripe}
                containerId="gateway-dropdown"
              />
              {formState?.errors.gateway && formState?.errors.gateway.type && (
                <S.Error>{formState?.errors.gateway.message}</S.Error>
              )}
            </S.LeftSection>
            <S.RightSection>
              <S.SubtitleDescription>
                {t("attributes.externalId")}
              </S.SubtitleDescription>
              <S.TextInput
                {...register("externalId", { required: t("upsert.required") })}
              />
              {formState?.errors.externalId &&
                formState?.errors.externalId.type && (
                  <S.Error>{formState?.errors.externalId.message}</S.Error>
                )}
            </S.RightSection>
          </S.ContentSection>
        </S.Container>
        <S.ContentSection>
          <S.ButtonContainer>
            <Button
              type="submit"
              color={gray10}
              backgroundColor={gray40}
              _hover={{ bg: gray30 }}
              disabled={!formState?.isValid}
            >
              {t(`upsert.${mode}.save`)}
            </Button>

            <Button
              color={gray40}
              backgroundColor={gray10}
              outlineColor={gray40}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t(`upsert.${mode}.cancel`)}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
    </>
  );
}

UpsertOfferPage.defaultProps = {
  isEdit: false,
};

export default UpsertOfferPage;
