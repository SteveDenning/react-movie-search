import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/AI Loader",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const AILoader = () => <Template />;

export const Default: Story = {
  render: () => (
    <Container style={{ minHeight: "50vh" }}>
      <AILoader />
    </Container>
  ),
};
