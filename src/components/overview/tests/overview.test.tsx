import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Variables
import { variables } from "./config";

// Components
import Overview from "..";

describe("overview component", () => {
  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Overview
          resource={variables.resource}
          text={variables.text}
        />,
      ),
    );

    it("Should render an overview with no 'More' button", () => {
      expect(screen.getByTestId("overview")).toBeInTheDocument();
      expect(screen.queryByTestId("button")).toBeNull();
    });
  });

  describe("Component rendering with MOre button", () => {
    beforeEach(() =>
      render(
        <Overview
          resource={variables.resource}
          text={variables.textWithEllipsis}
        />,
      ),
    );

    it("Should render an overview with a 'More' button", () => {
      expect(screen.queryByTestId("button")).toBeInTheDocument();
    });

    it("Should allow the user to be able to open the modal when clicking the 'More' button'", () => {
      fireEvent.click(screen.queryByTestId("button"));
      expect(screen.queryByTestId("modal")).toBeInTheDocument();
    });

    it("Should allow the user to close the modal", () => {
      fireEvent.click(screen.queryByTestId("button"));
      expect(screen.queryByTestId("modal")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("modal-close-button"));
      expect(screen.queryByTestId("modal")).toBeNull();
    });
  });
});
