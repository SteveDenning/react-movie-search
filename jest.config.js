module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
  // moduleNameMapper: {
  //   "^.+\\.(css|less|scss)$": "babel-jest",
  //   "\\.svg": "<rootDir>/mocks/svgMock.ts",
  // },
  // testEnvironment: "jest-environment-jsdom",
  // coveragePathIgnorePatterns: ["node_modules", "<rootDir>/src/utils", "mocks"],
};
