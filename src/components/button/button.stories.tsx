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
      options: ["orange", "pink", "teal", "yellow", "lilac", "purple", "red", "green", "transparent", "white"],
      type: { name: "string", required: false },
      description: "Applies variant classes to the button to control element colours",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Button = (args: any) => <Template {...args} />;

export const Filled: Story = {
  render: (args) => <Button {...args} />,
};
Filled.args = {
  children: "Lorem ipsum",
};
