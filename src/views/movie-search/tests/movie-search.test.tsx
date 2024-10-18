import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import MovieSearch from "../index";

describe("Button component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<MovieSearch />);

    beforeEach(() => {});

    it("Should render the movie search component", () => {
      setup();
      expect(screen.getByTestId("movie-search")).toBeInTheDocument();
    });
  });
});
