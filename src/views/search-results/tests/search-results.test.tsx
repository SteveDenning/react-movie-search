import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import SearchResults from "../index";

describe("Search component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>,
      );
    });

    it("Should render the search form", () => {
      // expect(screen.getByTestId("search-results")).toBeInTheDocument();
    });
  });
});
