import { ButtonHTMLAttributes } from "react";
import { Button } from "@chakra-ui/react";

export type Props = {
  text: string;
  onClick: () => void;
  leftIcon?: JSX.Element;
  color?: string;
  borderColor?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonSecondary({
  text,
  onClick,
  leftIcon,
  color,
  borderColor,
}: Props): JSX.Element {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      color={color}
      borderColor={borderColor}
      leftIcon={leftIcon}
    >
      {text}
    </Button>
  );
}

ButtonSecondary.defaultProps = {
  color: "ribonBlack",
  borderColor: "darkGray",
  leftIcon: "",
};
export default ButtonSecondary;
