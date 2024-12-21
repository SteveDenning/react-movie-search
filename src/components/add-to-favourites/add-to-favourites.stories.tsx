import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Favourites Button",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const AddToFavourites = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <AddToFavourites {...args} />
    </Container>
  ),
};
Default.args = {
  isFavourite: false,
  handleFavorite: (isFavourite) => alert(isFavourite),
};

export const Favourite: Story = {
  render: (args) => (
    <Container>
      <AddToFavourites {...args} />
    </Container>
  ),
};
Favourite.args = {
  isFavourite: true,
  handleFavorite: (isFavourite) => alert(isFavourite),
};
