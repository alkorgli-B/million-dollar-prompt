"use client";

import { useState } from "react";
import { useLang } from "@/lib/context";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLang();

  return (
    <section className="sec reveal vis" id="faq">
      <div className="wrap">
        <div className="sh">
          <span className="stag">{t.faq.tag}</span>
          <h2 className="st">{t.faq.title}</h2>
        </div>
        <div className="fqg">
          {t.faq.items.map((item, i) => (
            <div
              className={`fqi${openIndex === i ? " op" : ""}`}
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="fqq">
                {item.q}
                <span className="ar">+</span>
              </div>
              <div className="fqa">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
