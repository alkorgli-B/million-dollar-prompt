"use client";

import { formatNumber, formatCurrency } from "@/lib/utils";
import type { Stats } from "@/lib/types";

const TOTAL = 1_000_000;

interface StatsBarProps {
  stats: Stats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="sbar">
      <div className="si">
        <span className="sv sv-g">{formatNumber(stats.total_sold)}</span>
        <span className="sl">Words Sold</span>
      </div>
      <div className="si">
        <span className="sv sv-b">{formatNumber(TOTAL - stats.total_sold)}</span>
        <span className="sl">Available</span>
      </div>
      <div className="si">
        <span className="sv sv-p">{formatCurrency(stats.total_revenue)}</span>
        <span className="sl">Raised</span>
      </div>
      <div className="si">
        <span className="sv sv-o">{formatNumber(stats.total_generations)}</span>
        <span className="sl">AI Outputs</span>
      </div>
    </div>
  );
}
