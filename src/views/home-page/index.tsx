import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Utils
import { getAllMedia } from "../../utils/get-resources";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Views
import LatestReleases from "./../latest-releases";
import BannerCarousel from "../../views/banner-carousel";

// MUI
import { Container, Fade, Typography } from "@mui/material";

// Layouts
import DefaultLayout from "../../layout/default";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [resources, setResources] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const location = useLocation();

  const handleSearchInput = (query: string) => {
    sessionStorage.setItem("query", query);

    getAllMedia(query)
      .then((response: any) => {
        setResources(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkUrlParams = () => {
    if (window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get("query");

      if (query) {
        handleSearchInput(query);
      }
    } else {
      setResources([]);
    }
  };

  useEffect(() => {
    checkUrlParams();
  }, [location]);

  return (
    <DefaultLayout
      hasSearch
      heading="The Movie Seeker: React App for All Things Cinema"
    >
      <div
        className="home-page"
        data-testid="home-page"
      >
        {resources.length ? (
          <Container>
            <Fade in={!!resources.length}>
              <ul className="home-page__list">
                {loaded &&
                  resources.map((item: any, i: number) => {
                    return (
                      <li
                        className="home-page__list-item"
                        key={i}
                        onClick={() => (window.location.href = `/details/${item["media_type"]}/${item.id}`)}
                      >
                        <div className="home-page__list-item-image-wrapper">
                          {/* <Image
                            resource={item}
                            size="small"
                          /> */}
                          <img
                            src={
                              item["poster_path"] || item["profile_path"]
                                ? `https://image.tmdb.org/t/p/original/${item["poster_path"] || item["profile_path"]}`
                                : defaultPlaceholder
                            }
                            alt={item.title || item.name}
                          />
                        </div>
                        <div className="home-page__list-item-content">
                          <Typography
                            variant="h3"
                            sx={{ fontSize: 24, fontWeight: "200" }}
                          >
                            {item.title || item["original_name"]}
                          </Typography>
                          <p>{item.overview?.length > 300 ? `${item.overview.substring(0, 300)}. . .` : item.overview}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </Fade>
          </Container>
        ) : (
          <>
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
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
