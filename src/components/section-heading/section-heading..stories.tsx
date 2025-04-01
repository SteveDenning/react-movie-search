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
      description: "Text passed in for the title of the header",
    },
    buttonLink: {
      control: "text",
      type: { name: "string", required: false },
      description: "URL text for the link to a page",
    },
    buttonText: {
      control: "text",
      type: { name: "string", required: false },
      description: "Text for the button link in the header",
    },
    backButton: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Option to give the text a light grey color",
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
  heading: "Lorem ipsum dolor sit amet",
};

export const withLink: Story = {
  render: (args) => (
    <StorybookLayout>
      <SectionHeading {...args} />
    </StorybookLayout>
  ),
};

withLink.args = {
  heading: "Lorem ipsum dolor sit amet",
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
  heading: "Lorem ipsum dolor sit amet",
  backButton: true,
};
