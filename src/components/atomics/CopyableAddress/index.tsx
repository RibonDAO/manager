import { useTranslation } from "react-i18next";
import { useState } from "react";
import Tooltip from "components/atomics/Tooltip";
import copyIcon from "./assets/copy-icon.svg";
import * as S from "./styles";

export type Props = {
  text: string;
  icon?: string;
};

function CopyableAddress({ text, icon }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "copyableAddress",
  });

  const [currentText, setCurrentText] = useState<string>(t("copyText"));

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCurrentText(t("copiedText"));

    setTimeout(() => {
      setCurrentText(t("copyText"));
    }, 2000);
  };

  return (
    <S.Container onClick={copyText}>
      <Tooltip text={currentText}>
        <>
          <img src={icon ?? copyIcon} alt={t("copyText")} />
          <span>{text}</span>
        </>
      </Tooltip>
    </S.Container>
  );
}

export default CopyableAddress;
