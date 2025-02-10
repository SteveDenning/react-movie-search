import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import SectionTitle from "../index";

describe("Section Title component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<SectionTitle heading="Heading One" />));

    it("Should render a section heading", () => {
      expect(screen.getByTestId("section-heading")).toBeInTheDocument();
    });

    it("Should have the title of 'Heading One'", () => {
      expect(screen.getByText("Heading One")).toBeInTheDocument();
    });
  });

  describe("Component rendering (with button)", () => {
    beforeEach(() =>
      render(
        <SectionTitle
          heading="Heading Two"
          buttonText="View more"
          buttonLink={"/media-listing?page=1"}
        />,
      ),
    );

    it("Should have the title of 'Heading Two'", () => {
      expect(screen.getByText("Heading Two")).toBeInTheDocument();
    });

    it("Should have a button with text 'View more'", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
      expect(screen.getByText("View more")).toBeInTheDocument();
    });

    it("Should have an arrow icon next to the button text", () => {
      expect(screen.getByTestId("ArrowForwardIosIcon")).toBeInTheDocument();
    });
  });
});
