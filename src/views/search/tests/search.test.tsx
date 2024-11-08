import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Search from "../index";

describe("Latest Releases component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>,
      );

    it("Should render the search field", () => {
      setup();
      expect(screen.getByTestId("search")).toBeInTheDocument();
    });
  });
});
