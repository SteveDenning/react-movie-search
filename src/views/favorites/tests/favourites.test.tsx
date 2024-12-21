import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Favorites from "../index";

// Variables
import { variables } from "./config";

let mockStorage = {};

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
    beforeEach(() => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };

      render(
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>,
      );
    });

    it("Should render favorites", () => {
      expect(screen.getByTestId("favorites")).toBeInTheDocument();
      expect(screen.getByTestId("tabs")).toBeInTheDocument();
    });
  });

  describe("Component rendering (no added favourites)", () => {
    beforeEach(() => {
      mockStorage = {
        user: JSON.stringify(variables.user),
      };

      render(
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>,
      );
    });

    it("Should render a message when no favourites have been added", () => {
      expect(screen.queryByTestId("list")).toBeNull();
      expect(screen.getByTestId("favorites-empty-message")).toBeInTheDocument();
      expect(screen.getByText("You currently have no favourite movies")).toBeInTheDocument();
    });
  });
});
