import { useState } from "react";

// Utils
import { getAllMedia } from "../../utils/services";

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
  const [results, setResults] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [filterState, setFilterState] = useState({ query: "" });
  const [value, setValue] = useState(false);

  const handleSearchInput = (query: string) => {
    setFilterState({
      ...filterState,
      query,
    });

    // Build query for request
    getAllMedia(query)
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
        <div
          className="home-page"
          data-testid="home-page"
        >
          <Search
            onSubmit={handleSearchInput}
            setValue={setValue}
          />
          {!!results.length ? (
            <Fade in={!!results.length && value}>
              <ul className="home-page__list">
                {loaded &&
                  results.map((item: any, i: number) => {
                    return (
                      <li
                        className="home-page__list-item"
                        style={{ marginBottom: "20px" }}
                        key={i}
                        onClick={() => (window.location.href = `/details/${item.id}`)}
                      >
                        <div className="image-wrapper">
                          <Image resource={item} />
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
          ) : (
            <LatestReleases />
          )}
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
