import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Template from "../index";

describe("template component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Template>
          <p>Lorem Ipsom</p>
        </Template>,
      ),
    );

    it("Should render a template", () => {
      expect(screen.getByTestId("template")).toBeInTheDocument();
    });
  });
});
