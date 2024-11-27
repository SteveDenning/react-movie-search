import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Select from "../index";

describe("Select component", () => {
  describe("Component rendering", () => {
    const onChange = jest.fn();
    beforeEach(() => {
      render(
        <Select
          id="mediType"
          label="Select Media"
          value="Film"
          onChange={onChange}
          options={[
            { value: "multi", label: "All" },
            { value: "movie", label: "Film" },
          ]}
        />,
      );
    });

    it("Should render a Select", () => {
      expect(screen.getByTestId("select")).toBeInTheDocument();
    });

    it("Should render a Select label with accessible class", () => {
      expect(screen.getByTestId("select-label")).toHaveClass("select__label sr-only");
    });
  });
});
