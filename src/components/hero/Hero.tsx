"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { LogoHero } from "./LogoHero";

export function Hero() {
  const [isActive, setIsActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 60 && !isActive) setIsActive(true);
      if (latest < 15) setIsActive(false);
    });
    return () => unsubscribe();
  }, [scrollY, isActive]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[130vh] w-full flex-col items-center justify-start overflow-hidden px-4"
    >
      <div className="flex w-full max-w-5xl flex-col items-center text-center pt-[12vh]">

        {/* ── Status corners ── */}
        <div className="w-full flex justify-between items-start mb-2 px-4">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.4em] text-neutral-700 uppercase"
          >
            [ 01 : CORE ]
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-mono text-[10px] tracking-[0.4em] uppercase transition-colors duration-1000"
            style={{ color: isActive ? '#8effa6' : '#3a3d44' }}
          >
            {isActive ? "ACTIVE" : "DORMANT"}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            THE PHRASE — one coherent brand statement:
            
            Load:   "SYSTEMS"  (visible, the chip sits below it dormant)
            Scroll: "with a SINE of LIFE."  (fades up, completing the sentence)
            
            Together they read: "SYSTEMS with a SINE of LIFE."
           ══════════════════════════════════════════════════════════ */}

        {/* Line 1: SYSTEMS — always visible */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-hero text-6xl font-bold uppercase tracking-tight md:text-7xl lg:text-8xl text-white mt-6"
        >
          SYSTEMS
        </motion.h1>

        {/* ── The Chip — dormant on load, activates on scroll ── */}
        <LogoHero isActive={isActive} />

        {/* Line 2: "with a SINE of LIFE." — fades up from below on scroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-2"
        >
          <h2 className="font-hero text-4xl font-light uppercase tracking-tight md:text-5xl lg:text-6xl text-neutral-400">
            with a{" "}
            <span className="font-bold italic bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
              SINE of LIFE.
            </span>
          </h2>
        </motion.div>

        {/* ── Decoder bar — GOVERNED / AUTONOMOUS / ALIVE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
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
                26% { content: "—"; color: #8effa6; }
                27%, 58% { content: "AUTONOMOUS."; color: #ff8c42; }
                59% { content: "—"; color: #8effa6; }
                60%, 91% { content: "ALIVE."; color: #8effa6; }
                92% { content: "—"; color: #ffffff; }
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

        {/* ── Scroll indicator — visible only when dormant ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
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
