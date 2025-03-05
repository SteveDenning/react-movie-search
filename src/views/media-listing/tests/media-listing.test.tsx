import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import MediaListing from "../index";

// Services
import { getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Media carousel component", () => {
  describe("Component rendering", () => {
    beforeEach(async () => {
      Object.defineProperty(window, "location", {
        value: {
          pathname: "/media-listing/movie/popular/Most%20popular%20Movies",
          search: "?page=1",
        },
        writable: true,
      });

      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      await waitFor(() => {
        render(
          <MemoryRouter>
            <MediaListing />
          </MemoryRouter>,
        );
      });
    });
    it("Should render the Media listings", async () => {
      await waitFor(() => expect(getMedia).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("media-listing")).toBeInTheDocument());
    });

    it("Should render the Media listings with a heading for Movies", async () => {
      await waitFor(() => expect(screen.getByTestId("section-heading")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId("pagination")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText("Most popular Movies")).toBeInTheDocument());
    });

    it("Should render the pagination", async () => {
      await waitFor(() => expect(screen.getByTestId("pagination")).toBeInTheDocument());
    });
  });

  describe("Component rendering (error state)", () => {
    it("Should render the Media listing error message", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <MediaListing />
        </MemoryRouter>,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("media-listing-error")).toBeInTheDocument());
    });
  });
});
