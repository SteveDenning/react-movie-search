import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Section Header",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const Test = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Test {...args} />
    </Container>
  ),
};
Default.args = {
  text: "Lorem ipsum dolor sit amet",
};

export const withLink: Story = {
  render: (args) => (
    <Container>
      <Test {...args} />
    </Container>
  ),
};
withLink.args = {
  text: "Lorem ipsum dolor sit amet",
  buttonLink: "#",
  buttonText: "View More",
};
