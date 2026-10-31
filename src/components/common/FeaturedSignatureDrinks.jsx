import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Sparkles, Plus, Check, ShoppingBag, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FeaturedSignatureDrinks() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useApp();

  const categories = ["All", "Hot Royal Chai", "Iced Botanicals", "Health & Detox"];

  const drinks = [
    {
      id: "drink-1",
      name: "Kota Shahi Masala Chai",
      category: "Hot Royal Chai",
      price: 49,
      spiceLevel: "Kadak",
      mood: "Invigorating",
      bgTag: "#F5D36F",
      desc: "Slow-simmered whole milk, crushed ginger, green cardamom and secret Rajasthan royal masala blend.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "drink-2",
      name: "Pure Green Elaichi Chai",
      category: "Hot Royal Chai",
      price: 55,
      spiceLevel: "Aromatic",
      mood: "Comforting",
      bgTag: "#CFE9C5",
      desc: "High-grade 8mm fragrant cardamom pods from Idukki steeped with rich malty Assam CTC.",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "drink-3",
      name: "Kashmiri Mongra Kahwa",
      category: "Health & Detox",
      price: 89,
      spiceLevel: "Gentle",
      mood: "Serenity",
      bgTag: "#D6ECC6",
      desc: "Authentic Pampore saffron, slivered blanched almonds, cinnamon, and whole green tea leaves.",
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "drink-4",
      name: "Sparkling Lemon Iced Tea",
      category: "Iced Botanicals",
      price: 79,
      spiceLevel: "Zesty",
      mood: "Joyful",
      bgTag: "#FFE37D",
      desc: "Cold brewed Nilgiri black tea, hand-squeezed sunburst lemons, raw forest honey, and mint.",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "drink-5",
      name: "Hibiscus Wild Berry Chill",
      category: "Iced Botanicals",
      price: 85,
      spiceLevel: "Tart & Sweet",
      mood: "Refreshing",
      bgTag: "#FFDCCB",
      desc: "Egyptian sun-dried hibiscus petals with macerated blackberries and crushed ice.",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "drink-6",
      name: "Chocolate Kulhad Chai",
      category: "Hot Royal Chai",
      price: 65,
      spiceLevel: "Velvety",
      mood: "Decadent",
      bgTag: "#F3B8C8",
      desc: "Steamed chai served in smoky terracotta cups infused with 70% dark single-origin cacao.",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const filteredDrinks = activeCategory === "All"
    ? drinks
    : drinks.filter(d => d.category === activeCategory);

  const handleAdd = (drink) => {
    addToCart({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      image: drink.image,
      category: drink.category
    }, 1);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-xs font-mono font-bold mb-3">
              <Coffee className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>CAFE BAR MENU</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              Featured Signature Drinks
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                    : 'bg-white border border-[#1D3D2C]/10 text-[#1D3D2C]/80 hover:bg-[#FAFAF2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDrinks.map((drink, idx) => (
            <motion.div
              key={drink.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="rounded-3xl bg-white border border-[#1D3D2C]/10 overflow-hidden shadow-soft hover:shadow-medium transition-all group flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#1D3D2C]"
                  style={{ backgroundColor: drink.bgTag }}
                >
                  {drink.spiceLevel}
                </span>
                <span className="absolute bottom-3 right-4 text-white text-xs font-mono font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  Mood: {drink.mood}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-display font-bold text-xl text-[#1D3D2C]">
                      {drink.name}
                    </h3>
                    <span className="font-mono text-xl font-black text-[#1D3D2C]">
                      ₹{drink.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#1D3D2C]/75 leading-relaxed">
                    {drink.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleAdd(drink)}
                  className="w-full py-3 rounded-2xl bg-[#FAFAF2] border border-[#1D3D2C]/15 hover:bg-[#1D3D2C] hover:text-[#FAFAF2] text-[#1D3D2C] font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order at Counter (POS / Delivery)</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
