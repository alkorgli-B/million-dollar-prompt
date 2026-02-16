"use client";

const steps = [
  {
    num: "01",
    icon: "&#9997;&#65039;",
    title: "Choose Your Word",
    desc: "Pick any word or phrase up to 30 characters. Your name, brand, a message, or anything meaningful to you.",
  },
  {
    num: "02",
    icon: "&#128179;",
    title: "Pay Securely",
    desc: "Instant checkout via Stripe. Visa, Mastercard, Apple Pay, Google Pay. Your payment is protected end-to-end.",
  },
  {
    num: "03",
    icon: "&#129302;",
    title: "AI Generates",
    desc: "Every 5 minutes, all purchased words combine into one prompt. The AI reads them and creates a new response.",
  },
  {
    num: "04",
    icon: "&#127758;",
    title: "Own History",
    desc: "Your word lives on the grid permanently. Share your ownership card. You're part of the largest AI collaboration ever.",
  },
];

export default function HowItWorks() {
  return (
    <section className="sec reveal vis" id="how">
      <div className="wrap">
        <div className="sh">
          <span className="stag">How It Works</span>
          <h2 className="st">Simple to Join.<br />Impossible to Forget.</h2>
          <p className="sd">Four steps to becoming part of internet history.</p>
        </div>
        <div className="sg4">
          {steps.map((s) => (
            <div className="stp" key={s.num}>
              <div className="sn">{s.num}</div>
              <span className="sico" dangerouslySetInnerHTML={{ __html: s.icon }}></span>
              <h3 className="stt">{s.title}</h3>
              <p className="stx">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
