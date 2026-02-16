"use client";

import { useState, useEffect, useRef } from "react";
import type { AIGeneration } from "@/lib/types";
import { SAMPLE_WORDS, SAMPLE_AI_RESPONSES } from "@/lib/constants";

export default function AITerminal() {
  const [generation, setGeneration] = useState<AIGeneration | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [promptWords, setPromptWords] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [genNumber, setGenNumber] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [provider, setProvider] = useState("Multi-AI");
  const [model, setModel] = useState("Llama 3.1 70B");
  const [tokens, setTokens] = useState(0);
  const responseIndex = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch latest AI generation
  useEffect(() => {
    async function fetchAI() {
      try {
        const res = await fetch("/api/ai-generate");
        if (res.ok) {
          const data = await res.json();
          if (data.generation) {
            setGeneration(data.generation);
            setWordCount(data.generation.word_count);
            setGenNumber(data.generation.generation_number);
            setProvider(data.generation.provider);
            setModel(data.generation.model);
            setTokens(data.generation.tokens_used || 0);
            typeText(data.generation.response_text);
            if (data.generation.prompt_text) {
              setPromptWords(data.generation.prompt_text.split(" ").slice(0, 40));
            }
            return;
          }
        }
      } catch {
        // Fall through to demo mode
      }

      // Demo mode: use sample data with realistic numbers
      setPromptWords(SAMPLE_WORDS.slice(0, 40));
      setWordCount(SAMPLE_WORDS.length);
      setGenNumber(1);
      setProvider("Groq");
      setModel("Llama 3.1 70B");
      setTokens(847);
      typeText(SAMPLE_AI_RESPONSES[0]);
    }

    fetchAI();

    const interval = setInterval(fetchAI, 60000);
    return () => clearInterval(interval);
  }, []);

  // Cycle through AI responses in demo mode
  useEffect(() => {
    if (generation) return;

    const interval = setInterval(() => {
      responseIndex.current =
        (responseIndex.current + 1) % SAMPLE_AI_RESPONSES.length;
      setGenNumber((n) => n + 1);
      setTokens(700 + Math.floor(Math.random() * 300));
      typeText(SAMPLE_AI_RESPONSES[responseIndex.current]);
    }, 20000);

    return () => clearInterval(interval);
  }, [generation]);

  // Update "last updated" timer
  useEffect(() => {
    let seconds = 0;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      seconds++;
      if (seconds < 60) setLastUpdated(`${seconds}s ago`);
      else setLastUpdated(`${Math.floor(seconds / 60)}m ago`);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [genNumber]);

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

  // Colorize prompt words for display
  const colorizedWords = promptWords.map((word, i) => {
    const mod = i % 7;
    if (mod === 0 || mod === 5)
      return (
        <span key={i} className="hg">
          {word}{" "}
        </span>
      );
    if (mod === 2)
      return (
        <span key={i} className="hb">
          {word}{" "}
        </span>
      );
    if (mod === 4)
      return (
        <span key={i} className="hp">
          {word}{" "}
        </span>
      );
    return <span key={i}>{word} </span>;
  });

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
              <div className="ldot"></div>{isTyping ? "GENERATING" : "READY"}
            </div>
          </div>
          <div className="tbody">
            <div className="tlb tlb-g">
              &#9656; Combined Prompt ({wordCount.toLocaleString()} words)
            </div>
            <div className="pbox">
              {colorizedWords}
              {promptWords.length > 0 && "..."}
            </div>
            <div className="tdiv"></div>
            <div className="tlb tlb-p">
              &#9733; AI Response{genNumber > 0 ? ` — Generation #${genNumber.toLocaleString()}` : ""}
            </div>
            <div className="aout">
              {displayText}
              {isTyping && <span className="cur"></span>}
            </div>
            <div className="tmeta">
              <div className="tmi">
                Provider: <b>&nbsp;{provider}</b>
              </div>
              <div className="tmi">
                Model: <b>&nbsp;{model}</b>
              </div>
              {tokens > 0 && (
                <div className="tmi">
                  Tokens: <b>&nbsp;{tokens.toLocaleString()}</b>
                </div>
              )}
              <div className="tmi">
                Updated: <b>&nbsp;{lastUpdated}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
