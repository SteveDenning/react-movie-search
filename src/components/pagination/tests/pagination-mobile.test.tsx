import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Pagination from "../index";

describe("Pagination component", () => {
  const onChange = jest.fn();

  describe("Component rendering", () => {
    global.innerWidth = 375;
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

    it("Should render Previous and Next button as icons on smaller devices", () => {
      expect(screen.getByTestId("NavigateBeforeIcon")).toBeInTheDocument();
      expect(screen.getByTestId("NavigateNextIcon")).toBeInTheDocument();
    });
  });
});
