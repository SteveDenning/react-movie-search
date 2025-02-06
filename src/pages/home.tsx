import React from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import BannerCarousel from "./../views/banner-carousel";

// Components
import MediaCarousel from "./../components/media-carousel";

// MUI
import { Container } from "@mui/material";

const HomePage = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || null);
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
        {!user && (
          <p
            style={{ position: "relative", zIndex: "1", padding: "20px", textAlign: "center" }}
            className="fade-in-slow"
          >
            This app uses OpenAi technology in some of its features, to experience these please create an account{" "}
            <a
              href="https://www.themoviedb.org/signup"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            . Once registered, come back and login to enjoy the experience.
          </p>
        )}
        <MediaCarousel
          buttonText="View all"
          label="Movies"
          pathName="movie/popular"
          media="movie"
          buttonLink="/media-listing/movie/popular?page=1"
        />
        <MediaCarousel
          buttonText="View all"
          label="TV Shows"
          pathName="tv/popular"
          media="tv"
          buttonLink="/media-listing/tv/popular?page=1"
        />

        <MediaCarousel
          buttonText="View all"
          label="Most popular actors"
          pathName="person/popular"
          responsiveOptions={personOptions}
          media="person"
          buttonLink="/media-listing/person/popular?page=1"
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
