import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Views/Header",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: "text",
      type: { name: "string", required: false },
      description: "Heading text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Header = (args: any) => (
  <StorybookLayout>
    <Template {...args} />
  </StorybookLayout>
);

export const Default: Story = {
  render: (args: any) => <Header {...args} />,
};
Default.args = {
  heading: "Lorem ipsum",
};
