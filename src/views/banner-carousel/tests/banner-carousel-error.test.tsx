import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";

// Components
import BannerCarousel from "../index";

// Services
import { getMedia } from "../../../services/get-media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/get-media");

describe("Banner carousel component (error handling)", () => {
  describe("Component rendering (error state)", () => {
    it("Should render the Banner Carousel", async () => {
      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <BannerCarousel
          media="test"
          path="/test/path"
        />,
      );

      await waitFor(() => expect(screen.getByTestId("banner-carousel-error")).toBeInTheDocument());
    });
  });
});
