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

const SectionHeading = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <SectionHeading {...args} />
    </Container>
  ),
};
Default.args = {
  heading: "Lorem ipsum dolor sit amet",
};

export const withLink: Story = {
  render: (args) => (
    <Container>
      <SectionHeading {...args} />
    </Container>
  ),
};

withLink.args = {
  heading: "Lorem ipsum dolor sit amet",
  buttonLink: "#",
  buttonText: "View More",
};

export const backButton: Story = {
  render: (args) => (
    <Container>
      <SectionHeading {...args} />
    </Container>
  ),
};

backButton.args = {
  heading: "Lorem ipsum dolor sit amet",
  backButton: true,
};
