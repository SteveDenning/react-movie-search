import React, { useState } from "react";

// Layouts
import DefaultLayout from "../layout/default";

// Views
import BannerCarousel from "./../views/banner-carousel";

// Components
import Button from "./../components/button";
import MediaCarousel from "./../components/media-carousel";

// Config
import { config } from "./../config/routes";

// MUI
import { Container } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

const HomePage = () => {
  const [hideMessage, setHideMessage] = useState(JSON.parse(sessionStorage.getItem("showMessage")));

  const title = "React Movie Search | Home";
  const pageDescription = "Home page of the React Movie App. Search for films, TV shows, and actors to discover new favorites!";

  const handleCloseMessage = () => {
    setHideMessage(true);
    sessionStorage.setItem("showMessage", "true");
  };

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
      {!hideMessage && (
        <Container>
          <div style={{ position: "relative", zIndex: "1", padding: "20px", textAlign: "center", display: "flex" }}>
            <p className="fade-in-slow">
              This app uses OpenAI technology. Create an account{" "}
              <a
                href="https://www.themoviedb.org/signup"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>{" "}
              to access these features.
            </p>
            <Button
              variant="icon"
              onClick={() => {
                handleCloseMessage();
              }}
            >
              <ClearIcon />
            </Button>
          </div>
        </Container>
      )}
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
          buttonLink={`${config.mediaListing.path}/movie/popular?page=1`}
        />
        <MediaCarousel
          buttonText="View all"
          label="TV Shows"
          pathName="tv/popular"
          media="tv"
          buttonLink={`${config.mediaListing.path}/tv/popular?page=1`}
        />

        <MediaCarousel
          buttonText="View all"
          label="Most popular people"
          pathName="person/popular"
          responsiveOptions={personOptions}
          media="person"
          buttonLink={`${config.mediaListing.path}/person/popular?page=1`}
        />
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
