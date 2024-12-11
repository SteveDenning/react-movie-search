import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import Resources from "../index";

describe("Resources component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Resources
          resources={variables.movies.results}
          count={20}
          page={1}
          loading={false}
        />,
      ),
    );

    it("Should render resources", () => {
      expect(screen.getByTestId("resources")).toBeInTheDocument();
    });

    it("Should render pagination", () => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });

  describe("Component rendering (single page of results)", () => {
    beforeEach(() =>
      render(
        <Resources
          resources={variables.movies.results}
          count={1}
          page={1}
          loading={false}
        />,
      ),
    );

    it("Should not render pagination if only one page is present", () => {
      expect(screen.queryByTestId("pagination")).toBeNull();
    });
  });
});
