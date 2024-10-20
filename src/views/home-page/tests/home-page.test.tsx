import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import HomePage from "../index";

// Icons

describe("Home Page component", () => {
  describe("Component rendering", () => {
    const results: any = [];

    const setup = () => render(<HomePage results={results} />);

    beforeEach(() => {});

    it("Should render home page", () => {
      setup();
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});
