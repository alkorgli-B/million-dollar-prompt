"use client";

import { useState, useEffect, useRef } from "react";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: number;
  onSuccess?: () => void;
}

export default function BuyModal({
  isOpen,
  onClose,
  initialPackage = 1,
  onSuccess,
}: BuyModalProps) {
  const [word, setWord] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [pkg, setPkg] = useState(initialPackage);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ word: "", id: "" });
  const wordRef = useRef<HTMLInputElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPkg(initialPackage);
  }, [initialPackage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSuccess(false);
      setError("");
      setWord("");
      setLink("");
      setName("");
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === bgRef.current) onClose();
  };

  const handlePurchase = async () => {
    if (!word.trim()) {
      setError("Please enter a word or phrase.");
      wordRef.current?.focus();
      return;
    }

    if (word.trim().length > 30) {
      setError("Word must be 30 characters or less.");
      wordRef.current?.focus();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: word.trim(),
          owner_name: name.trim() || null,
          owner_link: link.trim() || null,
          package: pkg,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const w = data.words?.[0];
        setSuccessData({
          word: word.trim().toUpperCase(),
          id: w
            ? `WORD #${String(w.grid_x * 1000 + w.grid_y).padStart(6, "0")} — GRID [${w.grid_x}, ${w.grid_y}]`
            : "WORD PLACED",
        });
        setSuccess(true);
        onSuccess?.();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Connection failed. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent(
      `I just added "${successData.word}" to the Million Dollar Prompt! #MillionDollarPrompt`
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent("https://milliondollarprompt.com")}`,
      "_blank"
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className={`mbg${isOpen ? " on" : ""}`}
      ref={bgRef}
      onClick={handleBackdropClick}
    >
      <div className="mdl">
        <button className="mx" onClick={onClose}>
          &times;
        </button>

        {!success ? (
          <div>
            <h3 className="mti">Buy Your Word</h3>
            <p className="mde">
              Choose a word, pick a package, and become part of the experiment.
            </p>

            <div className="fld">
              <label className="flb">Your Word or Phrase</label>
              <input
                className="fli"
                type="text"
                placeholder='e.g. Dream, YourBrand, Hello World'
                maxLength={30}
                value={word}
                onChange={(e) => {
                  setWord(e.target.value);
                  setError("");
                }}
                ref={wordRef}
                style={error ? { borderColor: "#ff5f57" } : undefined}
              />
              <div className="flh">
                Max 30 characters. Appears permanently on the grid.
              </div>
            </div>

            <div className="fld">
              <label className="flb">Your Link (optional)</label>
              <input
                className="fli"
                type="url"
                placeholder="https://yourwebsite.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="fld">
              <label className="flb">Your Name or Handle</label>
              <input
                className="fli"
                type="text"
                placeholder="@yourname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <label className="flb" style={{ marginTop: ".8rem" }}>
              Choose Package
            </label>
            <div className="pkgs">
              {[
                { count: 1, label: "1", sub: "word", price: "$1", extra: null },
                { count: 5, label: "5", sub: "words", price: "$5", extra: "+ custom colors" },
                { count: 25, label: "25", sub: "words", price: "$25", extra: "+ priority placement" },
              ].map((p) => (
                <div
                  key={p.count}
                  className={`pkg${pkg === p.count ? " sel" : ""}`}
                  onClick={() => setPkg(p.count)}
                >
                  <span className="pkn">{p.label}</span>
                  {p.sub}
                  <div className="pkp">{p.price}</div>
                  {p.extra && <div className="pks">{p.extra}</div>}
                </div>
              ))}
            </div>

            <div className="mtot">
              <span className="mtl">Total</span>
              <span className="mtv">${pkg}.00</span>
            </div>

            {error && (
              <div style={{ color: "#ff5f57", fontSize: ".78rem", marginBottom: ".8rem", fontFamily: "var(--ff-m)" }}>
                {error}
              </div>
            )}

            <button
              className="bco"
              onClick={handlePurchase}
              disabled={loading}
              style={loading ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
            >
              {loading
                ? "Processing..."
                : `Complete Purchase — $${pkg}.00`}
            </button>
            <div className="msec">Secured by Stripe &middot; 256-bit SSL</div>
          </div>
        ) : (
          <div className="succ">
            <div className="se" style={{ fontSize: "3.5rem", marginBottom: ".8rem" }}>&#10003;</div>
            <h3 className="stt">You&apos;re Part of History!</h3>
            <div className="sw">&quot;{successData.word}&quot;</div>
            <div className="sid">{successData.id}</div>
            <p
              style={{
                color: "var(--t3)",
                fontSize: ".82rem",
                marginBottom: "1.2rem",
              }}
            >
              Your word is live on the grid and part of the AI prompt. The next
              AI generation will include your contribution.
            </p>
            <div className="shbs" style={{ marginTop: 0 }}>
              <button className="shb" onClick={shareOnX}>
                &#120143; Share on X
              </button>
            </div>
            <button
              className="bco"
              style={{ marginTop: "1.2rem" }}
              onClick={onClose}
            >
              Back to Grid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
