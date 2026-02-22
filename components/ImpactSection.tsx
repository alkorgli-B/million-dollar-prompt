"use client";

import { useLang } from "@/lib/context";
import type { Stats } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ImpactSectionProps {
  stats: Stats;
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  const { t } = useLang();
  const donated = Math.floor(stats.total_revenue * 0.3);

  return (
    <section className="sec reveal vis" id="impact">
      <div className="wrap">
        <div className="icard">
          <div className="iemj" style={{ fontSize: "3rem", marginBottom: ".8rem" }}>&#10084;&#65039;</div>
          <h2 className="itt">{t.impact.title}</h2>
          <p className="itx">
            <span className="hl">30% {t.impact.text}</span> {t.impact.textAfter}
          </p>
          <div className="ists">
            <div>
              <span className="isv">{formatCurrency(donated)}</span>
              <span className="isl">{t.impact.donated}</span>
            </div>
            <div>
              <span className="isv">30%</span>
              <span className="isl">{t.impact.ofNet}</span>
            </div>
            <div>
              <span className="isv">{t.impact.reports}</span>
              <span className="isl">{t.impact.reportsLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
