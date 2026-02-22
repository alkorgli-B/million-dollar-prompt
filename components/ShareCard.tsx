"use client";

import { useLang } from "@/lib/context";

export default function ShareCard() {
  const { t } = useLang();

  const shareOnX = () => {
    const text = encodeURIComponent(
      `Check out the Million Dollar Prompt — the world's largest collaborative AI experiment! #MillionDollarPrompt`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://milliondollarprompt.com")}`,
      "_blank"
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://milliondollarprompt.com");
  };

  return (
    <section className="sec reveal vis" style={{ textAlign: "center" }}>
      <div className="wrap-xs">
        <div className="sh">
          <span className="stag">{t.share.tag}</span>
          <h2 className="st">{t.share.title}</h2>
          <p className="sd">{t.share.desc}</p>
        </div>
        <div className="shprev">
          <div className="mcard">
            <div style={{ position: "absolute", top: "8px", right: "12px", fontSize: ".55rem", color: "var(--t4)", fontFamily: "var(--ff-m)", letterSpacing: "1px" }}>{t.share.preview}</div>
            <div className="mw">&quot;YOUR WORD&quot;</div>
            <div className="mi">WORD #XXXXX — GRID [?, ?]</div>
            <div className="mo">{t.share.ownedBy} @you</div>
            <div className="mb">MILLION DOLLAR PROMPT &#10003;</div>
          </div>
        </div>
        <div className="shbs">
          <button className="shb" onClick={shareOnX}>&#120143; {t.share.shareX}</button>
          <button className="shb" onClick={copyLink}>{t.share.copyLink}</button>
        </div>
      </div>
    </section>
  );
}
