import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import ImageModal from "../index";

describe("ImageModal component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<ImageModal resource={{ src: "mock-image-url.jpg", alt: "Lorem ipsum", id: 1 }} />));

    it("Should render a Image Modal", () => {
      expect(screen.getByTestId("image-modal")).toBeInTheDocument();
    });

    it("Should allow the user to open the modal to view the image", async () => {
      fireEvent.click(screen.getByTestId("image-element"));

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).toBeInTheDocument();
      });
    });

    it("Should allow the user to open the modal to view the image", async () => {
      fireEvent.click(screen.getByTestId("image-element"));

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).toBeInTheDocument();
      });
    });

    it("Should hide the modal when the close button is clicked", async () => {
      fireEvent.click(screen.getByTestId("image-element"));
      fireEvent.click(screen.getByTestId("button"));
      await waitFor(() => {
        expect(screen.queryByTestId("modal")).toBeNull();
      });
    });
  });
});
