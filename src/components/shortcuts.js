"use client";

import { Tooltip } from "./tooltip";

export default function Shortcuts({ linksinfo, className }) {
  return (
    <>
      {linksinfo.links.map((link, index) => (
        <div key={link.url} className={className}>
          <Tooltip className="flex" tooltipTitle={link.name} tooltipContent={link?.description ?? link.url}>
            <a href={link.url} className="hover:bg-red-800 hover:text-white transition-all duration-100 ease-in-out">
              <p className={`${className} font-bold text-left`}>{link.name}</p>
            </a>
          </Tooltip>
          {index !== linksinfo.links.length - 1 && (
            <p className={`${className} font-bold text-left`}>•</p>
          )}
        </div>
      ))}
    </>
  );
}