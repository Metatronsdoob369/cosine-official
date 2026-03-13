"use client";

import React from "react";
import { motion } from "framer-motion";

export function LogoHero() {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 pointer-events-none">
      {/* Container for the "Tactical Chip" Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 h-[240px] w-full max-w-[500px]"
      >
        <svg
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <defs>
            <linearGradient id="chipGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            <linearGradient id="textGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a3a3a3" />
            </linearGradient>
            <linearGradient id="pinGradient" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#333" />
              <stop offset="50%" stopColor="#555" />
              <stop offset="100%" stopColor="#222" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="mintGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Circuit Traces */}
          <g opacity="0.4">
            {/* Input Traces */}
            <motion.path
              d="M100 100 H250 V180 H326"
              fill="none"
              stroke="#252525"
              strokeWidth="2"
            />
            <motion.path
              d="M100 100 H250 V180 H326"
              fill="none"
              stroke="#8effa6"
              strokeWidth="2"
              strokeDasharray="40 200"
              animate={{ strokeDashoffset: [438, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              filter="url(#mintGlow)"
            />
            
            <motion.path
                d="M50 250 H280 V220 H326"
                fill="none"
                stroke="#252525"
                strokeWidth="2"
              />
            <motion.path
                d="M50 250 H280 V220 H326"
                fill="none"
                stroke="#8effa6"
                strokeWidth="2"
                strokeDasharray="30 150"
                animate={{ strokeDashoffset: [400, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                filter="url(#mintGlow)"
                opacity="0.6"
              />

            {/* Output Traces */}
            <motion.path
              d="M750 150 H550 V200 H474"
              fill="none"
              stroke="#252525"
              strokeWidth="2"
            />
            <motion.path
              d="M750 150 H550 V200 H474"
              fill="none"
              stroke="#8effa6"
              strokeWidth="2"
              strokeDasharray="50 250"
              animate={{ strokeDashoffset: [0, 438] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              filter="url(#mintGlow)"
            />
            
            <motion.path
                d="M700 300 H600 V230 H474"
                fill="none"
                stroke="#252525"
                strokeWidth="2"
              />
            <motion.path
                d="M700 300 H600 V230 H474"
                fill="none"
                stroke="#8effa6"
                strokeWidth="2"
                strokeDasharray="20 100"
                animate={{ strokeDashoffset: [0, 300] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                filter="url(#mintGlow)"
                opacity="0.5"
              />
          </g>

          {/* The Chip Body */}
          <rect
            x="330"
            y="170"
            width="140"
            height="100"
            rx="12"
            ry="12"
            fill="url(#chipGradient)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          
          {/* Inner Reflection/Bezel */}
          <rect
            x="335"
            y="175"
            width="130"
            height="90"
            rx="8"
            ry="8"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />

          {/* Left Pins */}
          <g>
            {[185, 205, 225, 245].map((y, i) => (
              <rect key={`l-${i}`} x="322" y={y} width="8" height="10" fill="url(#pinGradient)" rx="1.5" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
            ))}
          </g>

          {/* Right Pins */}
          <g>
            {[185, 205, 225, 245].map((y, i) => (
              <rect key={`r-${i}`} x="470" y={y} width="8" height="10" fill="url(#pinGradient)" rx="1.5" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" />
            ))}
          </g>

          {/* Logo Text */}
          <text
            x="400"
            y="222"
            fontFamily="var(--font-hero)"
            fontSize="18"
            fontWeight="bold"
            fill="url(#textGradient)"
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing="2"
          >
            COSINE
          </text>
          <text
            x="452"
            y="210"
            fontFamily="var(--font-hero)"
            fontSize="22"
            fontWeight="bold"
            fill="#ff8c42"
            textAnchor="middle"
            alignmentBaseline="middle"
            className="animate-pulse"
          >
            +
          </text>
          
          {/* Sub-label */}
          <text
            x="400"
            y="250"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="#666"
            textAnchor="middle"
            letterSpacing="4"
          >
            AUTONOMOUS_CORE
          </text>
        </svg>
      </motion.div>

      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(142,255,166,0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}
