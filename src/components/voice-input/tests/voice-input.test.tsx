import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

// Components
import VoiceInput from "../index";

describe("VoiceInput component", () => {
  describe("Component rendering", () => {
    const setValue = jest.fn();

    beforeAll(() => {
      const mockSpeechRecognition = jest.fn().mockImplementation(() => ({
        start: jest.fn(),
        stop: jest.fn(),
        onresult: jest.fn(),
        onerror: jest.fn(),
      }));

      Object.defineProperty(window, "SpeechRecognition", {
        value: mockSpeechRecognition,
        writable: true,
      });

      Object.defineProperty(window, "webkitSpeechRecognition", {
        value: mockSpeechRecognition,
        writable: true,
      });
    });

    beforeEach(() => render(<VoiceInput setValue={setValue} />));

    it("Should render a Voice Input", () => {
      expect(screen.getByTestId("voice-input")).toBeInTheDocument();
    });

    it("Should start recording a voice input", async () => {
      const recognition = new window.SpeechRecognition();
      recognition.start();
      expect(recognition.start).toHaveBeenCalled();
    });

    it("Should open a modal when button is clicked", async () => {
      fireEvent.click(screen.getByTestId("voice-input"));
      await waitFor(() => expect(screen.getByTestId("modal")).toBeInTheDocument());
    });
  });
});
