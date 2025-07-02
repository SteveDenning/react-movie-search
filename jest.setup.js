require("dotenv").config();

Object.defineProperty(window, "scroll", {
  writable: true,
  value: jest.fn(),
});
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
