"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Beaker, Briefcase, Camera } from "lucide-react";
import { ReflectiveButton } from "../ui/ReflectiveButton";

const galleryProjects = [
  {
    id: "oms-inventory",
    title: "OMS INVENTORY & SCOUTER",
    icon: <Briefcase className="h-5 w-5" />,
    stats: "[ NODE: ACTIVE | SECTOR: MEDICAL ]",
    description: 
      "National inventory tracker and site scouter for an oral surgery practice. Replaced fragmented, multi-state spreadsheets with a centralized, governed data architecture.",
    tags: ["n8n Integration", "Data Consolidation", "Geospatial Analysis"]
  },
  {
    id: "drug-tracking",
    title: "DRUG EXPIRY SYSTEM",
    icon: <Beaker className="h-5 w-5" />,
    stats: "[ NODE: ACTIVE | COMPLIANCE: STRICT ]",
    description: 
      "Automated drug tracking and expiry alert system. Eliminates redundant manual logging and ensures critical compliance through dynamic monitoring.",
    tags: ["Automated Alerts", "Audit Logging", "Healthcare Compliance"]
  },
  {
    id: "opsec-suite",
    title: "REDTEAM OPSEC SUITE",
    icon: <Activity className="h-5 w-5" />,
    stats: "[ NODE: ARMED | CLEARANCE: REQ ]",
    description: 
      "Stacked custom tools built from client requests. Deployable toolchain for active reconnaissance and penetration testing.",
    tags: ["LLM Agents", "Custom Infrastructure", "Security"]
  },
  {
    id: "ue5-content",
    title: "UE5 AUTONOMOUS GEN",
    icon: <Camera className="h-5 w-5" />,
    stats: "[ NODE: STAGING | ENGINE: UE5 ]",
    description: 
      "Autonomous MCP loop scanning industry chats to drive Unreal Engine 5 rendering. Grades its own output and auto-prunes for quality control.",
    tags: ["Unreal Engine 5", "MCP Loop", "Autonomous Content"]
  }
];

export function ProjectGallery() {
  const [activeProject, setActiveProject] = useState(galleryProjects[0]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center px-4 py-32 border-t border-[rgba(255,255,255,0.05)] z-10">
      <div className="z-10 w-full max-w-6xl">
        
        {/* Gallery Header */}
        <div className="mb-16 flex flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 border-l-2 border-[#ff8c42] pl-4"
          >
            <span className="font-mono text-xs tracking-widest text-[#888888]">
              [ 04 : EXTERNAL NODES ]
            </span>
            <span className="font-hero text-2xl uppercase text-white tracking-widest">
              Workspace Gallery
            </span>
          </motion.div>
          <p className="max-w-xl font-body text-neutral-400">
            Isolated instances showcasing applied Cosine architecture. These represent custom deployments for specific operational requirements.
          </p>
        </div>

        {/* Workspace UI Layout */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          
          {/* Node Selector (Sidebar) */}
          <div className="flex w-full flex-col gap-2 lg:w-1/3">
            <div className="mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2 font-mono text-xs text-neutral-500 tracking-widest">
              SELECT INSTANCE:
            </div>
            {galleryProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group flex items-center justify-between rounded-md border p-4 text-left transition-all ${
                  activeProject.id === project.id
                    ? "border-[rgba(255,255,255,0.2)] bg-[#111] shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "border-[rgba(255,255,255,0.05)] bg-[#050505] hover:border-[rgba(142,255,166,0.3)] hover:bg-[#0a0a0a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${activeProject.id === project.id ? "bg-[#1a1a1a] text-white" : "text-neutral-500 group-hover:text-[#8effa6]"}`}>
                    {project.icon}
                  </div>
                  <span className={`font-hero text-sm tracking-wide ${activeProject.id === project.id ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                    {project.title}
                  </span>
                </div>
                {/* Active Indicator Pulse */}
                {activeProject.id === project.id && (
                  <div className="h-1.5 w-1.5 rounded-full bg-[#8effa6] animate-pulse shadow-[0_0_5px_#8effa6]" />
                )}
              </button>
            ))}
          </div>

          {/* Node Display (Main Content Window) */}
          <div className="relative flex min-h-[400px] w-full flex-col overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0a0a0a] lg:w-2/3">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.05)] bg-[#111111] px-6 py-3">
              <span className="font-mono text-[10px] tracking-widest text-[#ff8c42]">
                 {activeProject.stats}
              </span>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full border border-neutral-700" />
                <div className="h-2 w-2 rounded-full border border-neutral-700" />
                <div className="h-2 w-2 rounded-full border border-neutral-700" />
              </div>
            </div>

            {/* Window Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col p-8 lg:p-12"
              >
                <div className="mb-8 p-4 border border-[rgba(255,255,255,0.05)] bg-[#050505] rounded-md">
                   <h3 className="mb-4 font-hero text-2xl text-white md:text-3xl tracking-wide">
                     {activeProject.title}
                   </h3>
                   <p className="font-body text-base leading-relaxed text-neutral-400">
                     {activeProject.description}
                   </p>
                </div>

                <div className="mt-auto mb-8 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, i) => (
                    <span key={i} className="rounded-full border border-[rgba(142,255,166,0.2)] bg-[rgba(142,255,166,0.02)] px-3 py-1 font-mono text-xs text-[#8effa6]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-start">
                   <ReflectiveButton className="text-sm px-6 py-2">
                     Request Access Log
                   </ReflectiveButton>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Subtle Terminal Scanline Overlay for the window */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
          </div>

        </div>
      </div>
    </section>
  );
}
