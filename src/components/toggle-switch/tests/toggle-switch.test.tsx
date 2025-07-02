import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import ToggleSwitch from "../index";

describe("Toggle Switch component", () => {
  describe("Component rendering", () => {
    const onClick = jest.fn();

    beforeEach(() =>
      render(
        <ToggleSwitch
          onChange={onClick}
          checked
        />,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("toggle-switch")).toBeInTheDocument();
    });
  });
});
