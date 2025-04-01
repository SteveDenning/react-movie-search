import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Constants
import { LORUM_IPSUM } from "../../utils/constants";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Overview",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resource: {
      control: "object",
      type: { name: "string", required: false },
      description: "The resource object containing metadata such as id, title, name, or author.",
    },
    text: {
      control: "text",
      type: { name: "string", required: true },
      description: "The full text content for the overview.",
    },
    limit: {
      control: "number",
      type: { name: "string", required: false },
      description: "The character limit before truncating the text and showing the 'More' button.",
      defaultValue: 400,
    },
    copyText: {
      control: "boolean",
      description: "If true, applies a 'copy' style class to the text.",
      defaultValue: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Modal = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Modal {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  resource: {
    id: 1,
    title: "Title",
    name: "Name",
  },
  text: LORUM_IPSUM,
  limit: 400,
};
