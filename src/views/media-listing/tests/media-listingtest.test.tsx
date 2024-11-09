import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import MediaListing from "../index";

// Icons

describe("Media Listing component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<MediaListing />);

    it("Should render media listing view", () => {
      setup();
      expect(screen.getByTestId("media-listing")).toBeInTheDocument();
    });
  });
});
