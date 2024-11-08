import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Header from "../index";
// Icons

describe("Header component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <MemoryRouter>
          <Header heading="Search" />
        </MemoryRouter>,
      );

    it("Should render the header", () => {
      setup();
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });
  });
});
