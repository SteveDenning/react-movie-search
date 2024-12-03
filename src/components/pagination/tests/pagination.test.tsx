import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Pagination from "../index";

describe("Pagination component", () => {
  const onChange = jest.fn();

  describe("Component rendering", () => {
    global.innerWidth = 2000;

    beforeEach(() =>
      render(
        <Pagination
          count={2}
          page={1}
          onChangePage={onChange}
        />,
      ),
    );

    it("Should render the Pagination", () => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });

    it("Should render Previous and Next buttons", () => {
      expect(screen.queryByText("Previous")).toBeInTheDocument();
      expect(screen.queryByText("Next")).toBeInTheDocument();
    });

    it("Should not render Previous and Next button as icons", () => {
      expect(screen.queryByTestId("NavigateBeforeIcon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("NavigateNextIcon")).not.toBeInTheDocument();
    });
  });

  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Pagination
          count={1}
          page={1}
          onChangePage={onChange}
        />,
      ),
    );

    it("Should not render the Pagination if only one page is available", () => {
      expect(screen.queryByTestId("pagination")).toBeNull();
    });
  });
});
