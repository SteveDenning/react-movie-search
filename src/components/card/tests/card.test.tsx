import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import Card from "../index";

let mockStorage = {};

describe("Card component", () => {
  describe("Component rendering", () => {
    const handleClick = jest.fn();

    beforeAll(() => {
      global.Storage.prototype.setItem = jest.fn((key, value) => {
        mockStorage[key] = value;
      });
      global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key]);
    });

    beforeEach(() =>
      render(
        <Card
          resource={variables.person}
          onClick={handleClick}
          variant="banner"
        />,
      ),
    );

    it("Should render a card", () => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("Should display a date field if there is a first air date", () => {
      expect(screen.queryByTestId("first-air-date")).toBeInTheDocument();
    });

    it("Should render a card with a variant class of 'test'", () => {
      expect(screen.getByTestId("card")).toHaveClass("card--banner");
    });

    it("Should allow the user to click the card", () => {
      fireEvent.click(screen.getByTestId("button"));
      expect(handleClick).toHaveBeenCalled();
    });

    it("Should display the title of the card", () => {
      expect(screen.getByText("Tom Hardy")).toBeInTheDocument();
    });

    it("Should display the character the actor plays", () => {
      expect(screen.getByText("Eddie Brock / Venom")).toBeInTheDocument();
    });
  });

  describe("Component rendering (logged in)", () => {
    const handleFavorite = jest.fn();

    beforeEach(() => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };
      render(
        <Card
          resource={variables.film}
          handleFavorite={handleFavorite}
        />,
      );
    });

    it("Should render a card with a favourites icon", async () => {
      expect(screen.getByTestId("add-to-favorites")).toBeInTheDocument();
    });

    it("Should allow the user to click the favourite button", async () => {
      const favouriteButton = screen.getByTestId("add-to-favorites");

      expect(favouriteButton).toBeInTheDocument();

      fireEvent.click(favouriteButton);

      await waitFor(() => expect(handleFavorite).toHaveBeenCalled());
    });
  });
});
