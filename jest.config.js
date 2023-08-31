module.exports = {
  roots: ["./test"],
  setupFiles: ["<rootDir>/test/text_encoder.js"],
  setupFilesAfterEnv: ["<rootDir>/test/index.js"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  transformIgnorePatterns: ["/node_modules/(?!(@popperjs)|date-fns)"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.ts?$": "ts-jest",
    "node_modules/(?!date-fns/.*)": "ts-jest",
  },
};
