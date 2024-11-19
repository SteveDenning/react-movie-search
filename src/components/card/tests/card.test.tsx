import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Card from "../index";

describe("Card component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Card resource={{}} />));

    it("Should render a card", () => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });
  });
});
