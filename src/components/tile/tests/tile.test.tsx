import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import Tile from "../index";

describe("Tile component", () => {
  const handleDelete = jest.fn();

  describe("Component rendering", () => {
    global.innerWidth = 2000;

    beforeEach(() => {
      delete window.location;
      // @ts-ignore
      window.location = { href: "" };
      render(
        <Tile
          resource={variables.resource}
          handleDelete={handleDelete}
        />,
      );
    });

    it("Should render the Tile", () => {
      expect(screen.getByTestId("tile")).toBeInTheDocument();
    });

    it("Should render the Title in the tile", () => {
      expect(screen.getByText("Town of the Dragon")).toBeInTheDocument();
    });

    it("Should allow the user to open the Modal", async () => {
      expect(screen.getAllByTestId("button")[1]).toBeInTheDocument();

      fireEvent.click(screen.getAllByTestId("button")[1]);

      await waitFor(() => expect(screen.getByTestId("modal")).toBeInTheDocument());
    });

    it("Should allow the user to use the Cancel button to stop the deletion process", async () => {
      expect(screen.getAllByTestId("button")[1]).toBeInTheDocument();

      fireEvent.click(screen.getAllByTestId("button")[1]);

      await waitFor(() => expect(screen.getByTestId("cancel-button")).toBeInTheDocument());

      fireEvent.click(screen.getByTestId("cancel-button"));

      await waitFor(() => expect(screen.queryByTestId("modal")).not.toBeInTheDocument());
    });

    it("Should allow the user to close the Modal with the close icon", async () => {
      expect(screen.getAllByTestId("button")[1]).toBeInTheDocument();

      fireEvent.click(screen.getAllByTestId("button")[1]);

      await waitFor(() => expect(screen.getByTestId("modal-close-button")).toBeInTheDocument());

      fireEvent.click(screen.getByTestId("modal-close-button"));

      await waitFor(() => expect(screen.queryByTestId("modal")).not.toBeInTheDocument());
    });

    it("Should allow the user to delete a tile", async () => {
      expect(screen.getAllByTestId("button")[1]).toBeInTheDocument();

      fireEvent.click(screen.getAllByTestId("button")[1]);

      await waitFor(() => expect(screen.getByTestId("modal")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId("delete-button")).toBeInTheDocument());

      fireEvent.click(screen.getByTestId("delete-button"));

      await waitFor(() => expect(handleDelete).toHaveBeenCalled());
    });

    it("Should allow the user to click the image and view the media page", async () => {
      expect(screen.getAllByTestId("button")[0]).toBeInTheDocument();
      fireEvent.click(screen.getAllByTestId("button")[0]);
      await waitFor(() => expect(window.location.href).toBe("/details/movie/893978"));
    });
  });
});
