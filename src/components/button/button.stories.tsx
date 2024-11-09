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
      options: ["filled", "outlined", "link", "heading"],
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

export const Filled: Story = {
  render: (args) => <Button {...args} />,
};
Filled.args = {
  children: "Button Text",
  color: "blue",
  variant: "filled",
};

export const Heading: Story = {
  render: (args) => <Button {...args} />,
};
Heading.args = {
  children: "Heading Text",
  color: "blue",
  variant: "heading",
};

export const Link: Story = {
  render: (args) => <Button {...args} />,
};
Link.args = {
  children: "Link Text",
  color: "blue",
  variant: "link",
};

export const Outlined: Story = {
  render: (args) => <Button {...args} />,
};
Outlined.args = {
  children: "Link Text",
  color: "blue",
  variant: "outlined",
};
