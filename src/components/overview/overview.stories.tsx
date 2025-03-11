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
  argTypes: {},
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
