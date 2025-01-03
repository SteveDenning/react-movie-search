import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import AddToFavorites from "../index";

// Variables
import { variables } from "./config";

let mockStorage = {};

describe("Add to favorites component", () => {
  const handleFavorite = jest.fn();

  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockStorage[key] = value;
    });
    global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
  });

  afterAll(() => {
    // @ts-ignore
    global.Storage.prototype.setItem.mockReset();
    // @ts-ignore
    global.Storage.prototype.getItem.mockReset();
  });

  describe("Component rendering (logged in)", () => {
    beforeEach(() => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };

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
});
