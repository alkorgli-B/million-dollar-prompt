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
          <div className="iemj" style={{ fontSize: "3rem", marginBottom: ".8rem" }}>&#10084;&#65039;</div>
          <h2 className="itt">Words That Heal</h2>
          <p className="itx">
            <span className="hl">30% of all net profits</span> are donated
            directly to children&apos;s hospitals and pediatric medical
            charities. Every word you buy doesn&apos;t just make history — it
            helps a child in need. We publish monthly transparency reports
            tracking every donation.
          </p>
          <div className="ists">
            <div>
              <span className="isv">{formatCurrency(donated)}</span>
              <span className="isl">Donated</span>
            </div>
            <div>
              <span className="isv">30%</span>
              <span className="isl">Of Net Profits</span>
            </div>
            <div>
              <span className="isv">Monthly</span>
              <span className="isl">Reports</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
