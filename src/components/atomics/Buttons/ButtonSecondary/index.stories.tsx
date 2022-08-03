import { ComponentStory, ComponentMeta } from "@storybook/react";
import ButtonSecondary, { Props } from ".";

export default {
  title: "ButtonSecondary",
  component: ButtonSecondary,
} as ComponentMeta<typeof ButtonSecondary>;

const Template: ComponentStory<typeof ButtonSecondary> = function (
  args: Props,
) {
  return <ButtonSecondary {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "ButtonSecondary",
  borderColor: "darkGray",
  color: "ribonBlack",
};
