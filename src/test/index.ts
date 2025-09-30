import "jest-canvas-mock";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Suppress act() warnings from floating-ui library
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Check the first argument (the error message)
    const firstArg = args[0];
    const firstArgStr =
      typeof firstArg === "string"
        ? firstArg
        : firstArg instanceof Error
          ? firstArg.message
          : String(firstArg);

    // Suppress floating-ui act warnings
    if (
      firstArgStr.includes("An update to withFloating(PopperComponent)") &&
      firstArgStr.includes("inside a test was not wrapped in act")
    ) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
