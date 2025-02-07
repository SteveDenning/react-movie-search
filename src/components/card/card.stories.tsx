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
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: true },
      description: "Resource data to display the card",
    },
    onClick: {
      control: false,
      type: { name: "function", required: false },
      description: "Function to be called when the card is clicked",
    },
    variant: {
      control: "radio",
      options: ["banner", "resource", "details"],
      type: { name: "string", required: false },
      description: "Applies variant classes to remove the border radius in the banner or add a box shadow for resources",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Card = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container style={{ width: "500px" }}>
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

export const Banner: Story = {
  render: (args) => (
    <Container style={{ width: "500px" }}>
      <Card
        {...args}
        variant="banner"
      />
    </Container>
  ),
};
Banner.args = {
  resource: {
    name: "John Doe",
    title: "John Doe",
    first_air_date: "2021-01-01",
    release_date: "2021-01-01",
    known_for_department: "Acting",
  },
};

export const Resource: Story = {
  render: (args) => (
    <Container style={{ width: "500px" }}>
      <Card
        {...args}
        variant="resource"
      />
    </Container>
  ),
};
Resource.args = {
  resource: {
    name: "John Doe",
    title: "John Doe",
    first_air_date: "2021-01-01",
    release_date: "2021-01-01",
    known_for_department: "Acting",
  },
};
