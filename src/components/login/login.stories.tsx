import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Login",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      control: false,
      type: { name: "function", required: true },
      description: "Any function to run when the button is clicked",
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

const Login = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Login {...args} />
    </Container>
  ),
};
Default.args = {
  user: null,
  onClick: () => null,
};

export const LoggedInAvatar: Story = {
  render: (args) => (
    <Container>
      <Login {...args} />
    </Container>
  ),
};
LoggedInAvatar.args = {
  user: {
    avatar: {
      tmdb: {
        avatar_path: "https://image.tmdb.org/t/p/original/4dztY5QDPjiWj8e8YnenPV4J6SI.png",
      },
    },
    name: "Steve Denning",
  },
  onClick: () => null,
};

export const LoggedInInitials: Story = {
  render: (args) => (
    <Container>
      <Login {...args} />
    </Container>
  ),
};
LoggedInInitials.args = {
  user: {
    avatar: {
      tmdb: {
        avatar_path: "",
      },
    },
    name: "Steve Denning",
  },
  onClick: () => null,
};
