import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "../src/views/footer/index";

const meta: Meta<typeof Template> = {
  title: "Views/Footer",
  component: Template,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Template>;

const Footer = () => <Template />;

export const Default: Story = {
  render: () => <Footer />,
};
