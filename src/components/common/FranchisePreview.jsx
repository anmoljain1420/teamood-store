import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FranchisePreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF6] text-[#292316] relative border-t border-[#292316]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#292316] to-[#40310C] text-[#FFFDF6] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-elevated">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#A87908]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#D9A514]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF6]/15 border border-[#FFFDF6]/20 text-[#FFFDF6] text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D9A514]" />
                <span>PARTNER WITH TEAMOOD</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-black leading-tight tracking-tight text-white">
                Build your own high-yield tea destination.
              </h2>

              <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                Join India's most innovative beverage movement. With proven low capex models, centralized automated supply chains, and extensive brand marketing, we turn passion for tea into profitable entrepreneurship.
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-white/90 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A87908] shrink-0" />
                  <span>Comprehensive 4-week staff training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A87908] shrink-0" />
                  <span>Proprietary POS & Inventory OS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A87908] shrink-0" />
                  <span>360° Architectural store design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A87908] shrink-0" />
                  <span>Continuous marketing & PR support</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/franchise"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#D9A514] text-[#292316] font-display font-bold text-sm hover:bg-white transition transform hover:-translate-y-0.5 shadow-medium group"
                >
                  <span>Apply for Franchise</span>
                  <ArrowRight className="w-4 h-4 text-[#292316] group-hover:translate-x-1 transition-transform" />
                </Link>

                <span className="text-xs font-mono text-white/60 self-center">
                  ✦ Fast review in 48 business hours
                </span>
              </div>
            </div>

            {/* Right Financial Highlights Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#D9A514] block">
                  42%
                </span>
                <span className="text-xs font-mono font-bold text-white block">
                  Avg Annual ROI
                </span>
                <span className="text-[10px] text-white/60 block">
                  Based on mature outlets
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#F3D77A] block">
                  14 Mo
                </span>
                <span className="text-xs font-mono font-bold text-white block">
                  Payback Period
                </span>
                <span className="text-[10px] text-white/60 block">
                  Estimated breakeven
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md space-y-1">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#F7E9C2] block">
                  28+
                </span>
                <span className="text-xs font-mono font-bold text-white block">
                  Active Lounges
                </span>
                <span className="text-[10px] text-white/60 block">
                  Rajasthan & Beyond
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
