import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeamoodExperience() {
  const experiences = [
    {
      step: "01",
      title: "Sensory Tea Bar",
      tagline: "Live Brewing & Aroma Cloches",
      description: "Experience whole leaf teas steeped at precision temperatures. Smell unreleased micro-harvests under handcrafted glass cloches before choosing your brew.",
      badge: "In-Cafe Ritual",
      badgeBg: "#CFE9C5",
      badgeColor: "#1D3D2C",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80"
    },
    {
      step: "02",
      title: "Single-Estate Purity",
      tagline: "Assam & Himalayan Foothills",
      description: "We bypass middlemen to harvest directly from biodynamic family estates. Every leaf is hand-plucked at sunrise for maximum antioxidant density and sweet aromatics.",
      badge: "Direct Sourced",
      badgeBg: "#F5D36F",
      badgeColor: "#1D3D2C",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80"
    },
    {
      step: "03",
      title: "Mindful Space Design",
      tagline: "Crafted for Real Connection",
      description: "Our cafes are engineered with calming natural light, soothing acoustic playlists, and tactile clay ceramics to inspire soulful conversations and creative flow.",
      badge: "Aesthetic Living",
      badgeBg: "#FFDCCB",
      badgeColor: "#1D3D2C",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative overflow-hidden border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>THE TEAMOOD WAY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
              An elevated tea ritual made for modern moods.
            </h2>
          </div>
          <p className="text-[#1D3D2C]/70 text-sm sm:text-base max-w-md font-medium">
            Forget ordinary hurried sips. Teamood reimagines centuries of tea heritage through design, botanical purity, and unforgettable hospitality.
          </p>
        </div>

        {/* 3 Interactive Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group rounded-3xl overflow-hidden bg-white border border-[#1D3D2C]/10 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo top */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-sm"
                  style={{ backgroundColor: exp.badgeBg, color: exp.badgeColor }}
                >
                  {exp.badge}
                </span>

                <span className="absolute bottom-4 right-4 text-3xl font-mono font-black text-white/90">
                  {exp.step}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#83B579] uppercase tracking-wider block mb-1">
                    {exp.tagline}
                  </span>
                  <h3 className="text-2xl font-display font-black text-[#1D3D2C] mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[#1D3D2C]/80 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1D3D2C]/10 flex items-center justify-between text-xs font-bold text-[#1D3D2C] group-hover:text-[#83B579] transition-colors">
                  <span>Learn Our Process</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
