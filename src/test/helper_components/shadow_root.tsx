import React, {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ShadowRoot: FC<PropsWithChildren> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (isInitialized || !container) {
      return;
    }

    shadowRootRef.current =
      container.shadowRoot ?? container.attachShadow({ mode: "open" });
    setIsInitialized(true);
  }, [isInitialized]);

  return (
    <div ref={containerRef}>
      {isInitialized &&
        shadowRootRef.current &&
        createPortal(children, shadowRootRef.current)}
    </div>
  );
};

export default ShadowRoot;
