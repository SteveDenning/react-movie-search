import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import Carousel from "../index";

// Variable
import { variables } from "./config";

describe("Carousel component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <Carousel
          resources={variables.resources}
          media="movie"
        />,
      );
    });

    it("Should render a carousel with eight items", () => {
      expect(screen.getByTestId("carousel")).toBeInTheDocument();
      expect(screen.queryAllByTestId("carousel-item")).toHaveLength(8);
    });
  });

  describe("Component rendering (Banner variant)", () => {
    beforeEach(() => {
      render(
        <Carousel
          resources={variables.resources}
          media="movie"
          banner
        />,
      );
    });

    it("Should allow the user to click the card", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { href: "" };

      const card = screen.queryAllByTestId("carousel-overlay")[0];
      expect(card).toBeInTheDocument();
      fireEvent.click(card);

      await waitFor(() => expect(window.location.href).toBe("/details/movie/950396"));
    });
  });
});
