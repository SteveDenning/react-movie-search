import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { act } from "@testing-library/react";

// Components
import Video from "../index";

describe("Video component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(<Video youTubeKey="" />);
    });

    it("Should render an video", async () => {
      await act(async () => {
        // Trigger rendering that involves suspense or async updates
        render(<Video youTubeKey="" />);

        // Wait for async data or suspense resolution
        await expect(screen.getByTestId("video")).toBeInTheDocument();
      });
    });
  });
});
