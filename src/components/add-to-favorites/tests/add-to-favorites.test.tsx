import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

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
        />,
      );
    });

    it("Should render an Add To Favorites button", () => {
      expect(screen.getByTestId("add-to-favorites")).toBeInTheDocument();
      expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
    });

    it("Should update the favourite icon when clicked", async () => {
      fireEvent.click(screen.getByTestId("add-to-favorites"));
      await waitFor(() => expect(screen.queryByTestId("FavoriteIcon")).toBeInTheDocument());
    });
  });

  describe("Component rendering (logged out)", () => {
    beforeEach(() => {
      render(
        <AddToFavorites
          isFavorite={false}
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render an Add To Favorites button", () => {
      expect(screen.getByTestId("add-to-favorites")).toBeInTheDocument();
      expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
    });
  });
});
