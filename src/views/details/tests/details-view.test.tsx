import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import DetailsView from "../index";

// Icons

describe("Details Page component", () => {
  describe("Component rendering", () => {
    const setup = () => render(<DetailsView />);

    it("Should render details page", () => {
      setup();
      expect(screen.getByTestId("details-view")).toBeInTheDocument();
    });
  });
});
