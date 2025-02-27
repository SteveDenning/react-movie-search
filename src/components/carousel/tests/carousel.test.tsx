import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Carousel from "../index";

// Variable
import { variables } from "./config";

describe("Carousel component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <Carousel
          resources={variables.resources}
          media="movie"
        />,
      );
    });

    it("Should render an carousel", () => {
      expect(screen.getByTestId("carousel")).toBeInTheDocument();
    });
  });
});
