import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Search from "../index";

describe("Latest Releases component", () => {
  describe("Component rendering", () => {
    const onSubmit = jest.fn();
    const setValue = jest.fn();

    const setup = () =>
      render(
        <Search
          setValue={setValue}
          onSubmit={onSubmit}
        />,
      );

    beforeEach(() => {});

    it("Should render the search field", () => {
      setup();
      expect(screen.getByTestId("search")).toBeInTheDocument();
    });
  });
});
