import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardTextGraph, { Props } from ".";

export default {
  title: "CardTextGraph",
  component: CardTextGraph,
} as ComponentMeta<typeof CardTextGraph>;

const Template: ComponentStory<typeof CardTextGraph> = function (args: Props) {
  return <CardTextGraph {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  data: { datasets: [{ data: [10, 20] }] },
  title: "CardTextGraph",
  mainText: "mainText",
  rightText: "rightText",
  leftText: "leftText",
  rightSecondaryText: 10,
  leftSecondaryText: 20,
};
