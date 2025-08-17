"use client";

import { useRef, useLayoutEffect, useState } from "react";

export function TooltipRef({ show = true, position, tooltipTitle, tooltipContent }) {
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
  }, [tooltipTitle, tooltipContent, show, tooltipSize.width, tooltipSize.height]);

  if (!show || typeof window === "undefined") return null;

  return createPortal(
    <div
      ref={tooltipRef}
      className="fixed px-2 py-1 bg-black text-white z-50"
      style={{
        left: position.x,
        top: position.y - tooltipSize.height - 8,
        maxWidth: "400px",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        pointerEvents: "none",
      }}
    >
      <h3 className="font-bold">{tooltipTitle}</h3>
      {tooltipContent}
    </div>,
    document.body
  );
}

export function Tooltip({ children, className, tooltipTitle, tooltipContent }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  return (
    <div className={`${className} tooltip-content`}
      onMouseEnter={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setShowTooltip(true);
        setPosition({
          x: rect.left,
          y: rect.top,
        });
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <TooltipRef
          position={position}
          tooltipTitle={tooltipTitle}
          tooltipContent={tooltipContent}
        />
      )}
    </div>
  );
}