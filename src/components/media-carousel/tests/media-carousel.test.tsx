import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import MediaCarousel from "../index";

// Services
import { getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Media carousel component", () => {
  describe("Component rendering", () => {
    it("Should render the Media Carousel", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { href: "" };

      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      render(
        <MemoryRouter>
          <MediaCarousel
            buttonText="View all"
            label="Most popular actors"
            pathName="person/popular"
            media="person"
            buttonLink="/media-listing/person/popular?page=1"
          />
        </MemoryRouter>,
      );

      await waitFor(() => expect(getMedia).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(screen.getByTestId("media-carousel")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText("View all")).toBeInTheDocument());
      await waitFor(() => expect(screen.queryByTestId("media-carousel-error")).toBeNull());

      fireEvent.click(screen.getByText("View all"));
      expect(window.location.href).toBe("/media-listing/person/popular?page=1");
    });
  });

  describe("Component rendering (error state)", () => {
    it("Should render the Media Carousel error message", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <MediaCarousel
            buttonText="View all"
            label="Known for"
            pathName="person/popular"
            media="person"
          />
        </MemoryRouter>,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("media-carousel-error")).toBeInTheDocument());
    });
  });

  // describe("Component rendering with passed in props", () => {
  //   it("Should render the Media Carousel", async () => {
  //     render(
  //       <MemoryRouter>
  //         <MediaCarousel
  //           buttonText="View all"
  //           label="Known for"
  //           pathName="person/popular"
  //           media="person"
  //         />
  //       </MemoryRouter>,
  //     );
  //     await waitFor(() => expect(screen.getByTestId("media-carousel")).toBeInTheDocument());
  //   });
  // });
});
