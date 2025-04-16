import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Error",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      type: { name: "string", required: true },
      description: "Content to display within the error component",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Error = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Error {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  content: "This is an error message",
};
