import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Search from "../index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Search component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Search />
        </MemoryRouter>,
      );
    });

    it("Should render the search form", () => {
      expect(screen.getByTestId("search-form")).toBeInTheDocument();
    });

    it("Should render the search form input", () => {
      expect(screen.getByTestId("search-form-input")).toBeInTheDocument();
    });

    it("Should render the search form input with class 'search__form-input'", () => {
      expect(screen.getByTestId("search-form-input")).toHaveClass("search__form-input");
    });

    it("Should render the search form label with text 'Search for media'", () => {
      expect(screen.getByTestId("search-form-label")).toHaveTextContent("Search for media");
    });

    it("Should not render a reset button if there is no value", () => {
      expect(screen.queryByTestId("search-form-clear")).not.toBeInTheDocument();
    });

    it("Should render a reset button", () => {
      fireEvent.change(screen.getByTestId("search-form-input"), { target: { value: "one" } });
      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    });

    it("Should clear the search when the reset button is clicked", () => {
      fireEvent.change(screen.getByTestId("search-form-input"), { target: { value: "Harry Potter" } });
      expect(screen.queryByTestId("search-form-input")).toHaveValue("Harry Potter");
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
      expect(screen.queryByTestId("search-form-input")).toHaveValue("");
    });

    it("Should allow the user submit the search by pressing 'enter' key", async () => {
      fireEvent.change(screen.getByTestId("search-form-input"), { target: { value: "Harry Potter" } });
      expect(screen.queryByTestId("search-form-input")).toHaveValue("Harry Potter");
      fireEvent.click(screen.queryAllByTestId("button")[0]);
      // TODO - need to mock navigation to test the handle submit has worked
    });

    it("Should clear and call navigate()", async () => {
      fireEvent.change(screen.getByTestId("search-form-input"), { target: { value: "one" } });
      await waitFor(() => expect(screen.queryByTestId("search-form-input")).toHaveValue("one"));
      expect(screen.queryByTestId("search-form-input")).toHaveValue("one");

      fireEvent.click(screen.getByTestId("search-form-clear"));

      await expect(mockedUsedNavigate).toHaveBeenCalled();
    });
  });
});
