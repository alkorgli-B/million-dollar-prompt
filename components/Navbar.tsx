"use client";

import { useState, useEffect } from "react";
import { useLang, useTheme } from "@/lib/context";

interface NavbarProps {
  onBuyClick: () => void;
}

export default function Navbar({ onBuyClick }: NavbarProps) {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, locale, setLocale } = useLang();
  const { theme, toggleTheme } = useTheme();

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
      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>
      <div className={`nm${menuOpen ? " open" : ""}`}>
        <a href="#grid" onClick={() => scrollTo("#grid")}>{t.nav.grid}</a>
        <a href="#how" onClick={() => scrollTo("#how")}>{t.nav.how}</a>
        <a href="#ai" onClick={() => scrollTo("#ai")}>{t.nav.ai}</a>
        <a href="#pricing" onClick={() => scrollTo("#pricing")}>{t.nav.pricing}</a>
        <a href="#faq" onClick={() => scrollTo("#faq")}>{t.nav.faq}</a>
      </div>
      <div className="nr">
        <button
          className="ntog"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === "dark" ? t.theme.light : t.theme.dark}
        >
          {theme === "dark" ? "\u263E" : "\u2600"}
        </button>
        <button
          className="ntog"
          onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          aria-label="Toggle language"
        >
          {locale === "en" ? t.lang.ar : t.lang.en}
        </button>
        <button className="nbtn" onClick={onBuyClick}>
          {t.nav.buy}
        </button>
      </div>
    </nav>
  );
}
