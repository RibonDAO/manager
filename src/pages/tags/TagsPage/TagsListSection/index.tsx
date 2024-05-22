import { Button } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logError } from "services/crashReport";
import AddIcon from "assets/icons/addIcon";
import theme from "styles/theme";
import Tag from "types/entities/Tag";
import useTags from "hooks/apiHooks/useTags";
import * as S from "./styles";
import TagsItems from "../TagsItems";

function TagsListSection(): JSX.Element {
  const [tags, setTags] = useState<Tag[]>([]);
  const { getTags } = useTags();
  const { t } = useTranslation("translation", {
    keyPrefix: "tags",
  });
  const [currentTags, setCurrentTags] = useState<Tag[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/tags/new");
  };

  const fetchTags = useCallback(async () => {
    try {
      const allTags = await getTags();
      setTags(allTags);
    } catch (e) {
      logError(e);
    }
  }, [setTags]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = tags.slice(itemOffset, endOffset);

    setCurrentTags(allItems);

    setPageCount(Math.ceil(tags.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, tags]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % tags.length;

    setItemOffset(newOffset);
  };

  return (
    <S.Container>
      <S.ButtonContainer>
        <Button
          color={neutral[50]}
          backgroundColor={neutral[800]}
          _hover={{ bg: neutral[500] }}
          marginLeft="8px"
          marginRight="8px"
          onClick={handleAddNew}
          leftIcon={AddIcon()}
        >
          {t("createNew")}
        </Button>
      </S.ButtonContainer>

      <S.Table>
        <thead>
          <tr>
            <th>{t("attributes.id")}</th>
            <th>{t("attributes.name")}</th>
            <th>{t("attributes.status")}</th>
            <th>{t("attributes.nonProfits")}</th>
          </tr>
        </thead>
        <TagsItems tags={currentTags} />
      </S.Table>

      <S.Pagination
        breakLabel="..."
        previousLabel={t("previous")}
        nextLabel={t("next")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={pageCount}
      />
    </S.Container>
  );
}

export default TagsListSection;
