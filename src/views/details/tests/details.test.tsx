import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import DetailsView from "../index";

// Services
import { getMediaByID, getMedia, getOmdbMedia } from "../../../services/media";

// Variables
import { variables } from "./config";

// Mock
jest.mock("../../../services/media");
jest.mock("../../../hocs/with-user-provider");

describe("Details Page component", () => {
  const handleMediaTitle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Component rendering (Movie)", () => {
    it("Should render details page for ", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { pathname: "/details/movie/950396" };

      (getMediaByID as jest.Mock).mockResolvedValue(variables.movie);
      (getOmdbMedia as jest.Mock).mockResolvedValue(variables.omdbResource);
      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(getMediaByID).toHaveBeenCalled();
        expect(getOmdbMedia).toHaveBeenCalled();
        expect(getMedia).toHaveBeenCalled();
        expect(screen.getByTestId("details-view")).toBeInTheDocument();
        expect(screen.getByText("The Gorge")).toBeInTheDocument();
      });
    });
  });

  describe("Component rendering (TV)", () => {
    it("Should render details page", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { pathname: "/details/tv/108978" };

      (getMediaByID as jest.Mock).mockResolvedValue(variables.tv);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(getMediaByID).toHaveBeenCalled();
        expect(screen.getByTestId("details-view")).toBeInTheDocument();
        expect(screen.getByText("Reacher")).toBeInTheDocument();
      });
    });
  });

  describe("Component rendering networks link", () => {
    it("Should render details page", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { pathname: "/details/tv/108978" };

      const consoleSpy = jest.spyOn(window, "open").mockImplementation();
      // const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMediaByID as jest.Mock).mockResolvedValue(variables.tv);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(getMedia).toHaveBeenCalled();
      });

      expect(screen.getByTestId("details-view-network-image")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("details-view-network-image"));
      (getMedia as jest.Mock).mockResolvedValue(variables.network);
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
    });
  });

  describe("Component rendering (Person)", () => {
    it("Should render details page", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { pathname: "/details/person/738" };

      (getMediaByID as jest.Mock).mockResolvedValue(variables.person);
      (getMedia as jest.Mock).mockResolvedValue(variables.media);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(getMediaByID).toHaveBeenCalled();
        expect(getMedia).toHaveBeenCalled();
        expect(screen.getByTestId("details-view")).toBeInTheDocument();
        expect(screen.getByText("Sean Connery")).toBeInTheDocument();
      });
    });
  });

  describe("Component rendering (error state)", () => {
    it("Should render an error message for getMediaByID", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMediaByID as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("details-view-error")).toBeInTheDocument());
    });
  });

  describe("Component rendering (error state)", () => {
    it("Should render an error message for getVideos", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { pathname: "/details/tv/108978" };

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      (getMedia as jest.Mock).mockRejectedValue(variables.error);

      render(
        <MemoryRouter>
          <DetailsView handleMediaTitle={handleMediaTitle} />
        </MemoryRouter>,
      );
      await waitFor(() => expect(consoleSpy).toHaveBeenCalled());
      await waitFor(() => expect(screen.getByTestId("details-view-error")).toBeInTheDocument());
    });
  });
});
