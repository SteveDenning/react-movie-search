import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import FeaturedBanner from "../index";

describe("Featured Banner component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <FeaturedBanner
          media="test"
          path="/test/path"
          imagePath="/test/image-path"
        />,
      );

    it("Should render the Featured Banner", () => {
      setup();
      expect(screen.getByTestId("featured-banner")).toBeInTheDocument();
    });
  });
});
