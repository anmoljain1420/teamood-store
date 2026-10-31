import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, RefreshCw, Feather, Users, Award } from 'lucide-react';

export default function WhyChooseTeamood() {
  const cards = [
    {
      title: "Patented Aroma-Lock Seal",
      subtitle: "Freshness Guaranteed",
      desc: "Our double-lip nitrogen flushed canisters preserve delicate volatile essential oils for up to 18 months without rancidity.",
      tag: "Technology",
      tagBg: "#CFE9C5",
      colSpan: "lg:col-span-7",
      metric: "99.4%",
      metricLabel: "Aroma Retention"
    },
    {
      title: "Direct Micro-Lot Harvests",
      subtitle: "Assam & Darjeeling",
      desc: "Small-batch estates harvested at 6,000+ ft elevation under morning dew.",
      tag: "Ethical",
      tagBg: "#F5D36F",
      colSpan: "lg:col-span-5",
      metric: "48 hrs",
      metricLabel: "Pluck-to-Pack"
    },
    {
      title: "Master Sommelier Blends",
      subtitle: "Balanced Ayurvedic Science",
      desc: "Each recipe is harmonized by 3rd-generation tea tasters with clinical Ayurvedic advisors.",
      tag: "Science",
      tagBg: "#FFDCCB",
      colSpan: "lg:col-span-5",
      metric: "7 Spices",
      metricLabel: "Whole Potpourri"
    },
    {
      title: "100% Plant-Based Eco Packaging",
      subtitle: "Planet First Mission",
      desc: "Our takeaway cups, lids, and tea sachets decompose into nutrient-rich soil within 90 days. Zero plastic lining ever.",
      tag: "Sustainability",
      tagBg: "#F3B8C8",
      colSpan: "lg:col-span-7",
      metric: "0% Plastic",
      metricLabel: "In All Packaging"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
            <Award className="w-3.5 h-3.5 text-[#1D3D2C]" />
            <span>THE TEAMOOD DIFFERENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight leading-tight">
            Why tea enthusiasts around the world choose Teamood.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1D3D2C]/75">
            We hold our leaves, our cafes, and our people to the highest standard of beverage craft.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {cards.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`${c.colSpan} p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft hover:shadow-medium transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#1D3D2C]"
                    style={{ backgroundColor: c.tagBg }}
                  >
                    {c.tag}
                  </span>
                  <span className="text-xs font-mono text-[#1D3D2C]/60 font-semibold">
                    {c.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C] mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-[#1D3D2C]/80 leading-relaxed max-w-lg">
                  {c.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1D3D2C]/10 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-display font-black text-[#83B579]">
                  {c.metric}
                </span>
                <span className="text-xs font-mono text-[#1D3D2C]/70 font-semibold">
                  {c.metricLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
