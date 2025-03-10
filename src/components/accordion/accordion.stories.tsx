import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Layouts
import StorybookLayout from "../../layout/storybook";

// Components
import Template from "./index";

// Constants
import { BACON_IPSOM } from "../../utils/constants";

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
    hasImage: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Determine if the accordion item has an image",
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
      name: "According Heading One",
      overview: BACON_IPSOM,
    },
    {
      name: "According Heading Two",
      overview: BACON_IPSOM,
    },
  ],
};

export const WithImage: Story = {
  render: (args) => <Accordion {...args} />,
};
WithImage.args = {
  label: "Lorem ipsum",
  hasImage: true,
  items: [
    {
      name: "According Heading One",
      overview: BACON_IPSOM,
    },
    {
      name: "According Heading Two",
      overview: BACON_IPSOM,
    },
  ],
};
