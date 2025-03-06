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
    user: {
      control: false,
      type: { name: "string", required: true },
      description: "User object",
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
    adult: false,
    backdrop_path: null,
    genre_ids: [28, 35],
    id: 1160956,
    original_language: "zh",
    original_title: "熊猫计划",
    overview:
      "International action star Jackie Chan is invited to the adoption ceremony of a rare baby panda, but after an international crime syndicate attempts to kidnap the bear, Jackie has to save the bear using his stunt work skills.",
    popularity: 2126.065,
    poster_path: null,
    release_date: "2024-10-01",
    title: "Panda Plan",
    video: false,
    vote_average: 6.4,
    vote_count: 47,
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
    adult: false,
    backdrop_path: null,
    genre_ids: [28, 35],
    id: 1160956,
    original_language: "zh",
    original_title: "Panda Plan",
    overview:
      "International action star Jackie Chan is invited to the adoption ceremony of a rare baby panda, but after an international crime syndicate attempts to kidnap the bear, Jackie has to save the bear using his stunt work skills.",
    popularity: 2126.065,
    poster_path: null,
    release_date: "2024-10-01",
    title: "Panda Plan",
    video: false,
    vote_average: 6.4,
    vote_count: 47,
  },
};

export const Person: Story = {
  render: (args) => (
    <Container style={{ width: "500px" }}>
      <Card {...args} />
    </Container>
  ),
};
Person.args = {
  resource: {
    adult: false,
    gender: 2,
    id: 976,
    known_for_department: "Acting",
    name: "Jason Statham",
    original_name: "Jason Statham",
    popularity: 157.203,
    profile_path: null,
    known_for: [],
  },
};
