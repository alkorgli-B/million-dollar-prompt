"use client";

import { formatNumber, formatCurrency } from "@/lib/utils";
import { useLang } from "@/lib/context";
import type { Stats } from "@/lib/types";

const TOTAL = 1_000_000;

interface StatsBarProps {
  stats: Stats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { t } = useLang();

  return (
    <div className="sbar">
      <div className="si">
        <span className="sv sv-g">{formatNumber(stats.total_sold)}</span>
        <span className="sl">{t.stats.sold}</span>
      </div>
      <div className="si">
        <span className="sv sv-b">{formatNumber(TOTAL - stats.total_sold)}</span>
        <span className="sl">{t.stats.available}</span>
      </div>
      <div className="si">
        <span className="sv sv-p">{formatCurrency(stats.total_revenue)}</span>
        <span className="sl">{t.stats.raised}</span>
      </div>
      <div className="si">
        <span className="sv sv-o">{formatNumber(stats.total_generations)}</span>
        <span className="sl">{t.stats.aiOutputs}</span>
      </div>
    </div>
  );
}
