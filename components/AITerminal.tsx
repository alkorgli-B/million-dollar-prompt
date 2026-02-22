"use client";

import { useState, useEffect, useRef } from "react";
import type { AIGeneration } from "@/lib/types";

export default function AITerminal() {
  const [generation, setGeneration] = useState<AIGeneration | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [promptWords, setPromptWords] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchAI() {
      try {
        const res = await fetch("/api/ai-generate");
        if (res.ok) {
          const data = await res.json();
          if (data.generation) {
            setGeneration(data.generation);
            typeText(data.generation.response_text);
            if (data.generation.prompt_text) {
              setPromptWords(data.generation.prompt_text.split(" ").slice(0, 40));
            }
          }
        }
      } catch {
        // No AI data available yet
      }
    }

    fetchAI();
    const interval = setInterval(fetchAI, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update "last updated" timer only when we have real data
  useEffect(() => {
    if (!generation) return;

    let seconds = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    setLastUpdated("just now");
    timerRef.current = setInterval(() => {
      seconds++;
      if (seconds < 60) setLastUpdated(`${seconds}s ago`);
      else setLastUpdated(`${Math.floor(seconds / 60)}m ago`);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [generation]);

  function typeText(text: string) {
    if (typeTimeoutRef.current) clearTimeout(typeTimeoutRef.current);
    setIsTyping(true);
    setDisplayText("");

    let i = 0;
    const speed = 8;
    const type = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        typeTimeoutRef.current = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };
    type();
  }

  const colorizedWords = promptWords.map((word, i) => {
    const mod = i % 7;
    if (mod === 0 || mod === 5)
      return <span key={i} className="hg">{word}{" "}</span>;
    if (mod === 2)
      return <span key={i} className="hb">{word}{" "}</span>;
    if (mod === 4)
      return <span key={i} className="hp">{word}{" "}</span>;
    return <span key={i}>{word} </span>;
  });

  const hasData = generation !== null;

  return (
    <section className="sec reveal vis" id="ai">
      <div className="wrap-s">
        <div className="sh">
          <span className="stag">Live AI Output</span>
          <h2 className="st">
            The Prompt Grows.
            <br />
            The AI Responds.
          </h2>
          <p className="sd">
            All purchased words combine into one massive prompt. The AI generates a
            new response every 5 minutes.
          </p>
        </div>
        <div className="term">
          <div className="tbar">
            <div className="td td-r"></div>
            <div className="td td-y"></div>
            <div className="td td-g"></div>
            <span className="ttl">milliondollarprompt — live</span>
            <div className="tst">
              <div className="ldot"></div>
              {hasData ? (isTyping ? "GENERATING" : "READY") : "WAITING"}
            </div>
          </div>
          <div className="tbody">
            {hasData ? (
              <>
                <div className="tlb tlb-g">
                  &#9656; Combined Prompt ({generation.word_count.toLocaleString()} words)
                </div>
                <div className="pbox">
                  {colorizedWords}
                  {promptWords.length > 0 && "..."}
                </div>
                <div className="tdiv"></div>
                <div className="tlb tlb-p">
                  &#9733; AI Response — Generation #{generation.generation_number.toLocaleString()}
                </div>
                <div className="aout">
                  {displayText}
                  {isTyping && <span className="cur"></span>}
                </div>
                <div className="tmeta">
                  <div className="tmi">
                    Provider: <b>&nbsp;{generation.provider}</b>
                  </div>
                  <div className="tmi">
                    Model: <b>&nbsp;{generation.model}</b>
                  </div>
                  {generation.tokens_used && generation.tokens_used > 0 && (
                    <div className="tmi">
                      Tokens: <b>&nbsp;{generation.tokens_used.toLocaleString()}</b>
                    </div>
                  )}
                  <div className="tmi">
                    Updated: <b>&nbsp;{lastUpdated}</b>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                <div className="tlb tlb-g" style={{ justifyContent: "center", marginBottom: "1rem" }}>
                  &#9656; Combined Prompt (0 words)
                </div>
                <p style={{ color: "var(--t3)", fontSize: ".9rem", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 1rem" }}>
                  No words have been purchased yet. Once the first words are added to the grid,
                  the AI will begin generating responses every 5 minutes.
                </p>
                <p style={{ color: "var(--t4)", fontSize: ".75rem", fontFamily: "var(--ff-m)", letterSpacing: "1px" }}>
                  AWAITING FIRST WORDS...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
