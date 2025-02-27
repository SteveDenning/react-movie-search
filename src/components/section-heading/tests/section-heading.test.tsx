import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import SectionTitle from "../index";

Object.defineProperty(window, "location", {
  value: { back: "https://www.Gladiator-two.com" },
  writable: true,
});

describe("Section Title component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <SectionTitle heading="Heading One" />
        </MemoryRouter>,
      ),
    );

    it("Should render a section heading", () => {
      expect(screen.getByTestId("section-heading")).toBeInTheDocument();
    });

    it("Should have the title of 'Heading One'", () => {
      expect(screen.getByText("Heading One")).toBeInTheDocument();
    });
  });

  describe("Component rendering (with button)", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <SectionTitle
            heading="Heading Two"
            buttonText="View more"
            buttonLink="/media-listing?page=1"
          />
          ,
        </MemoryRouter>,
      ),
    );

    it("Should have the title of 'Heading Two'", () => {
      expect(screen.getByText("Heading Two")).toBeInTheDocument();
    });

    it("Should have a button with text 'View more'", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
      expect(screen.getByText("View more")).toBeInTheDocument();
    });

    it("Should have an arrow icon next to the button text", () => {
      expect(screen.getByTestId("ArrowForwardIosIcon")).toBeInTheDocument();
    });

    it("Should take the user to the media listing page", async () => {
      delete window.location;
      // @ts-ignore
      window.location = { href: "" };

      expect(screen.queryAllByTestId("button")).toHaveLength(1);

      fireEvent.click(screen.getByTestId("button"));

      expect(window.location.href).toBe("/media-listing?page=1");
    });
  });

  describe("Component rendering (with Back button)", () => {
    beforeEach(() =>
      render(
        <MemoryRouter>
          <SectionTitle
            heading="Heading Two"
            backButton
          />
          ,
        </MemoryRouter>,
      ),
    );

    it("Should have a button with text 'Back'", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
      expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("Should navigate back a page when the user clicks the Back button", async () => {
      jest.spyOn(window.history, "back").mockImplementation(() => {});

      expect(screen.queryAllByTestId("button")).toHaveLength(1);

      fireEvent.click(screen.getByTestId("button"));

      expect(expect(window.history.back).toHaveBeenCalled());
    });
  });
});
