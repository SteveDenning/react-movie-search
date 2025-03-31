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

    beforeEach(async () => {
      Object.defineProperty(window, "location", {
        value: { pathname: "/credits/movie/1241982/Moana%202" },
        writable: true,
      });

      (getMedia as jest.Mock).mockResolvedValue(variables.response);
      await waitFor(() => {
        render(
          <MemoryRouter>
            <Credits handleMediaTitle={handleMediaTitle} />
          </MemoryRouter>,
        );
      });
    });

    it("Should render the Credits", async () => {
      await waitFor(() => expect(getMedia).toHaveBeenCalled());
      await waitFor(() => expect(getMedia).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(getMedia).toHaveBeenCalledWith("movie/1241982/credits?language=en-US"));
      await waitFor(() => expect(screen.getByTestId("credits-results")).toBeInTheDocument());
    });

    it("Should render the movie title", async () => {
      expect(handleMediaTitle).toHaveBeenCalledWith("Moana 2");
      await waitFor(() => expect(screen.getByTestId("section-heading")).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText("Moana 2")).toBeInTheDocument());
    });

    it("Should render tabs for Cast and Crew", async () => {
      expect(screen.queryAllByTestId("tab-button")).toHaveLength(2);
    });

    it("Should render three Cast members", async () => {
      expect(screen.queryAllByTestId("card")).toHaveLength(3);
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

  describe("Component rendering (error state)", () => {
    it("Should render the Credits error message", async () => {
      const handleMediaTitle = jest.fn();
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <Credits handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("credits-error")).toBeInTheDocument());
    });
  });
});
