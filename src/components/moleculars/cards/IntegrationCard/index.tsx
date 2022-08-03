import { GridItem, Text } from "@chakra-ui/react";
import warningRedIcon from "assets/icons/warning-red-icon.svg";
import theme from "styles/theme";

type Props = {
  title: string;
  subtitle?: string;
  value: string;
  warning?: boolean;
};

const { ribonBlack, ribonBlue, lightGray } = theme.colors;

function IntegrationCard({
  title,
  subtitle = "",
  value,
  warning = false,
}: Props) {
  return (
    <GridItem
      height="97px"
      width="176px"
      padding="16px"
      border="1px"
      borderColor={lightGray}
      borderRadius="16px"
    >
      {warning && (
        <img
          src={warningRedIcon}
          alt="warningIcon"
          style={{ float: "right" }}
        />
      )}
      <Text textColor={ribonBlack} fontWeight={700} fontSize="12px">
        {title}
      </Text>
      <Text textColor={ribonBlack} fontWeight={300} fontSize="10px">
        {subtitle}
      </Text>
      <Text textColor={ribonBlue} fontWeight={700} fontSize="16px">
        {value}
      </Text>
    </GridItem>
  );
}

IntegrationCard.defaultProps = {
  subtitle: "Assigned (USDC)",
  warning: false,
};

export default IntegrationCard;
