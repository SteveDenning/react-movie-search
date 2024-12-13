import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Image Modal",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: true },
      description: "Resource data to display the image",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const ImageModal = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <ImageModal {...args} />
    </Container>
  ),
};
Default.args = {};
