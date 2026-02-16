"use client";

import { useState, useEffect } from "react";
import type { TickerItem } from "@/lib/types";
import { SAMPLE_WORDS, SAMPLE_OWNERS } from "@/lib/constants";
import { getRandomItem } from "@/lib/utils";

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    // Fetch recent purchases from API
    async function fetchRecent() {
      try {
        const res = await fetch("/api/recent");
        if (res.ok) {
          const data = await res.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
            return;
          }
        }
      } catch {
        // Fall through to demo data
      }

      // Generate demo ticker items if no real data
      const demoItems: TickerItem[] = Array.from({ length: 25 }, () => ({
        owner: getRandomItem(SAMPLE_OWNERS),
        word: getRandomItem(SAMPLE_WORDS),
        time_ago: `${Math.floor(Math.random() * 55)}m ago`,
      }));
      setItems(demoItems);
    }

    fetchRecent();
    const interval = setInterval(fetchRecent, 30000);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  // Duplicate items for seamless infinite scroll
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
