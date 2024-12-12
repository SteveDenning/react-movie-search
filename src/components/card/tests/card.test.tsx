import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import Card from "../index";

describe("Card component", () => {
  describe("Component rendering", () => {
    const handleClick = jest.fn();

    beforeEach(() =>
      render(
        <Card
          resource={variables.data}
          onClick={handleClick}
          variant="banner"
        />,
      ),
    );

    it("Should render a card", () => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("Should render a card with a variant class of 'test'", () => {
      expect(screen.getByTestId("card")).toHaveClass("card--test");
    });

    it("Should allow the user to click the card content", () => {
      fireEvent.click(screen.getByTestId("card-content"));
      expect(handleClick).toHaveBeenCalled();
    });

    it("Should display the title of the card", () => {
      expect(screen.getByText("Tom Hardy")).toBeInTheDocument();
    });

    it("Should display the character the actor plays", () => {
      expect(screen.getByText("Eddie Brock / Venom")).toBeInTheDocument();
    });

    it("Should add the variant class of ''", () => {
      expect(screen.getByTestId("card")).toHaveClass("card--test");
    });
  });
});
