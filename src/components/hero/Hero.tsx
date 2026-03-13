"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Cpu } from "lucide-react";
import { ReflectiveButton } from "../ui/ReflectiveButton";

export function Hero() {
  const [isArmed, setIsArmed] = useState(false);
  const [targetPayload, setTargetPayload] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "[ SYSTEM ]: DOMICILE LOCAL NODE INITIALIZED",
    "[ SYSTEM ]: GOVERNANCE STATUS -> SAFE (READ-ONLY)",
  ]);

  const handleArmToggle = () => {
    setIsArmed(!isArmed);
    setTerminalOutput((prev) => [
      ...prev,
      `[ SYS_OP ]: STATE MUTATED -> ${!isArmed ? "ARMED (LIVE)" : "SAFE"}`,
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
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden px-4">
      {/* Hero Content */}
      <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-8 text-center text-white">
        
        {/* New Tactical Chip (replaces Pill Badge) */}
        <div className="relative group p-[2px] overflow-hidden rounded-md cursor-default select-none shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          {/* Animated Gradient Border (The "Wires") */}
          <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050505_0%,#050505_20%,#ff8c42_50%,#050505_80%,#050505_100%)]"></div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex items-center justify-center gap-2 rounded-[5px] border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] px-5 py-2 z-10"
          >
            <span className="font-hero text-sm tracking-[0.2em] text-white">
              COSINE <span className="text-[#ff8c42] animate-pulse inline-block ml-0.5">+</span>
            </span>
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-hero text-5xl font-bold uppercase tracking-tighter md:text-6xl lg:text-7xl"
        >
          Systems... with a <br />
          <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent italic">
            SINE of LIFE.
          </span>
        </motion.h1>

        {/* Subheadline with rewarding hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex max-w-xl flex-col items-center justify-center gap-4 font-body text-lg text-neutral-400 md:text-xl"
        >
          <p>
            While competitors give you tools, we build{" "}
            <span className="cursor-default text-white transition-colors hover:text-[#8effa6]">
              tactical systems that learn
            </span>
            .
          </p>

          <div className="mt-2 flex h-[36px] items-center rounded-md border border-[rgba(255,255,255,0.05)] bg-[rgba(10,10,10,0.4)] px-6 shadow-inner">
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
            <div className="font-mono text-sm tracking-[0.2em] text-neutral-500 uppercase flex items-center h-full">
              STATUS: <span className="mr-3"></span>
            </div>
            <div className="font-mono text-base tracking-widest uppercase text-left relative m-0 p-0 h-full flex items-center">
              <span className="scramble-words min-w-[140px]"></span>
            </div>
          </div>
        </motion.div>

        {/* Interactive "Armed/Safe" Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,10,0.6)] p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleArmToggle}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                  isArmed
                    ? "bg-[rgba(142,255,166,0.1)] text-[#8effa6] shadow-[0_0_10px_rgba(142,255,166,0.1)]"
                    : "bg-[#1a1a1a] text-neutral-400"
                }`}
              >
                {isArmed ? <ShieldAlert className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                {isArmed ? "STATUS: ARMED" : "STATUS: SAFE"}
              </button>
            </div>
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neutral-800" />
              <div className="h-2 w-2 rounded-full bg-neutral-800" />
              <div className={`h-2 w-2 rounded-full ${isArmed ? 'bg-[#8effa6] animate-pulse shadow-[0_0_5px_#8effa6]' : 'bg-neutral-800'}`} />
            </div>
          </div>

          {/* Terminal Output */}
          <div className="flex h-32 flex-col justify-end overflow-hidden font-mono text-xs text-neutral-500">
            {terminalOutput.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.includes("SUCCESS") || line.includes("ARMED") ? "text-[#8effa6]" : ""}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Input & Action */}
          <div className="mt-2 flex gap-3">
            <input
              type="text"
              placeholder={isArmed ? "ENTER TARGET (PHONE / EMAIL)..." : "SYSTEM LOCKED - SWITCH TO ARMED"}
              disabled={!isArmed || isDeploying}
              value={targetPayload}
              onChange={(e) => setTargetPayload(e.target.value)}
              className="flex-1 rounded-md border border-[rgba(255,255,255,0.1)] bg-[#050505] px-4 py-2 font-mono text-sm text-white focus:border-[#8effa6] focus:outline-none focus:ring-1 focus:ring-[#8effa6] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
            <ReflectiveButton
              onClick={handleDeploy}
              disabled={!isArmed || isDeploying || !targetPayload}
              className={!isArmed ? "opacity-50 grayscale" : ""}
            >
              DEPLOY
            </ReflectiveButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
