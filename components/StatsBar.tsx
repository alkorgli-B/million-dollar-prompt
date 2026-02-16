"use client";

import { useEffect, useRef } from "react";
import { formatNumber, formatCurrency } from "@/lib/utils";
import type { Stats } from "@/lib/types";

const TOTAL = 1_000_000;

interface StatsBarProps {
  stats: Stats;
}

function animateValue(
  el: HTMLElement,
  target: number,
  prefix: string = "",
  delay: number = 0
) {
  setTimeout(() => {
    let current = 0;
    const step = target / 45;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString();
    }, 28);
  }, delay);
}

export default function StatsBar({ stats }: StatsBarProps) {
  const soldRef = useRef<HTMLSpanElement>(null);
  const remainRef = useRef<HTMLSpanElement>(null);
  const earnedRef = useRef<HTMLSpanElement>(null);
  const genRef = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) {
      // After initial animation, just update directly
      if (soldRef.current)
        soldRef.current.textContent = formatNumber(stats.total_sold);
      if (remainRef.current)
        remainRef.current.textContent = formatNumber(TOTAL - stats.total_sold);
      if (earnedRef.current)
        earnedRef.current.textContent = formatCurrency(stats.total_revenue);
      if (genRef.current)
        genRef.current.textContent = formatNumber(stats.total_generations);
      return;
    }

    animated.current = true;
    if (soldRef.current) animateValue(soldRef.current, stats.total_sold, "", 200);
    if (remainRef.current) animateValue(remainRef.current, TOTAL - stats.total_sold, "", 200);
    if (earnedRef.current) animateValue(earnedRef.current, stats.total_revenue, "$", 200);
    if (genRef.current) animateValue(genRef.current, stats.total_generations, "", 200);
  }, [stats]);

  return (
    <div className="sbar">
      <div className="si">
        <span className="sv sv-g" ref={soldRef}>0</span>
        <span className="sl">Words Sold</span>
      </div>
      <div className="si">
        <span className="sv sv-b" ref={remainRef}>{formatNumber(TOTAL)}</span>
        <span className="sl">Remaining</span>
      </div>
      <div className="si">
        <span className="sv sv-p" ref={earnedRef}>$0</span>
        <span className="sl">Earned</span>
      </div>
      <div className="si">
        <span className="sv sv-o" ref={genRef}>0</span>
        <span className="sl">AI Outputs</span>
      </div>
    </div>
  );
}
