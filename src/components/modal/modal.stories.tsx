import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";
import Button from "../button";

// Constants
import { LORUM_IPSUM } from "../../utils/constants";

const meta: Meta<typeof Template> = {
  title: "Components/Modal",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: [],
      type: { name: "string", required: false },
      description: "Applies SCSS variant classes to the modal window wrapper; used to apply different styles",
    },
    className: {
      control: "text",
      type: { name: "string", required: false },
      description: "Any custom classNames to be applied to the modal window wrapper",
    },
    id: {
      control: "text",
      type: { name: "string", required: true },
      description: "Unique identifier for modal window",
    },
    open: {
      control: "boolean",
      type: { name: "boolean", required: true },
      description: "Handles display of modal window - either hidden or visible",
    },
    handleClose: {
      control: false,
      type: { name: "function", required: true },
      description: "Function to be run when the modal window is closed",
    },
    title: {
      control: "text",
      type: { name: "string", required: true },
      description: "Main heading element to be displayed in the modal window",
    },
    children: {
      control: "text",
      type: { name: "string", required: false },
      description: "Any React node to display in the modal window body area",
    },
    footer: {
      control: "text",
      type: { name: "string", required: false },
      description: "Any React node to display in the modal window footer area",
    },
    video: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Sets the modal to contain a video element with no padding",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Modal = (args: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Template
        open={open}
        handleClose={handleClose}
        {...args}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <Modal {...args} />,
};
Default.args = {
  id: "id",
  title: "Title",
  children: LORUM_IPSUM,
  footer: <p>Footer text</p>,
};

export const Large: Story = {
  render: (args) => <Modal {...args} />,
};
Large.args = {
  id: "test-modal",
  title: "Large Modal",
  variant: ["large"],
  children: LORUM_IPSUM,
  footer: <p>Footer text</p>,
};

export const Small: Story = {
  render: (args) => <Modal {...args} />,
};
Small.args = {
  id: "test-modal",
  title: "Small Modal",
  variant: ["small"],
  children: LORUM_IPSUM,
  footer: <p>Footer text</p>,
};

export const Video: Story = {
  render: (args) => <Modal {...args} />,
};
Video.args = {
  id: "video",
  video: true,
  children: (
    <video
      controls
      width="100%"
      autoPlay
    >
      <source
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        type="video/mp4"
      />
    </video>
  ),
};

export const Text: Story = {
  render: (args) => <Modal {...args} />,
};
Text.args = {
  id: "text",
  children: LORUM_IPSUM,
};
