"use client";

import StatsBar from "./StatsBar";
import type { Stats } from "@/lib/types";

interface HeroProps {
  onBuyClick: () => void;
  stats: Stats;
}

export default function Hero({ onBuyClick, stats }: HeroProps) {
  const scrollToAI = () => {
    document.querySelector("#ai")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="badge">
        <div className="ldot"></div>Live experiment — words selling now
      </div>
      <h1 className="h1">
        <b>One Million Words.</b>
        <b className="dim">One Giant Prompt.</b>
        <b className="grd">One AI Mind.</b>
      </h1>
      <p className="hsub">
        Buy a word for <em>$1</em>. It joins a million others to form the
        largest collaborative AI prompt in human history. Watch the AI respond —
        changing with every new word.
      </p>
      <div className="hbtns">
        <button className="bp bp-mint" onClick={onBuyClick}>
          Buy Your Word — $1
        </button>
        <button className="bp bp-ghost" onClick={scrollToAI}>
          Watch the AI Live &#8595;
        </button>
      </div>
      <StatsBar stats={stats} />
    </section>
  );
}
