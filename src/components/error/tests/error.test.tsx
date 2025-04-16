import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Error from "../index";

describe("Test component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Error content="Test content"></Error>));

    it("Should render an error", () => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });
  });
});
