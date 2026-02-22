"use client";

import { useLang } from "@/lib/context";

export default function Timeline() {
  const { t } = useLang();

  const milestones = [
    { key: t.timeline.m1k, title: t.timeline.m1t, desc: t.timeline.m1d, active: true },
    { key: t.timeline.m2k, title: t.timeline.m2t, desc: t.timeline.m2d, active: false },
    { key: t.timeline.m3k, title: t.timeline.m3t, desc: t.timeline.m3d, active: false },
    { key: t.timeline.m4k, title: t.timeline.m4t, desc: t.timeline.m4d, active: false },
    { key: t.timeline.m5k, title: t.timeline.m5t, desc: t.timeline.m5d, active: false },
  ];

  return (
    <section className="sec reveal vis" id="ms">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">{t.timeline.tag}</span>
          <h2 className="st" style={{ whiteSpace: "pre-line" }}>{t.timeline.title}</h2>
          <p className="sd">{t.timeline.desc}</p>
        </div>
        <div className="tl">
          <div className="tl-l"></div>
          <div className="tl-p"></div>
          {milestones.map((m, i) => (
            <div className={`tli${m.active ? " on" : ""}`} key={i}>
              <div className="tld"></div>
              <div className="tlc">
                <div className="tlk">{m.key}</div>
                <div className="tlt">{m.title}</div>
                <div className="tlx">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
