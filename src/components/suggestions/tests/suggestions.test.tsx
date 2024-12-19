import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Suggestions from "../index";

// Test config
import { variables } from "./config";

describe("Suggestions component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <Suggestions
            options={variables.options}
            type="person"
          />
        </MemoryRouter>,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("suggestions")).toBeInTheDocument();
    });
  });
});
