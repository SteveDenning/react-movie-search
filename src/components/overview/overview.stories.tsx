import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

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
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum felis id, tincidunt nunc. Cras sit amet tincidunt nunc. Integer nec libero nec libero vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum felis id, tincidunt nunc. Cras sit amet tincidunt nunc. Integer nec libero nec libero vestibulumfelis id, tincidunt nunc. Cras sit amet tincidunt nunc. Integer nec libero nec libero vestibulum",
  limit: 400,
};
