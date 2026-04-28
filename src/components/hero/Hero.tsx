"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LogoHero } from "./LogoHero";

export function Hero() {
  const [isActive, setIsActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll position for the activation trigger
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Activate at 80px of scroll — the first intentional scroll
      if (latest > 80 && !isActive) {
        setIsActive(true);
      }
      // Deactivate if they scroll back to the very top
      if (latest < 20) {
        setIsActive(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY, isActive]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[140vh] w-full flex-col items-center justify-start overflow-hidden px-4"
    >
      {/* ── Cold Open: SYSTEMS ── */}
      <div className="flex w-full max-w-6xl flex-col items-center text-center pt-[15vh]">
        
        {/* Top-left system label — always visible */}
        <div className="w-full flex justify-between items-start mb-4 px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex flex-col items-start gap-1"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-neutral-700 uppercase">
              PROTO_TYPE
            </span>
            <span className="font-sans text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase transition-colors duration-1000"
              style={{ color: isActive ? '#ffffff' : undefined }}
            >
              SYSTEMS
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex flex-col items-end gap-1 font-mono text-[10px] text-neutral-700"
          >
            <span>[ 01 : CORE ]</span>
            <span
              className="transition-all duration-1000"
              style={{ color: isActive ? '#8effa6' : undefined }}
            >
              {isActive ? "ACTIVE" : "DORMANT"}
            </span>
          </motion.div>
        </div>

        {/* ── The Chip — starts dormant, activates on scroll ── */}
        <LogoHero isActive={isActive} />

        {/* ── "with a SINE of LIFE" — fades up from below on activation ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mt-4"
        >
          <h1 className="font-hero text-5xl font-bold uppercase tracking-tighter md:text-6xl lg:text-7xl text-white">
            with a{" "}
            <br className="md:hidden" />
            <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent italic">
              SINE of LIFE.
            </span>
          </h1>
        </motion.div>

        {/* ── Decoder bar — appears after headline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.6)] px-5 py-2">
            <style dangerouslySetInnerHTML={{ __html: `
              .scramble-words::before {
                content: "GOVERNED.";
                animation: scramble_sequence 9s infinite;
              }
              @keyframes scramble_sequence {
                0%, 25% { content: "GOVERNED."; color: #ffffff; }
                26% { content: "№:0"; color: #8effa6; }
                27%, 58% { content: "AUTONOMOUS."; color: #ff8c42; }
                59% { content: "4%0%"; color: #8effa6; }
                60%, 91% { content: "ALIVE."; color: #8effa6; }
                92% { content: "#$_"; color: #ffffff; }
                93%, 100% { content: "GOVERNED."; color: #ffffff; }
              }
            `}} />
            <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
              V_02 :
            </div>
            <div className="font-mono text-sm tracking-widest uppercase flex items-center h-4">
              <span className="scramble-words min-w-[120px] text-left"></span>
            </div>
          </div>
        </motion.div>

        {/* ── Subheadline ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 max-w-2xl font-body text-lg text-neutral-500 md:text-xl"
        >
          <p>
            Tactical systems built to{" "}
            <span className="text-neutral-300 hover:text-[#8effa6] transition-colors duration-500">
              learn and execute
            </span>
            .
          </p>
        </motion.div>

        {/* ── Scroll indicator — visible only when dormant ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-600 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
