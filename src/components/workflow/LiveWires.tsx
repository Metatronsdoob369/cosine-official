"use client";

import React from "react";
import { motion } from "framer-motion";

interface Connection {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
}

export function LiveWires({ connections }: { connections: Connection[] }) {
  // Wait to render the client coordinates properly to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      {/* Filters for glowing effects on the wires */}
      <defs>
        <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* We use a sharp glow for the moving packet instead of blur to keep it "tactile" */}
        <filter id="packetGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {connections.map((conn) => {
        // Create an organic, flowing bezier curve between the nodes
        // Control points are pushed out horizontally from the start and end points
        const controlOffset = Math.abs(conn.endX - conn.startX) * 0.5;
        const pathData = `M ${conn.startX} ${conn.startY} 
                          C ${conn.startX + controlOffset} ${conn.startY},
                            ${conn.endX - controlOffset} ${conn.endY},
                            ${conn.endX} ${conn.endY}`;

        return (
          <g key={conn.id}>
             {/* The Base Wire (Unlit) - Perforated (dashed) and slightly more visible than before */}
             <path
               d={pathData}
               fill="none"
               stroke="rgba(255,255,255,0.15)"
               strokeWidth="2"
               strokeDasharray="4 6"
               strokeLinecap="round"
             />

             {/* The Activated Wire Glow - Tactical Mint, thin and sharp */}
             {conn.isActive && (
                 <motion.path
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 1 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   d={pathData}
                   fill="none"
                   stroke="#8effa6"
                   strokeWidth="1.5"
                   strokeLinecap="round"
                   filter="url(#wireGlow)"
                   className="opacity-40"
                 />
             )}

             {/* The Singular Data Pulse - A sharp white dot with a slight tracer that runs ONCE */}
             {conn.isActive && (
                <motion.circle
                  r="3"
                  fill="#ffffff"
                  filter="url(#packetGlow)"
                >
                  <animateMotion
                    dur="0.8s"
                    repeatCount="1"
                    path={pathData}
                    fill="freeze" // freeze at the very end of the path
                  />
                  {/* Fade out the pulse dot right as it finishes the journey so it doesn't linger */}
                   <animate 
                    attributeName="opacity" 
                    values="1;1;0" 
                    keyTimes="0;0.9;1" 
                    dur="0.8s" 
                    fill="freeze" 
                  />
                </motion.circle>
             )}
          </g>
        );
      })}
    </svg>
  );
}
