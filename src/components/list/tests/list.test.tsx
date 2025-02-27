import React from "react";
import "@testing-library/jest-dom";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";

// Components
import List from "../index";

// Variables
import { variables } from "./config";

Object.defineProperty(window, "location", {
  value: { href: "https://www.Gladiator-two.com" },
  writable: true,
});

describe("list component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<List resources={variables.navOptions} />));

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });

    it("Should render a list of seven panel list items", () => {
      expect(screen.queryAllByTestId("list-item")).toHaveLength(3);
    });
  });

  describe("Component rendering (links)", () => {
    beforeEach(() =>
      render(
        <List
          resources={variables.navOptions}
          variant="link"
        />,
      ),
    );

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });

    it("Should render a list of items with buttons", () => {
      expect(screen.queryAllByTestId("button")).toHaveLength(3);
    });
  });

  describe("Component rendering (list panel)", () => {
    beforeEach(() =>
      render(
        <List
          resources={variables.panelItems}
          variant="tile"
        />,
      ),
    );

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });

    it("Should have a variant class of 'list-panel'", () => {
      expect(screen.getByTestId("list")).toHaveClass("list list--tile");
    });

    it("Should render a list of seven panel list items", () => {
      expect(screen.queryAllByTestId("list-item")).toHaveLength(7);
    });
  });

  describe("Component rendering (link)", () => {
    beforeEach(() =>
      render(
        <List
          resources={variables.links}
          variant="link"
        />,
      ),
    );

    it("Should render a list", () => {
      expect(screen.getByTestId("list")).toBeInTheDocument();
    });

    it("Should have a variant class of 'link'", () => {
      expect(screen.getByTestId("list")).toHaveClass("list list--link");
    });

    it("Should render a button for each link", () => {
      expect(screen.queryAllByTestId("button")).toHaveLength(3);
    });

    it("Should allow the user to click the link", async () => {
      const emailButton = screen.queryAllByTestId("button")[1];

      fireEvent.click(emailButton);

      await waitFor(() => expect(window.location.href).toBe("/ai-media"));
    });
  });
});
