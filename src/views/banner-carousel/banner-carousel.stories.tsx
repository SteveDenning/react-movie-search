import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Views/BannerCarousel",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const BannerCarousel = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: () => <BannerCarousel />,
};
Default.args = {};
