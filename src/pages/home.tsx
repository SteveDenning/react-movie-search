import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../layout/default";

// Components
import { Container } from "@mui/material";
import HomePage from "../views/home-page";

const MovieSearch = () => {
  const [results, setResults] = useState([]);

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

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <DefaultLayout heading="Search">
      <Container>
        <HomePage results={results} />
      </Container>
    </DefaultLayout>
  );
};

export default MovieSearch;
