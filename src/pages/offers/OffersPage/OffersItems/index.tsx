import { Link } from "react-router-dom";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import CopyableAddress from "components/atomics/CopyableAddress";

import { Offer } from "@ribon.io/shared/types";
import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import { capitalize } from "lib/capitalize";
import * as S from "./styles";

type Props = {
  offers: Offer[];
  searchTerm: string;
};

function OffersItems({ offers, searchTerm }: Props) {
  const { primary, tertiary } = theme.colors.brand;

  const { t } = useTranslation("translation", {
    keyPrefix: "offers",
  });

  function filterOffers(nonFilteredOffers: Offer[]) {
    return nonFilteredOffers.filter((offerData: Offer) => {
      if (searchTerm === "") {
        return offerData;
      } else if (offerData?.id?.toString().includes(searchTerm)) {
        return offerData;
      } else {
        return null;
      }
    });
  }

  function renderOffers() {
    return (
      offers &&
      filterOffers(offers).map((offer: Offer) => (
        <tr key={offer?.id}>
          <th>{offer?.id}</th>
          <th>{offer?.currency.toUpperCase()}</th>
          <th>{offer.priceCents}</th>
          <th>{capitalize(offer?.gateway)}</th>
          <th>
            <CopyableAddress text={offer?.externalId} />
          </th>
          <th>
            {" "}
            <S.StatusTableCell
              style={{ color: offer?.active ? primary[300] : tertiary[400] }}
            >
              {offer?.active
                ? t("attributes.active")
                : t("attributes.inactive")}
            </S.StatusTableCell>
          </th>
          <th>
            <S.ActionsTableCell>
              <Link to={`/offers/${offer.id}`}>
                <img src={infoIcon} alt="view offer info" />
              </Link>

              <Link to={`/offers/${offer.id}/edit`}>
                <img src={editIcon} alt="edit offer info" />
              </Link>
            </S.ActionsTableCell>
          </th>
        </tr>
      ))
    );
  }

  return <tbody>{renderOffers()}</tbody>;
}

export default OffersItems;
