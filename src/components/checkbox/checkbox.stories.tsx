import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Layouts
import StorybookLayout from "../../layout/storybook";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Components/Checkbox",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies SCSS variant classes to the checkbox; used to apply different styles",
    },
    label: {
      control: "text",
      type: { name: "string", required: true },
      description: "The label text associated with the checkbox element",
    },
    id: {
      control: "text",
      type: { name: "string", required: true },
      description: "Unique identifier applied to the checkbox element",
    },
    name: {
      control: "text",
      type: { name: "string", required: true },
      description: "Input name used when submitting form data",
    },
    disabled: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Disables the checkbox element and applies appropriate styling",
    },
    required: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Makes the checkbox element a required field and applies appropriate styling",
    },
    onChange: {
      control: false,
      type: { name: "string", required: true },
      action: "change",
      handleClick: {
        action: "change",
      },
      description: "Any function to run when the checkbox value is updated",
    },
    checked: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Sets whether the checkbox element is checked or unchecked",
    },
    noLabel: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Hides the checkbox's mandatory label text and displays this as an aria-label attribute",
    },

    className: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies custom classes to the checkbox element",
    },
    testId: {
      control: "text",
      type: { name: "string", required: false },
      description: "Passes a custom test ID to the component - used for unit testing",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Checkbox = (args: any) => (
  <StorybookLayout>
    <Template {...args} />
  </StorybookLayout>
);

export const Default: Story = {
  render: (args) => <Checkbox {...args} />,
};
Default.args = {
  id: "checkbox-01",
  name: "checkbox-01",
  label: "Lorem ipsum",
  checked: false,
};

export const Disabled: Story = {
  render: (args) => <Checkbox {...args} />,
};
Disabled.args = {
  id: "checkbox-02",
  name: "checkbox-02",
  label: "Lorem ipsum",
  checked: false,
  disabled: true,
};

export const Required: Story = {
  render: (args) => <Checkbox {...args} />,
};
Required.args = {
  id: "checkbox-03",
  name: "checkbox-03",
  label: "Lorem ipsum",
  checked: false,
  required: true,
};

export const NoLabel: Story = {
  render: (args) => <Checkbox {...args} />,
};
NoLabel.args = {
  id: "checkbox-04",
  name: "checkbox-04",
  label: "Lorem ipsum",
  checked: false,
  noLabel: true,
};
