"use client";

export default function ShareCard() {
  const shareOnX = () => {
    const text = encodeURIComponent(
      "I just bought a word in the Million Dollar Prompt — the world's largest collaborative AI experiment! 🧠⚡ #MillionDollarPrompt"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://milliondollarprompt.com")}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText("https://milliondollarprompt.com");
  };

  return (
    <section className="sec reveal vis" style={{ textAlign: "center" }}>
      <div className="wrap-xs">
        <div className="sh">
          <span className="stag">Share</span>
          <h2 className="st">Show Off Your Word</h2>
          <p className="sd">Every purchase generates a unique ownership card.</p>
        </div>
        <div className="shprev">
          <div className="mcard">
            <div className="mw">&quot;DREAM&quot;</div>
            <div className="mi">WORD #00847 — GRID [23, 14]</div>
            <div className="mo">Owned by @bader</div>
            <div className="mb">MILLION DOLLAR PROMPT &#10003;</div>
          </div>
        </div>
        <div className="shbs">
          <button className="shb" onClick={shareOnX}>𝕏 Share on X</button>
          <button className="shb" onClick={copyLink}>🔗 Copy Link</button>
          <button className="shb">📷 Download Card</button>
        </div>
      </div>
    </section>
  );
}
