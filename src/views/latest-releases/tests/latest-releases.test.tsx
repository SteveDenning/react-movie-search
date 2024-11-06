import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import LatestReleases from "../index";

// Icons

describe("Latest Releases component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <LatestReleases
          url="/test"
          label="test"
          type="movie"
        />,
      );

    beforeEach(() => {});

    it("Should render latest releases block", () => {
      setup();
      expect(screen.getByTestId("latest-releases")).toBeInTheDocument();
    });
  });
});
