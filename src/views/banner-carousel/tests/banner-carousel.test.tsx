import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";

// Components
import BannerCarousel from "../index";

// Services
import { getMedia } from "../../../services/getMedia";

jest.mock("../../../services/getMedia");

describe("Banner carousel component", () => {
  describe("Component rendering", () => {
    // beforeEach(() => {
    //   render(
    //     <BannerCarousel
    //       media="test"
    //       path="/test/path"
    //     />,
    //   );
    // });

    it("Should render the Banner Carousel", async () => {
      const mockResults = [{ name: "Foo" }];
      (getMedia as jest.Mock).mockResolvedValue({
        results: mockResults,
      });

      render(
        <BannerCarousel
          media="test"
          path="/test/path"
        />,
      );

      await waitFor(() => expect(screen.getByTestId("banner-carousel")).toBeInTheDocument());

      await waitFor(() => {
        expect(getMedia).toHaveBeenCalled();
      });
    });
  });
});
