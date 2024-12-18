import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import List from "../index";

describe("list component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<List items={[]} />));

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });
  });
});
