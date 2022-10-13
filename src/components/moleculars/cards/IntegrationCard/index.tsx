import { GridItem, Text } from "@chakra-ui/react";
import warningRedIcon from "assets/icons/warning-red-icon.svg";
import warningYellowIcon from "assets/icons/warning-yellow-icon.svg";
import Tooltip from "components/atomics/Tooltip";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";

export type Props = {
  title: string;
  subtitle?: string;
  value: string;
};

const { darkGray, green, mediumGray, red, yellow, white } = theme.colors;

function IntegrationCard({ title, subtitle = "", value }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "integrations.integrationCard",
  });

  const showWarning = parseFloat(value) < 1000;
  const icon = parseInt(value, 10) === 0 ? warningRedIcon : warningYellowIcon;

  const colorAccordingToValue = () => {
    const amount = parseFloat(value);
    if (amount === 0) {
      return red;
    } else if (amount < 1000) {
      return yellow;
    }
    return green;
  };

  const textAccordingToValue = () => {
    const amount = parseFloat(value);
    if (amount === 0) {
      return t("amountEnded");
    }
    return t("amountEnding");
  };

  return (
    <Tooltip text={textAccordingToValue()} color={colorAccordingToValue()}>
      <GridItem
        height="110px"
        width="200px"
        padding="16px"
        border="1px"
        borderColor={mediumGray}
        backgroundColor={white}
        borderRadius="16px"
      >
        {showWarning && (
          <img src={icon} alt="warningIcon" style={{ float: "right" }} />
        )}
        <Text textColor={darkGray} fontWeight={600} fontSize="12px">
          {title}
        </Text>
        <Text textColor={darkGray} fontWeight={400} fontSize="12px">
          {subtitle}
        </Text>
        <Text
          textColor={colorAccordingToValue()}
          fontWeight={700}
          fontSize="16px"
        >
          {value}
        </Text>
      </GridItem>
    </Tooltip>
  );
}

IntegrationCard.defaultProps = {
  subtitle: "Assigned (USDC)",
};

export default IntegrationCard;
