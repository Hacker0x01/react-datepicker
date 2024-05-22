module.exports = {
  roots: ["./test"],
  setupFiles: ["<rootDir>/test/text_encoder.js"],
  setupFilesAfterEnv: ["<rootDir>/test/index.js"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  transformIgnorePatterns: ["/node_modules/(?!date-fns)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    // TODO: use it after the migration
    // "^.+\\.ts?$": "ts-jest",
    "node_modules/(?!date-fns/.*)": "ts-jest",
  },
};
