import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/Button",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      type: { name: "string", required: false },
      description: "Unique identifier to set as the button's id",
    },
    children: {
      control: "text",
      type: { name: "string", required: true },
      description: "Any elements you want to render inside the Button element",
    },
    className: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies custom classes to the Button element",
    },
    variant: {
      control: "radio",
      options: ["filled", "outlined", "link"],
      type: { name: "string", required: false },
      description: "Applies variant classes to the button to control style - defaults to 'filled'",
    },
    color: {
      control: "radio",
      options: ["blue", "purple"],
      type: { name: "string", required: false },
      description: "Applies variant classes to the button to control element colours",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Button = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => <Button {...args} />,
};
Default.args = {
  children: "Lorem ipsum",
  color: "blue",
};
