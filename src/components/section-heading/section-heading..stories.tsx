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
  argTypes: {},
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
