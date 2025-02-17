import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Tile",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "text",
      type: { name: "string", required: false },
      description: "Object containing the resource data.",
    },
    handleDelete: {
      control: false,
      type: { name: "function", required: false },
      description: "Function to run when the 'Delete' CTA has been clicked",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Tile = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Tile {...args} />
    </Container>
  ),
};
Default.args = {};
