"use client";

interface PricingCardsProps {
  onBuyClick: (pkg?: number) => void;
}

const tiers = [
  {
    name: "Starter",
    words: "1 word",
    price: "$1",
    sub: "one-time payment",
    features: [
      "Permanent grid placement",
      "Your clickable link attached",
      "Shareable ownership card",
      "Influence the AI prompt",
    ],
    featured: false,
    pkg: 1,
  },
  {
    name: "Builder",
    words: "5 words",
    price: "$5",
    sub: "$1 per word",
    features: [
      "5 permanent grid placements",
      "Priority grid positioning",
      "Custom word colors",
      "Stronger AI influence",
    ],
    featured: true,
    pkg: 5,
  },
  {
    name: "Visionary",
    words: "25 words",
    price: "$25",
    sub: "$1 per word",
    features: [
      "25 permanent grid placements",
      "Premium grid zone access",
      "Maximum AI prompt impact",
      "Shape the narrative at scale",
    ],
    featured: false,
    pkg: 25,
  },
];

export default function PricingCards({ onBuyClick }: PricingCardsProps) {
  return (
    <section className="sec reveal vis" id="pricing">
      <div className="wrap">
        <div className="sh">
          <span className="stag">Pricing</span>
          <h2 className="st">One Dollar. Or Go Big.</h2>
          <p className="sd">Every word costs $1. Bundles give you more presence on the grid and stronger AI influence.</p>
        </div>
        <div className="pg3">
          {tiers.map((tier) => (
            <div className={`pc${tier.featured ? " feat" : ""}`} key={tier.name}>
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
                Buy {tier.words === "1 word" ? "1 Word" : `${tier.pkg} Words`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
