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

    it("Should render a toggle switch component", () => {
      expect(screen.getByTestId("toggle-switch")).toBeInTheDocument();
    });
  });

  describe("Component rendering (unchecked)", () => {
    const onClick = jest.fn();

    beforeEach(() =>
      render(
        <ToggleSwitch
          onChange={onClick}
          checked={false}
        />,
      ),
    );

    it("Should call onChange when clicked", () => {
      const toggle = screen.getByTestId("toggle-switch");
      toggle.click();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
