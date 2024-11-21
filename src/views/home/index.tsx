import React from "react";

// Views
import BannerCarousel from "../../views/banner-carousel";
import LatestReleases from "./../latest-releases";

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
      <LatestReleases
        label="Movie Releases"
        media="movie"
        path="discover/movie"
      />
      <LatestReleases
        label="TV Releases"
        media="tv"
        path="discover/tv"
      />
      <LatestReleases
        label="Popular Actors"
        media="person"
        path="person/popular"
        responsiveOptions={personOptions}
      />
    </div>
  );
};

export default HomePage;
