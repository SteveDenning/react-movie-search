import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Button from "../index";

describe("Button component", () => {
  describe("Component rendering", () => {
    const handleClick = jest.fn();

    beforeEach(() => {
      render(<Button onClick={handleClick}>Lorem ipsum</Button>);
    });

    it("Should render a button", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });
  });
});
