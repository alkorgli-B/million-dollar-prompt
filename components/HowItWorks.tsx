"use client";

import { useLang } from "@/lib/context";

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { num: "01", icon: "&#9997;&#65039;", title: t.how.s1t, desc: t.how.s1d },
    { num: "02", icon: "&#128179;", title: t.how.s2t, desc: t.how.s2d },
    { num: "03", icon: "&#129302;", title: t.how.s3t, desc: t.how.s3d },
    { num: "04", icon: "&#127758;", title: t.how.s4t, desc: t.how.s4d },
  ];

  return (
    <section className="sec reveal vis" id="how">
      <div className="wrap">
        <div className="sh">
          <span className="stag">{t.how.tag}</span>
          <h2 className="st" style={{ whiteSpace: "pre-line" }}>{t.how.title}</h2>
          <p className="sd">{t.how.desc}</p>
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
