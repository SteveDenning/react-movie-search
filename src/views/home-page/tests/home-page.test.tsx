import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import HomePage from "../index";

// Icons

describe("Home page component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>,
      );
    });

    it("Should render the home page", () => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});
