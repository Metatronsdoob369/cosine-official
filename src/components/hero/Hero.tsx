"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Cpu } from "lucide-react";
import { ReflectiveButton } from "../ui/ReflectiveButton";
import { LogoHero } from "./LogoHero";

export function Hero() {
  const [isArmed, setIsArmed] = useState(false);
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [targetPayload, setTargetPayload] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "[ SYSTEM ]: DOMICILE LOCAL NODE INITIALIZED",
    "[ SYSTEM ]: GOVERNANCE STATUS -> SAFE (READ-ONLY)",
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSystemActive(true);
      } else {
        setIsSystemActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleArmToggle = () => {
    const newState = !isArmed;
    setIsArmed(newState);
    if (newState) setIsSystemActive(true);
    setTerminalOutput((prev) => [
      ...prev,
      `[ SYS_OP ]: STATE MUTATED -> ${newState ? "ARMED (LIVE)" : "SAFE"}`,
    ]);
  };

  const handleDeploy = () => {
    if (!targetPayload) return;
    setIsDeploying(true);
    setTerminalOutput((prev) => [
      ...prev,
      `[ N8N_HOOK ]: INITIATING PAYLOAD SEQUENCE TO: ${targetPayload}...`,
    ]);

    // Simulate n8n webhook delay
    setTimeout(() => {
      setTerminalOutput((prev) => [
        ...prev,
        `[ SUCCESS ]: PAYLOAD DELIVERED. AWAITING RESPONSE...`,
      ]);
      setTargetPayload("");
      setIsDeploying(false);
    }, 1500);
  };

  return (
    <section className="relative flex min-h-[120vh] w-full flex-col items-center pt-24 overflow-hidden px-4">
      {/* Hero Content */}
      <div className="z-10 flex w-full max-w-6xl flex-col items-center text-center text-white">
        
        {/* Systems Quad (Top Left Symmetric) - Modern, Clean Font */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full flex justify-start mb-4 px-12"
        >
            <span className="font-mono text-sm tracking-[0.4em] text-neutral-500 uppercase">
                SYSTEMS
            </span>
        </motion.div>

        {/* Brand Focal Point (Dormant-to-Active) */}
        <LogoHero isActive={isSystemActive} />

        {/* Headline with cinematic spacing */}
        <motion.div
          animate={{ opacity: isSystemActive ? 1 : 0, y: isSystemActive ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="font-hero text-6xl font-bold uppercase tracking-tighter md:text-7xl lg:text-8xl mt-4"
        >
          with a <br />
          <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent italic">
            SINE of LIFE.
          </span>
        </motion.div>

        {/* Subheadline with rewarding hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex max-w-2xl flex-col items-center justify-center gap-6 font-body text-xl text-neutral-400 md:text-2xl mt-8"
        >
          <p>
            While competitors give you tools, we build{" "}
            <span className="cursor-default text-white transition-colors hover:text-[#8effa6]">
              tactical systems that learn
            </span>
            .
          </p>

          <div className="mt-2 flex h-[40px] items-center rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] px-8 shadow-inner">
            <style dangerouslySetInnerHTML={{ __html: `
              .scramble-words::before {
                content: "GOVERNED.";
                animation: scramble_sequence 9s infinite;
              }
              @keyframes scramble_sequence {
                0%, 25% { content: "GOVERNED."; color: #ffffff; }
                26% { content: "#."; color: #ffffff; }
                27% { content: "^{!"; color: #ffffff; }
                28% { content: "№:0"; color: #8effa6; }
                29% { content: "@}-?"; color: #8effa6; }
                30%, 58% { content: "AUTONOMOUS."; color: #ff8c42; }
                59% { content: "?{%"; color: #ff8c42; }
                60% { content: "|{f[4"; color: #ff8c42; }
                61% { content: "4%0%"; color: #8effa6; }
                62% { content: "]>'"; color: #8effa6; }
                63%, 91% { content: "ALIVE."; color: #8effa6; }
                92% { content: "?2@%"; color: #8effa6; }
                93% { content: "%2x$"; color: #8effa6; }
                94% { content: "#$_"; color: #ffffff; }
                95% { content: "^{"; color: #ffffff; }
                96%, 100% { content: "GOVERNED."; color: #ffffff; }
              }
            `}} />
            <div className="font-mono text-xs tracking-[0.2em] text-neutral-500 uppercase flex items-center h-full">
              STATUS: <span className="mr-4"></span>
            </div>
            <div className="font-mono text-base tracking-widest uppercase text-left relative m-0 p-0 h-full flex items-center">
              <span className="scramble-words min-w-[160px]"></span>
            </div>
          </div>
        </motion.div>

        {/* Interactive "Armed/Safe" Control Panel - Positioned as an integrated sub-system */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 flex w-full max-w-3xl flex-col gap-5 overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(5,5,5,0.7)] p-8 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-5">
            <div className="flex items-center gap-4">
              <button
                onClick={handleArmToggle}
                className={`flex items-center gap-3 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  isArmed
                    ? "bg-[rgba(142,255,166,0.1)] text-[#8effa6] shadow-[0_0_15px_rgba(142,255,166,0.1)]"
                    : "bg-[#1a1a1a] text-neutral-400"
                }`}
              >
                {isArmed ? <ShieldAlert className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                {isArmed ? "STATUS: ARMED" : "STATUS: SAFE"}
              </button>
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-neutral-800" />
              <div className="h-2 w-2 rounded-full bg-neutral-800" />
              <div className={`h-2 w-2 rounded-full ${isArmed ? 'bg-[#8effa6] animate-pulse shadow-[0_0_8px_#8effa6]' : 'bg-neutral-800'}`} />
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex h-36 flex-col justify-end overflow-hidden font-mono text-sm text-neutral-500">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.includes("SUCCESS") || line.includes("ARMED") ? "text-[#8effa6]" : ""}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Input & Action */}
          <div className="mt-4 flex gap-4">
            <input
              type="text"
              placeholder={isArmed ? "ENTER TARGET DATA NODE (PHONE / EMAIL / URL)..." : "GOVERNANCE LOCK ACTIVE - SWITCH TO ARMED"}
              disabled={!isArmed || isDeploying}
              value={targetPayload}
              onChange={(e) => setTargetPayload(e.target.value)}
              className="flex-1 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#030303] px-5 py-3 font-mono text-sm text-white focus:border-[#8effa6] focus:outline-none focus:ring-1 focus:ring-[#8effa6] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
            <ReflectiveButton
              onClick={handleDeploy}
              disabled={!isArmed || isDeploying || !targetPayload}
              className={!isArmed ? "opacity-50 grayscale" : ""}
            >
              DEPLOY PAYLOAD
            </ReflectiveButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
