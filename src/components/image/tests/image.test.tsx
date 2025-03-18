import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Image from "../index";

describe("Image component", () => {
  describe("Component rendering", () => {
    const handleClick = jest.fn();

    beforeEach(() => {
      render(
        <Image
          resource={{ src: "mock-image-url.jpg", alt: "Lorem ipsum", id: 1 }}
          variant="test"
          size="small"
          onClick={handleClick}
        />,
      );
    });

    it("Should render an image", () => {
      expect(screen.getByTestId("image")).toBeInTheDocument();
    });

    it("Should have a variant class of 'test applied'", () => {
      expect(screen.getByTestId("image")).toHaveClass("image--test");
    });

    it("Should have a size class of 'small' applied", () => {
      expect(screen.getByTestId("image")).toHaveClass("image--small");
    });

    it("Should have a image source of '/image-source", () => {
      expect(screen.getByTestId("image")).toHaveAttribute("src", "mock-image-url.jpg");
    });

    it("Should allow the user to click the card content", () => {
      fireEvent.click(screen.getByTestId("image"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("Component rendering (mobile)", () => {
    const handleClick = jest.fn();
    global.innerWidth = 375;

    beforeEach(() => {
      render(
        <Image
          resource={{ src: "mock-image-url.jpg", alt: "Lorem ipsum", id: 1 }}
          onClick={handleClick}
        />,
      );
    });

    it("Should render an image", () => {
      expect(screen.getByTestId("image")).toHaveClass("image--mobile");
    });
  });
});
