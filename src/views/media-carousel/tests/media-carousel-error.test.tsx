import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import MediaCarousel from "../index";

// Services
import { getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Banner carousel component", () => {
  describe("Component rendering (error state)", () => {
    it("Should render the Banner Carousel", async () => {
      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <MediaCarousel
            buttonText="View all"
            label="Known for"
            pathName="person/popular"
            responsiveOptions={{}}
            media="person"
          />
        </MemoryRouter>,
      );

      await waitFor(() => expect(screen.getByTestId("banner-carousel-error")).toBeInTheDocument());
    });
  });
});
