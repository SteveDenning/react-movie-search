import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Favourites from "../index";

describe("Favourites component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Favourites />));

    it("Should render favourites", () => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument();
    });
  });
});
