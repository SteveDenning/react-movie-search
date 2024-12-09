import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Card",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const Card = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Card {...args} />
    </Container>
  ),
};
Default.args = {
  resource: {
    name: "John Doe",
    title: "John Doe",
    first_air_date: "2021-01-01",
    release_date: "2021-01-01",
    known_for_department: "Acting",
  },
};
