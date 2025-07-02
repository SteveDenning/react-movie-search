import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/ToggleSwitch",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles onChange event",
    },
    checked: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Controls the checked state of the toggle switch",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const ToggleSwitch = (args: any) => {
  const { checked } = args;

  const [checkedState, setCheckedState] = React.useState(checked);

  return (
    <Template
      checked={checkedState}
      onChange={() => setCheckedState(!checkedState)}
    />
  );
};

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <ToggleSwitch {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  checked: false,
  onChange: (checked: boolean) => console.log("Toggle Switch changed:", checked),
};

export const Disabled: Story = {
  render: (args) => (
    <StorybookLayout>
      <ToggleSwitch {...args} />
    </StorybookLayout>
  ),
};
Disabled.args = {
  checked: false,
  onChange: () => {},
  disabled: true,
};
