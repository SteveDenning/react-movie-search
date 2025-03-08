import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Accordion from "../index";

describe("Accordion Component", () => {
  describe("Rendering accordion elements", () => {
    beforeEach(() => {
      render(
        <Accordion
          label="Lorem ipsum"
          items={[
            {
              title: "Lorem ipsum",
              overview: "This is some toggle content",
            },
          ]}
        />,
      );
    });

    it("Should render the accordion", () => {
      expect(screen.getByTestId("accordion")).toBeInTheDocument();
    });

    it("Should render all accordion elements", () => {
      expect(screen.getByTestId("accordion-item")).toBeInTheDocument();
      expect(screen.getByTestId("accordion-trigger")).toBeInTheDocument();
      expect(screen.getByTestId("accordion-title")).toBeInTheDocument();
      expect(screen.getByTestId("accordion-icon")).toBeInTheDocument();
    });

    it("Should render all items closed by default", () => {
      expect(screen.getByTestId("accordion-trigger")).not.toHaveClass("accordion__trigger--open");
      expect(screen.getByTestId("accordion-inner")).not.toHaveClass("accordion__inner--open");
    });

    it("Should open item when clicking toggle", async () => {
      fireEvent.click(screen.getByTestId("accordion-trigger"));
      expect(screen.getByTestId("accordion-trigger")).toHaveClass("accordion__trigger--open");
      expect(screen.getByTestId("accordion-inner")).toHaveClass("accordion__inner--open");
    });
  });

  describe("Alternative states", () => {
    beforeEach(() => {
      render(
        <Accordion
          label="Lorem ipsum"
          reversed
          items={[
            {
              title: "Lorem ipsum",
              overview: "This is some toggle content ",
            },
          ]}
        />,
      );
    });

    it("Should not apply variant classes", () => {
      expect(screen.getByTestId("accordion-trigger")).toHaveClass("accordion__trigger--reversed");
    });
  });
});
