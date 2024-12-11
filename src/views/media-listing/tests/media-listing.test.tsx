import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";

// Components
import MediaListing from "../index";

describe("Media Listing component", () => {
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

    it("sets window.location.search using Object.defineProperty", () => {
      Object.defineProperty(window, "location", {
        value: {
          search: "?query=test&filter=active",
        },
        writable: true,
      });

      expect(window.location.search).toBe("?query=test&filter=active");
    });
  });
});
