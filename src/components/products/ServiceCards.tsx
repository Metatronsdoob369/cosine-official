"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Database, ShieldCheck, Zap } from "lucide-react";
import { ReflectiveButton } from "../ui/ReflectiveButton";

const services = [
  {
    title: "CUSTOM MCP STACKS",
    icon: <Network className="h-6 w-6 text-neutral-400" />,
    description:
      "Enterprise-grade Model Context Protocol infrastructure. We build governed architectures that allow AI agents to safely interact with your proprietary data and systems without hallucinating context.",
    stats: "[ PROTOCOL: MCP_v1 | GOVERNANCE: STRICT ]",
  },
  {
    title: "AUTONOMOUS WORKFLOWS",
    icon: <Database className="h-6 w-6 text-neutral-400" />,
    description:
      "N8N and custom Python backends wired to LLM reasoning engines. Transform static spreadsheets and manual data entry into living, breathing systems that execute tasks while you sleep.",
    stats: "[ NODES: DYNAMIC | LATENCY: <50ms ]",
  },
  {
    title: "OPSEC & REDTEAMING",
    icon: <ShieldCheck className="h-6 w-6 text-neutral-400" />,
    description:
      "Custom tool suites designed for penetration testing and operational security. We map your vulnerabilities before competitors do, deploying custom LLM-assisted recon agents.",
    stats: "[ POSTURE: DEFENSIVE | RECON: ACTIVE ]",
  },
  {
    title: "SYNTHETIC MEDIA GEN",
    icon: <Zap className="h-6 w-6 text-neutral-400" />,
    description:
      "Unreal Engine 5 hooked into continuous market intelligence. Autonomous generation of high-fidelity, industry-tier content triggered entirely by real-world market events.",
    stats: "[ RENDER: UE5 | TRIGGERS: LIVE ]",
  },
];

export function ServiceCards() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-32 z-10">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-radial from-[rgba(255,255,255,0.03)] to-transparent blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-6xl">
        <div className="mb-16 flex flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 border-l-2 border-[#8effa6] pl-4"
          >
            <span className="font-mono text-xs tracking-widest text-[#888888]">
              [ 03 : CAPABILITIES ]
            </span>
            <span className="font-hero text-2xl uppercase text-white tracking-widest">
              Core Systems
            </span>
          </motion.div>
          <p className="max-w-xl font-body text-neutral-400">
            We don&apos;t build websites. We build deterministic, governed AI architectures that execute complex tasks under strict parameters.
          </p>
        </div>

        {/* Tactical Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden flex flex-col justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] p-8 transition-colors hover:border-[rgba(255,255,255,0.2)]"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-[rgba(142,255,166,0.03)] to-transparent pointer-events-none" />
              
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-md border border-[rgba(255,255,255,0.1)] bg-[#111111] p-3 transition-colors group-hover:border-[#8effa6] group-hover:text-[#8effa6]">
                    {React.cloneElement(service.icon as React.ReactElement, {
                      className: "h-6 w-6 text-neutral-400 transition-colors group-hover:text-[#8effa6]"
                    })}
                </div>
                <span className="font-mono text-[10px] text-neutral-600 transition-colors group-hover:text-[#ff8c42]">
                  {service.stats}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="mb-3 font-hero text-xl text-white tracking-wide">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-neutral-400">
                  {service.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
             <ReflectiveButton>
                 Analyze Architecture Options
             </ReflectiveButton>
        </div>
      </div>
    </section>
  );
}
