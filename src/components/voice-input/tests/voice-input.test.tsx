import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

// Components
import VoiceInput from "../index";

describe("VoiceInput component", () => {
  describe("Component rendering", () => {
    const setValue = jest.fn();

    beforeEach(() => render(<VoiceInput setValue={setValue} />));

    it("Should render a Voice Input", () => {
      expect(screen.getByTestId("voice-input")).toBeInTheDocument();
    });
  });
});
