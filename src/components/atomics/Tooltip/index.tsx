import { useState } from "react";
import * as S from "./styles";

export type Props = {
  children: JSX.Element;
  color?: string;
  text: string;
  triggerOnClick?: boolean;
};

function Tooltip({
  children,
  color,
  text,
  triggerOnClick,
}: Props): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  const clickHandler = () => {
    if (triggerOnClick) showTip();
  };

  const mouseEnterHandler = () => {
    if (!triggerOnClick) showTip();
  };

  return (
    <S.Container
      onClick={clickHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <S.TooltipTip color={color}>{text}</S.TooltipTip>}
    </S.Container>
  );
}

Tooltip.defaultProps = {
  color: null,
  triggerOnClick: false,
};

export default Tooltip;
