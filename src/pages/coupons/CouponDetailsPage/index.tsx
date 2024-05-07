import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { logError } from "services/crashReport";
import { Link } from "react-router-dom";
import EditIcon from "assets/icons/editIcon";
import theme from "styles/theme";
import InfoName from "components/moleculars/infoName";
import { Button } from "@chakra-ui/react";
import useCoupons from "hooks/apiHooks/useCoupons";
import CopyableAddress from "components/atomics/CopyableAddress";
import dateFormatter from "lib/dateFormatter";
import linkIcon from "./assets/linkIcon.svg";
import * as S from "./styles";

function CouponDetailsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons",
  });
  const { neutral } = theme.colors;

  const [Coupon, setCoupon] = useState<any>([]);
  const { id } = useParams();
  const { primary, tertiary } = theme.colors.brand;

  const statusColors: { [key: string]: string } = {
    active: primary[300],
    inactive: tertiary[400],
  };

  const { getCoupon } = useCoupons();

  const fetchCoupon = useCallback(async () => {
    try {
      const CouponData = await getCoupon(id);
      setCoupon(CouponData);
    } catch (e) {
      logError(e);
    }
  }, []);

  const {
    expirationDate,
    status,
    link,
    numberOfTickets,
    couponMessage,
    availableQuantity,
  } = Coupon;

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <S.Content>
      <S.Title>{t("details")}</S.Title>

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

          <InfoName>{t("attributes.id")}</InfoName>
          <S.InfoValue>{id}</S.InfoValue>

          <InfoName>{t("attributes.expiration")}</InfoName>
          <S.InfoValue>{dateFormatter(expirationDate)}</S.InfoValue>

          <InfoName>{t("attributes.status")}</InfoName>
          <S.InfoValue style={{ color: `${statusColors[status]}` }}>
            {status}
          </S.InfoValue>

          <InfoName>{t("attributes.link")}</InfoName>
          <CopyableAddress text={link} icon={linkIcon} />

          <InfoName>{t("attributes.ticketsQuantity")}</InfoName>
          <S.InfoValue>{numberOfTickets}</S.InfoValue>

          <InfoName>{t("attributes.availableQuantity")}</InfoName>
          <S.InfoValue>{availableQuantity}</S.InfoValue>

          <InfoName>{t("attributes.reward")}</InfoName>
          <S.InfoValue>{couponMessage?.rewardText}</S.InfoValue>
        </S.LeftSection>
      </S.Container>
    </S.Content>
  );
}

export default CouponDetailsPage;
