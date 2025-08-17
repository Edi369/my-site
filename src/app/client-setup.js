"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import Tooltip from "@/components/tooltip";

const descriptionCache = new Map(); // cache de descrições

export function Selection() {
  return (
    <style jsx global>{`
      ::selection {
        background-color: #ff0000;
        color: #ffffff;
      }
    `}</style>
  );
}

export function LinkHover() {
  const [tooltipData, setTooltipData] = useState(null);
  const [link, setLink] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    function onMouseOver(e) {
      if (e.target.tagName === "A") {
        const rect = e.target.getBoundingClientRect();
        setTooltipData({
          title: e.target.textContent || "Link",
          content: e.target.href,
          position: {
            x: rect.left,
            y: rect.top,
          },
        });
        setLink(e.target.href);
      }
    }

    function onMouseOut(e) {
      if (e.target.tagName === "A") {
        setTooltipData(null);
        setDescription(null);
        setLoading(false);
      }
    }

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);

      setTooltipData(null);
      setDescription(null);
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (tooltipData && tooltipData.content) {
      setLoading(true);
      setDescription(null);

      TryFetchDescription(tooltipData.content)
        .then(desc => {
          setDescription(desc);
        })
        .finally(() => setLoading(false));
    }
  }, [tooltipData]);

  return (
    tooltipData && (
      <Tooltip
        show={true}
        position={tooltipData.position}
        tooltipTitle={tooltipData.title}
        tooltipContent={
          <>
            <span className="italic">
              {loading
                ? "Carregando descrição..."
                : description
              }
            </span>
            <p className="text-blue-400">
              {link}
            </p>
        </>
        }
      />
    )
  );
}

async function TryFetchDescription(url) {
  if (descriptionCache.has(url)) {
    return descriptionCache.get(url);
  }

  try {
    const response = await fetch(`/api/fetch-description?url=${url}`);
    if (!response.ok) return null;
    const data = await response.json();
    descriptionCache.set(url, data.description);
    return data.description ?? null;
  } catch (e) {
    return null;
  }
}

export default function ClientSetup() {
  return (
    <>
      <Selection />
      <LinkHover />
    </>
  );
}