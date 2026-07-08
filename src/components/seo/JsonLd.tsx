"use client";

import { useEffect } from "react";

/**
 * Render JSON-LD structured data in a script tag.
 * Accepts a single schema object or an array of schema objects.
 */
export default function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const items = Array.isArray(data) ? data : [data];

  useEffect(() => {
    // Each JSON-LD script is already rendered via SSR below.
    // This effect is just a safety check - no double-rendering needed.
  }, []);

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...item,
              "@context": "https://schema.org",
            }),
          }}
        />
      ))}
    </>
  );
}
