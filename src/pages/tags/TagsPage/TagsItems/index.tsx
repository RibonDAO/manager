import theme from "styles/theme";
import { useTranslation } from "react-i18next";
import Tag from "types/entities/Tag";
import { Link } from "react-router-dom";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import * as S from "./styles";

type Props = {
  tags: Tag[];
};

function TagsItems({ tags }: Props) {
  const { primary, tertiary } = theme.colors.brand;

  const { t } = useTranslation("translation", {
    keyPrefix: "tags",
  });

  function renderTags() {
    return tags.map((tag: Tag) => (
      <tr key={tag?.id}>
        <th>{tag?.id}</th>
        <th>{tag?.name}</th>
        <th>
          {" "}
          <S.StatusTableCell
            style={{ color: tag?.status ? primary[300] : tertiary[400] }}
          >
            {tag?.status ? t("attributes.active") : t("attributes.inactive")}
          </S.StatusTableCell>
        </th>
        <th>
          {tag?.nonProfits
            ? tag.nonProfits.map((nonProfit: any) => nonProfit.name).join(", ")
            : "-"}
        </th>
        <th>
          <S.ActionsTableCell>
            <Link to={`/tags/${tag.id}`}>
              <img src={infoIcon} alt="view tag info" />
            </Link>

            <Link to={`/tags/${tag.id}/edit`}>
              <img src={editIcon} alt="edit tag info" />
            </Link>
          </S.ActionsTableCell>
        </th>
      </tr>
    ));
  }

  return <tbody>{renderTags()}</tbody>;
}

export default TagsItems;
