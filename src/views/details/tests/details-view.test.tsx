import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import DetailsView from "../index";

// Icons

describe("Details Page component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <MemoryRouter>
          <DetailsView />
        </MemoryRouter>,
      );

    it("Should render details page", () => {
      setup();
      expect(screen.getByTestId("details-view")).toBeInTheDocument();
    });
  });
});
