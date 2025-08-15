"use client";

import Tooltip from "./tooltip";
import { useState } from "react";

export default function Shortcuts({ linksinfo, classname }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="flex flex-wrap gap-2">
      {linksinfo.links.map((link, index) => (
        <div key={index} className="flex flex-row gap-2 items-center"
          onMouseEnter={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoveredIndex(index);
            setTooltipPosition({
              x: rect.left,
              y: rect.top,
            });
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <a href={link.url} className="hover:bg-red-800 hover:text-white transition-all duration-100">
            <p className={`${classname} font-bold text-left`}>{link.name}</p>
          </a>
          {hoveredIndex === index && (
            <Tooltip
              show={true}
              position={tooltipPosition}
              tooltipTitle={link.name}
              tooltipContent={link?.description ?? link.url}
            />
          )}
          {index !== linksinfo.links.length - 1 && (
            <p className={`${classname} font-bold text-left`}>•</p>
          )}
          </div>
      ))}
    </div>
  );
}