import "jest-canvas-mock";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Suppress act() warnings from floating-ui library
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Check if any of the arguments contains the floating-ui act warning
    const hasFloatingActWarning = args.some(
      (arg) =>
        typeof arg === "string" &&
        arg.includes(
          "An update to withFloating(PopperComponent) inside a test was not wrapped in act",
        ),
    );

    if (hasFloatingActWarning) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
