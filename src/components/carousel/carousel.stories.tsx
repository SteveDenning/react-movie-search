import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

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
  render: (args) => <Video {...args} />,
};
Default.args = {
  resources: [
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
    {
      adult: false,
      backdrop_path: "",
      genre_ids: [28, 878, 12, 53],
      id: 912649,
      original_language: "en",
      original_title: "Place Holder",
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie's last dance.",
      popularity: 9486.301,
      poster_path: "",
      release_date: "2024-10-22",
      title: "Place Holder",
      video: false,
      vote_average: 6.76,
      vote_count: 1551,
    },
  ],
};
