import React from "react";
import { Meta, StoryObj } from "@storybook/react";

// Components
import Template from "./index";

// Layout
import StorybookLayout from "../../layout/storybook";

const meta: Meta<typeof Template> = {
  title: "Components/Resources",
  component: Template,
  tags: ["autodocs"],
  argTypes: {
    resources: {
      control: "text",
      type: { name: "string", required: true },
      description: "Array of resource objects",
    },
    handlePageChange: {
      control: false,
      type: { name: "function", required: true },
      description: "Function to trigger the pagination",
    },
    count: {
      control: "text",
      type: { name: "number", required: true },
      description: "Displays the number of pages available",
    },
    page: {
      control: "text",
      type: { name: "number", required: true },
      description: "Number used to display the current page",
    },
    loading: {
      control: "boolean",
      type: { name: "boolean", required: false },
      description: "Dictates the current state of the page loading the resources",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Template>;

const Resources = (args: any) => <Template {...args} />;

export const Default: Story = {
  render: (args) => (
    <StorybookLayout>
      <Resources {...args} />
    </StorybookLayout>
  ),
};
Default.args = {
  resources: [
    {
      adult: false,
      backdrop_path: "/Ugn7ekAwY8FtaBjRBlbkt0zom2.jpg",
      genre_ids: [27, 53, 12],
      id: 578,
      original_language: "en",
      original_title: "Jaws",
      overview:
        "When the seaside community of Amity finds itself under attack by a dangerous great white shark, the town's chief of police, a young marine biologist, and a grizzled hunter embark on a desperate quest to destroy the beast before it strikes again.",
      popularity: 56.8,
      poster_path: "/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
      release_date: "1975-06-20",
      title: "Jaws",
      video: false,
      vote_average: 7.664,
      vote_count: 10447,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [27],
      id: 645900,
      original_language: "en",
      original_title: "Jaws",
      overview: "Fessenden’s unfinished remake of Spielberg’s classic.",
      popularity: 0.291,
      poster_path: "/zQ790ksu8IXI0NO3ORz8MOCMuUG.jpg",
      release_date: "1978-01-01",
      title: "Jaws",
      video: false,
      vote_average: 8,
      vote_count: 3,
    },
    {
      adult: false,
      backdrop_path: "/bFJyNFux6UjM07tCKyNvh05xnPx.jpg",
      genre_ids: [16],
      id: 514492,
      original_language: "en",
      original_title: "Jaws",
      overview: "A short film animation by Zaven Najjar about the movie.",
      popularity: 0.363,
      poster_path: "/n29QyzfangOxBlNWtfukNXXu9YQ.jpg",
      release_date: "2018-05-29",
      title: "Jaws",
      video: false,
      vote_average: 5,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/5LtSjMNw6j3LkG29Oa4O0iY5U8.jpg",
      genre_ids: [28, 80, 53],
      id: 872906,
      original_language: "hi",
      original_title: "जवान",
      overview:
        "An emotional journey of a prison warden, driven by a personal vendetta while keeping up to a promise made years ago, recruits inmates to commit outrageous crimes that shed light on corruption and injustice, in an attempt to get even with his past,  and that leads him to an unexpected reunion.",
      popularity: 54.124,
      poster_path: "/jFt1gS4BGHlK8xt76Y81Alp4dbt.jpg",
      release_date: "2023-09-07",
      title: "Jawan",
      video: false,
      vote_average: 7.2,
      vote_count: 249,
    },
    {
      adult: false,
      backdrop_path: "/qFvCT6nKMGGDBHaKw0XV1061VWH.jpg",
      genre_ids: [53, 27],
      id: 17692,
      original_language: "en",
      original_title: "Jaws 3-D",
      overview:
        "A giant thirty-five-foot shark becomes trapped in a SeaWorld theme park and it's up to the sons of police chief Brody to rescue everyone.",
      popularity: 26.533,
      poster_path: "/kqDXj53F9paqVGJLGfHtz7giJ3s.jpg",
      release_date: "1983-07-22",
      title: "Jaws 3-D",
      video: false,
      vote_average: 4.5,
      vote_count: 1265,
    },
  ],
};
