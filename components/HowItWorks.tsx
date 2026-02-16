"use client";

const steps = [
  { num: "01", icon: "✍️", title: "Choose Your Word", desc: "Pick any word or phrase — your name, brand, a dream, a message to the world." },
  { num: "02", icon: "💳", title: "Pay with Stripe", desc: "Secure payment. Visa, Mastercard, Apple Pay, Google Pay. Instant placement." },
  { num: "03", icon: "🤖", title: "AI Generates", desc: "Every 5 min, all words combine into one prompt. The AI creates something new." },
  { num: "04", icon: "🌍", title: "Make History", desc: "Your word lives forever. Share your card. You're part of the world's largest AI collab." },
];

export default function HowItWorks() {
  return (
    <section className="sec reveal vis" id="how">
      <div className="wrap">
        <div className="sh">
          <span className="stag">How It Works</span>
          <h2 className="st">Stupidly Simple.<br />Wildly Ambitious.</h2>
        </div>
        <div className="sg4">
          {steps.map((s) => (
            <div className="stp" key={s.num}>
              <div className="sn">{s.num}</div>
              <span className="sico">{s.icon}</span>
              <h3 className="stt">{s.title}</h3>
              <p className="stx">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
