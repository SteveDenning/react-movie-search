import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Carousel from "../index";

describe("Carousel component", () => {
  describe("Component rendering", () => {
    const resources = [{ image: "", alt: "Lorem ipsum" }];

    beforeEach(() => {
      render(
        <Carousel
          resources={resources}
          media="movie"
        />,
      );
    });

    it("Should render an carousel", () => {
      expect(screen.getByTestId("carousel")).toBeInTheDocument();
    });
  });
});
