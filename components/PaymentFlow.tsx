"use client";

import { useLang } from "@/lib/context";

const methods = ["Visa", "Mastercard", "Apple Pay", "Google Pay", "Amex", "135+ currencies"];

export default function PaymentFlow() {
  const { t } = useLang();

  const flowSteps = [
    { icon: "&#128100;", title: t.payment.you, desc: t.payment.chooseWord },
    { icon: "&#128274;", title: t.payment.stripe, desc: t.payment.securePay },
    { icon: "&#128205;", title: t.payment.gridStep, desc: t.payment.placedInstantly },
    { icon: "&#129302;", title: t.payment.aiStep, desc: t.payment.newResponse },
  ];

  return (
    <section className="sec reveal vis" id="payment">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">{t.payment.tag}</span>
          <h2 className="st" style={{ whiteSpace: "pre-line" }}>{t.payment.title}</h2>
          <p className="sd">{t.payment.desc}</p>
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
            {t.payment.trusted} <strong style={{ color: "var(--t1)" }}>{t.payment.trustedBy}</strong>{t.payment.trustedDesc} <strong style={{ color: "var(--mint)" }}>{t.payment.profitDonate}</strong> {t.payment.donatedTo}
          </p>
        </div>
      </div>
    </section>
  );
}
