import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Sparkles, Shield, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrandPhilosophy() {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Whole Leaf Orthodox",
      desc: "Never tea dust or floor sweepings. We exclusively pack whole and broken orange pekoe leaves."
    },
    {
      icon: Sparkles,
      title: "Zero Artificial Syrups",
      desc: "True botanical infusion with cold-pressed oils, mountain ginger, organic saffron, and edible roses."
    },
    {
      icon: Heart,
      title: "Biodegradable & Earth-First",
      desc: "Our cups and takeaway packaging are molded from sugarcane bagasse and untreated terracotta clay."
    },
    {
      icon: Shield,
      title: "Direct Grower Equity",
      desc: "We pay a 25% premium above fair-market auctions directly to Assam & Nilgiri family planters."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative overflow-hidden border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Editorial Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D36F] text-[#1D3D2C] text-xs font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>CRAFT & PHILOSOPHY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black leading-tight tracking-tight">
              We don't just brew tea.
              <br />
              <span className="text-[#83B579]">We engineer better moods.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#1D3D2C]/80 leading-relaxed font-medium">
              Every morning in our cafes begins with the rhythmic crushing of freshly dried green cardamom and mountain ginger. We believe tea is the sacred pause in modern chaos — an invitation to breathe, taste, and smile.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1D3D2C]/10">
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C] block">100%</span>
                <span className="text-xs font-mono text-[#1D3D2C]/70">Natural Botanicals</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#83B579] block">28+</span>
                <span className="text-xs font-mono text-[#1D3D2C]/70">Lounge Outlets</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C] block">0%</span>
                <span className="text-xs font-mono text-[#1D3D2C]/70">Artificial Colours</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1D3D2C] text-[#FAFAF2] font-bold text-sm hover:bg-[#173425] transition shadow-soft"
              >
                <span>Read Our Full Founder Story</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Pillar Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft hover:shadow-medium transition-all duration-300 space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#CFE9C5] text-[#1D3D2C] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6 text-[#1D3D2C]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#1D3D2C]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#1D3D2C]/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
