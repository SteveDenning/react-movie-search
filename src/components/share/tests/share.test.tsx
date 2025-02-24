import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import Share from "../index";

Object.defineProperty(window, "location", {
  value: { href: "www.test.com" },
  writable: true,
});

describe("Share component", () => {
  describe("Component rendering", () => {
    beforeEach(() => {
      render(
        <Share
          title="Gladiator II"
          id="1"
        />,
      );
    });

    it("Should render the component", () => {
      expect(screen.getByTestId("share")).toBeInTheDocument();
    });

    it("Should render the component with a button", () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();
    });

    it("Should allow the user to click the button", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      await waitFor(() => expect(screen.getByTestId("sentinelStart")).toBeInTheDocument());
    });

    it("Should render two share options", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      await waitFor(() => expect(screen.queryAllByTestId("button")).toHaveLength(2));
    });

    it("Should send the title and the body text when sharing by email", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      const emailButton = screen.queryAllByTestId("button")[0];

      await waitFor(() => expect(emailButton).toHaveAttribute("href", "mailto:?subject=Gladiator II&body=www.test.com"));
    });

    it("Should share a link when sharing with WhatsApp", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      const emailButton = screen.queryAllByTestId("button")[1];

      await waitFor(() => expect(emailButton).toHaveAttribute("href", "https://api.whatsapp.com/send?text=www.test.com"));
    });
  });
});
