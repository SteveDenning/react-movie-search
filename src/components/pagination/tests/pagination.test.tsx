import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Pagination from "../index";

describe("Pagination component", () => {
  const onChange = jest.fn();

  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Pagination
          count={1}
          page={1}
          onChange={onChange}
        />,
      ),
    );

    it("Should render the Pagination", () => {
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });
  });
});
