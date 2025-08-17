"use client";

import { Tooltip } from "./tooltip";

export default function Shortcuts({ linksinfo, classname }) {
  return (
    <>
      {linksinfo.links.map((link, index) => (
        <>
          <Tooltip key={index} className="flex flex-row gap-2" tooltipTitle={link.name} tooltipContent={link?.description ?? link.url}>
            <a href={link.url} className="hover:bg-red-800 hover:text-white transition-all duration-100 ease-in-out">
              <p className={`${classname} font-bold text-left`}>{link.name}</p>
            </a>
          </Tooltip>
          {index !== linksinfo.links.length - 1 && (
            <p className={`${classname} font-bold text-left`}>•</p>
          )}
        </>
      ))}
    </>
  );
}