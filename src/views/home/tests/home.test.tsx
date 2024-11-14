import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Home from "../index";

// Icons

describe("Home page component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });

    it("Should render the home view", () => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
  });
});
