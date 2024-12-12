import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Button from "../index";

describe("Button component", () => {
  describe("Component rendering", () => {
    const handleClick = jest.fn();

    beforeEach(() => {
      render(
        <Button
          onClick={handleClick}
          className="custom-class"
          variant="filled"
          color="blue"
        >
          Click me
        </Button>,
      );
    });

    it("Should render a button", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("Should render a button with a variant class of 'filled'", () => {
      expect(screen.getByTestId("button")).toHaveClass("button--filled");
    });

    it("Should render a button with a color class of 'blue'", () => {
      expect(screen.getByTestId("button")).toHaveClass("button--blue");
    });

    it("Should render a button with the text ", () => {
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("Should render a button with the a class of 'custom-class' ", () => {
      expect(screen.getByTestId("button")).toHaveClass("custom-class");
    });

    it("Should allow the user to click the button", () => {
      fireEvent.click(screen.getByTestId("button"));

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Component rendering (alternate state)", () => {
    const handleClick = jest.fn();

    beforeEach(() => {
      render(
        <Button
          onClick={handleClick}
          disabled
          href="/"
        >
          Click me
        </Button>,
      );
    });

    it("Should disable the button", () => {
      expect(screen.getByTestId("button")).toHaveAttribute("disabled");
    });

    it("Should render and anchor rather that a button element", () => {
      expect(screen.getByTestId("button")).toHaveAttribute("href", "/");
    });
  });
});
