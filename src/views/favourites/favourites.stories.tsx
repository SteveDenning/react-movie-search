import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Views/Favourites",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const Favourites = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Favourites {...args} />
    </Container>
  ),
};
Default.args = {};
