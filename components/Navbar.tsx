"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  onBuyClick: () => void;
}

export default function Navbar({ onBuyClick }: NavbarProps) {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setStuck(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`nav${stuck ? " stuck" : ""}`}>
      <div className="logo">
        <i>$</i>MillionDollarPrompt
      </div>
      <button
        className="burger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      <div className={`nm${menuOpen ? " open" : ""}`}>
        <a href="#grid" onClick={() => scrollTo("#grid")}>Grid</a>
        <a href="#how" onClick={() => scrollTo("#how")}>How</a>
        <a href="#ai" onClick={() => scrollTo("#ai")}>Live AI</a>
        <a href="#pricing" onClick={() => scrollTo("#pricing")}>Pricing</a>
        <a href="#faq" onClick={() => scrollTo("#faq")}>FAQ</a>
      </div>
      <div className="nr">
        <div className="live">
          <div className="ldot"></div>LIVE
        </div>
        <button className="nbtn" onClick={onBuyClick}>
          Buy a Word
        </button>
      </div>
    </nav>
  );
}
