import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Carousel from "../index";

describe("Carousel component", () => {
  describe("Component rendering", () => {
    const resources = [{ image: "", alt: "Lorem ipsum" }];
    const setup = () =>
      render(
        <Carousel
          resources={resources}
          label="Lorem Ipsom"
          type="movie"
        />,
      );

    it("Should render an carousel", () => {
      setup();
      expect(screen.getByTestId("carousel")).toBeInTheDocument();
    });
  });
});
