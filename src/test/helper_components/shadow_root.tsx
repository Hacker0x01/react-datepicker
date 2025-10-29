import React, {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal, flushSync } from "react-dom";

const ShadowRoot: FC<PropsWithChildren> = ({ children }) => {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (isInitializedRef.current || !container) {
      return;
    }

    const root =
      container.shadowRoot ?? container.attachShadow({ mode: "open" });
    isInitializedRef.current = true;
    // Use flushSync to synchronously update state within effect, avoiding cascading renders
    // while ensuring the shadow root is available immediately for tests
    flushSync(() => setShadowRoot(root));
  }, []);

  return (
    <div ref={containerRef}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
};

export default ShadowRoot;
