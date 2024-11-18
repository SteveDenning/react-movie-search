import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Resources from "../index";

describe("Resources component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Resources resources={[]} />));

    it("Should render resources", () => {
      expect(screen.getByTestId("resources")).toBeInTheDocument();
    });
  });
});