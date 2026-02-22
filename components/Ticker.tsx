"use client";

import { useState, useEffect } from "react";
import type { TickerItem } from "@/lib/types";

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch("/api/recent");
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
          }
        }
      } catch {
        // No data available
      }
    }

    fetchRecent();
    const interval = setInterval(fetchRecent, 30000);
    return () => clearInterval(interval);
  }, []);

  // No purchases yet — show invitation message
  if (items.length === 0) {
    return (
      <div className="tick-w">
        <div className="tick">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="ti" key={i}>
              <span className="d"></span>
              <span style={{ color: "var(--t3)" }}>
                No purchases yet — <span className="bu">be the first to buy a word</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const tickerContent = [...items, ...items];

  return (
    <div className="tick-w">
      <div className="tick">
        {tickerContent.map((item, i) => (
          <div className="ti" key={i}>
            <span className="d"></span>
            <span className="bu">{item.owner}</span> bought{" "}
            <span className="wo">&quot;{item.word}&quot;</span> —{" "}
            {item.time_ago}
          </div>
        ))}
      </div>
    </div>
  );
}
