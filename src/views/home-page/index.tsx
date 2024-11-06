import React, { useState } from "react";

// Utils
import { getAllMedia } from "../../utils/get-resources";
import useScreenSize from "../../utils/use-screen-size";

// Components
import { Container, Fade } from "@mui/material";
import Image from "../../components/image";
import LatestReleases from "../latest-releases";
import Search from "../search";

// Layouts
import DefaultLayout from "../../layout/default";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [results, setResources] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [filterState, setFilterState] = useState({ query: "" });
  const [value, setValue] = useState(false);
  const screenSize = useScreenSize();

  console.log(value, screenSize);

  const tv =
    "https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&sort_by=popularity.desc&include_adult=false&include_null_first_air_dates=false&";
  const movie = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

  const handleSearchInput = (query: string) => {
    setFilterState({
      ...filterState,
      query,
    });

    getAllMedia(query)
      .then((response: any) => {
        setResources(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DefaultLayout heading="Search for a movie">
      <div
        className="home-page"
        data-testid="home-page"
      >
        <Container>
          <Search
            onSubmit={handleSearchInput}
            setValue={setValue}
          />
        </Container>
        {results.length ? (
          <Container>
            <Fade in={!!results.length}>
              <ul className="home-page__list">
                {loaded &&
                  results.map((item: any, i: number) => {
                    return (
                      <li
                        className="home-page__list-item"
                        style={{ marginBottom: "20px" }}
                        key={i}
                        onClick={() => (window.location.href = `/details/movie/${item.id}`)}
                      >
                        <div className="image-wrapper">
                          <Image resource={item} />
                        </div>
                        <div style={{ marginLeft: "40px" }}>
                          <h3>{item.title}</h3>
                          <p>{item.overview.length > 300 ? `${item.overview.substring(0, 300)}. . .` : item.overview}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </Fade>
          </Container>
        ) : (
          <>
            <LatestReleases
              url={movie}
              label="Movie"
              type="movie"
            />
            <LatestReleases
              url={tv}
              label="TV"
              type="tv"
            />
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
