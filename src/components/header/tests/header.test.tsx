import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Header from "../index";
// Icons

describe("Button component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<Header />);

    beforeEach(() => {});

    it("Should render the header", () => {
      setup();
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("Should render the header text of 'React Movie Search'", () => {
      setup();
      expect(screen.getByText("React Movie Search")).toBeInTheDocument();
    });
  });
});
