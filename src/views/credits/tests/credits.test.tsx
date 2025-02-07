import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Credits from "../index";
import { MemoryRouter } from "react-router-dom";

describe("Credits component", () => {
  describe("Component rendering", () => {
    const handleMediaTitle = jest.fn();

    beforeEach(() =>
      render(
        <MemoryRouter>
          <Credits handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("credits")).toBeInTheDocument();
    });
  });
});
