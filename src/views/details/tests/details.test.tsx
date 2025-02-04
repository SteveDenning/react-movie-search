import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import DetailsView from "../index";

// Services
import { getMediaByID, getMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");

describe("Details Page component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Component rendering (Person)", () => {
    it("Should render details page", async () => {
      const handleMediaTitle = jest.fn();

      delete window.location;
      // @ts-ignore
      window.location = { pathname: "http://localhost:3000/details/person/738" };

      (getMediaByID as jest.Mock).mockResolvedValue(variables.person);
      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(getMediaByID).toHaveBeenCalled();
        expect(screen.getByTestId("details-view")).toBeInTheDocument();
        expect(screen.getByText("Sean Connery")).toBeInTheDocument();
        expect(screen.queryByTestId("details-view-video")).not.toBeInTheDocument();
      });
    });
  });
});
