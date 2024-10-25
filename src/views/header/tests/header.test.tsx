import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Header from "../index";
// Icons

describe("Header component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<Header heading="Search" />);

    beforeEach(() => {});

    it("Should render the header", () => {
      setup();
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
  });
});
