import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import AILoader from "../index";

describe("AiLoader component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<AILoader />));

    it("Should render a template", () => {
      expect(screen.getByTestId("ai-loader")).toBeInTheDocument();
    });
  });
});
