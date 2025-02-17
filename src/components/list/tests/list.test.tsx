import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import List from "../index";

// Variables
import { variables } from "./config";

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
      expect(screen.getByTestId("list")).toHaveClass("list list--list-panel");
    });

    it("Should render a list of seven panel list items", () => {
      expect(screen.queryAllByTestId("list-item")).toHaveLength(7);
    });
  });
});
