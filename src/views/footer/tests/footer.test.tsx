import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Footer from "../index";
// Icons

describe("Footer component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(<Footer />);
    });

    it("Should render the footer", () => {
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });
});
