import { Link } from "react-router-dom";
import infoIcon from "assets/icons/info-icon.svg";
import editIcon from "assets/icons/edit-icon.svg";
import CopyableAddress from "components/atomics/CopyableAddress";
import { Article } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import dateFormatterWithMinutes from "lib/dateFormatterWithMinutes";
import * as S from "./styles";

type Props = {
  articles: Article[];
  searchTerm: string;
};

function NewsItems({ articles, searchTerm }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "news.attributes.visibilityOptions",
  });

  const { primary, tertiary } = theme.colors.brand;

  function filteredArticles(nonFilteredArticles: any) {
    return nonFilteredArticles.filter((articleData: any) => {
      if (searchTerm === "") {
        return articleData;
      } else if (
        articleData?.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return articleData;
      } else {
        return null;
      }
    });
  }

  function renderArticles() {
    return (
      articles &&
      filteredArticles(articles).map((article: Article) => (
        <tr key={article.id}>
          <th>{article?.id}</th>
          <th>
            <S.ElipsedTableCell>{article?.title}</S.ElipsedTableCell>
          </th>
          <th>
            <CopyableAddress text={article?.link ?? ""} />
          </th>
          <th>{article.author.name}</th>
          <th>{article?.language}</th>
          <th>{dateFormatterWithMinutes(article?.publishedAt)}</th>
          <th style={{ color: article.visible ? primary[300] : tertiary[400] }}>
            {article.visible ? t("visible") : t("hidden")}
          </th>
          <th>
            <S.ActionsTableCell>
              <Link to={`/news/articles/${article.id}`}>
                <img src={infoIcon} alt="view article info" />
              </Link>

              <Link to={`/news/articles/${article.id}/edit`}>
                <img src={editIcon} alt="edit article info" />
              </Link>
            </S.ActionsTableCell>
          </th>
        </tr>
      ))
    );
  }

  return <tbody>{renderArticles()}</tbody>;
}

export default NewsItems;
