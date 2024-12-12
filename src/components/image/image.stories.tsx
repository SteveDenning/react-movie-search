import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Image",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: true },
      description: "Resource data to display image and attributes",
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large", "fill"],
      description: "Size of the image",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Image = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Image {...args} />
    </Container>
  ),
};
Default.args = {
  resource: "Lorem ipsum",
  size: "small",
};
