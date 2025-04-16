import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Services
import { getFavorites } from "../../../services/favorites";

// Components
import Favorites from "../index";

// Variables
import { variables } from "./config";

let mockStorage = {};

// Mock
jest.mock("../../../services/favorites");

describe("Favorites component", () => {
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

  describe("Component rendering", () => {
    beforeEach(async () => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };

      (getFavorites as jest.Mock).mockResolvedValue(variables.favouriteMovies);

      await waitFor(async () => {
        render(
          <MemoryRouter>
            <Favorites />
          </MemoryRouter>,
        );
      });
    });

    it("Should render favorites view", async () => {
      await waitFor(() => expect(getFavorites).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("favorites")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId("tabs")).toBeInTheDocument());
    });

    it("Should render favourite Movies on load", async () => {
      await waitFor(() => expect(screen.getByTestId("tabs")).toBeInTheDocument());
      await waitFor(() => expect(screen.getAllByTestId("tab-button")[0]).toHaveClass("tabs__button--selected"));
      await waitFor(() => expect(screen.getAllByTestId("tile")).toHaveLength(4));
    });

    it("Should allow the user to select the TV Favourites", async () => {
      const movieTabButton = screen.getAllByTestId("tab-button")[0];
      const tvTabButton = screen.getAllByTestId("tab-button")[1];

      await waitFor(() => expect(movieTabButton).toHaveClass("tabs__button--selected"));
      await waitFor(() => expect(tvTabButton).not.toHaveClass("tabs__button--selected"));

      fireEvent.click(tvTabButton);
      await waitFor(() => expect(tvTabButton).toHaveClass("tabs__button--selected"));
    });
  });

  describe("Component rendering (no added favourites)", () => {
    beforeEach(async () => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };

      (getFavorites as jest.Mock).mockResolvedValue(variables.noResults);

      await waitFor(async () => {
        render(
          <MemoryRouter>
            <Favorites />
          </MemoryRouter>,
        );
      });
    });

    it("Should render a message when no favourites have been added", () => {
      expect(screen.queryByTestId("list")).toBeNull();
      expect(screen.getByTestId("favorites-empty-message")).toBeInTheDocument();
      expect(screen.getByText("You currently have no favourite movies")).toBeInTheDocument();
    });
  });

  describe("Component rendering (logged out)", () => {
    beforeEach(async () => {
      mockStorage = {};

      (getFavorites as jest.Mock).mockResolvedValue(variables.noResults);

      await waitFor(async () => {
        render(
          <MemoryRouter>
            <Favorites />
          </MemoryRouter>,
        );
      });
    });

    it("Should redirect to home page if not logged in", () => {
      expect(window.location.href).toBe(window.location.origin + "/");
    });
  });
});
