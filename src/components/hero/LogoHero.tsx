"use client";

import React from "react";
import { motion } from "framer-motion";

export function LogoHero({ isActive = false }: { isActive?: boolean }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center py-16 pointer-events-none transition-all duration-[1500ms] ${
        isActive ? "opacity-100" : "opacity-30 grayscale"
      }`}
    >
      {/* Container for the "Tactical Chip" Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 h-[260px] w-full max-w-[560px]"
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
            <linearGradient id="chipGradientActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#0a0a0a" />
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

            {/* Stronger glow for the sine wave */}
            <filter id="sineGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Respiratory pulse glow for the chip body */}
            <filter id="chipPulse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Background Circuit Traces ── */}
          <g opacity="0.4">
            {/* Input Trace 1 */}
            <path
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
              animate={isActive ? { strokeDashoffset: [438, 0] } : { strokeDashoffset: 438 }}
              transition={isActive ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              filter="url(#mintGlow)"
            />

            {/* Input Trace 2 */}
            <path
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
              animate={isActive ? { strokeDashoffset: [400, 0] } : { strokeDashoffset: 400 }}
              transition={isActive ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              filter="url(#mintGlow)"
              opacity="0.6"
            />

            {/* Output Trace 1 */}
            <path
              d="M474 200 H550 V150 H750"
              fill="none"
              stroke="#252525"
              strokeWidth="2"
            />
            <motion.path
              d="M474 200 H550 V150 H750"
              fill="none"
              stroke="#8effa6"
              strokeWidth="2"
              strokeDasharray="50 250"
              animate={isActive ? { strokeDashoffset: [0, -438] } : { strokeDashoffset: 0 }}
              transition={isActive ? { duration: 3.5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              filter="url(#mintGlow)"
            />

            {/* Output Trace 2 */}
            <path
              d="M474 230 H600 V300 H700"
              fill="none"
              stroke="#252525"
              strokeWidth="2"
            />
            <motion.path
              d="M474 230 H600 V300 H700"
              fill="none"
              stroke="#8effa6"
              strokeWidth="2"
              strokeDasharray="20 100"
              animate={isActive ? { strokeDashoffset: [0, -300] } : { strokeDashoffset: 0 }}
              transition={isActive ? { duration: 5, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              filter="url(#mintGlow)"
              opacity="0.5"
            />
          </g>

          {/* ── Sine Wave Exhale — pulses out from the output side every few cycles ── */}
          {isActive && (
            <g>
              {/* Sine wave path emerging from the right side of the chip */}
              <motion.path
                d="M478 210 C500 210, 510 190, 530 190 S560 230, 580 210 S610 190, 630 210 S660 230, 680 210 S710 190, 730 210"
                fill="none"
                stroke="#8effa6"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#sineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.6, 0.4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.7, 1],
                }}
              />
              {/* Second sine wave — offset timing, slightly different frequency */}
              <motion.path
                d="M478 220 C495 220, 508 240, 525 240 S555 200, 575 220 S605 240, 625 220 S655 200, 675 220 S705 240, 725 220"
                fill="none"
                stroke="#8effa6"
                strokeWidth="1"
                strokeLinecap="round"
                filter="url(#sineGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.35, 0.2, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 5,
                  ease: "easeInOut",
                  times: [0, 0.4, 0.7, 1],
                }}
              />
            </g>
          )}

          {/* ── Respiratory Glow — the chip "breathes" when active ── */}
          {isActive && (
            <motion.rect
              x="320"
              y="160"
              width="160"
              height="120"
              rx="16"
              ry="16"
              fill="none"
              stroke="#8effa6"
              strokeWidth="1"
              filter="url(#chipPulse)"
              animate={{
                opacity: [0.05, 0.2, 0.05],
                strokeWidth: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* ── The Chip Body ── */}
          <rect
            x="330"
            y="170"
            width="140"
            height="100"
            rx="12"
            ry="12"
            fill={isActive ? "url(#chipGradientActive)" : "url(#chipGradient)"}
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
              <rect
                key={`l-${i}`}
                x="322"
                y={y}
                width="8"
                height="10"
                fill="url(#pinGradient)"
                rx="1.5"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Right Pins */}
          <g>
            {[185, 205, 225, 245].map((y, i) => (
              <rect
                key={`r-${i}`}
                x="470"
                y={y}
                width="8"
                height="10"
                fill="url(#pinGradient)"
                rx="1.5"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.5"
              />
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
            className={isActive ? "animate-pulse" : ""}
          >
            +
          </text>

          {/* Sub-label */}
          <text
            x="400"
            y="250"
            fontFamily="monospace"
            fontSize="8"
            fill={isActive ? "#888" : "#444"}
            textAnchor="middle"
            letterSpacing="4"
            className="transition-all duration-1000"
          >
            AUTONOMOUS_CORE
          </text>
        </svg>
      </motion.div>

      {/* Decorative Aura — intensifies when active */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-[2000ms]"
        style={{
          width: isActive ? "700px" : "400px",
          height: isActive ? "700px" : "400px",
          background: isActive
            ? "radial-gradient(circle, rgba(142,255,166,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(142,255,166,0.015) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
