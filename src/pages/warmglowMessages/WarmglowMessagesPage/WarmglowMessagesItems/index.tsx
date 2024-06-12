import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import WarmglowMessage from "types/entities/WarmglowMessage";
import * as S from "./styles";

type Props = {
  warmglowMessages: WarmglowMessage[];
};

function WarmglowMessagesItems({ warmglowMessages }: Props) {
  const { primary, tertiary } = theme.colors.brand;

  const { t } = useTranslation("translation", {
    keyPrefix: "warmglowMessages",
  });

  function renderWarmglowMessages() {
    return warmglowMessages.map((warmglowMessage: WarmglowMessage) => (
      <tr key={warmglowMessage?.id}>
        <th>{warmglowMessage?.id}</th>
        <th>{warmglowMessage?.message}</th>
        <th>
          {" "}
          <S.StatusTableCell
            style={{
              color:
                warmglowMessage?.status === "active"
                  ? primary[300]
                  : tertiary[400],
            }}
          >
            {warmglowMessage?.status === "active"
              ? t("attributes.active")
              : t("attributes.inactive")}
          </S.StatusTableCell>
        </th>
        <th>
          <S.ActionsTableCell>
            <Link to={`/warmglow_messages/${warmglowMessage.id}`}>
              <img src={infoIcon} alt="view warmglowMessage info" />
            </Link>

            <Link to={`/warmglow_messages/${warmglowMessage.id}/edit`}>
              <img src={editIcon} alt="edit warmglowMessage info" />
            </Link>
          </S.ActionsTableCell>
        </th>
      </tr>
    ));
  }

  return <tbody>{renderWarmglowMessages()}</tbody>;
}

export default WarmglowMessagesItems;
