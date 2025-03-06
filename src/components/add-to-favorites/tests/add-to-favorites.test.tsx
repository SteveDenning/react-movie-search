import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import AddToFavorites from "../index";

describe("Add to favorites component", () => {
  const handleFavorite = jest.fn();

  describe("Component rendering (logged in)", () => {
    beforeEach(() => {
      render(
        <AddToFavorites
          isFavorite={false}
          handleFavorite={handleFavorite}
          user={variables.user}
        />,
      );
    });

    it("Should render an Add To Favorites button", () => {
      expect(screen.getByTestId("add-to-favorites-logged-in")).toBeInTheDocument();
    });

    it("Should update the favourite icon when clicked", async () => {
      fireEvent.click(screen.getByTestId("add-to-favorites-logged-in"));
      await waitFor(() => expect(handleFavorite).toHaveBeenCalledTimes(1));
    });
  });

  describe("Component rendering (logged out)", () => {
    beforeEach(() => {
      render(
        <AddToFavorites
          isFavorite={false}
          handleFavorite={handleFavorite}
          user={null}
        />,
      );
    });

    it("Should render an Add To Favorites button", () => {
      expect(screen.getByTestId("navigation-action-logged-out")).toBeInTheDocument();
    });
  });
});
