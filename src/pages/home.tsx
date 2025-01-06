import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import BannerCarousel from "./../views/banner-carousel";
import MediaCarousel from "./../views/media-carousel";

// MUI
import { Container } from "@mui/material";

const HomePage = () => {
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
      hasSearch
      heading="The Movie Seeker: React App for All Things Cinema"
    >
      <BannerCarousel
        media="movie"
        path="movie/upcoming"
      />
      <Container>
        <MediaCarousel
          buttonText="View all"
          label="Movie Releases"
          pathName="movie/now_playing"
          media="movie"
        />
        <MediaCarousel
          buttonText="View all"
          label="TV releases"
          pathName="tv/popular"
          media="tv"
        />

        <MediaCarousel
          buttonText="View all"
          label="Most popular actors"
          pathName="person/popular"
          responsiveOptions={personOptions}
          media="person"
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
