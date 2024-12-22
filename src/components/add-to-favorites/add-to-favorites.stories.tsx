import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Add To Favorites Button",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    isFavorite: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles display of the favourite icon",
    },
    handleFavorite: {
      control: false,
      type: { name: "function", required: true },
      description: "Function to be called to trigger the favorite action",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const AddToFavorites = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <AddToFavorites {...args} />
    </Container>
  ),
};
Default.args = {
  isFavorite: false,
  handleFavorite: () => null,
};
