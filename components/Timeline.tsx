"use client";

const milestones = [
  { key: "1,000 WORDS", title: "The Spark ⚡", desc: "AI generates meaningful responses. First media coverage.", active: true },
  { key: "10,000 WORDS", title: "The Wave 🌊", desc: "AI becomes complex. Viral moment. Product Hunt launch.", active: true },
  { key: "100,000 WORDS", title: "The Movement 🚀", desc: "Global media. Premium zones. Celebrity participants.", active: false },
  { key: "500,000 WORDS", title: "The Phenomenon 🌟", desc: "AI generates art, music, stories. Open API.", active: false },
  { key: "1,000,000 WORDS", title: "The Legacy ⭐", desc: "Final prompt. Ultimate AI response. Archived forever.", active: false },
];

export default function Timeline() {
  return (
    <section className="sec reveal vis" id="ms">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">Roadmap</span>
          <h2 className="st">The Journey to<br />One Million</h2>
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
