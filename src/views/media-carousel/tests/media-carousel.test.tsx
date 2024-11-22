import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
// import axios from "axios";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// Components
import MediaCarousel from "../index";

// Icons

describe("Media carousel component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <MediaCarousel
          buttonText="View all"
          label="Known for"
          pathName="person/popular"
          responsiveOptions={{}}
          media="person"
        />,
      );
    });

    it("Should render Media carousel block", () => {
      expect(screen.getByTestId("media-carousel")).toBeInTheDocument();
    });

    // it("Should render a heading link with the text TV Releases", async () => {
    //   await waitFor(() => {
    //     expect(screen.getByText("TV Releases")).toBeInTheDocument();
    //   });
    // });

    // it("Should render the carousel", async () => {
    //   await waitFor(() => {
    //     expect(screen.getByTestId("carousel")).toBeInTheDocument();
    //   });
    // });
  });
});
