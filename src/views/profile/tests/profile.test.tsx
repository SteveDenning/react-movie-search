import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Profile from "../index";

describe("Profile component", () => {
  describe("Component rendering", () => {
    beforeEach(() => render(<Profile />));

    it("Should render a Profile", () => {
      expect(screen.getByTestId("profile")).toBeInTheDocument();
    });
  });
});
