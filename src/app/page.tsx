import { Hero } from "@/components/hero/Hero";
import { LivePayloadDemo } from "@/components/workflow/LivePayloadDemo";
import { ArchitectureScroll } from "@/components/architecture/ArchitectureScroll";
import { ServiceCards } from "@/components/products/ServiceCards";
import { PricingCards } from "@/components/pricing/PricingCards";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center text-white relative">
      {/* 
        The Cold Open — SYSTEMS + dormant chip
        First scroll triggers "with a SINE of LIFE" and activates the node
      */}
      <Hero />

      {/* 
        Phase 2: The Tactical Shell & Juice
        Payload Demo and Architecture — kept for depth below the hero
      */}
      <LivePayloadDemo />
      <ArchitectureScroll />

      {/* 
        Phase 3: Cosine Products & Services
        Core offerings structured around Governance and Architectures
      */}
      <ServiceCards />
      
      {/* 
        Phase 5: Deployment Scales Pricing 
      */}
      <PricingCards />

      {/* 
        Phase 4: The Gallery (Isolated Workspaces)
        Client projects displayed as distinct, accessible nodes
      */}
      <ProjectGallery />

      {/* Global Footer Overlay */}
      <footer className="w-full border-t border-[rgba(255,255,255,0.05)] py-8 px-4 text-center mt-32 backdrop-blur-sm bg-[rgba(5,5,5,0.3)]">
        <p className="font-mono text-xs tracking-widest text-[#888888]">
          [ END OF SYSTEM SEQUENCE ]
        </p>
        <p className="font-mono text-[10px] tracking-widest text-neutral-600 mt-2">
          © 2026 COSINE AUTONOMOUS. GOVERNED. ALIVE.
        </p>
      </footer>
    </main>
  );
}
