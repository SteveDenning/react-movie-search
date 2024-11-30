Object.defineProperty(window, "scroll", {
  writable: true,
  value: jest.fn(),
});
