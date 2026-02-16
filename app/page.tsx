"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Grid from "@/components/Grid";
import AITerminal from "@/components/AITerminal";
import HowItWorks from "@/components/HowItWorks";
import PaymentFlow from "@/components/PaymentFlow";
import PricingCards from "@/components/PricingCards";
import Timeline from "@/components/Timeline";
import ShareCard from "@/components/ShareCard";
import ImpactSection from "@/components/ImpactSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BuyModal from "@/components/BuyModal";
import { useWords } from "@/hooks/useWords";
import { useStats } from "@/hooks/useStats";
import { formatNumber } from "@/lib/utils";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPkg, setModalPkg] = useState(1);
  const { words, refetch: refetchWords } = useWords();
  const { stats, refetch: refetchStats } = useStats();
  const revealRef = useRef(false);

  const openModal = (pkg: number = 1) => {
    setModalPkg(pkg);
    setModalOpen(true);
  };

  const handlePurchaseSuccess = () => {
    refetchWords();
    refetchStats();
  };

  // Intersection Observer for reveal animations
  useEffect(() => {
    if (revealRef.current) return;
    revealRef.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const remaining = 1_000_000 - stats.total_sold;

  return (
    <>
      {/* Ambient orbs */}
      <div className="orb o1"></div>
      <div className="orb o2"></div>
      <div className="orb o3"></div>

      <Navbar onBuyClick={() => openModal()} />
      <Hero onBuyClick={() => openModal()} stats={stats} />
      <Ticker />
      <Grid words={words} onCellClick={() => openModal()} />
      <AITerminal />
      <HowItWorks />
      <PaymentFlow />
      <PricingCards onBuyClick={openModal} />
      <Timeline />
      <ShareCard />
      <ImpactSection stats={stats} />
      <FAQ />

      {/* CTA Section */}
      <section className="ctas reveal vis">
        <h2 className="ctat">
          Be Part of Something
          <br />
          Bigger Than Yourself.
        </h2>
        <p className="ctax">
          One word. One dollar. A million voices. An AI that listens to all of
          them.
        </p>
        <button className="bp bp-mint" onClick={() => openModal()}>
          Buy Your Word Now — $1
        </button>
        <div className="ctau">
          &#9888; Only {formatNumber(remaining)} words remaining
        </div>
      </section>

      <Footer />

      <BuyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPackage={modalPkg}
        onSuccess={handlePurchaseSuccess}
      />
    </>
  );
}
