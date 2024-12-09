import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Resources from "../index";

describe("Resources component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Resources
          resources={[]}
          count={1}
          page={1}
          loading={false}
        />,
      ),
    );

    it("Should render resources", () => {
      expect(screen.getByTestId("resources")).toBeInTheDocument();
    });
  });
});
