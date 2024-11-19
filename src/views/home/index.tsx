import React from "react";

// Views
import BannerCarousel from "../../views/banner-carousel";
import LatestReleases from "./../latest-releases";

const HomePage = () => {
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
      />
    </div>
  );
};

export default HomePage;
