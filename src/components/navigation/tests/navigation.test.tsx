import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Navigation from "../index";

describe("Navigation component", () => {
  describe("Component rendering", () => {
    const onClick = jest.fn();

    beforeEach(() =>
      render(
        <Navigation
          onClick={onClick}
          user={null}
        />,
      ),
    );

    it("Should render the navigation", () => {
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });
  });
});
