import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ShadowRoot: FC<PropsWithChildren> = ({ children }) => {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  const containerRefCallback = useCallback(
    (container: HTMLDivElement | null) => {
      if (!container) {
        return;
      }
      const root =
        container.shadowRoot ?? container.attachShadow({ mode: "open" });
      setShadowRoot(root);
    },
    [],
  );

  return (
    <div ref={containerRefCallback}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
};

export default ShadowRoot;
