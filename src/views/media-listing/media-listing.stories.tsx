import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Views/MediaListing",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const MediaListing = () => (
  <StorybookLayout>
    <Template />
  </StorybookLayout>
);

export const Default: Story = {
  render: () => <MediaListing />,
};
Default.args = {};
