"use client";

const milestones = [
  {
    key: "LAUNCH",
    title: "Project Goes Live",
    desc: "Website launches. First words placed on the grid. AI begins generating responses from the initial prompt.",
    active: true,
  },
  {
    key: "1,000 WORDS",
    title: "The Spark",
    desc: "AI generates increasingly meaningful responses. First press coverage. Community begins forming around the experiment.",
    active: false,
  },
  {
    key: "10,000 WORDS",
    title: "The Wave",
    desc: "AI output becomes deeply complex and nuanced. Product Hunt launch. Social media sharing takes off.",
    active: false,
  },
  {
    key: "100,000 WORDS",
    title: "The Movement",
    desc: "Global media attention. Premium grid zones activated. Charity donations cross significant milestones.",
    active: false,
  },
  {
    key: "1,000,000 WORDS",
    title: "The Legacy",
    desc: "The grid closes permanently. Final AI response is archived as a historic artifact of collective human creativity.",
    active: false,
  },
];

export default function Timeline() {
  return (
    <section className="sec reveal vis" id="ms">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">Roadmap</span>
          <h2 className="st">The Journey to<br />One Million</h2>
          <p className="sd">Every word sold brings us closer to the world&apos;s largest collaborative AI prompt.</p>
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
