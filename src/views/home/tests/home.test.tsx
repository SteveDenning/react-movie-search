import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Home from "../index";

// Icons

describe("Home page component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );
    });

    it("Should render the home view", () => {
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });

    it("Should render the Movie Releases carousel", async () => {
      await waitFor(() => expect(screen.getByText("Movie Releases")).toBeInTheDocument());
    });

    it("Should render the TV releases carousel", async () => {
      await waitFor(() => expect(screen.getByText("TV releases")).toBeInTheDocument());
    });

    it("Should render the Popular actors carousel", async () => {
      await waitFor(() => expect(screen.getByText("Most popular actors")).toBeInTheDocument());
    });
  });
});
