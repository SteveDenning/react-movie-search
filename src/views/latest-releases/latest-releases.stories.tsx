import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

const meta: Meta<typeof Template> = {
  title: "Views/LatestReleases",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const LatestReleases = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: () => <LatestReleases />,
};
Default.args = {};
