import React, {
  type FC,
  type PropsWithChildren,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ShadowRoot: FC<PropsWithChildren> = ({ children }) => {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useLayoutEffect(() => {
    if (isInitializedRef.current) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const root =
      container.shadowRoot ?? container.attachShadow({ mode: "open" });
    isInitializedRef.current = true;
    // Use queueMicrotask to defer setState to avoid cascading renders
    queueMicrotask(() => setShadowRoot(root));
  }, []);

  return (
    <div ref={containerRef}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
};

export default ShadowRoot;
