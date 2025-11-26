import "jest-canvas-mock";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// Suppress act() warnings from floating-ui library
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Convert all arguments to a single string for checking
    const fullMessage = args
      .map((arg) =>
        typeof arg === "string"
          ? arg
          : arg instanceof Error
            ? arg.message
            : String(arg),
      )
      .join(" ");

    // Suppress floating-ui act warnings - these come from @floating-ui/react-dom
    // internally using flushSync, which is expected behavior
    if (
      fullMessage.includes("withFloating(PopperComponent)") &&
      fullMessage.includes("not wrapped in act")
    ) {
      return;
    }

    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
