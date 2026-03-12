"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { motion, useScroll, useTransform } from "framer-motion";

export function ArchitectureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic scales based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const zIndex = useTransform(scrollYProgress, (v) => Math.round(v * 100));

  useEffect(() => {
    if (!nodesRef.current) return;
    
    // Anime.js entry animation for the nodes (pulsing/connection lines)
    const elements = nodesRef.current.querySelectorAll(".arch-node");
    
    anime({
      targets: elements,
      scale: [0.9, 1.05],
      opacity: [0.6, 1],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000,
      delay: anime.stagger(200, {grid: [3, 3], from: 'center'})
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] w-full bg-[#050505]"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Title layer */}
        <motion.div 
          style={{ opacity }}
          className="absolute top-24 z-50 text-center"
        >
          <h2 className="font-hero text-3xl text-white tracking-widest uppercase md:text-5xl">
            System Architecture
          </h2>
          <p className="font-mono text-sm text-[#8effa6] mt-4 tracking-widest uppercase">
            [ Traversing Nodes... ]
          </p>
        </motion.div>

        {/* 3D Zooming Canvas Area */}
        <motion.div 
          ref={nodesRef}
          style={{ scale, opacity, zIndex }}
          className="relative flex h-[800px] w-[800px] items-center justify-center"
        >
          {/* Central Hub Node (Cosine Core) */}
          <div className="arch-node absolute z-20 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-[#8effa6] bg-[rgba(10,10,10,0.8)] shadow-[0_0_30px_rgba(142,255,166,0.15)] backdrop-blur-md">
            <span className="font-hero text-xl text-white">COSINE</span>
            <span className="font-mono text-[10px] text-[#ff8c42]">CORE_NODE</span>
          </div>

          {/* Surrounding Nodes representing services/layers */}
          <div className="arch-node absolute -top-32 left-1/4 h-24 w-24 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0a0a0a] flex items-center justify-center font-mono text-xs text-neutral-400 backdrop-blur-sm">
            [ L1: ROUTER ]
          </div>
          <div className="arch-node absolute -bottom-32 right-1/4 h-24 w-24 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0a0a0a] flex items-center justify-center font-mono text-xs text-neutral-400 backdrop-blur-sm">
            [ L2: ORCHESTRATOR ]
          </div>
          <div className="arch-node absolute -left-32 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0a0a0a] flex items-center justify-center font-mono text-xs text-neutral-400 backdrop-blur-sm">
            [ L3: REASONING ]
          </div>
          <div className="arch-node absolute -right-32 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0a0a0a] flex items-center justify-center font-mono text-xs text-neutral-400 backdrop-blur-sm">
            [ L4: NEURAL ]
          </div>

          {/* Connection Lines (SVGs for crispness) */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none opacity-30">
            <line stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" x1="400" y1="400" x2="300" y2="200" />
            <line stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" x1="400" y1="400" x2="550" y2="550" />
            <line stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" x1="400" y1="400" x2="200" y2="400" />
            <line stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 4" x1="400" y1="400" x2="600" y2="400" />
          </svg>
        </motion.div>

        {/* Scroll Instructional Overlay */}
        <div className="absolute bottom-12 font-mono text-xs text-neutral-600 transition-opacity">
          SCROLL TO TRAVERSE SYSTEM ARCHITECTURE ↓
        </div>
      </div>
    </section>
  );
}
