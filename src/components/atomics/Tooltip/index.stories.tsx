import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip, { Props } from ".";

export default {
  title: "Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = function (args: Props) {
  return <Tooltip {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  children: <span>TEST</span>,
  text: "Hi! I'm a cool tooltip",
};
