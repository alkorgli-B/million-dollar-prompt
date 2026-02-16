"use client";

const flowSteps = [
  { icon: "👤", title: "You", desc: "Choose word + buy" },
  { icon: "🔒", title: "Stripe", desc: "Secure $1 charge" },
  { icon: "🏦", title: "Our Account", desc: "Funds deposited" },
  { icon: "🤖", title: "AI Updates", desc: "New response in 5m" },
];

const methods = ["💳 Visa", "💳 Mastercard", "🍎 Apple Pay", "G Pay", "💳 Amex", "🌐 135+ currencies"];

export default function PaymentFlow() {
  return (
    <section className="sec reveal vis" id="payment">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">Payment Flow</span>
          <h2 className="st">How You Pay.<br />Where Money Goes.</h2>
          <p className="sd">100% secure via Stripe. Here&apos;s the exact flow of every dollar.</p>
        </div>
        <div className="pflow">
          {flowSteps.map((step, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="pfb">
                <div className="pi">{step.icon}</div>
                <div className="pt">{step.title}</div>
                <div className="px">{step.desc}</div>
              </div>
              {i < flowSteps.length - 1 && <div className="parr">&#8594;</div>}
            </div>
          ))}
        </div>
        <div className="pmethods">
          {methods.map((m, i) => (
            <div className="pm" key={i}>{m}</div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p style={{ color: "var(--t3)", fontSize: ".82rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Your payment goes through <strong style={{ color: "var(--t1)" }}>Stripe</strong>, the world&apos;s most trusted payment processor (used by Amazon, Google, Shopify). Card details never touch our servers. Money is deposited into the project&apos;s Stripe account, then automatically transferred to the creator&apos;s bank account. <strong style={{ color: "var(--mint)" }}>30% of profits</strong> are donated to children&apos;s charities.
          </p>
        </div>
      </div>
    </section>
  );
}
