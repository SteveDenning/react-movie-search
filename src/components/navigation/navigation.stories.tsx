import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";
import Button from "../button";

// Variables
import { variables } from "./tests/config";

const meta: Meta<typeof Template> = {
  title: "Components/Navigation",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    toggleDrawer: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles onClick",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Navigation = (args: any) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>Open Navigation</Button>
      <Template
        open={open}
        toggleDrawer={toggleDrawer}
        {...args}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <Navigation {...args} />,
};
Default.args = {
  navItems: variables.navItems,
};
