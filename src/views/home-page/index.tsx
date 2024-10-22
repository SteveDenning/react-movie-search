import { useState, useEffect } from "react";

import axios from "axios";

// Components
import { Fade } from "@mui/material";
import Button from "../../components/button";

const HomePage = () => {
  const [results, setResults] = useState<any>(undefined);
  // const imagePath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    if (process.env) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=1&sort_by=popularity.desc&year=2000&api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        )
        .then((response) => {
          setResults(response.data.results);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Fade in={results}>
      <div data-testid="home-page">
        <h3>Home Page</h3>
        {results ? (
          <>
            <ul>
              {results.map((item: any, i: number) => {
                return (
                  <li
                    style={{ marginBottom: "20px" }}
                    key={i}
                  >
                    <Button onClick={() => (window.location.href = `/details/${item.id}`)}>{item.title}</Button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Error</p>
        )}
      </div>
    </Fade>
  );
};

export default HomePage;
