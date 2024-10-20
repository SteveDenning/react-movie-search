import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Results from "../index";

// Icons

describe("Results component", () => {
  describe("Component rendering", () => {
    const results: any = [];

    const setup = () => render(<Results results={results} />);

    beforeEach(() => {});

    it("Should render a button", () => {
      setup();
      expect(screen.getByTestId("results")).toBeInTheDocument();
    });

    it("Should have no results", () => {
      setup();
      expect(screen.getByTestId("results")).toBeInTheDocument();
    });
  });
});
