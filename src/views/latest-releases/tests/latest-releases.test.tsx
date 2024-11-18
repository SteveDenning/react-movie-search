import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import axios from "axios";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// Components
import LatestReleases from "../index";

// Icons

describe("Latest Releases component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <LatestReleases
          label="TV Releases"
          media="tv"
          path="discover/tv"
          imagePath="poster_path"
        />,
      );
    });

    it("Should render latest releases block", () => {
      expect(screen.getByTestId("latest-releases")).toBeInTheDocument();
    });

    it("Should render a heading link with the text TV Releases", async () => {
      await waitFor(() => {
        expect(screen.getByText("TV Releases")).toBeInTheDocument();
      });
    });

    it("Should render the carousel", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
      });
    });
  });
});
