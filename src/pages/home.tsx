import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import BannerCarousel from "./../views/banner-carousel";

// Components
import MediaCarousel from "./../components/media-carousel";

// Config
import { config } from "./../config/routes";

// Utils
import { MOVIES_TITLE, TV_SHOWS_TITLE, PERSON_TITLE } from "../utils/constants";

// MUI
import { Container } from "@mui/material";

// Types
import { ResponsiveOptionsType } from "../models/types";

const HomePage = () => {
  const title = "My Movie Database | Home";
  const pageDescription = "Home page of the My Movie Database App. Search for films, TV shows, and actors to discover new favorites!";

  const responsiveOptions: ResponsiveOptionsType[] = [
    {
      breakpoint: 5000,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ];

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <BannerCarousel
        media="movie"
        path="movie/now_playing"
      />
      <Container>
        <h1 className="page-title">Trending this week</h1>
        <MediaCarousel
          buttonText="View all"
          label="Movies"
          pathName="trending/movie/week"
          media="movie"
          buttonLink={`${config.mediaListing.path}/trending/movie/week/${MOVIES_TITLE}?page=1`}
        />
        <MediaCarousel
          buttonText="View all"
          label="TV Shows"
          pathName="trending/tv/week"
          media="tv"
          buttonLink={`${config.mediaListing.path}/trending/tv/week/${TV_SHOWS_TITLE}?page=1`}
        />

        <MediaCarousel
          buttonText="View all"
          label="People"
          pathName="trending/person/week"
          media="person"
          buttonLink={`${config.mediaListing.path}/trending/person/week/${PERSON_TITLE}?page=1`}
          responsiveOptions={responsiveOptions}
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
