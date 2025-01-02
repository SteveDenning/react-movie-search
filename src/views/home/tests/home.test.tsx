import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Home from "../index";

// Icons

describe("Home page component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(<Home />);
    });

    it("Should render the home view", () => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
  });
});
