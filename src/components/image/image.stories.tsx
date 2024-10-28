import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/Image",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "text",
      type: { name: "string", required: true },
      description: "Any elements you want to render inside the Button element",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Image = (args: any) => <Template {...args} />;

export const Filled: Story = {
  render: (args) => <Image {...args} />,
};
Filled.args = {
  resource: "Lorem ipsum",
};
