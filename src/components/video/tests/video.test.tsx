import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Video from "../index";

describe("Video component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <Video
          youTubeKey="z0B0dG44DLc"
          responsive
        />,
      );
    });

    it("Should render an video", async () => {
      await expect(screen.getByTestId("video")).toBeInTheDocument();
    });

    it("Should render an video with a responsive class", async () => {
      await expect(screen.getByTestId("video")).toHaveClass("video--responsive");
    });
  });
});
