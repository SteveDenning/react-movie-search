import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import DetailsPage from "../index";

// Icons

describe("Details Page component", () => {
  describe("Component rendering", () => {
    // const results: any = [];

    const setup = () => render(<DetailsPage />);

    beforeEach(() => {});

    it("Should render details page", () => {
      setup();
      expect(screen.getByTestId("details-page")).toBeInTheDocument();
    });
  });
});
