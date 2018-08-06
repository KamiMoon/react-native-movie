module.exports = {
  preset: "jest-expo",
  collectCoverageFrom: ["src/**/*.{js}"],
  setupFiles: ["<rootDir>/tests/setupTests.js"],
  testMatch: [
    "<rootDir>/tests/**/__tests__/**/*.+(js|ts|tsx)",
    "<rootDir>/tests/**/?(*.)(spec|test).+(js|ts|tsx)"
  ],
  moduleNameMapper: {
    "src(.*)$": "<rootDir>/src/$1",
    "tests(.*)$": "<rootDir>/tests/$1"
  }
};
