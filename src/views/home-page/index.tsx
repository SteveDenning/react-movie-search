import { useState } from "react";

// Utils
import { getMedia } from "../../utils/services";

// Components
import { Container, Fade } from "@mui/material";
import SearchForm from "../search-form";

// Layouts
import DefaultLayout from "../../layout/default";

import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [results, setResults] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [filterState, setFilterState] = useState({ keyboard: "" });

  const handleSearchInput = (keywords: string) => {
    setFilterState({
      ...filterState,
      keyboard: keywords,
    });

    // Build query for request
    getMedia(keywords)
      .then((response: any) => {
        setResults(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DefaultLayout heading="Search for a movie">
      <Container>
        <div className="home-page">
          <SearchForm onSubmit={handleSearchInput} />
          <Fade in={!!results.length}>
            <ul>
              {loaded &&
                results.map((item: any, i: number) => {
                  return (
                    <li
                      style={{ marginBottom: "20px" }}
                      key={i}
                      onClick={() => (window.location.href = `/details/${item.id}`)}
                    >
                      <div className="image-wrapper">
                        <img
                          src={item["poster_path"] ? `https://image.tmdb.org/t/p/original/${item["poster_path"]}` : defaultPlaceholder}
                          alt={item.title}
                        />
                      </div>
                      <div style={{ marginLeft: "40px" }}>
                        <h3>{item.title}</h3>
                        <p>{item.overview}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </Fade>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
