"use client";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="fti">
        <div>
          <div className="ftb">
            <span className="s">$</span>MillionDollarPrompt
          </div>
          <p className="fttg">
            The world&apos;s largest collaborative AI experiment. One million
            words. One giant prompt. One AI mind.
          </p>
        </div>
        <div>
          <div className="ftct">Project</div>
          <ul className="ftll">
            <li><a href="#grid">The Grid</a></li>
            <li><a href="#ai">Live AI</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#impact">Impact</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">Learn More</div>
          <ul className="ftll">
            <li><a href="#how">How It Works</a></li>
            <li><a href="#ms">Roadmap</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#payment">Payments</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">Legal</div>
          <ul className="ftll">
            <li><a href="#faq">Terms of Service</a></li>
            <li><a href="#faq">Privacy Policy</a></li>
            <li><a href="#faq">Refund Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="ftbot">
        <span className="ftc">
          &copy; 2025 MillionDollarPrompt. All rights reserved.
        </span>
        <div className="ftsoc">
          <a href="https://twitter.com/intent/tweet?text=Check%20out%20the%20Million%20Dollar%20Prompt%20—%20the%20world%27s%20largest%20collaborative%20AI%20experiment!&url=https%3A%2F%2Fmilliondollarprompt.com" target="_blank" rel="noopener noreferrer">X / Twitter</a>
        </div>
      </div>
    </footer>
  );
}
