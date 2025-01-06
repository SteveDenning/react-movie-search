import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        // Default values
        { name: "Dark", value: "#333" },
        { name: "Light", value: "#F7F9F2" },
        // Custom values
        { name: "Purple", value: "#4a027e" },
      ],
      default: "Dark",
    },
  },
};

export default preview;
