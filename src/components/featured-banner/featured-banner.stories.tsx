import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/FeaturedBanner",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      type: { name: "string", required: true },
      description: "Any elements you want to render inside the Featured banner element",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const FeaturedBanner = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: () => <FeaturedBanner />,
};
Default.args = {
  children: "Lorem ipsum",
};
