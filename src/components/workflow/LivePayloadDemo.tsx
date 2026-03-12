"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, GitBranch, Globe, BrainCircuit, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Node } from "./Node";
import { ReflectiveButton } from "../ui/ReflectiveButton";

// We'll calculate wires dynamically based on DOM rects to be responsive,
// but for a quick demo, we can use flex layout and relative positioning.
export function LivePayloadDemo() {
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs to measure node positions for the LiveWires
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wireConnections, setWireConnections] = useState<any[]>([]);

  // Calculate wire paths whenever the window resizes or nodes render
  useEffect(() => {
    const calculateWires = () => {
      if (!containerRef.current || nodeRefs.current.length < 5) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const getCenter = (idx: number, side: 'top' | 'bottom' | 'left' | 'right') => {
        const el = nodeRefs.current[idx];
        if (!el) return { x: 0, y: 0 };
        const rect = el.getBoundingClientRect();
        
        // Relative to container
        const xOffset = rect.left - containerRect.left;
        const yOffset = rect.top - containerRect.top;

        if (side === 'top') return { x: xOffset + rect.width / 2, y: yOffset };
        if (side === 'bottom') return { x: xOffset + rect.width / 2, y: yOffset + rect.height };
        if (side === 'right') return { x: xOffset + rect.width + 6, y: yOffset + rect.height / 2 };
        return { x: xOffset - 6, y: yOffset + rect.height / 2 }; // left
      };

      // Define our pipeline routing rules based on the new layout
      // Ingress(0) -> Router(1) -> Researcher(2) -> LLM(3) -> Egress(4)
      const newConns = [
        {
          id: 'w1', // Ingress to Router
          ...getCenter(0, 'right'),  
          endX: getCenter(1, 'left').x, 
          endY: getCenter(1, 'left').y,
          isActive: activeNode >= 0
        },
        {
          id: 'w2', // Router to Researcher
          ...getCenter(1, 'right'),  
          endX: getCenter(2, 'left').x, 
          endY: getCenter(2, 'left').y,
          isActive: activeNode >= 1
        },
        {
          id: 'w3', // Researcher (right) to LLM Core (left)
          ...getCenter(2, 'right'),    
          endX: getCenter(3, 'left').x,
          endY: getCenter(3, 'left').y,
          isActive: activeNode >= 2
        },
        {
          id: 'w4', // LLM Core (right) to Egress (left)
          ...getCenter(3, 'right'),    
          endX: getCenter(4, 'left').x,
          endY: getCenter(4, 'left').y,
          isActive: activeNode >= 3
        }
      ];
      setWireConnections(newConns);
    };

    calculateWires();
    window.addEventListener('resize', calculateWires);
    return () => window.removeEventListener('resize', calculateWires);
  }, [activeNode]);

  const startDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveNode(-1);

    // Sequence the node activations
    const sequence = [
      { node: 0, delay: 0 },
      { node: 1, delay: 1500 },
      { node: 2, delay: 3000 },
      { node: 3, delay: 5000 }, // Generative takes a bit longer
      { node: 4, delay: 7500 },
      { node: -1, delay: 9000 }, // Reset
    ];

    sequence.forEach((step) => {
      setTimeout(() => {
        setActiveNode(step.node);
        if (step.node === -1) setIsRunning(false);
      }, step.delay);
    });
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-32 z-10 bg-transparent">
      <div className="z-10 w-full max-w-6xl">
        <div className="mb-24 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 border-l-2 border-[#8effa6] pl-4">
            <span className="font-mono text-xs tracking-widest text-[#888888]">
              [ 02 : DEPLOYMENT ]
            </span>
            <span className="font-hero text-2xl uppercase text-white tracking-widest">
              Live Payload Demo
            </span>
          </div>
          <p className="max-w-xl font-body text-neutral-400">
            Witness an autonomous content generation pipeline in action. The ingress node receives a message, routes it, performs live research, generates the asset via LLM, and texts it back.
          </p>
        </div>

        {/* The Node Pipeline Container */}
        <div className="relative w-full flex flex-col items-center mt-12 mb-12">
            
          {/* New Hierarchical Layout: Ingress Left, LLM Top Center, Router/Researcher Bottom Center, Egress Right */}
          <div ref={containerRef} className="relative z-20 flex w-full max-w-5xl items-center justify-between gap-8 py-10 px-4">
             
             {/* The SVG Overlay for Wires spanning the container */}
             <div className="absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full overflow-visible">
                   <defs>
                     <filter id="packetGlowDemo" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                     </filter>
                   </defs>
                   {wireConnections.map((conn) => {
                      // Adjust bezier curve depending on vertical vs horizontal flow
                      const isVertical = Math.abs(conn.endY - conn.y) > Math.abs(conn.endX - conn.x);
                      let pathData = "";
                      
                      if (isVertical) {
                          const controlOffset = Math.abs(conn.endY - conn.y) * 0.4;
                          pathData = `M ${conn.x} ${conn.y} C ${conn.x} ${conn.y + controlOffset}, ${conn.endX} ${conn.endY - controlOffset}, ${conn.endX} ${conn.endY}`;
                      } else {
                          const controlOffset = Math.abs(conn.endX - conn.x) * 0.4;
                          pathData = `M ${conn.x} ${conn.y} C ${conn.x + controlOffset} ${conn.y}, ${conn.endX - controlOffset} ${conn.endY}, ${conn.endX} ${conn.endY}`;
                      }

                      return (
                        <g key={conn.id}>
                          <path d={pathData} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                          {conn.isActive && (
                              <>
                                <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} d={pathData} fill="none" stroke="#8effa6" strokeWidth="1.5" strokeLinecap="round" className="opacity-60" />
                                <motion.circle r="3" fill="#ffffff" filter="url(#packetGlowDemo)">
                                  <animateMotion dur="0.8s" repeatCount="1" path={pathData} fill="freeze" />
                                  <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.9;1" dur="0.8s" fill="freeze" />
                                </motion.circle>
                              </>
                          )}
                        </g>
                      );
                   })}
                </svg>
             </div>

             {/* LEFT: Ingress */}
             <div ref={el => { nodeRefs.current[0] = el; }} className="relative z-10 w-auto h-auto mt-24">
                 <Node id="n1" title="TELEGRAM INGRESS" icon={<MessageSquare size={24} strokeWidth={1.5} />} isActive={activeNode >= 0} isProcessing={activeNode === 0} shape="start" />
             </div>

             {/* CENTER COLUMN: LLM Core top, Router & Researcher bottom */}
             <div className="relative z-10 flex flex-col items-center gap-12 flex-1">
                 {/* Top: LLM Core */}
                 <div ref={el => { nodeRefs.current[3] = el; }} className="relative z-10 w-auto h-auto">
                     <Node 
                        id="n4" 
                        title="LLM AGENT" 
                        icon={<BrainCircuit size={32} />} 
                        isActive={activeNode >= 3} 
                        isProcessing={activeNode === 3}
                        shape="horizontal"
                        delay={3}
                      />
                 </div>
                 
                 {/* Bottom: Router and Researcher */}
                 <div className="flex w-full justify-center gap-12">
                     <div ref={el => { nodeRefs.current[1] = el; }} className="relative z-10 w-auto h-auto">
                         <Node id="n2" title="ROUTER" icon={<GitBranch size={24} strokeWidth={1.5} />} isActive={activeNode >= 1} isProcessing={activeNode === 1} delay={1} />
                     </div>
                     <div ref={el => { nodeRefs.current[2] = el; }} className="relative z-10 w-auto h-auto">
                         <Node id="n3" title="RESEARCHER" icon={<Globe size={24} strokeWidth={1.5} />} isActive={activeNode >= 2} isProcessing={activeNode === 2} delay={2} />
                     </div>
                 </div>
             </div>

             {/* RIGHT: Egress */}
             <div ref={el => { nodeRefs.current[4] = el; }} className="relative z-10 w-auto h-auto mt-24">
                 <Node id="n5" title="TELEGRAM EGRESS" icon={<Send size={24} strokeWidth={1.5} />} isActive={activeNode >= 4} isProcessing={activeNode === 4} shape="end" delay={4} />
             </div>
          </div>

          <div className="mt-24 flex flex-col items-center gap-6 z-20">
             {/* Tactical Trigger Button matching the log_in.tsx / top_header styles */}
             <button 
                onClick={startDemo}
                className="group relative flex flex-col items-center justify-center p-0 border-[3px] border-[#111] rounded-xl bg-[#0a0a0a] text-[#888] font-bold shadow-[4px_4px_0px_#000] overflow-hidden transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] w-48 h-14"
             >
                 <span className="relative z-10 font-mono text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
                     {isRunning ? "PROCESSING..." : "ARM PAYLOAD"}
                 </span>
             </button>
             
             {/* Output: Neomorphic Social Platforms Generation Result */}
             <div className={`mt-8 transition-all duration-1000 ${activeNode === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-4">
                  <span className="font-mono text-xs text-[#888] tracking-widest uppercase">Payload Delivered</span>
                  <div className="flex items-center gap-4 p-2 rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#111] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5),0_10px_20px_rgba(0,0,0,0.8)]">
                     
                     {/* LinkedIn Toggle */}
                     <button className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden bg-transparent border border-[rgba(156,156,156,0.2)] hover:border-[rgba(156,156,156,0.4)]">
                        <div className="absolute inset-0 bg-[#0077b5] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center bg-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-[4px] group-hover:bg-[rgba(156,156,156,0.2)]">
                           <svg viewBox="0 0 448 512" fill="white" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                           </svg>
                        </div>
                     </button>

                     {/* Twitter/X Toggle */}
                     <button className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden bg-transparent border border-[rgba(156,156,156,0.2)] hover:border-[rgba(156,156,156,0.4)]">
                        <div className="absolute inset-0 bg-[#14171a] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center bg-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-[4px] group-hover:bg-[rgba(156,156,156,0.2)]">
                           <svg viewBox="0 0 512 512" fill="white" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg">
                              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                           </svg>
                        </div>
                     </button>

                     {/* Instagram Toggle */}
                     <button className="relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 overflow-hidden bg-transparent border border-[rgba(156,156,156,0.2)] hover:border-[rgba(156,156,156,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 w-full h-full flex items-center justify-center bg-transparent backdrop-blur-[2px] transition-all duration-300 group-hover:backdrop-blur-[4px] group-hover:bg-[rgba(156,156,156,0.2)]">
                           <svg viewBox="0 0 448 512" fill="white" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg">
                               <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                           </svg>
                        </div>
                     </button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
