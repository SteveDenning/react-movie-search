import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Image from "../index";

describe("Button component", () => {
  describe("Component rendering", () => {
    const resource = { src: "", alt: "Lorem ipsum" };
    const setup = () => render(<Image resource={resource}></Image>);

    beforeEach(() => {});

    it("Should render an image", () => {
      setup();
      expect(screen.getByTestId("image")).toBeInTheDocument();
    });
  });
});
