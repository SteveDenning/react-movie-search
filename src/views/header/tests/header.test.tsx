import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Header from "../index";
// Icons

describe("Header component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      delete window.location;
      // @ts-ignore
      window.location = { href: "" };

      render(
        <MemoryRouter>
          <Header heading="Search" />
        </MemoryRouter>,
      );
    });

    it("Should render the header", () => {
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("Should display a message to invite users to log in", () => {
      expect(screen.getByTestId("header-message")).toBeInTheDocument();
    });

    it("Should allow the user to close the message", async () => {
      expect(screen.getByTestId("hide-message")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("hide-message"));

      await waitFor(() => expect(screen.queryByTestId("header-message")).toHaveClass("header__message--fade-out"));
    });

    it("Should navigate to the home page when the home icon is clicked", async () => {
      expect(screen.getByTestId("header-logo")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("header-logo"));

      await waitFor(() => expect(window.location.href).toBe("/"));
    });

    it("Should allow the user to toggle the navigation", async () => {
      const loginButton = screen.getByTestId("login");
      expect(loginButton).toBeInTheDocument();

      fireEvent.click(loginButton);

      await waitFor(() => expect(screen.queryByTestId("navigation")).toBeInTheDocument());
    });
  });
});
