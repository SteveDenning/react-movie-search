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
  const title = "My Movie Database | Home";
  const pageDescription = "Home page of the My Movie Database App. Search for films, TV shows, and actors to discover new favorites!";

  const personOptions = [
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 464,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  console.log(personOptions);

  return (
    <DefaultLayout
      title={title}
      pageDescription={pageDescription}
    >
      <BannerCarousel
        media="movie"
        path="movie/upcoming"
        desktopSlides={1}
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
          media="person"
          buttonLink={`${config.mediaListing.path}/person/popular/${PERSON_TITLE}?page=1`}
          desktopSlides={7}
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
