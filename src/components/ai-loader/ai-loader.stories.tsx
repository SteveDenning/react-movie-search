import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/AI Loader",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const AILoader = () => <Template />;

export const Default: Story = {
  render: () => (
    <StorybookLayout>
      <AILoader />
    </StorybookLayout>
  ),
};
