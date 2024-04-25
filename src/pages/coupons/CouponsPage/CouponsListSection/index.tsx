import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import { Link } from "react-router-dom";
import theme from "styles/theme";
import useCoupons from "hooks/apiHooks/useCoupons";
import Coupon from "types/entities/Coupon";
import CopyableAddress from "components/atomics/CopyableAddress";
import dateFormatter from "lib/dateFormatter";
import * as S from "./styles";

function CouponsListSection(): JSX.Element {
  const [coupons, setCoupons] = useState<any>([]);
  const { getAllCoupons } = useCoupons();
  const { primary, tertiary } = theme.colors.brand;

  const { t } = useTranslation("translation", {
    keyPrefix: "coupons.attributes",
  });

  const fetchCoupons = useCallback(async () => {
    try {
      const allCoupons = await getAllCoupons();
      setCoupons(allCoupons);
    } catch (e) {
      logError(e);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, []);

  function renderTableRows() {
    return coupons?.map((item: Coupon) => (
      <tr key={item.id}>
        <th>{item.id}</th>
        <th>{dateFormatter(item.expirationDate)}</th>
        <th>
          {" "}
          <S.StatusTableCell
            style={{ color: item?.status ? primary[300] : tertiary[400] }}
          >
            {item?.status ? t("active") : t("inactive")}
          </S.StatusTableCell>
        </th>
        <th>
          <CopyableAddress text={item.link} />
        </th>
        <th>{item.rewardText}</th>
        <th>{item.numberOfTickets}</th>
        <th>
          <S.ActionsTableCell>
            <Link to={`/coupons/${item?.id}`}>
              <img src={infoIcon} alt="view coupon info" />
            </Link>

            <Link to={`/coupons/${item.id}/edit`}>
              <img src={editIcon} alt="edit coupon info" />
            </Link>
          </S.ActionsTableCell>
        </th>
      </tr>
    ));
  }

  return (
    <S.Container>
      <S.Table>
        <thead>
          <tr>
            <th>{t("id")}</th>
            <th>{t("expiration")}</th>
            <th>{t("status")}</th>
            <th>{t("link")}</th>
            <th>{t("reward")}</th>
            <th>{t("tickets")}</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </S.Table>
    </S.Container>
  );
}

export default CouponsListSection;
