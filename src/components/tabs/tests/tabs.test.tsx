import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Tabs from "../index";

describe("Tabs component", () => {
  describe("Component rendering", () => {
    const handleTabChange = jest.fn();

    beforeEach(() => {
      render(
        <Tabs
          tabs={[
            { label: "Draft", value: "DRAFT", payload: { status: "DRAFT" } },
            { label: "Published", value: "PUBLISHED", payload: { status: "PUBLISHED" } },
            { label: "Closed", value: "COMPLETED", payload: { status: "COMPLETED" } },
          ]}
          onClick={handleTabChange}
        />,
      );
    });

    it("Should render the component", () => {
      expect(screen.getByTestId("tabs")).toBeInTheDocument();
    });

    it("Should render all tabs", () => {
      expect(screen.getByRole("button", { name: "Draft selected" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Published unselected" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Closed unselected" })).toBeInTheDocument();
    });

    it("Should allow a user to select a tab", () => {
      fireEvent.click(screen.getByRole("button", { name: "Published unselected" }));
      expect(handleTabChange).toHaveBeenCalledWith({ label: "Published", value: "PUBLISHED", payload: { status: "PUBLISHED" } });
    });
  });

  describe("Alternative states", () => {
    const handleTabChange = jest.fn();

    beforeEach(() => {
      render(
        <Tabs
          tabs={[
            { label: "Draft", value: "DRAFT", payload: { status: "DRAFT" } },
            { label: "Published", value: "PUBLISHED", payload: { status: "PUBLISHED" } },
            { label: "Closed", value: "COMPLETED", payload: { status: "COMPLETED" } },
          ]}
          onClick={handleTabChange}
          initialSelection="COMPLETED"
          variant="test"
          className="test-class"
        />,
      );
    });

    it("Should apply a variant class", () => {
      expect(screen.getByTestId("tabs")).toHaveClass("tabs--test");
    });

    it("Should apply a custom class", () => {
      expect(screen.getByTestId("tabs")).toHaveClass("test-class");
    });

    it("Should pre-select the correct button", () => {
      expect(screen.getByRole("button", { name: "Draft unselected" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Published unselected" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Closed selected" })).toBeInTheDocument();
    });
  });
});
