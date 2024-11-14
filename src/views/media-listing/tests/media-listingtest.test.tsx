import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";

// Components
import MediaListing from "../index";

// Icons

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
  });
});
