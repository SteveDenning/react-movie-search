import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Layout
import StorybookLayout from "../../layout/storybook";

// Components
import Template from "./index";

// Variables
import { variables } from "./tests/config";

const meta: Meta<typeof Template> = {
  title: "Components/Carousel",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resources: {
      control: "text",
      type: { name: "string", required: true },
      description: "Array of items to display in the carousel",
    },
    variant: {
      control: "text",
      options: ["card", "banner", "image"],
      type: { name: "string", required: false },
      description: "Applies variant to determine the element type to render",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Carousel = (args: any) => {
  return (
    <StorybookLayout>
      <Template {...args} />
    </StorybookLayout>
  );
};

export const Default: Story = {
  render: (args) => <Carousel {...args} />,
};
Default.args = {
  resources: variables.resources,
};

export const Banner: Story = {
  render: (args) => <Carousel {...args} />,
};
Banner.args = {
  resources: variables.resources,
  variant: "banner",
  responsiveOptions: [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const Images: Story = {
  render: (args) => <Carousel {...args} />,
};
Images.args = {
  variant: "image",
  resources: variables.castResources,
  onClick: (resource) => console.log(resource),
};
