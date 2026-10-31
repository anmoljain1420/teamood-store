import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GuestTestimonials() {
  const { testimonials } = useApp();
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((curr) => (curr - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIndex((curr) => (curr + 1) % testimonials.length);
  };

  const current = testimonials[index] || testimonials[0];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>LOVED BY TEA CONNOISSEURS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              Stories from our Regulars
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-full border border-[#1D3D2C]/20 bg-white hover:bg-[#1D3D2C] hover:text-[#FAFAF2] text-[#1D3D2C] flex items-center justify-center transition shadow-soft"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-full border border-[#1D3D2C]/20 bg-white hover:bg-[#1D3D2C] hover:text-[#FAFAF2] text-[#1D3D2C] flex items-center justify-center transition shadow-soft"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-14 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-medium relative"
            >
              <Quote className="w-16 h-16 text-[#CFE9C5] absolute top-6 right-8 -z-0 opacity-80" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-1.5 text-[#F5D36F]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#F5D36F]" />
                  ))}
                </div>

                <p className="text-xl sm:text-2xl font-editorial italic text-[#1D3D2C] leading-relaxed">
                  "{current?.comment}"
                </p>

                <div className="pt-4 border-t border-[#1D3D2C]/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#1D3D2C]">
                      {current?.author}
                    </h3>
                    <p className="text-xs font-mono text-[#83B579]">
                      {current?.role} • {current?.location}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[#1D3D2C]/40">
                    {current?.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
