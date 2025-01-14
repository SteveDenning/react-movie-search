import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import AIMedia from "../index";
// Icons

describe("AIMedia component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(<AIMedia />);
    });

    it("Should render the AIMedia view", () => {
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
  });
});
