import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function BestsellingProducts() {
  const { products, addToCart } = useApp();

  // Show top 4 bestsellers
  const bestsellers = products.slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5D36F] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-[#1D3D2C] text-[#1D3D2C]" />
              <span>RETAIL PANTRY & GIFTING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              Best-Selling Tea Blends
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1D3D2C] hover:text-[#83B579] transition group"
          >
            <span>Explore All Blends in Shop</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-white border border-[#1D3D2C]/10 overflow-hidden shadow-soft hover:shadow-medium transition-all group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-[#FAFAF2] p-4 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#1D3D2C] text-[#FAFAF2] text-[10px] font-mono font-bold uppercase">
                  {item.category}
                </span>
                <span className="absolute bottom-6 right-6 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[#1D3D2C] text-xs font-mono font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-[#F5D36F] text-[#F5D36F]" />
                  <span>{item.rating || 4.9}</span>
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#1D3D2C] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#1D3D2C]/70 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-mono font-semibold text-[#83B579]">
                    Net Wt: {item.weight || "250g"}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#1D3D2C]/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#1D3D2C]/50 block font-mono">Price</span>
                    <span className="text-xl font-display font-black text-[#1D3D2C]">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="p-3 rounded-2xl bg-[#1D3D2C] text-[#FAFAF2] hover:bg-[#83B579] transition transform active:scale-90 shadow-soft"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
