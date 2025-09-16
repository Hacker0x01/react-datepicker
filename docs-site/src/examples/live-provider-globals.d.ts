import React from "react";
import * as DateFNS from "date-fns";
import type { ReactDatePickerCustomHeaderProps as ReactDatePickerCustomHeaderPropsType } from "react-datepicker";
import type { MiddlewareState as MiddlewareStateType } from "@floating-ui/react";
declare global {
  const useMemo: typeof React.useMemo;
  const useState: typeof React.useState;
  const DatePicker: any;
  const CalendarContainer: any;
  const range: any;
  const fi: any;
  const forwardRef: typeof React.forwardRef;
  const render: (component: React.ComponentType) => void;

  // DateFNS object is available globally
  const DateFNS: typeof DateFNS;

  // Declare types
  type ReactNode = React.ReactNode;
  type ReactDatePickerCustomHeaderProps = ReactDatePickerCustomHeaderPropsType;
  type MiddlewareState = MiddlewareStateType;
}

export {};
