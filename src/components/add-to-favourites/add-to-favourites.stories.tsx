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
  resource: {
    id: 912649,
  },
};

Default.loaders = [
  () => {
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 21576164,
        username: "SteveD1972",
      }),
    );
    window.sessionStorage.setItem("type", "movie");
  },
];
