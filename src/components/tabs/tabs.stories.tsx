import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Layouts
import StorybookLayout from "../../layout/storybook";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/Tabs",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies SCSS variant classes to the tabs; used to apply different styles",
    },
    className: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies custom classes to the tabs",
    },
    tabs: {
      control: "text",
      type: { name: "string", required: true },
      description: "Array of tab objects - e.g. [{label: string, payload: any}]",
    },
    onClick: {
      control: false,
      type: { name: "string", required: true },
      action: "clicked",
      handleClick: {
        action: "clicked",
      },
      description: "Function to run when a tab is clicked",
    },
    initialSelection: {
      control: "text",
      type: { name: "string", required: false },
      description: "Uses tab.label to pre-select a tab when the component renders",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Tabs = (args: any) => (
  <StorybookLayout>
    <Template {...args} />
  </StorybookLayout>
);

export const Default: Story = {
  render: (args) => <Tabs {...args} />,
};
Default.args = {
  tabs: [
    { label: "Tab 1", payload: "tab-01" },
    { label: "Tab 2", payload: "tab-02" },
  ],
  onClick: () => {},
  initialSelection: "Tab 2",
};
