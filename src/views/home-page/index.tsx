import { useEffect, useState } from "react";
import queryString from "query-string";

// Utils
import { fetchData } from "../../utils/services";

// Components
import { Container, Fade } from "@mui/material";
import Search from "../search";

// Layouts
import DefaultLayout from "../../layout/default";

// Assets
import defaultPlaceholder from "../../assets/images/placeholder.png";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [results, setResults] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState({
    query: "",
    include_adults: true,
    language: "en-US",
    page: page,
  });

  const [value, setValue] = useState(false);

  const handleSearchInput = (query: string) => {
    setFilterState({
      ...filterState,
      query,
    });

    fetchData(query)
      .then((response: any) => {
        setResults(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const makeQueryString = (queryObj: Object) => {
    return `?${queryString.stringify(queryObj, { encode: false })}`;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(filterState);
    console.log(makeQueryString(filterState));
  }, [filterState]);

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
          <Fade in={!!results.length && value}>
            <div>
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
              <button onClick={() => setPage(2)}>Next Page</button>
            </div>
          </Fade>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
