import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

// MUI Icons
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const meta: Meta<typeof Template> = {
  title: "Components/Button",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      type: { name: "string", required: false },
      description: "Unique identifier to set as the button's id",
    },
    children: {
      control: "text",
      type: { name: "string", required: true },
      description: "Any elements you want to render inside the Button element",
    },
    className: {
      control: "text",
      type: { name: "string", required: false },
      description: "Applies custom classes to the Button element",
    },
    variant: {
      control: "radio",
      options: ["filled", "outlined", "link"],
      type: { name: "string", required: false },
      description: "Applies variant classes to the button to control style - defaults to 'filled'",
    },
    color: {
      control: "radio",
      options: ["blue", "orange", "pink", "red", "purple", "lavender", "lilac"],
      type: { name: "string", required: false },
      description: "Applies a color class to the button",
    },
    onClick: {
      control: false,
      type: { name: "function", required: false },
      description: "Function to be called when the button is clicked",
    },
    startIcon: {
      control: false,
      type: { name: "string", required: false },
      description: "Icon to appear before the button text",
    },
    endIcon: {
      control: false,
      type: { name: "string", required: false },
      description: "Icon to appear after the button text>",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Button = (args: any) => (
  <StorybookLayout>
    <Template {...args} />
  </StorybookLayout>
);

export const Default: Story = {
  render: (args) => <Button {...args} />,
};
Default.args = {
  children: "Lorem ipsum",
  color: "blue",
};

export const Outlined: Story = {
  render: (args) => <Button {...args} />,
};
Outlined.args = {
  children: "Lorem ipsum",
  color: "blue",
  variant: "outlined",
};

export const Link: Story = {
  render: (args) => <Button {...args} />,
};
Link.args = {
  children: "Link Text",
  color: "blue",
  variant: "link",
};

export const Icon: Story = {
  render: (args) => <Button {...args} />,
};
Icon.args = {
  children: <Person3OutlinedIcon />,
  variant: "icon",
};

export const StartIcon: Story = {
  render: (args) => <Button {...args} />,
};
StartIcon.args = {
  children: "Lorem ipsum",
  startIcon: <ChevronLeftIcon />,
};

export const EndIcon: Story = {
  render: (args) => <Button {...args} />,
};
EndIcon.args = {
  children: "Lorem ipsum",
  endIcon: <ChevronRightIcon />,
};
