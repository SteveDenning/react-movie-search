import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/List",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const List = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <List {...args} />
    </Container>
  ),
};
Default.args = {};
