"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [word, setWord] = useState<string | null>(null);

  useEffect(() => {
    // In production, this would read from Stripe session
    const params = new URLSearchParams(window.location.search);
    setWord(params.get("word") || "YOUR WORD");
  }, []);

  return (
    <>
      <div className="orb o1"></div>
      <div className="orb o2"></div>
      <div className="orb o3"></div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="succ">
          <div className="se">🎉</div>
          <h1 className="stt" style={{ fontSize: "2rem" }}>
            You&apos;re Part of History!
          </h1>
          <div className="sw">&quot;{word}&quot;</div>
          <p
            style={{
              color: "var(--t3)",
              fontSize: ".95rem",
              marginBottom: "2rem",
              maxWidth: "400px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Your word is now live on the grid and part of the collective AI
            prompt. The next AI generation will include your contribution.
          </p>
          <div className="shbs" style={{ marginBottom: "1.5rem" }}>
            <button className="shb">𝕏 Share on X</button>
            <button className="shb">📷 Download Card</button>
          </div>
          <Link
            href="/"
            className="bp bp-mint"
            style={{ display: "inline-block" }}
          >
            Back to Grid
          </Link>
        </div>
      </div>
    </>
  );
}
