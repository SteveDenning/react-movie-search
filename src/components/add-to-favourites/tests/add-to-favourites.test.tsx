import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import AddToFavourites from "../index";

describe("Add to favourites component", () => {
  const handleFavorite = jest.fn();

  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <AddToFavourites
          isFavourite={false}
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render a Add To Favourites", () => {
      expect(screen.getByTestId("add-to-favourites")).toBeInTheDocument();
      expect(screen.getByTestId("FavoriteBorderIcon")).toBeInTheDocument();
    });
  });

  describe("Component rendering (is favourite)", () => {
    beforeEach(() => {
      render(
        <AddToFavourites
          isFavourite
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render a Add To Favourites", () => {
      expect(screen.queryByTestId("add-to-favourites")).toBeInTheDocument();
      expect(screen.queryByTestId("FavoriteIcon")).toBeInTheDocument();
    });
  });
});
