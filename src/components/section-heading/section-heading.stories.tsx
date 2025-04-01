import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Section Header",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: "text",
      type: { name: "string", required: true },
      description: "The main heading text displayed in the section.",
    },
    buttonLink: {
      control: "text",
      type: { name: "string", required: false },
      description: "The URL that the button should navigate to when clicked.",
    },
    buttonText: {
      control: "text",
      type: { name: "string", required: false },
      description: "The text displayed on the button.",
    },
    backButton: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Determines whether a back button should be displayed.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const SectionHeading = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <SectionHeading {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  heading: "Heading Text",
};

export const withLink: Story = {
  render: (args) => (
    <StorybookLayout>
      <SectionHeading {...args} />
    </StorybookLayout>
  ),
};

withLink.args = {
  heading: "Heading Text",
  buttonLink: "#",
  buttonText: "View More",
};

export const backButton: Story = {
  render: (args) => (
    <StorybookLayout>
      <SectionHeading {...args} />
    </StorybookLayout>
  ),
};

backButton.args = {
  heading: "Heading Text",
  backButton: true,
};
