import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Voice Input",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    setValue: {
      control: false,
      type: { name: "function", required: true },
      description: "Function to set the value of the input",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Template>;

const VoiceInput = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <VoiceInput {...args} />
    </Container>
  ),
};
Default.args = {
  setValue: (value: string) => alert(value),
};
