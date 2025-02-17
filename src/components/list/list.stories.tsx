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
  argTypes: {
    items: {
      control: "text",
      type: { name: "string", required: true },
      description: "Array of items to display in the list",
    },
    onClick: {
      control: false,
      type: { name: "function", required: false },
      description: "Function to be called when the list item is clicked",
    },
    variant: {
      control: "radio",
      options: ["banner", "resource"],
      type: { name: "string", required: false },
      description: "Applies variant classes to remove the border radius in the banner or add a box shadow for resources",
    },
  },
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
Default.args = {
  items: [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Profile", path: "/profiles" },
  ],
};

export const Link: Story = {
  render: (args) => (
    <Container>
      <List {...args} />
    </Container>
  ),
};
Link.args = {
  items: [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Profile", path: "/profiles" },
  ],
  variant: "link",
};

export const Panel: Story = {
  render: (args) => (
    <Container>
      <List {...args} />
    </Container>
  ),
};
Panel.args = {
  items: [
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [28, 14, 35],
      id: 845781,
      original_language: "en",
      original_title: "Red One",
      overview:
        "After Santa Claus (codename: Red One) is kidnapped, the North Pole's Head of Security must team up with the world's most infamous tracker in a globe-trotting, action-packed mission to save Christmas.",
      popularity: 6741.399,
      poster_path: null,
      release_date: "2024-10-31",
      title: "Red One",
      video: false,
      vote_average: 7,
      vote_count: 974,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [16, 12, 10751, 35],
      id: 1241982,
      original_language: "en",
      original_title: "Moana 2",
      overview:
        "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
      popularity: 2865.481,
      poster_path: null,
      release_date: "2024-11-21",
      title: "Moana 2",
      video: false,
      vote_average: 7,
      vote_count: 532,
    },
  ],
  variant: "tile",
  onClick: () => alert("clicked"),
};
