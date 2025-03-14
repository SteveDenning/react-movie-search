import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Video",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    youTubeKey: {
      control: "text",
      type: { name: "string", required: true },
      description: "YouTube key for selected video",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Video = (args: any) => {
  return (
    <div>
      <Template {...args} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Video {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  youTubeKey: "hwS5HIPb5mM",
  playing: false,
  responsive: true,
};
