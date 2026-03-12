"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ReflectiveButton } from "../ui/ReflectiveButton";

const tiers = [
  {
    name: "TRIAL DEPLOYMENT",
    price: "$2,500",
    description: "Initial sandbox environment to test autonomous node integration within your existing systems.",
    features: [
      "1 Custom N8N Workflow",
      "Basic LLM Reasoning Node",
      "7 Days Active Monitoring",
      "Read-only Data Probing"
    ],
    buttonText: "Request Trial Instance",
    highlighted: true, // Left button gets the primary gradient styling
  },
  {
    name: "ENTERPRISE ARCHITECTURE",
    price: "Custom",
    description: "Full-scale governed deployment of the Cosine architecture, strictly tailored to your security posture.",
    features: [
      "Unlimited Custom Nodes",
      "On-Premise LLM Deployment",
      "Active Redteam Recon Agents",
      "24/7 SL3 Support SLA"
    ],
    buttonText: "Schedule Architecture Review",
    highlighted: false, // Right button gets the border-only contrast styling
  }
];

export function PricingCards() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-32 border-t border-[rgba(255,255,255,0.05)] z-10">
      
      {/* Background glow behind the cards */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="h-[400px] w-[800px] rounded-full bg-gradient-radial from-[rgba(142,255,166,0.05)] to-transparent blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-5xl">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 border-b-2 border-[#8effa6] pb-2"
          >
            <span className="font-mono text-xs tracking-widest text-[#888888]">
              [ 05 : DEPLOYMENT SCALES ]
            </span>
          </motion.div>
          <h2 className="font-hero text-3xl uppercase text-white tracking-widest md:text-4xl">
            System Tiers
          </h2>
          <p className="max-w-2xl font-body text-neutral-400">
            We don&apos;t do typical SaaS subscriptions. We build sovereign, governed AI infrastructures tailored to strict operational requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] p-8 transition-colors hover:border-[rgba(255,255,255,0.2)] md:p-10"
            >
              {/* Subtle Scanline Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-10" />
              
              <div className="relative z-10 mb-8">
                <h3 className="mb-2 font-mono text-xs tracking-widest text-[#ff8c42]">
                  [ {tier.name} ]
                </h3>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="font-hero text-4xl text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-neutral-500 font-mono text-sm">/ deployment</span>}
                </div>
                <p className="font-body text-sm text-neutral-400 leading-relaxed min-h-[60px]">
                  {tier.description}
                </p>
              </div>

              <div className="relative z-10 mb-10 flex-grow">
                <ul className="flex flex-col gap-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-[#8effa6] shrink-0" />
                      <span className="font-body text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 w-full">
                {tier.highlighted ? (
                   // Left Button: Gradient (Mint reflective reward style)
                   <ReflectiveButton className="w-full justify-center border-[#8effa6]/30 bg-[#111111]">
                     {tier.buttonText}
                   </ReflectiveButton>
                ) : (
                   // Right Button: Contrast border-only
                   <button
                     className="group relative flex w-full items-center justify-center overflow-hidden rounded-md border border-[rgba(255,255,255,0.1)] bg-transparent px-8 py-3 font-hero text-sm uppercase tracking-widest text-white transition-all duration-300 hover:border-[rgba(142,255,166,0.5)] hover:bg-[rgba(142,255,166,0.02)] hover:text-[#8effa6]"
                   >
                     {tier.buttonText}
                   </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
