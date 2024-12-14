import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";

// Components
import MediaListing from "../index";

describe("Media Listing component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/media-listing/movie/now_playing",
        search: "?page=1&type=movie",
      },
      writable: true,
    });
  });

  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <MediaListing />
        </MemoryRouter>,
      );
    });

    it("Should render media listing view", () => {
      expect(screen.getByTestId("media-listing")).toBeInTheDocument();
    });
  });
});
