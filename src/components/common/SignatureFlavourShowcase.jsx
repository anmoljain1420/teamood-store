import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Clock,
  Thermometer,
  Zap,
  CheckCircle2,
  Heart,
  Flame,
  Info
} from 'lucide-react';
import { SIGNATURE_FLAVOURS } from '../../data/flavoursData';
import ShowcaseCup3D from '../three/ShowcaseCup3D';
import { useApp } from '../../context/AppContext';

export default function SignatureFlavourShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, showToast } = useApp();

  const current = SIGNATURE_FLAVOURS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SIGNATURE_FLAVOURS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SIGNATURE_FLAVOURS.length) % SIGNATURE_FLAVOURS.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAdd = () => {
    const productMock = {
      id: current.id,
      name: current.name,
      price: current.price,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      category: current.category,
      weight: current.netWeight
    };
    addToCart(productMock, 1);
  };

  return (
    <section
      id="flavour-showcase"
      className="relative min-h-screen py-16 lg:py-24 overflow-hidden transition-colors duration-700 select-none"
      style={{
        backgroundColor: '#FAFAF2',
      }}
    >
      {/* ================= DYNAMIC DIAGONAL SPLIT BACKGROUND ================= */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${current.themeColor} 0%, ${current.themeColor} 46%, #FAFAF2 46.1%, #FAFAF2 100%)`,
          opacity: 0.85
        }}
      />

      {/* Decorative background watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display font-black text-[12vw] text-forest/5 whitespace-nowrap pointer-events-none select-none tracking-tight">
        {current.name.toUpperCase()}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col justify-between min-h-[820px]">
        {/* ================= TOP BADGE HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forest/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-forest animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest">
              Signature Interactive Flavour Universe
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1 rounded-full bg-forest text-ivory text-xs font-mono font-bold">
              {current.category}
            </span>
            <div className="font-mono text-xs font-bold text-forest">
              <span className="text-xl font-black">{current.number}</span> / 08
            </div>
          </div>
        </div>

        {/* ================= MAIN 3-COLUMN SHOWCASE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-auto">
          {/* ---------------- 1. LEFT COLUMN: Product Story & Highlights ---------------- */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-mono font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-forest" />
                    <span>Pure Single-Estate Craft</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-forest leading-tight tracking-tight">
                    {current.name}
                  </h2>
                  <p className="font-mono text-xs text-forest/70 mt-1 font-semibold">
                    {current.tagline}
                  </p>
                </div>

                <p className="text-forest/80 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>

                {/* Tasting Notes */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-forest/70 font-bold block">
                    Sensory Profile
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {current.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 border border-forest/10 text-forest shadow-sm"
                      >
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="p-4 rounded-2xl bg-white/70 border border-forest/10 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-forest font-bold block">
                    Product Highlights
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-forest/90">
                    {current.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-freshGreen shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center gap-4 pt-2">
                  <div>
                    <span className="text-[11px] font-mono text-forest/60 block">Price / Tin</span>
                    <span className="text-2xl sm:text-3xl font-black text-forest">₹{current.price}</span>
                  </div>
                  <button
                    onClick={handleQuickAdd}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-forest text-ivory font-bold text-sm hover:bg-forest/90 transition transform active:scale-95 shadow-medium group"
                  >
                    <ShoppingBag className="w-4 h-4 text-lemon group-hover:scale-110 transition" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---------------- 2. CENTER COLUMN: Large 3D Product Cup ---------------- */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center relative">
            {/* Interactive 3D Canvas */}
            <ShowcaseCup3D activeFlavour={current} />

            <div className="mt-2 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/5 text-forest/80 text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-freshGreen animate-ping" />
                <span>Drag to inspect 360° • Live 3D Material</span>
              </span>
            </div>
          </div>

          {/* ---------------- 3. RIGHT COLUMN: Botanical Ingredients & Specs ---------------- */}
          <div className="lg:col-span-3 order-3 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Floating Ingredient Illustrations & Icons */}
                <div className="p-5 rounded-3xl bg-white/80 border border-forest/10 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest">
                      Pure Ingredients
                    </span>
                    <Sparkles className="w-4 h-4 text-forest/60" />
                  </div>

                  <div className="space-y-3">
                    {current.ingredients.map((ing, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-forest">
                          <span>{ing.name}</span>
                          <span className="font-mono text-forest/70">{ing.percent}</span>
                        </div>
                        {/* Visual progress meter */}
                        <div className="h-1.5 rounded-full bg-forest/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: ing.percent,
                              backgroundColor: current.accentColor
                            }}
                          />
                        </div>
                        <span className="text-[10px] text-forest/60 block">{ing.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botanical tags */}
                  <div className="pt-2 border-t border-forest/10 flex items-center justify-around">
                    {current.botanicals.map((b, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 text-center">
                        <span className="text-xl sm:text-2xl">{b.icon}</span>
                        <span className="text-[10px] font-semibold text-forest/80">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brewing & Weight Specifications */}
                <div className="p-4 rounded-3xl bg-white/70 border border-forest/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span className="text-forest/60 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-forest" />
                      <span>Brew Temp</span>
                    </span>
                    <span className="font-mono font-bold text-forest">{current.temperature}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span className="text-forest/60 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-forest" />
                      <span>Steep Time</span>
                    </span>
                    <span className="font-mono font-bold text-forest">{current.brewTime}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-forest/5">
                    <span className="text-forest/60 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-forest" />
                      <span>Caffeine</span>
                    </span>
                    <span className="font-mono font-bold text-forest">{current.caffeineLevel}</span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-forest/60">Net Weight</span>
                    <span className="font-mono font-bold text-forest">{current.netWeight}</span>
                  </div>
                </div>

                {/* Mood Meter Card */}
                <div
                  className="p-4 rounded-2xl border text-xs flex items-center gap-3 transition-colors"
                  style={{
                    backgroundColor: current.lightColor,
                    borderColor: current.accentColor
                  }}
                >
                  <Flame className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-forest/70 block">
                      Target Mood State
                    </span>
                    <span className="font-bold text-forest block">{current.mood}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= BOTTOM: SELECTABLE FLAVOUR THUMBNAILS & NAVIGATION ================= */}
        <div className="mt-8 pt-6 border-t border-forest/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Prev / Next controls with product count */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Tea Flavour"
              className="w-12 h-12 rounded-full border border-forest/20 bg-white/80 hover:bg-forest hover:text-ivory text-forest flex items-center justify-center transition shadow-soft group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition" />
            </button>

            <div className="font-mono text-center">
              <span className="text-xl font-black text-forest">{current.number}</span>
              <span className="text-forest/40 text-xs"> / 08</span>
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Tea Flavour"
              className="w-12 h-12 rounded-full border border-forest/20 bg-white/80 hover:bg-forest hover:text-ivory text-forest flex items-center justify-center transition shadow-soft group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Horizontal row of 8 selectable tea flavours */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 scrollbar-none px-2">
            {SIGNATURE_FLAVOURS.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all whitespace-nowrap text-left border ${
                    isActive
                      ? 'bg-forest text-ivory border-forest shadow-medium scale-105'
                      : 'bg-white/80 text-forest/80 border-forest/10 hover:border-forest/30 hover:bg-white'
                  }`}
                >
                  {/* Flavour color disc */}
                  <span
                    className="w-4 h-4 rounded-full border border-forest/20 shrink-0"
                    style={{ backgroundColor: item.themeColor }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold leading-tight">{item.name}</span>
                    <span className={`text-[10px] font-mono leading-tight ${isActive ? 'text-lemon' : 'text-forest/60'}`}>
                      {item.number}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
