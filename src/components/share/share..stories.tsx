import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Share",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      type: { name: "string", required: true },
      description: "The title of the programme passed as the subject when sharing by email",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Share = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Share {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  title: "Jaws 3",
};
