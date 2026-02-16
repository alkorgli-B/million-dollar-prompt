"use client";

import { useState } from "react";
import { FAQ_DATA } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="sec reveal vis" id="faq">
      <div className="wrap">
        <div className="sh">
          <span className="stag">FAQ</span>
          <h2 className="st">Questions? Answers.</h2>
        </div>
        <div className="fqg">
          {FAQ_DATA.map((item, i) => (
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
