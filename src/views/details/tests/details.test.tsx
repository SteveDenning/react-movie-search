import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import DetailsView from "../index";

// Icons

describe("Details Page component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <DetailsView />
        </MemoryRouter>,
      );
    });

    it("Should render details page", () => {
      expect(screen.getByTestId("details-view")).toBeInTheDocument();
    });
  });
});
