import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
// import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Select",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      type: { name: "string", required: true },
      description: "Unique identifier applied to the select element",
    },
    label: {
      control: "text",
      type: { name: "string", required: true },
      description: "The label text associated with the select element",
    },
    value: {
      control: "text",
      type: { name: "string", required: true },
      description: "The current value set for the select element",
    },
    onChange: {
      control: false,
      type: { name: "string", required: true },
      action: "change",
      handleClick: {
        action: "change",
      },
      description: "Any function to run when the select value is updated",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Select = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => <Select {...args} />,
};
Default.args = {
  id: "number",
  label: "Lorem ipsum",
  value: { value: "multi", label: "All" },
  onChange: () => {
    return false;
  },
  options: [
    { value: "multi", label: "All" },
    { value: "tv", label: "TV" },
    { value: "movie", label: "Film" },
    { value: "person", label: "Actor" },
  ],
};
