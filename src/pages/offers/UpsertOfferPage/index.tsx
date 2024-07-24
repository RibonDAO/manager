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
import Plan from "types/entities/Plan";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertOfferPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "offers",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
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
    watch,
  } = useForm<Offer>({ mode: "onChange", reValidateMode: "onChange" });

  const {
    register: registerPlan,
    reset: resetPlan,
    setValue: setValuePlan,
    formState: formStatePlan,
    getValues: PlanObject,
  } = useForm<Plan>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [statusCheckbox, setStatusCheckbox] = useState(true);
  const [planCheckbox, setPlanCheckbox] = useState(false);
  const [subscriptionCheckbox, setSubscriptionCheckbox] = useState(false);

  const fetchOffer = useCallback(async () => {
    try {
      const apiOffer = await getOffer(id);
      setStatusCheckbox(apiOffer.active === true);
      if (apiOffer.plan) {
        resetPlan(apiOffer.plan);
        setPlanCheckbox(apiOffer.plan.status === "active");
      }
      setSubscriptionCheckbox(apiOffer.subscription);

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

  const handleActivityCheckboxSubscriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("subscription", !!checked);
    setSubscriptionCheckbox(!subscriptionCheckbox);
  };

  const handlePlanStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValuePlan("status", checked ? "active" : "inactive");
    setPlanCheckbox(!planCheckbox);
  };

  const handleSave = async () => {
    if (offer()) {
      let offerObject: any = {
        id: offer().id,
        currency: offer().currency,
        priceCents: offer().priceCents,
        active: offer().active,
        subscription: offer().subscription,
        offerGatewayAttributes: {
          gateway: offer().gateway,
          id: offer().id,
          externalId: offer().externalId,
        },
        category: offer().category,
      };
      if (offer().category === "club") {
        offerObject = {
          ...offerObject,
          plansAttributes: [PlanObject()],
        };
      }

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
        subscription: false,
        category: "direct_contribution",
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

          <S.Subtitle>{t("attributes.subscription")}</S.Subtitle>
          <S.CheckboxContainer>
            <S.Checkbox
              name="subscription"
              type="checkbox"
              onChange={handleActivityCheckboxSubscriptionChange}
              checked={subscriptionCheckbox}
            />
            <S.Span>
              {offer().subscription ? t("upsert.active") : t("upsert.inactive")}
            </S.Span>
          </S.CheckboxContainer>
          <S.ContentSection>
            <S.LeftSection>
              <S.Subtitle>{t("attributes.category")}</S.Subtitle>
              <S.SelectInput
                values={["direct_contribution", "club", "business"]}
                name="category"
                onOptionChanged={(value) => setValue("category", value)}
                defaultValue={offer().category || "direct_contribution"}
                containerId="category-dropdown"
              />
            </S.LeftSection>
          </S.ContentSection>
          {watch() &&
            (offer().category === "club" ||
              offer().category === "business") && (
              <S.PlanContainer>
                <S.Subtitle>{t("attributes.plan.title")}</S.Subtitle>
                <S.SubtitleDescription>
                  {t("attributes.plan.status")}
                </S.SubtitleDescription>
                <S.CheckboxContainer>
                  <S.Checkbox
                    name="planStatus"
                    type="checkbox"
                    onChange={handlePlanStatus}
                    checked={planCheckbox}
                  />
                  <S.Span>
                    {PlanObject().status === "active"
                      ? t("attributes.plan.active")
                      : t("attributes.plan.inactive")}
                  </S.Span>
                </S.CheckboxContainer>
                <S.SubtitleDescription>
                  {t("attributes.plan.dailyTickets")}
                </S.SubtitleDescription>
                <S.NumberInput
                  type="number"
                  {...registerPlan("dailyTickets", {
                    required: t("upsert.required"),
                  })}
                />
                {formStatePlan?.errors.dailyTickets &&
                  formStatePlan?.errors.dailyTickets.type && (
                    <S.Error>
                      {formStatePlan?.errors.dailyTickets.message}
                    </S.Error>
                  )}
                <S.SubtitleDescription>
                  {t("attributes.plan.monthlyTickets")}
                </S.SubtitleDescription>
                <S.NumberInput
                  type="number"
                  {...registerPlan("monthlyTickets", {
                    required: t("upsert.required"),
                  })}
                />
                {formStatePlan?.errors.monthlyTickets &&
                  formStatePlan?.errors.monthlyTickets.type && (
                    <S.Error>
                      {formStatePlan?.errors.monthlyTickets.message}
                    </S.Error>
                  )}
              </S.PlanContainer>
            )}
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
                defaultValue={offer().currency || Currencies.BRL}
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
                values={[Gateways.stripe, Gateways.stripe_global]}
                name="currency"
                onOptionChanged={(value) =>
                  setValue("gateway", value.toLowerCase().replace(" ", "_"))
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
              color={neutral[50]}
              backgroundColor={neutral[800]}
              _hover={{ bg: neutral[500] }}
              disabled={!formState?.isValid}
            >
              {t(`upsert.${mode}.save`)}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              outlineColor={neutral[800]}
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
