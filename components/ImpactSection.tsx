"use client";

import type { Stats } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ImpactSectionProps {
  stats: Stats;
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  const donated = Math.floor(stats.total_revenue * 0.3);

  return (
    <section className="sec reveal vis" id="impact">
      <div className="wrap">
        <div className="icard">
          <div className="iemj">❤️</div>
          <h2 className="itt">Words That Heal</h2>
          <p className="itx">
            A significant portion of all proceeds goes directly to{" "}
            <span className="hl">children&apos;s hospitals</span> and{" "}
            <span className="hl">medical aid</span>. Every word you buy
            doesn&apos;t just make history — it changes a life.
          </p>
          <div className="ists">
            <div>
              <span className="isv">{formatCurrency(donated)}</span>
              <span className="isl">Donated</span>
            </div>
            <div>
              <span className="isv">30%</span>
              <span className="isl">Of Profits</span>
            </div>
            <div>
              <span className="isv">💕</span>
              <span className="isl">Transparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
