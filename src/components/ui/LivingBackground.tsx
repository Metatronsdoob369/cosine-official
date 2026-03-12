"use client";

import React, { useEffect, useRef } from "react";

export function LivingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use full window real estate
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse tracking for the delayed spotlight
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMouseActive = true;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // A subtle, slow-moving grid/mesh coordinate system
    let time = 0;
    
    // Draw loop
    const render = () => {
      time += 0.002;

      // Smoothly interpolate the drawn spotlight position towards the target (the delay effect)
      // The lower the multiplier, the longer the lag. 0.015 gives a very lazy, "alive" feeling.
      if (isMouseActive) {
        mouseX += (targetX - mouseX) * 0.015;
        mouseY += (targetY - mouseY) * 0.015;
      }

      // Clear with dark base
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // We'll draw very faint, "breathing" grid points
      const spacing = 80;
      const xCount = Math.ceil(canvas.width / spacing) + 1;
      const yCount = Math.ceil(canvas.height / spacing) + 1;

      for (let x = 0; x < xCount; x++) {
        for (let y = 0; y < yCount; y++) {
          // Add some wave distortion based on time to make it feel alive
          const noiseX = Math.sin(time + y * 0.1) * 15;
          const noiseY = Math.cos(time + x * 0.1) * 15;
          
          const px = x * spacing + noiseX;
          const py = y * spacing + noiseY;

          // Only draw points that are somewhat close to a "breathing" center
          const distToCenter = Math.sqrt(
            Math.pow(px - canvas.width / 2, 2) + Math.pow(py - canvas.height / 2, 2)
          );
          
          // Max opacity near the center, fading to darkness at the edges
          const maxDist = Math.max(canvas.width, canvas.height) / 1.5;
          const opacity = Math.max(0, 1 - distToCenter / maxDist) * 0.4; // Increased visibility

          // Check distance to the lagging spotlight to light up points near it
          const distToMouse = Math.sqrt(
            Math.pow(px - mouseX, 2) + Math.pow(py - mouseY, 2)
          );
          const mouseGlow = isMouseActive ? Math.max(0, 1 - distToMouse / 300) * 0.6 : 0;
          const finalOpacity = Math.min(1, opacity + mouseGlow);

          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          // Very subtle mint tint to the grid
          ctx.fillStyle = `rgba(142, 255, 166, ${finalOpacity})`;
          ctx.fill();
        }
      }

      // Add the delayed spotlight gradient itself
      if (isMouseActive) {
        const spotlight = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 500);
        spotlight.addColorStop(0, "rgba(142, 255, 166, 0.08)"); // Soft mint glow
        spotlight.addColorStop(0.3, "rgba(142, 255, 166, 0.03)");
        spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add a slow sweeping gradient overlay to act as a "radar" or scanning effect
      const gradient = ctx.createLinearGradient(
        0, 
        Math.sin(time) * canvas.height, 
        0, 
        Math.cos(time) * canvas.height + canvas.height
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.4)");
      gradient.addColorStop(0.5, "rgba(50, 70, 60, 0.08)"); // Stronger mint hue
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(render);
    };

    const animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
