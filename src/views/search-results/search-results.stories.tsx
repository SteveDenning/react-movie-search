import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

// MUI
import { Container } from "@mui/material";

const meta: Meta<typeof Template> = {
  title: "Views/SearchResults",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const SearchResults = () => (
  <StorybookLayout>
    <Template />
  </StorybookLayout>
);

export const Default: Story = {
  render: () => (
    <Container>
      <SearchResults />
    </Container>
  ),
};
Default.args = {};
