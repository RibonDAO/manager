import { useAuthentication } from "contexts/authenticationContext";
import { useTranslation } from "react-i18next";
import ButtonSecondary from "components/atomics/Buttons/ButtonSecondary";
import { GoogleIcon } from "assets/icons/googleIcon";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RibonIcon from "assets/icons/ribon-icon.svg";
import * as S from "./styles";

function LoginPage(): JSX.Element {
  const { signInWithGoogle, allowed, accessToken } = useAuthentication();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation("translation", {
    keyPrefix: "login",
  });

  useEffect(() => {
    if (accessToken) {
      navigate("dashboard");
    }
  }, [accessToken, navigate]);

  return (
    <S.Container>
      <img src={RibonIcon} alt="Ribon" />
      <S.Title>{t("title")}</S.Title>
      <ButtonSecondary
        text={t("buttonText")}
        onClick={() => signInWithGoogle()}
        leftIcon={<GoogleIcon />}
      />

      {!allowed && !!state && (
        <>
          <S.TitleError>{t("errorText")}</S.TitleError>
          <S.SubTitleError>{t("errorDescription")}</S.SubTitleError>
        </>
      )}
    </S.Container>
  );
}
export default LoginPage;
