import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import BannerCarousel from "../index";

describe("Banner carousel component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <BannerCarousel
          media="test"
          path="/test/path"
          imagePath="/test/image-path"
        />,
      );
    });

    it("Should render the Banner Carousel", () => {
      expect(screen.getByTestId("banner-carousel")).toBeInTheDocument();
    });
  });
});
