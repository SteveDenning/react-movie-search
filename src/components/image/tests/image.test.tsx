import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Image from "../index";

describe("Image component", () => {
  describe("Component rendering", () => {
    const resource = { src: "", alt: "Lorem ipsum" };
    const setup = () => render(<Image resource={resource}></Image>);

    it("Should render an image", () => {
      setup();
      expect(screen.getByTestId("image")).toBeInTheDocument();
    });
  });
});
