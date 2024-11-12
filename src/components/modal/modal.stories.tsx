import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";
import Button from "../../components/button";

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
    header: {
      control: "text",
      type: { name: "string", required: false },
      description: "Any react node to optionally display in the modal window header area",
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
  children: (
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum animi veniam voluptate voluptatem delectus quos corrupti praesentium cumque,
      culpa illum voluptatum doloribus aspernatur expedita non ad, sed cum excepturi pariatur!
    </p>
  ),
};

export const Large: Story = {
  render: (args) => <Modal {...args} />,
};
Large.args = {
  id: "test-modal",
  title: "Large Modal",
  children: (
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi molestiae vero similique autem repellendus eum nesciunt porro? Ipsum rem, ipsam,
      atque nemo voluptas vero adipisci debitis aut, necessitatibus deserunt ea!,
    </p>
  ),
  variant: ["large"],
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
