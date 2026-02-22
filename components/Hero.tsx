"use client";

import StatsBar from "./StatsBar";
import { useLang } from "@/lib/context";
import type { Stats } from "@/lib/types";

interface HeroProps {
  onBuyClick: () => void;
  stats: Stats;
}

export default function Hero({ onBuyClick, stats }: HeroProps) {
  const { t } = useLang();

  const scrollDown = () => {
    const target = stats.total_sold > 0 ? "#ai" : "#how";
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  const hasActivity = stats.total_sold > 0;

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="badge">
        <div className="ldot"></div>
        {hasActivity ? t.hero.badgeLive : t.hero.badgeNew}
      </div>
      <h1 className="h1">
        <b>{t.hero.h1a}</b>
        <b className="dim">{t.hero.h1b}</b>
        <b className="grd">{t.hero.h1c}</b>
      </h1>
      <p className="hsub">{t.hero.sub}</p>
      <div className="hbtns">
        <button className="bp bp-mint" onClick={onBuyClick}>
          {t.hero.btnBuy}
        </button>
        <button className="bp bp-ghost" onClick={scrollDown}>
          {hasActivity ? t.hero.btnWatchAI : t.hero.btnHowWorks} &#8595;
        </button>
      </div>
      <StatsBar stats={stats} />
    </section>
  );
}
