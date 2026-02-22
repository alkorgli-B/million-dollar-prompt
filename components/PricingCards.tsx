"use client";

import { useLang } from "@/lib/context";

interface PricingCardsProps {
  onBuyClick: (pkg?: number) => void;
}

export default function PricingCards({ onBuyClick }: PricingCardsProps) {
  const { t } = useLang();

  const tiers = [
    {
      name: t.pricing.starter,
      words: `1 ${t.pricing.word}`,
      price: "$1",
      sub: t.pricing.oneTime,
      features: [t.pricing.f1, t.pricing.f2, t.pricing.f3, t.pricing.f4],
      featured: false,
      pkg: 1,
      btnText: t.pricing.buyWord,
    },
    {
      name: t.pricing.builder,
      words: t.pricing.words5,
      price: "$5",
      sub: t.pricing.perWord,
      features: [t.pricing.f5, t.pricing.f6, t.pricing.f7, t.pricing.f8],
      featured: true,
      pkg: 5,
      btnText: t.pricing.buyWords5,
    },
    {
      name: t.pricing.visionary,
      words: t.pricing.words25,
      price: "$25",
      sub: t.pricing.perWord,
      features: [t.pricing.f9, t.pricing.f10, t.pricing.f11, t.pricing.f12],
      featured: false,
      pkg: 25,
      btnText: t.pricing.buyWords25,
    },
  ];

  return (
    <section className="sec reveal vis" id="pricing">
      <div className="wrap">
        <div className="sh">
          <span className="stag">{t.pricing.tag}</span>
          <h2 className="st">{t.pricing.title}</h2>
          <p className="sd">{t.pricing.desc}</p>
        </div>
        <div className="pg3">
          {tiers.map((tier) => (
            <div className={`pc${tier.featured ? " feat" : ""}`} key={tier.pkg}>
              <div className="pcn">{tier.name}</div>
              <div className="pcw">{tier.words}</div>
              <div className="pca">{tier.price}</div>
              <div className="pcp">{tier.sub}</div>
              <div className="pcf">
                {tier.features.map((f, i) => (
                  <div className="pci" key={i}>
                    <span className="ck">&#10003;</span>{f}
                  </div>
                ))}
              </div>
              <button
                className={`bpr ${tier.featured ? "bpr-f" : "bpr-g"}`}
                onClick={() => onBuyClick(tier.pkg)}
              >
                {tier.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
