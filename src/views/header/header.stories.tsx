import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

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

const Header = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => <Header {...args} />,
};

Default.args = {
  heading: "Lorem ipsum",
};
