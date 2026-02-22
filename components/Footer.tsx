"use client";

import { useLang } from "@/lib/context";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="ft">
      <div className="fti">
        <div>
          <div className="ftb">
            <span className="s">$</span>MillionDollarPrompt
          </div>
          <p className="fttg">{t.footer.tagline}</p>
        </div>
        <div>
          <div className="ftct">{t.footer.project}</div>
          <ul className="ftll">
            <li><a href="#grid">{t.footer.theGrid}</a></li>
            <li><a href="#ai">{t.footer.liveAI}</a></li>
            <li><a href="#pricing">{t.footer.pricingLink}</a></li>
            <li><a href="#impact">{t.footer.impactLink}</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">{t.footer.learnMore}</div>
          <ul className="ftll">
            <li><a href="#how">{t.footer.howWorks}</a></li>
            <li><a href="#ms">{t.footer.roadmap}</a></li>
            <li><a href="#faq">{t.footer.faqLink}</a></li>
            <li><a href="#payment">{t.footer.payments}</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">{t.footer.legal}</div>
          <ul className="ftll">
            <li><a href="#faq">{t.footer.terms}</a></li>
            <li><a href="#faq">{t.footer.privacy}</a></li>
            <li><a href="#faq">{t.footer.refund}</a></li>
          </ul>
        </div>
      </div>
      <div className="ftbot">
        <span className="ftc">
          &copy; 2025 MillionDollarPrompt. {t.footer.rights}
        </span>
        <div className="ftsoc">
          <a href="https://twitter.com/intent/tweet?text=Check%20out%20the%20Million%20Dollar%20Prompt%20—%20the%20world%27s%20largest%20collaborative%20AI%20experiment!&url=https%3A%2F%2Fmilliondollarprompt.com" target="_blank" rel="noopener noreferrer">{t.footer.twitterText}</a>
        </div>
      </div>
    </footer>
  );
}
