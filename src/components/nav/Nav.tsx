"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StatusBar, DecodeLink, InitializeButton } from "./NavElements";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[rgba(255,255,255,0.05)] bg-[rgba(5,5,5,0.8)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand / Logo Plaque */}
        <div className="flex items-center gap-4">
          <div className="group relative flex items-center justify-between rounded-sm border border-[rgba(255,255,255,0.04)] border-b-[rgba(0,0,0,0.8)] border-r-[rgba(0,0,0,0.8)] bg-gradient-to-b from-[#181818] to-[#0d0d0d] p-1.5 pr-4 shadow-[inset_0_1px_rgba(255,255,255,0.05),0_4px_6px_rgba(0,0,0,0.4)] cursor-pointer overflow-hidden w-52 h-12 transition-all duration-300 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            
            {/* The Easter Egg Scanline/Cosine Wave */}
            <div className="absolute top-0 bottom-0 left-[-150%] w-[100%] z-0 bg-gradient-to-r from-transparent via-[rgba(142,255,166,0.15)] to-transparent transition-all duration-[1200ms] ease-in-out group-hover:left-[150%]" />
            
            {/* Plaque Inner Housing */}
            <div className="relative z-10 flex h-full w-full items-center justify-center border-l border-[rgba(255,255,255,0.03)] bg-[#050505] shadow-inner">
              <div className="relative flex items-center justify-center transition-all duration-[800ms] group-hover:brightness-125">
                 <span className="font-hero text-xl tracking-widest text-white mt-0.5">
                   COSINE <span className="text-[#ff8c42] animate-pulse inline-block ml-1">+</span>
                 </span>
              </div>
            </div>

            {/* Tactical hardware details (screws/lights - functioning as a "slider" track) */}
            <div className="relative z-10 ml-3 flex h-full flex-col justify-between py-1 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
               <div className="h-1 w-1 bg-neutral-800 rounded-full shadow-inner" />
               <div className="h-4 w-1 rounded-sm bg-[#1a1a1a] border border-[rgba(0,0,0,0.8)] shadow-[inset_0_1px_rgba(255,255,255,0.1)] transition-colors duration-700 group-hover:bg-[#8effa6] group-hover:shadow-[0_0_8px_rgba(142,255,166,0.4)]" />
               <div className="h-1 w-1 bg-neutral-800 rounded-full shadow-inner" />
            </div>
          </div>

          <div className="hidden h-5 w-px bg-[rgba(255,255,255,0.1)] lg:block" />
          <StatusBar />
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 lg:flex">
          <DecodeLink href="#">ARCHITECTURE</DecodeLink>
          <DecodeLink href="#">SYSTEMS</DecodeLink>
          <DecodeLink href="#">NODES</DecodeLink>
          <DecodeLink href="/racing">SARN</DecodeLink>
          <div className="scale-[0.85] origin-right">
             <InitializeButton />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-[rgba(255,255,255,0.05)] bg-[#0a0a0a] lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <a href="#" className="font-mono text-sm tracking-widest text-neutral-400 hover:text-[#8effa6]">ARCHITECTURE</a>
              <a href="#" className="font-mono text-sm tracking-widest text-neutral-400 hover:text-[#8effa6]">SYSTEMS</a>
              <a href="#" className="font-mono text-sm tracking-widest text-neutral-400 hover:text-[#8effa6]">NODES</a>
              <a href="/racing" className="font-mono text-sm tracking-widest text-[#ff8c42] hover:text-[#ff8c42]/80">SARN</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
