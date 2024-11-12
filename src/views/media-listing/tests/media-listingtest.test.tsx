import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import MediaListing from "../index";

// Icons

describe("Media Listing component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(<MediaListing />);
    });

    it("Should render media listing view", () => {
      expect(screen.getByTestId("media-listing")).toBeInTheDocument();
    });
  });
});
