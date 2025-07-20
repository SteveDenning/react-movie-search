import React from "react";
import { render, screen, act } from "@testing-library/react";
import Notifications from "../index";

// Mock WebSocket
class MockWebSocket {
  onmessage: ((event: { data: string }) => void) | null = null;
  close = jest.fn();
  constructor() {
    // Save instance for test access
    (global as any).wsInstance = this;
  }
}

(global as any).WebSocket = MockWebSocket;

describe("Notifications", () => {
  beforeEach(() => {
    (global as any).wsInstance = null;
  });

  it("renders notification when a WebSocket message is received", async () => {
    render(<Notifications />);
    const notification = {
      id: "1",
      message: "Test Notification",
      url: "https://example.com",
    };

    await act(async () => {
      // Simulate receiving a message
      (global as any).wsInstance.onmessage!({
        data: JSON.stringify(notification),
      });
    });

    await screen.findByTestId("notification");

    console.log(screen.findByTestId("notification"));

    expect(screen.getByTestId("notification")).toBeInTheDocument();

    // expect(screen.getByText("Test Notification")).toBeInTheDocument();
    // expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
  });

  it("renders nothing if there are no notifications", () => {
    const { container } = render(<Notifications />);
    expect(container.firstChild).toBeNull();
  });
});
