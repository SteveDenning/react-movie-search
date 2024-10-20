import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Results from "../../views/results";

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

  return (
    <Container>
      <div
        className="movie-search"
        data-testid="movie-search"
      >
        <Results results={results} />
        {/* <h1>Heading One</h1>
        <h2>Heading Two</h2>
        <h3>Heading Three</h3>
        <h4>Heading Four</h4>
        <p>Paragraph</p>
        <ul>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
          <li>List Item</li>
        </ul>
        <a href="/">Example Link</a>
        <br />
        <label htmlFor="input">Input</label>
        <input
          type="text"
          id="input"
        /> */}
      </div>
    </Container>
  );
};

export default MovieSearch;
