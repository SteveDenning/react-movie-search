import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";

// Components
import BannerCarousel from "../index";

// Services
import { getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Banner carousel component", () => {
  describe("Component rendering", () => {
    it("Should render the Banner Carousel", async () => {
      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      render(
        <BannerCarousel
          media="test"
          path="/test/path"
        />,
      );

      await waitFor(() => expect(screen.getByTestId("banner-carousel")).toBeInTheDocument());
      await waitFor(() => expect(getMedia).toHaveBeenCalledTimes(1));
    });
  });

  describe("Component rendering (error state)", () => {
    it("Should render the Banner Carousel", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <BannerCarousel
          media="test"
          path="/test/path"
        />,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("banner-carousel-error")).toBeInTheDocument());
    });
  });
});
