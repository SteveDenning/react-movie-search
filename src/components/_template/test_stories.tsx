import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Test",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles onClick",
    },
    resource: {
      control: "object",
      type: { name: "string", required: true },
      description: "Resource data to display",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Test = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Test {...args} />
    </StorybookLayout>
  ),
};
Default.args = {};
