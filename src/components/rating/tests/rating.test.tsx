import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Rating from "../index";

describe("Rating component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Rating resource={10} />));

    it("Should render Rating component", () => {
      expect(screen.getByTestId("rating")).toBeInTheDocument();
      expect(screen.getByTestId("rating__score")).toHaveTextContent("10.0");
    });
  });
});
