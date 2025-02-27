import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import Credits from "../index";

// Services
import { getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Credits component", () => {
  describe("Component rendering", () => {
    const handleMediaTitle = jest.fn();

    beforeEach(() => {
      Object.defineProperty(window, "location", {
        value: { pathname: "/movie/123/credits/Inception" },
        writable: true,
      });

      (getMedia as jest.Mock).mockResolvedValue(variables.response);

      render(
        <MemoryRouter>
          <Credits handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );
    });

    it("Should render a template", () => {
      expect(screen.getByTestId("credits")).toBeInTheDocument();
    });

    it("Should render the movie title", () => {
      expect(handleMediaTitle).toHaveBeenCalledWith("Inception");
      expect(screen.getByText("Inception")).toBeInTheDocument();
    });

    it("Should render tabs for Cast and Crew", async () => {
      expect(screen.queryAllByTestId("tab-button")).toHaveLength(2);
    });

    it("Should allow the user to select the Crew tab", async () => {
      expect(screen.queryAllByTestId("tab-button")).toHaveLength(2);

      const castTabButton = screen.queryAllByTestId("tab-button")[0];
      const crewTabButton = screen.queryAllByTestId("tab-button")[1];

      expect(castTabButton).toHaveClass("tabs__button--selected");
      fireEvent.click(crewTabButton);
      await waitFor(() => expect(crewTabButton).toHaveClass("tabs__button--selected"));
    });
  });
});
