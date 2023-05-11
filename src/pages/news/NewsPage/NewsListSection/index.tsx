import useArticles from "hooks/apiHooks/useArticles";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import AddIcon from "assets/icons/addIcon";
import {logError} from "services/crashReport";
import {Article, Languages} from "@ribon.io/shared/types";
import {useNavigate} from "react-router";
import theme from "styles/theme";
import {useLanguage} from "hooks/useLanguage";
import NewsItems from "../NewsItems";
import * as S from "./styles";

interface LanguageObject {
  [key: string]: boolean;
}

function NewsListSection(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const { getArticles } = useArticles();
  const { t } = useTranslation("translation", {
    keyPrefix: "news",
  });
  const [currentArticles, setCurrentArticles] = useState<Article[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { currentLang } = useLanguage();
  const defaultLanguageSelection = {
    pt: currentLang === Languages.PT,
    en: currentLang === Languages.EN,
  };
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageObject>(
    defaultLanguageSelection,
  );

  const fetchArticles = useCallback(async () => {
    try {
      const allArticles = await getArticles();
      setArticles(allArticles);
    } catch (e) {
      logError(e);
    }
  }, [setArticles]);

  const filterArticlesByLanguage = (nonFilteredArticles: Article[]) =>
    nonFilteredArticles.filter((articleData: Article) => {
      if (articleData.language) {
        const articleLanguage = articleData.language.toString().split("-")[0];
        if (selectedLanguage[articleLanguage]) return articleData;
      }
      return null;
    });

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = articles.slice(itemOffset, endOffset);

    setCurrentArticles(allItems);
    setPageCount(Math.ceil(articles.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, articles]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % articles.length;

    setItemOffset(newOffset);
  };

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/news/articles/new");
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedLanguage({
      ...selectedLanguage,
      [value]: !selectedLanguage[value],
    });
  };

  return (
    <S.Container>
      <S.CheckboxContainer>
        {Object.keys(defaultLanguageSelection).map((language: any) => (
          <div key={language}>
            <S.Checkbox
              name="language"
              type="checkbox"
              value={language}
              onChange={handleLanguageChange}
              checked={selectedLanguage[language]}
            />
            <S.Span>{t(`list.languageOptions.${language}`)}</S.Span>
          </div>
        ))}
      </S.CheckboxContainer>
      <S.ButtonContainer>
        <S.AddButton
          color={neutral[50]}
          backgroundColor={neutral[800]}
          _hover={{ bg: neutral[500] }}
          marginLeft="8px"
          onClick={handleAddNew}
          leftIcon={AddIcon()}
        >
          {t("list.createNew")}
        </S.AddButton>

        <S.SearchBar
          placeholder={t("list.search")}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </S.ButtonContainer>
      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.id")}</th>
            <th>{t("attributes.content")}</th>
            <th>{t("attributes.link")}</th>
            <th>{t("attributes.author")}</th>
            <th>{t("attributes.language")}</th>
            <th>{t("attributes.publicationDate")}</th>
            <th>{t("attributes.visibility")}</th>
          </tr>
        </thead>
        <NewsItems
          searchTerm={searchTerm}
          articles={filterArticlesByLanguage(currentArticles)}
        />
      </S.Table>

      <S.Pagination
        breakLabel="..."
        previousLabel={t("list.previous")}
        nextLabel={t("list.next")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
      />
    </S.Container>
  );
}

export default NewsListSection;
