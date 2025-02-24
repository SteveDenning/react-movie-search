import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import Share from "../index";

Object.defineProperty(window, "location", {
  value: { href: "www.Gladiator-two.com" },
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

    it("Should allow the user to click the button top open the popover", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      await waitFor(() => expect(screen.getByTestId("share-popover")).toBeInTheDocument());
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

      await waitFor(() => expect(emailButton).toHaveAttribute("href", "mailto:?subject=Gladiator II&body=www.Gladiator-two.com"));
    });

    it("Should share a link when sharing with WhatsApp", async () => {
      expect(screen.getByTestId("share-button")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("share-button"));

      const emailButton = screen.queryAllByTestId("button")[1];

      await waitFor(() => expect(emailButton).toHaveAttribute("href", "https://api.whatsapp.com/send?text=www.Gladiator-two.com"));
    });
  });
});
