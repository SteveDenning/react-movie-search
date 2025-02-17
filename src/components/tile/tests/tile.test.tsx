import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Tile from "../index";

describe("Tile component", () => {
  const handleDelete = jest.fn();

  describe("Component rendering", () => {
    global.innerWidth = 2000;

    beforeEach(() =>
      render(
        <Tile
          resource={{}}
          handleDelete={handleDelete}
        />,
      ),
    );

    it("Should render the Tile", () => {
      expect(screen.getByTestId("tile")).toBeInTheDocument();
    });
  });
});
