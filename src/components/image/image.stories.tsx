import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Image",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: false },
      description: "Resource data to display image and attributes",
    },
    scale: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Scale image on hover",
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
