import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor, act } from "@testing-library/react";

// Components
import Navigation from "../index";

// Variables
import { variables } from "./config";

describe("Navigation component", () => {
  describe("Component rendering (closed)", () => {
    const toggleDrawer = jest.fn();

    beforeEach(() =>
      render(
        <Navigation
          toggleDrawer={toggleDrawer}
          open={false}
          navItems={[]}
        />,
      ),
    );

    it("Should render the navigation", () => {
      expect(screen.queryByTestId("navigation")).not.toBeInTheDocument();
    });
  });

  describe("Component rendering (opened)", () => {
    const toggleDrawer = jest.fn();

    beforeEach(() =>
      render(
        <Navigation
          toggleDrawer={toggleDrawer}
          open={true}
          navItems={variables.navItems}
        />,
      ),
    );

    it("Should render the navigation", () => {
      expect(screen.getByTestId("navigation")).toBeInTheDocument();
    });

    it("Should render a close button", () => {
      expect(screen.getByTestId("navigation-action-close")).toBeInTheDocument();
    });

    it("Should render a login button", () => {
      expect(screen.getByTestId("navigation-action-login")).toBeInTheDocument();
    });

    it("Should render navigation item", () => {
      expect(screen.queryAllByTestId("list-item")).toHaveLength(3);
    });

    it("Should let the user close the navigation", async () => {
      const closeButton = screen.getByTestId("navigation-action-close");
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      await waitFor(() => expect(toggleDrawer).toHaveBeenCalledTimes(1));
    });
  });
});
