import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import AddToFavourites from "../index";

// Variables
import { variables } from "./config";

let mockStorage = {};

describe("Add to favourites component", () => {
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

      render(<AddToFavourites resource={variables.data} />);
    });

    it("Should render a Add To Favourites", () => {
      expect(screen.getByTestId("add-to-favourites")).toBeInTheDocument();
    });
  });

  describe("Component rendering (logged out)", () => {
    beforeEach(() => {
      mockStorage = {
        user: null,
      };

      render(<AddToFavourites resource={variables.data} />);
    });

    it("Should render a Add To Favourites", () => {
      expect(screen.queryByTestId("add-to-favourites")).not.toBeInTheDocument();
    });
  });
});
