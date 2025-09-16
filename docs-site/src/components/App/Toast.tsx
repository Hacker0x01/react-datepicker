import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./toast.scss";

type ToastType = "success" | "error";

let showToastFn: ((message: string, type: ToastType) => void) | null;

export const toast = {
  show: (message: string, type: ToastType) => {
    if (showToastFn) {
      showToastFn(message, type);
    }
  },
};

const Toast = (): React.ReactPortal | null => {
  const [toastMeta, setToastMeta] = useState<{
    message: string;
    type?: ToastType;
  }>({
    message: "",
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const scheduleToastReset = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setToastMeta({ message: "" });
    }, 3000);
  };

  useEffect(() => {
    showToastFn = (message: string, type: ToastType) => {
      setToastMeta({ message, type });
      scheduleToastReset();
    };

    return () => {
      clearTimer();
      showToastFn = null;
    };
  }, []);

  const { message, type } = toastMeta;
  if (!message?.trim()) return null;

  return createPortal(
    <div className={`toast toast--${type}`}>{message}</div>,
    document.body,
  );
};

export default Toast;
