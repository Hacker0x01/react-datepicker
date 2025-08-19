import "jest-canvas-mock";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
