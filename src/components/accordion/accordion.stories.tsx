import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Layouts
import StorybookLayout from "../../layouts/storybook";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/Accordion",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "text",
      type: { name: "string", required: true },
      description: "Array of accordion items - each container a title and content ",
    },
    label: {
      control: "text",
      type: { name: "string", required: true },
      description: "Unique identifier to set item keys",
    },
    reversed: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Reverses the display of the toggle arrow",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Accordion = (args: any) => (
  <StorybookLayout>
    <Template {...args} />
  </StorybookLayout>
);

export const Default: Story = {
  render: (args) => <Accordion {...args} />,
};
Default.args = {
  label: "Lorem ipsum",
  items: [
    {
      title: "Lorem ipsum",
      content: "This is some toggle content",
    },
  ],
};
