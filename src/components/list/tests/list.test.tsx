import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import List from "../index";

describe("list component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <List items={[]} />
        </MemoryRouter>,
      ),
    );

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });
  });
});
