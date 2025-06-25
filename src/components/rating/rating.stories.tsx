import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Rating",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: true },
      description: "Resource data to display",
    },
    percentage: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Display the rating as a percentage",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Rating = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Rating {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  resource: 7.5,
  percentage: false,
};

export const WithPercentage: Story = {
  render: (args) => (
    <StorybookLayout>
      <Rating {...args} />
    </StorybookLayout>
  ),
};
WithPercentage.args = {
  resource: 7.5,
  percentage: true,
};

export const LowScore: Story = {
  render: (args) => (
    <StorybookLayout>
      <Rating {...args} />
    </StorybookLayout>
  ),
};
LowScore.args = {
  resource: 5,
  percentage: true,
};
