import PersonPayment from "types/entities/PersonPayment";
import dateFormatter from "lib/dateFormatter";
import theme from "styles/theme";
import refundIcon from "assets/icons/refund-icon.svg";
import usePayments from "hooks/apiHooks/usePayments";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tooltip from "components/atomics/Tooltip";
import ModalImage from "components/moleculars/modals/ModalImage";
import { logError } from "services/crashReport";
import * as S from "./styles";

type Props = {
  purchases: PersonPayment[];
  fetchPurchases: () => void;
};

function PurchaseItems({ purchases, fetchPurchases }: Props) {
  const { neutral } = theme.colors;
  const { primary, secondary, tertiary } = theme.colors.brand;
  const { creditCardRefund } = usePayments();
  const [visible, setVisible] = useState(false);
  const [externalId, setExternalId] = useState<string>("teste");
  const { t } = useTranslation("translation", {
    keyPrefix: "purchases.list.refundModal",
  });

  const handleRefund = async () => {
    try {
      await creditCardRefund(externalId);
      fetchPurchases();
      setVisible(false);
    } catch (e: any) {
      logError(e);
    }
  };

  const statusColors: { [key: string]: string } = {
    processing: neutral[500],
    paid: primary[300],
    failed: tertiary[400],
    refunded: secondary[700],
  };

  const handleOpenModal = (id: string) => {
    setExternalId(id);
    setVisible(true);
  };

  function amountUsdc(purchase: PersonPayment) {
    if (purchase.paymentMethod === "crypto") {
      return purchase.amountCents ? purchase.amountCents / 100 : "-";
    }
    return purchase?.cryptoAmount || "-";
  }

  const isRefundable = (purchase: PersonPayment) =>
    purchase.status === "paid" &&
    (purchase.paymentMethod === "credit_card" ||
      purchase.paymentMethod === "google_pay" ||
      purchase.paymentMethod === "apple_pay");

  function renderPurchases() {
    return purchases.map((purchase: any) => (
      <tr key={purchase.id}>
        <th>{dateFormatter(purchase?.paidDate)}</th>
        <th>{purchase?.externalId || "-"}</th>
        <th>{purchase?.paymentMethod}</th>
        <th>{purchase?.payerIdentification}</th>
        <th>{purchase?.offer?.price || "-"}</th>
        <th>{amountUsdc(purchase)}</th>
        <th>
          <S.StatusTableCell style={{ color: statusColors[purchase?.status] }}>
            {purchase?.status}
          </S.StatusTableCell>
        </th>

        {isRefundable(purchase) && (
          <th>
            <S.RefundButton
              onClick={() => handleOpenModal(purchase.externalId)}
            >
              <Tooltip text={t("tooltipText")} color={neutral[800]}>
                <S.RefundIcon src={refundIcon} />
              </Tooltip>
            </S.RefundButton>

            <ModalImage
              title={t("title")}
              body={t("body")}
              visible={visible}
              image={refundIcon}
              primaryButtonText={t("confirmButton")}
              primaryButtonColor={tertiary[400]}
              primaryButtonCallback={handleRefund}
              secondaryButtonText={t("cancelButton")}
              secondaryButtonBorderColor={neutral[500]}
              secondaryButtonCallback={() => setVisible(false)}
              onClose={() => setVisible(false)}
            />
          </th>
        )}
      </tr>
    ));
  }

  return <tbody>{renderPurchases()}</tbody>;
}

export default PurchaseItems;
