import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import ImageModal from "../index";

describe("Image Modal component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <ImageModal resource={{ src: "mock-image-url.jpg", alt: "Lorem ipsum", id: 1 }} />
        </MemoryRouter>,
      ),
    );

    it("Should render a Image Modal", () => {
      expect(screen.getByTestId("image-modal")).toBeInTheDocument();
    });

    it("Should allow the user to open the modal to view the image", async () => {
      fireEvent.click(screen.getByTestId("image-element"));

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).toBeInTheDocument();
      });
    });

    it("Should allow the user to close the modal when the button is clicked", async () => {
      fireEvent.click(screen.getByTestId("image-element"));
      fireEvent.click(screen.getByTestId("button"));
      await waitFor(() => {
        expect(screen.queryByTestId("modal")).toBeNull();
      });
    });
  });
});
