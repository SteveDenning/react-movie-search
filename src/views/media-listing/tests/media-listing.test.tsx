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
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/media-listing/movie/popular?page=1",
        search: "?page=1&type=movie",
      },
      writable: true,
    });

    (getMedia as jest.Mock).mockResolvedValue(variables.media);

    render(
      <MemoryRouter>
        <MediaListing />
      </MemoryRouter>,
    );
  });

  describe("Component rendering", () => {
    it("Should render the Media listings", async () => {
      await waitFor(() => expect(getMedia).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("media-listing")).toBeInTheDocument());
    });

    it("Should render the Media listings with a heading for Movies", async () => {
      await waitFor(() => expect(screen.getByTestId("section-heading")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText("Most popular Movies")).toBeInTheDocument());
    });
  });
});
