import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Notifications from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Notifications> = {
  title: "Components/Test",
  component: Notifications,
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

type Story = StoryObj<typeof Notifications>;

const Test = (args: any) => <Notifications {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Test {...args} />
    </StorybookLayout>
  ),
};
Default.args = {};
