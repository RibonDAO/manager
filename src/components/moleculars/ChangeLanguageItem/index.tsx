import ButtonSwitch from "components/atomics/Buttons/ButtonSwitch";
import { useLanguage } from "hooks/useLanguage";
import * as S from "./styles";

function ChangeLanguageItem(): JSX.Element {
  const { currentLang, handleSwitchLanguage } = useLanguage();

  function handleSwitch() {
    handleSwitchLanguage();
  }

  return (
    <S.Container>
      <ButtonSwitch
        leftText="PT"
        rightText="EN"
        onSwitch={() => handleSwitch()}
        initialCheckState={currentLang === "en"}
      />
    </S.Container>
  );
}

export default ChangeLanguageItem;
