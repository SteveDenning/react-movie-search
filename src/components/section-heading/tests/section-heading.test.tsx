import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Components
import SectionTitle from "../index";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

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
            buttonLink={"/media-listing?page=1"}
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

    it("Should call navigate(-1) when the button is clicked", async () => {
      expect(screen.getByText("Back")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Back"));

      await expect(mockedUsedNavigate).toHaveBeenCalled();
    });
  });
});
