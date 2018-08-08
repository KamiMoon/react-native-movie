module.exports = {
  preset: "jest-expo",
  collectCoverageFrom: ["src/**/*.{ts|tsx}"],
  setupFiles: ["<rootDir>/tests/setupTests.ts"],
  testMatch: [
    "<rootDir>/tests/**/__tests__/**/*.+(ts|tsx)",
    "<rootDir>/tests/**/?(*.)(spec|test).+(ts|tsx)"
  ],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "tests(.*)$": "<rootDir>/tests/$1"
  },
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json"
    }
  },
  transformIgnorePatterns: [
    "node_modules/(?!native-base|native-base-shoutem-theme|react-native-easy-grid|react-native|react-navigation|expo|@expo)"
  ]
};
