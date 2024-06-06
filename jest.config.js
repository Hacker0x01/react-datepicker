module.exports = {
  roots: ["./test"],
  setupFilesAfterEnv: ["<rootDir>/test/index.ts"],
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
    "^.+\\.(js|jsx)$": "babel-jest",
    // TODO: use it after the migration
    "^.+\\.(ts|tsx)$": "ts-jest",
    "node_modules/(?!date-fns/.*)": "ts-jest",
  },
};
