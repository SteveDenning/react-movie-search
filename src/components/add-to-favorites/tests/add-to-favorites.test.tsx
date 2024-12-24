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

  describe("Component rendering (logged out)", () => {
    beforeEach(() => {
      mockStorage = {
        user: null,
      };

      render(
        <AddToFavorites
          isFavorite={false}
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should display a message to ask the user to log in", async () => {
      fireEvent.click(screen.getByTestId("add-to-favorites"));
      await waitFor(() => expect(screen.queryByTestId("modal")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText("Please log in to add to your favourites")).toBeInTheDocument());
    });

    it("Should let the user close the modal", async () => {
      fireEvent.click(screen.getByTestId("add-to-favorites"));
      await waitFor(() => expect(screen.queryByTestId("modal")).toBeInTheDocument());

      fireEvent.click(screen.getByTestId("button"));
      await waitFor(() => expect(screen.queryByTestId("modal")).toBeNull());
    });
  });
});
