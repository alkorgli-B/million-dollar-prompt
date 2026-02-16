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
            The world&apos;s largest collaborative AI experiment. One word at a
            time.
          </p>
        </div>
        <div>
          <div className="ftct">Project</div>
          <ul className="ftll">
            <li><a href="#grid">The Grid</a></li>
            <li><a href="#ai">Live AI</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#impact">Charity</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">Company</div>
          <ul className="ftll">
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <div className="ftct">Legal</div>
          <ul className="ftll">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Refunds</a></li>
            <li><a href="#">GDPR</a></li>
          </ul>
        </div>
      </div>
      <div className="ftbot">
        <span className="ftc">
          &copy; 2026 MillionDollarPrompt. Built with ambition &amp; purpose.
        </span>
        <div className="ftsoc">
          <a href="#">X/Twitter</a>
          <a href="#">GitHub</a>
          <a href="#">Discord</a>
        </div>
      </div>
    </footer>
  );
}
