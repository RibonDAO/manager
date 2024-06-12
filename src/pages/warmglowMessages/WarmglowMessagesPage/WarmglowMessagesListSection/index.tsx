import { Button } from "@chakra-ui/react";
import { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logError } from "services/crashReport";
import AddIcon from "assets/icons/addIcon";
import theme from "styles/theme";
import useWarmglowMessages from "hooks/apiHooks/useWarmglowMessages";
import WarmglowMessage from "types/entities/WarmglowMessage";
import * as S from "./styles";
import WarmglowMessagesItems from "../WarmglowMessagesItems";

function WarmglowMessagesListSection(): JSX.Element {
  const [WarmglowMessages, setWarmglowMessages] = useState<WarmglowMessage[]>(
    [],
  );
  const { getWarmglowMessages } = useWarmglowMessages();
  const { t } = useTranslation("translation", {
    keyPrefix: "warmglowMessages",
  });
  const [currentWarmglowMessages, setCurrentWarmglowMessages] = useState<
    WarmglowMessage[]
  >([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/warmglow_messages/new");
  };

  const fetchWarmglowMessages = useCallback(async () => {
    try {
      const allWarmglowMessages = await getWarmglowMessages();
      setWarmglowMessages(allWarmglowMessages);
    } catch (e) {
      logError(e);
    }
  }, [setWarmglowMessages]);

  useEffect(() => {
    fetchWarmglowMessages();
  }, [fetchWarmglowMessages]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const allItems = WarmglowMessages.slice(itemOffset, endOffset);

    setCurrentWarmglowMessages(allItems);

    setPageCount(Math.ceil(WarmglowMessages.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, WarmglowMessages]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % WarmglowMessages.length;

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
            <th>{t("attributes.message")}</th>
            <th>{t("attributes.status")}</th>
          </tr>
        </thead>
        <WarmglowMessagesItems warmglowMessages={currentWarmglowMessages} />
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

export default WarmglowMessagesListSection;
