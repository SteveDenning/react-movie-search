import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Navigation",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles onClick",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Navigation = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Navigation {...args} />
    </Container>
  ),
};
Default.args = {};
