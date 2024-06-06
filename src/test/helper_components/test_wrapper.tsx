import { clsx } from "clsx";
import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

const TestWrapper: React.FC<Props> = ({ className, children }) => (
  <div className={clsx("test-wrapper", className)}>{children}</div>
);

export default TestWrapper;
