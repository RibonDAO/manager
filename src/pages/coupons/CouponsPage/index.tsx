import AddIcon from "assets/icons/addIcon";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import theme from "styles/theme";
import CouponsListSection from "./CouponsListSection";
import * as S from "./styles";

function CouponsPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "coupons",
  });

  const { neutral } = theme.colors;

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/coupons/new");
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.AddButton
        color={neutral[50]}
        backgroundColor={neutral[800]}
        _hover={{ bg: neutral[500] }}
        marginLeft="8px"
        onClick={handleAddNew}
        leftIcon={AddIcon()}
      >
        {t("createNew")}
      </S.AddButton>
      <CouponsListSection />
    </S.Container>
  );
}

export default CouponsPage;
