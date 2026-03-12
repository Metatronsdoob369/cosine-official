"use client";

import React from "react";
import { motion } from "framer-motion";

interface NodeProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  isProcessing?: boolean;
  shape?: "default" | "start" | "end" | "hex" | "horizontal";
  delay?: number;
}

export function Node({ id, title, icon, isActive, isProcessing = false, shape = "default", delay = 0 }: NodeProps) {
  // Determine layout and sizing based on shape
  let dimensions = "w-32 h-32 md:w-36 md:h-36";
  let flexDir = "flex-col";
  let iconScale = "scale-100";
  let borderRadiusClass = "rounded-lg";
  let titleMargin = "bottom-4";
  let titleAlign = "text-center w-full block";
  let titleTextSize = "text-[7.5px] tracking-[0.15em]";

  if (shape === "horizontal") {
    // Landscape LLM Node layout
    dimensions = "w-64 h-24 md:w-72 md:h-28";
    flexDir = "flex-row px-6 gap-4"; // Icon left, text right
    borderRadiusClass = "rounded-xl";
    titleMargin = "relative"; // No absolute bottom positioning
    titleAlign = "text-left block";
    titleTextSize = "text-[11px] tracking-widest";
  } else if (shape === "start") {
    borderRadiusClass = "rounded-l-full rounded-r-sm";
  } else if (shape === "end") {
    borderRadiusClass = "rounded-l-sm rounded-r-full";
  } else if (shape === "hex") {
    borderRadiusClass = "rounded-xl";
  }

  // Tactical colors (Mint for active/reward, Copper for structural id/accents)
  const mintGlow = "rgba(142,255,166,0.15)";
  const mintBorder = "rgba(142,255,166,0.3)";
  const mintText = "text-[#8effa6]";
  const copperAccent = "text-[#c27c5b]"; // Metallic blood copper

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-center justify-center ${dimensions}`}
    >
      {/* Outer wrapper that clips the spinning border, but allows ports to live outside */}
      <div className={`relative flex items-center justify-center w-full h-full p-[2px] ${borderRadiusClass} overflow-hidden bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[0_15px_30px_rgba(0,0,0,0.9)]`}>
          
          {/* Working Animation (The Laps) */}
          {isProcessing && (
              <div className="absolute inset-[-150%] animate-[spin_0.6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_30%,#8effa6_50%,transparent_70%,transparent_100%)] z-0"></div>
          )}

          {/* Inner Physical Bezel Ring with inner shadow for indentation */}
          <div className={`relative z-10 flex h-full w-full ${flexDir} items-center justify-center overflow-hidden bg-[#181818] shadow-[inset_0_8px_16px_rgba(0,0,0,0.9),inset_0_-1px_2px_rgba(255,255,255,0.03)] transition-all duration-700 ${borderRadiusClass} ${isActive && !isProcessing ? 'border border-[rgba(142,255,166,0.3)] shadow-[0_0_20px_rgba(142,255,166,0.08),inset_0_8px_16px_rgba(0,0,0,0.9)]' : 'border border-[rgba(255,255,255,0.08)]'}`}>
            
            {/* Glass Reflection (The Shine) */}
        <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
           {/* Angled hard reflection typical of clean modern UI */}
           <div className="absolute -inset-x-10 top-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-[0.03] -skew-y-12 transform origin-top" />
        </div>

        {/* Glow effect that fills the indented cutaway when active (Mint) */}
        <div 
          className={`absolute inset-0 bg-[radial-gradient(circle,rgba(142,255,166,0.15)_0%,transparent_70%)] opacity-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : ''}`}
        />

        {/* The Cutaway Icon (Crisp White when active) */}
        <div className={`relative z-10 transition-all duration-700 flex justify-center items-center ${shape !== 'horizontal' && 'mb-4'} ${isActive ? 'scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] text-white' : 'text-neutral-600 scale-100'}`}>
          {icon}
        </div>

        {/* Node Title Plaque */}
        <div className={shape === 'horizontal' ? '' : `absolute ${titleMargin} px-1 w-full flex justify-center`}>
            {shape === 'horizontal' && (
               <span className={`block font-mono text-[10px] tracking-widest uppercase mb-1 ${copperAccent}`}>
                   {/* CORE ENGINE */}
               </span>
            )}
            <span className={`${titleAlign} font-mono ${titleTextSize} uppercase transition-colors duration-700 ${isActive ? mintText : 'text-neutral-400'}`}>
                {title}
            </span>
        </div>
      </div>
    </div>

      {/* Connection Ports (Input/Output sockets) */}
      {shape !== "start" && (
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-[#333] bg-[#050505] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] z-20 flex items-center justify-center">
            <div className={`h-1 w-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`} />
        </div>
      )}
      {shape !== "end" && (
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-[#333] bg-[#050505] shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] z-20 flex items-center justify-center">
             <div className={`h-1 w-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-transparent'}`} />
        </div>
      )}
    </motion.div>
  );
}
