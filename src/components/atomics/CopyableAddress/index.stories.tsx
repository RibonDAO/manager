import { ComponentStory, ComponentMeta } from "@storybook/react";
import CopyableAddress, { Props } from ".";

export default {
  title: "CopyableAddress",
  component: CopyableAddress,
} as ComponentMeta<typeof CopyableAddress>;

const Template: ComponentStory<typeof CopyableAddress> = function (
  args: Props,
) {
  return <CopyableAddress {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  text: "Copyable Address",
};
