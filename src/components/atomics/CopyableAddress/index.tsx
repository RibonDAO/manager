import { useTranslation } from "react-i18next";
import Tooltip from "components/atomics/Tooltip";
import copyIcon from "./assets/copy-icon.svg";
import * as S from "./styles";

export type Props = {
  text: string;
};

function CopyableAddress({ text }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.copyableAddress",
  });

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <S.Container onClick={copyText}>
      <Tooltip text={t("successTooltipText")} triggerOnClick>
        <img src={copyIcon} alt={t("alternativeText")} />
      </Tooltip>
      <span>{text}</span>
    </S.Container>
  );
}

export default CopyableAddress;
