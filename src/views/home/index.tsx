import React from "react";

// Views
import BannerCarousel from "./../banner-carousel";
import MediaCarousel from "./../media-carousel";
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
    <div
      className="home"
      data-testid="home"
    >
      <BannerCarousel
        media="movie"
        path="movie/upcoming"
      />
      <Container>
        <MediaCarousel
          buttonText="View all"
          label="Movie Releases"
          pathName="movie/popular"
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
          label="Popular actors"
          pathName="person/popular"
          responsiveOptions={personOptions}
          media="person"
        />
      </Container>
    </div>
  );
};

export default HomePage;
