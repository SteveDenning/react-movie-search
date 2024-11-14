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
        imagePath="backdrop_path"
      />
      <LatestReleases
        label="Movie Releases"
        media="movie"
        path="discover/movie"
        imagePath="poster_path"
      />
      <LatestReleases
        label="TV Releases"
        media="tv"
        path="discover/tv"
        imagePath="poster_path"
      />
    </div>
  );
};

export default HomePage;
