import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import SectionTitle from "../index";

describe("Section Title component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<SectionTitle text="Some text" />));

    it("Should render a template", () => {
      expect(screen.getByTestId("section-heading")).toBeInTheDocument();
    });
  });
});
