import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Suggestions from "../index";

// Test config
import { variables } from "./config";

describe("Suggestions component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Suggestions
          options={variables.options}
          type="person"
        />,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("suggestions")).toBeInTheDocument();
    });
  });
});
