import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Favourites from "../index";

// Variables
import { variables } from "./config";

let mockStorage = {};

describe("Favourites component", () => {
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

      render(<Favourites />);
    });

    it("Should render favourites", () => {
      expect(screen.getByTestId("favourites")).toBeInTheDocument();
    });
  });
});
