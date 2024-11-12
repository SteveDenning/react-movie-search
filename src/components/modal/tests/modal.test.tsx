import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";

// Components
import Modal from "../index";

describe("Modal component", () => {
  const handleClose = jest.fn();

  describe("Component rendering", () => {
    beforeEach(() =>
      render(
        <Modal
          id="test"
          open={true}
          handleClose={handleClose}
          title="Test"
          variant={["test", "test-2"]}
          description="Some description"
        >
          Some content
        </Modal>,
      ),
    );

    it("Should render a Modal", () => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("Should have have variant classes of 'modal--test modal--test-2", () => {
      expect(screen.getByTestId("modal")).toHaveClass("modal modal--test modal--test-2");
    });

    it("Should render text within the modal", () => {
      expect(screen.getByText("Some content")).toBeInTheDocument();
    });

    it("Should render a button to close the modal", () => {
      expect(screen.getByTestId("button")).toBeInTheDocument();
    });

    it("Should close the modal by running the handleClose function", () => {
      fireEvent.click(screen.getByTestId("button"));
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("Component rendering (Modal closed)", () => {
    describe("Closed Modal", () => {
      const handleClose = jest.fn();

      beforeEach(() => {
        render(
          <Modal
            id="test"
            open={false}
            title="Test Title"
            handleClose={handleClose}
          >
            Modal content
          </Modal>,
        );
      });

      it("Should not render a modal", () => {
        expect(screen.queryByTestId("modal")).toBeNull();
      });
    });
  });
});
