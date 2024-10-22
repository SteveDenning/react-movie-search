import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import HomePage from "../index";

describe("Home Page component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<HomePage />);

    beforeEach(() => {});

    it("Should render home page", () => {
      setup();
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
  });
});
