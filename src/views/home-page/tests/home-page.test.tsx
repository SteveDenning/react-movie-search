import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import HomePage from "../index";

// Icons

describe("Home page component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<HomePage />);

    beforeEach(() => {});

    it("Should render the home page", () => {
      setup();
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});
