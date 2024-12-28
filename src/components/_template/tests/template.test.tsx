import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Test from "../index";

describe("Test component", () => {
  describe("Component rendering", () => {
    const onClick = jest.fn();

    beforeEach(() =>
      render(
        <Test onClick={onClick}>
          <p>Lorem Ipsom</p>
        </Test>,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("test")).toBeInTheDocument();
    });
  });
});
