import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShoppingBag, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import TwoRevolvingCupsHero3D from '../three/TwoRevolvingCupsHero3D';

export default function TwoCupsHeroSection() {
  const scrollToFlavours = () => {
    const el = document.getElementById('flavour-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF2] text-[#1D3D2C] pt-12 pb-16">
      {/* Subtle organic background glow patches */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#CFE9C5]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#F5D36F]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFDCCB]/20 blur-3xl pointer-events-none" />

      {/* Decorative Brand Watermark */}
      <div className="absolute top-20 font-display font-black text-[18vw] text-[#1D3D2C]/[0.025] select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap">
        TEAMOOD
      </div>

      {/* THREE.JS DUAL REVOLVING CUPS CANVAS */}
      <TwoRevolvingCupsHero3D />

      {/* CENTER OVERSIZED TYPOGRAPHY & CTA */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center pointer-events-auto flex flex-col items-center justify-center py-20 sm:py-0">
        {/* Top Playful Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#1D3D2C]/10 text-[#1D3D2C] text-xs font-mono font-bold shadow-soft mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#83B579]" />
          <span>EST. 2020 • KOTA & RAJASTHAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D3D2C]" />
          <span className="text-[#1D3D2C]/70">PREMIUM 3D TEA EXPERIENCE</span>
        </motion.div>

        {/* Center Oversized Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.08] text-[#1D3D2C]"
        >
          Find Your Tea.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D3D2C] via-[#477457] to-[#83B579]">
            Find Your Mood.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-base sm:text-xl text-[#1D3D2C]/80 max-w-xl mx-auto font-medium leading-relaxed"
        >
          Discover a world of flavours, little rituals and good moods.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={scrollToFlavours}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1D3D2C] text-[#FAFAF2] font-display font-bold text-sm sm:text-base hover:bg-[#173425] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-medium group"
          >
            <span>Explore Our Collection</span>
            <ArrowDown className="w-4 h-4 text-[#F5D36F] group-hover:translate-y-1 transition-transform" />
          </button>

          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/90 border border-[#1D3D2C]/15 text-[#1D3D2C] font-display font-bold text-sm sm:text-base hover:bg-white hover:border-[#1D3D2C]/30 transition shadow-soft backdrop-blur-md"
          >
            <ShoppingBag className="w-4 h-4 text-[#83B579]" />
            <span>Shop Retail Blends</span>
          </Link>
        </motion.div>

        {/* Subtle scroll cue indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="mt-14 hidden sm:flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition"
          onClick={scrollToFlavours}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#1D3D2C]/60">
            Scroll to Discover Flavours
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#1D3D2C]/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-[#1D3D2C] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
