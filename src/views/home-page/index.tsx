import { useState } from "react";

// Utils
import { getMedia } from "../../utils/services";

// Components
import { Container, Fade } from "@mui/material";
import SearchForm from "../search-form";

// Layouts
import DefaultLayout from "../../layout/default";

// Styles
import "./home-page.scss";

const HomePage = () => {
  const [results, setResults] = useState<any>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  // const imagePath = "https://image.tmdb.org/t/p/original/";

  const handleSearchInput = (searchTerm: any) => {
    console.log(searchTerm.searchTerm);
    getMedia(searchTerm.searchTerm)
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
          {results ? (
            <Fade in={loaded}>
              <ul>
                {results.map((item: any, i: number) => {
                  return (
                    <li
                      style={{ marginBottom: "20px" }}
                      key={i}
                      onClick={() => (window.location.href = `/details/${item.id}`)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item["poster_path"]}`}
                        alt=""
                      />
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
            <p>There are no results</p>
          )}
        </div>
        {/* <p>{JSON.stringify(results, undefined, 4)}</p> */}
      </Container>
    </DefaultLayout>
  );
};

export default HomePage;
