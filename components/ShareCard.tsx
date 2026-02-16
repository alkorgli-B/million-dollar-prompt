"use client";

import { SAMPLE_WORDS, SAMPLE_OWNERS } from "@/lib/constants";
import { getRandomItem } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function ShareCard() {
  const [previewWord, setPreviewWord] = useState("DREAM");
  const [previewOwner, setPreviewOwner] = useState("@alexchen");
  const [previewId, setPreviewId] = useState("WORD #00847");
  const [previewGrid, setPreviewGrid] = useState("GRID [23, 14]");

  useEffect(() => {
    const interval = setInterval(() => {
      const word = getRandomItem(SAMPLE_WORDS).toUpperCase();
      const owner = getRandomItem(SAMPLE_OWNERS);
      const id = Math.floor(Math.random() * 5000) + 100;
      const gx = Math.floor(Math.random() * 60);
      const gy = Math.floor(Math.random() * 27);
      setPreviewWord(word);
      setPreviewOwner(owner);
      setPreviewId(`WORD #${String(id).padStart(5, "0")}`);
      setPreviewGrid(`GRID [${gx}, ${gy}]`);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const shareOnX = () => {
    const text = encodeURIComponent(
      `I just bought a word in the Million Dollar Prompt — the world's largest collaborative AI experiment! #MillionDollarPrompt`
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
          <span className="stag">Share</span>
          <h2 className="st">Show Off Your Word</h2>
          <p className="sd">Every purchase generates a unique ownership card you can share anywhere.</p>
        </div>
        <div className="shprev">
          <div className="mcard">
            <div className="mw">&quot;{previewWord}&quot;</div>
            <div className="mi">{previewId} — {previewGrid}</div>
            <div className="mo">Owned by {previewOwner}</div>
            <div className="mb">MILLION DOLLAR PROMPT &#10003;</div>
          </div>
        </div>
        <div className="shbs">
          <button className="shb" onClick={shareOnX}>&#120143; Share on X</button>
          <button className="shb" onClick={copyLink}>Copy Link</button>
        </div>
      </div>
    </section>
  );
}
