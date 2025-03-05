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

const HomePage = () => {
  const title = "React Movie Search | Home";
  const pageDescription = "Home page of the React Movie App. Search for films, TV shows, and actors to discover new favorites!";

  const personOptions = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 7,
      slidesToSlide: 7,
    },
  };

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <BannerCarousel
        media="movie"
        path="movie/upcoming"
      />
      <Container>
        <MediaCarousel
          buttonText="View all"
          label="Movies"
          pathName="movie/popular"
          media="movie"
          buttonLink={`${config.mediaListing.path}/movie/popular/${MOVIES_TITLE}?page=1`}
        />
        <MediaCarousel
          buttonText="View all"
          label="TV Shows"
          pathName="tv/popular"
          media="tv"
          buttonLink={`${config.mediaListing.path}/tv/popular/${TV_SHOWS_TITLE}?page=1`}
        />

        <MediaCarousel
          buttonText="View all"
          label="People"
          pathName="person/popular"
          responsiveOptions={personOptions}
          media="person"
          buttonLink={`${config.mediaListing.path}/person/popular/${PERSON_TITLE}?page=1`}
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
