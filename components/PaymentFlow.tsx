"use client";

const flowSteps = [
  { icon: "&#128100;", title: "You", desc: "Choose your word" },
  { icon: "&#128274;", title: "Stripe", desc: "Secure $1 payment" },
  { icon: "&#128205;", title: "Grid", desc: "Word placed instantly" },
  { icon: "&#129302;", title: "AI", desc: "New response in 5m" },
];

const methods = ["Visa", "Mastercard", "Apple Pay", "Google Pay", "Amex", "135+ currencies"];

export default function PaymentFlow() {
  return (
    <section className="sec reveal vis" id="payment">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">Payment Flow</span>
          <h2 className="st">Secure. Instant.<br />Transparent.</h2>
          <p className="sd">Every dollar is processed through Stripe with full encryption and buyer protection.</p>
        </div>
        <div className="pflow">
          {flowSteps.map((step, i) => (
            <div key={i} style={{ display: "contents" }}>
              <div className="pfb">
                <div className="pi" dangerouslySetInnerHTML={{ __html: step.icon }}></div>
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
            Payments are handled by <strong style={{ color: "var(--t1)" }}>Stripe</strong>, trusted by millions of businesses worldwide including Amazon, Google, and Shopify. Your card details never touch our servers. <strong style={{ color: "var(--mint)" }}>30% of net profits</strong> are donated to children&apos;s hospitals.
          </p>
        </div>
      </div>
    </section>
  );
}
