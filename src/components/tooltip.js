"use client";

import { useRef, useLayoutEffect, useState } from "react";

export default function Tooltip({ show, position, tooltipTitle, tooltipContent }) {
  const createPortal = require("react-dom").createPortal;
  const tooltipRef = useRef(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (show && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      
      if (rect.width !== tooltipSize.width || rect.height !== tooltipSize.height) {
        setTooltipSize({ width: rect.width, height: rect.height });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, tooltipTitle, tooltipContent]);

  if (!show || typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed px-2 py-1 bg-black text-white z-50"
      style={{
        left: position?.x ?? 0,
        top: (position?.y ?? 0) - tooltipSize.height - 8,
        whiteSpace: "pre-wrap",
        maxWidth: "400px",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        pointerEvents: "none",
      }}
    >
      <p className="font-bold">{tooltipTitle}</p>
      {tooltipContent}
    </div>,
    document.body
  );
}