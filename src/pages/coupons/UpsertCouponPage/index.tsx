import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { logError } from "services/crashReport";
import theme from "styles/theme";
import Coupon from "types/entities/Coupon";
import useCoupons from "hooks/apiHooks/useCoupons";
import InfoName from "components/moleculars/infoName";
import {
  dateISOFormatter,
  dateISOFormatterFromString,
} from "lib/dateISOFormatter";
import CouponMessage from "types/entities/CouponMessage";
import * as S from "./styles";

export type Props = {
  isEdit?: boolean;
};

function UpsertCouponPage({ isEdit }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons",
  });

  const mode = isEdit ? "edit" : "create";

  const { neutral } = theme.colors;
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCoupon, createCoupon, updateCoupon } = useCoupons();
  const {
    register,
    setValue,
    getValues: coupon,
    reset,
    handleSubmit,
    formState,
  } = useForm<Coupon>({ mode: "onChange", reValidateMode: "onChange" });

  const {
    register: registerCouponMessage,
    reset: resetCouponMessage,
    getValues: CouponMessageObject,
  } = useForm<CouponMessage>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [statusCheckbox, setStatusCheckbox] = useState(true);
  const [expirationDateCheckbox, setExpirationDateCheckbox] = useState(true);

  const fetchCoupon = useCallback(async () => {
    try {
      const apiCoupon = await getCoupon(id);
      setStatusCheckbox(apiCoupon.status === "active");
      if (apiCoupon.couponMessage) {
        resetCouponMessage(apiCoupon.couponMessage);
      }
      if (apiCoupon.expirationDate)
        apiCoupon.expirationDate = dateISOFormatterFromString(
          apiCoupon.expirationDate,
        );
      setExpirationDateCheckbox(!apiCoupon.expirationDate);

      reset(apiCoupon);
    } catch (e) {
      logError(e);
    }
  }, []);

  const handleActivityCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    setValue("status", checked ? "active" : "inactive");
    setStatusCheckbox(!statusCheckbox);
  };

  const handleExpirationDateCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target;
    if (checked) {
      setValue("expirationDate", undefined);
    }
    setExpirationDateCheckbox(!expirationDateCheckbox);
  };

  const handleSave = async () => {
    if (coupon()) {
      const couponObject: any = {
        id: coupon().id,
        expirationDate: coupon().expirationDate,
        status: coupon().status,
        numberOfTickets: coupon().numberOfTickets,
        availableQuantity: coupon().availableQuantity,
        couponMessageAttributes: CouponMessageObject(),
      };
      try {
        if (isEdit) {
          await updateCoupon(couponObject);
        } else {
          await createCoupon(couponObject);
        }
        navigate("/coupons");
      } catch (e) {
        logError(e);
      }
    }
  };

  const handleCancel = () => {
    navigate("/coupons");
  };

  useEffect(() => {
    if (isEdit) {
      fetchCoupon();
    } else {
      const newCoupon: Coupon = {
        expirationDate: "",
        status: "active",
        numberOfTickets: 0,
        availableQuantity: 0,
        couponMessage: {
          rewardText: "",
        },
      };
      reset(newCoupon);
    }
  }, []);

  return (
    <>
      <S.Title>{t(`upsert.${mode}.title`)}</S.Title>
      <form onSubmit={handleSubmit(handleSave)}>
        <S.Container>
          <InfoName>{t("attributes.status")}</InfoName>
          <S.CheckboxContainer>
            <S.Checkbox
              name="status"
              type="checkbox"
              onChange={handleActivityCheckboxChange}
              checked={statusCheckbox}
            />
            <S.Span>{t(`attributes.${coupon().status}`)}</S.Span>{" "}
          </S.CheckboxContainer>

          <InfoName>{t("attributes.expiration")}</InfoName>
          <S.TextInput
            type="datetime-local"
            min={dateISOFormatter(new Date()).toString()}
            {...register("expirationDate")}
            disabled={expirationDateCheckbox}
          />
          <S.CheckboxContainer>
            <S.Checkbox
              type="checkbox"
              onChange={handleExpirationDateCheckboxChange}
              checked={expirationDateCheckbox}
            />
            <S.Span>{t("attributes.noExpires")}</S.Span> <br />
          </S.CheckboxContainer>
          <InfoName>{t("attributes.ticketsQuantity")}</InfoName>
          <S.NumberInput type="number" {...register("numberOfTickets")} />
          <InfoName>{t("attributes.availableQuantity")}</InfoName>
          <S.NumberInput type="number" {...register("availableQuantity")} />
          <InfoName>{t("attributes.reward")}</InfoName>
          <S.TextInput
            type="text"
            {...registerCouponMessage("rewardText", {
              required: t("upsert.required"),
            })}
          />
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
              {t("upsert.save")}
            </Button>

            <Button
              color={neutral[800]}
              backgroundColor={neutral[50]}
              outlineColor={neutral[800]}
              marginLeft="8px"
              onClick={handleCancel}
            >
              {t("upsert.cancel")}
            </Button>
          </S.ButtonContainer>
        </S.ContentSection>
      </form>
    </>
  );
}

UpsertCouponPage.defaultProps = {
  isEdit: false,
};

export default UpsertCouponPage;
