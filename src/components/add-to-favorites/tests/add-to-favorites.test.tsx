import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import AddToFavorites from "../index";

describe("Add to favorites component", () => {
  const handleFavorite = jest.fn();

  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <AddToFavorites
          isFavorite={false}
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render a Add To Favorites", () => {
      expect(screen.getByTestId("add-to-favorites")).toBeInTheDocument();
      expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
    });
  });

  describe("Component rendering (is favorite)", () => {
    beforeEach(() => {
      render(
        <AddToFavorites
          isFavorite
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render a Add To Favorites", () => {
      expect(screen.queryByTestId("add-to-favorites")).toBeInTheDocument();
      expect(screen.queryByTestId("FavoriteIcon")).toBeInTheDocument();
    });
  });
});
