import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import Modal from "../index";

describe("Modal component", () => {
  describe("Component rendering", () => {
    const setup = () =>
      render(
        <Modal>
          <p>Lorem Ipsom</p>
        </Modal>,
      );

    it("Should render a modal", () => {
      setup();
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
  });
});
