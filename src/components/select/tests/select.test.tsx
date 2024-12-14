import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import selectEvent from "react-select-event";

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

    it("Should render all select elements", () => {
      const selectInput = screen.getByTestId("select").querySelectorAll("input")[0];

      expect(screen.getByTestId("select")).toBeInTheDocument();
      expect(selectInput).toBeInTheDocument();
      expect(screen.getByTestId("select-label")).toBeInTheDocument();
    });

    it("Should render a Select label with accessible class", () => {
      expect(screen.getByTestId("select-label")).toHaveClass("select__label sr-only");
    });

    it("Should run the onChange function when the select value is updated", async () => {
      const selectInput = screen.getByTestId("select").querySelectorAll("input")[0];
      selectEvent.select(selectInput, ["Film"]);
      await waitFor(() => expect(onChange).toHaveBeenCalled());
    });
  });

  describe("Component rendering (with label)", () => {
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
          labeled
        />,
      );
    });

    it("Should render a Select label with accessible class", () => {
      expect(screen.getByTestId("select-label")).not.toHaveClass("select__label sr-only");
    });
  });
});
