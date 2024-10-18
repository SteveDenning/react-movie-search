import { Container } from "@mui/material";
import React from "react";

const MovieSearch = () => {
  return (
    <Container>
      <div
        className="movie-search"
        data-testid="movie-search"
      >
        <h1>Heading One</h1>
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
        />
      </div>
    </Container>
  );
};

export default MovieSearch;
