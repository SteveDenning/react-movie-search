import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Components/Pagination",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: "number",
      type: { name: "string", required: true },
      description: "The total number pages",
    },
    page: {
      control: "number",
      type: { name: "string", required: true },
      description: "The current page number being displayed",
    },
    onChangePage: {
      control: false,
      type: { name: "function", required: true },
      description: "Function to be run to update the pageNumber",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Pagination = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <Container>
      <Pagination {...args} />
    </Container>
  ),
};
Default.args = {
  count: 200,
  page: 1,
};
