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
    });
  });
});
