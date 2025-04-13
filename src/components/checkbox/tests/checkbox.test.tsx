import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Checkbox from "../index";

describe("Checkbox Component", () => {
  describe("Rendering Checkbox elements", () => {
    const onChange = jest.fn((e) => {
      e.preventDefault();
    });

    beforeEach(() => {
      render(
        <Checkbox
          id="checkbox-01"
          label="Lorem ipsum"
          name="checkbox-01"
          onChange={onChange}
          checked={false}
          required
          variant="test"
        />,
      );
    });

    it("Should render all checkbox elements", () => {
      expect(screen.getByTestId("checkbox")).toBeInTheDocument();
      expect(screen.getByTestId("checkbox-input")).toBeInTheDocument();
      expect(screen.getByTestId("checkbox-label")).toBeInTheDocument();
    });

    it("Should have a class of 'checkbox' by default", () => {
      expect(screen.getByTestId("checkbox")).toHaveClass("checkbox");
    });

    it("Should render variant classes", () => {
      expect(screen.getByTestId("checkbox")).toHaveClass("checkbox--test");
    });

    it("Should display 'required' indicator", () => {
      expect(screen.getByTestId("checkbox-input")).toBeRequired();
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("Should run the onChange function when the checkbox input is clicked", () => {
      fireEvent.click(screen.getByTestId("checkbox-input"));
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("Other checkbox states", () => {
    const onChange = jest.fn((e) => {
      e.preventDefault();
    });

    beforeEach(() => {
      render(
        <Checkbox
          id="checkbox-02"
          label="Lorem ipsum"
          name="checkbox-02"
          onChange={onChange}
          checked
          disabled
          noLabel
        />,
      );
    });

    it("Should apply disabled attribute to checkbox", () => {
      expect(screen.getByTestId("checkbox-input")).toBeDisabled();
    });

    it("Should render label text as aria-label attribute on input element", () => {
      expect(screen.getByLabelText("Lorem ipsum", { selector: "input" })).toBeInTheDocument();
    });

    it("Should apply appropriate attributes and classnames when checked", () => {
      expect(screen.getByTestId("checkbox-input")).toBeChecked();
      expect(screen.getByTestId("checkbox")).toHaveClass("checkbox--checked");
    });
  });

  describe("Handling error states", () => {
    const onChange = jest.fn();

    beforeEach(() => {
      render(
        <Checkbox
          id="checkbox-04"
          label="Lorem ipsum"
          name="checkbox-04"
          onChange={onChange}
          checked={false}
        />,
      );
    });

    it("Should apply appropriate error class", () => {
      expect(screen.getByTestId("checkbox")).toHaveClass("checkbox--error");
    });

    it("Should display default error message", () => {
      expect(screen.getByText("Field is required")).toBeInTheDocument();
    });
  });
});
