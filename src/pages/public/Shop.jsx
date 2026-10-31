import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Star,
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Eye,
  Check,
  Package,
  X,
  Heart,
  Plus,
  Minus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PublicPageHero from '../../components/common/PublicPageHero';

export default function Shop() {
  const { products, addToCart, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(1500);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickQty, setQuickQty] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const shopCategories = [
    "All",
    "Chai Patti",
    "Tea Flavours",
    "Special Tea Blends",
    "Ready-to-drink Chai",
    "Gift Packs"
  ];

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(wId => wId !== id));
      showToast('Removed from your wishlist', 'info');
    } else {
      setWishlist([...wishlist, id]);
      showToast('Added to your wishlist!');
    }
  };

  // Filter & sort published products
  const filteredProducts = products
    .filter(p => p.published !== false)
    .filter(p => {
      if (selectedCategory === "All") return true;
      if (p.category === selectedCategory) return true;
      // Match category variations
      if (selectedCategory === "Chai Patti" && (p.category.includes("CTC") || p.category.includes("Chai Patti"))) return true;
      if (selectedCategory === "Tea Flavours" && (p.category.includes("Masala") || p.category.includes("Elaichi") || p.category.includes("Flavour"))) return true;
      if (selectedCategory === "Special Tea Blends" && (p.category.includes("Special") || p.category.includes("Kesar") || p.category.includes("Kahwa"))) return true;
      return p.category?.toLowerCase().includes(selectedCategory.toLowerCase());
    })
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    })
    .filter(p => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 5) - (a.rating || 5);
      return 0; // featured default
    });

  const handleQuickAdd = (product, qty = 1) => {
    addToCart(product, qty);
    if (quickViewProduct) setQuickViewProduct(null);
  };

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-24">
      {/* 1. SHOP HEADER & SEARCH */}
      <PublicPageHero eyebrow="Direct from the tea pantry" title="Bring the brew" accent="home." description="Discover signature tea blends, thoughtfully curated favourites and gifts made for tea lovers." image="https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=1200&q=85" imageAlt="Tea leaves and a freshly prepared cup" />
      <section className="relative py-16 sm:py-20 border-b border-[#292316]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-[#292316]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by blend name, spice or flavor notes..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#292316]/15 text-[#292316] placeholder-[#292316]/40 text-sm focus:outline-none focus:border-[#292316] transition shadow-soft"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#292316]/50 hover:text-[#292316]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#292316]/15 text-[#292316] text-sm focus:outline-none focus:border-[#292316] transition shadow-soft font-mono"
              >
                <option value="featured">Sort: Featured Blends</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

            <div className="md:col-span-3 flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#292316]/15 shadow-soft">
              <span className="text-xs font-mono font-bold whitespace-nowrap text-[#292316]">
                Max: ₹{maxPrice}
              </span>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#292316]"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {shopCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#292316] text-[#FFFDF6] shadow-soft scale-105'
                    : 'bg-white border border-[#292316]/10 text-[#292316]/80 hover:bg-[#FFFDF6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6 text-xs font-mono text-[#292316]/60">
          <span>Showing {filteredProducts.length} blends</span>
          <span>Free shipping across India on orders above ₹499</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#292316]/10 p-8 space-y-4">
            <Package className="w-12 h-12 text-[#292316]/30 mx-auto" />
            <h3 className="font-display font-bold text-xl text-[#292316]">
              No blends match your search
            </h3>
            <p className="text-xs text-[#292316]/70">
              Try adjusting your search terms, price filter, or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMaxPrice(1500);
              }}
              className="px-6 py-2.5 rounded-full bg-[#292316] text-[#FFFDF6] text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="rounded-3xl bg-white border border-[#292316]/10 overflow-hidden shadow-soft hover:shadow-medium transition-all group flex flex-col justify-between"
                >
                  {/* Photo & badges */}
                  <div className="relative h-64 overflow-hidden bg-[#FFFDF6] p-4 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-[#292316] text-[#FFFDF6] text-[10px] font-mono font-bold uppercase">
                      {p.category}
                    </span>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#292316] flex items-center justify-center hover:scale-110 transition shadow-soft"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E88FA6] text-[#E88FA6]' : 'text-[#292316]'}`} />
                    </button>

                    {/* Quick view button */}
                    <button
                      onClick={() => {
                        setQuickViewProduct(p);
                        setQuickQty(1);
                      }}
                      className="absolute bottom-6 left-6 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[#292316] text-xs font-mono font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition shadow-soft"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>

                    <span className="absolute bottom-6 right-6 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[#292316] text-xs font-mono font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#D9A514] text-[#D9A514]" />
                      <span>{p.rating || 4.9}</span>
                    </span>
                  </div>

                  {/* Info & Cart */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#292316] leading-snug">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#292316]/70 line-clamp-2 mt-1.5 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#A87908] font-bold">
                          Wt: {p.weight || "250g"}
                        </span>
                        <span className="text-[#292316]/50">
                          {p.stock > 0 ? `${p.stock} in stock` : 'Made to order'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#292316]/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#292316]/50 block font-mono">Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-display font-black text-[#292316]">
                            ₹{p.price}
                          </span>
                          {p.discountPrice && p.discountPrice < p.price && (
                            <span className="text-xs text-[#292316]/40 line-through font-mono">
                              ₹{p.discountPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(p, 1)}
                        className="px-4 py-2.5 rounded-2xl bg-[#292316] text-[#FFFDF6] hover:bg-[#A87908] transition font-bold text-xs flex items-center gap-1.5 shadow-soft"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#292316]/20 shadow-elevated relative animate-scaleUp">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#FFFDF6] text-[#292316] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFFDF6]">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-[#F3D77A] text-[#292316] text-xs font-mono font-bold">
                  {quickViewProduct.category}
                </span>

                <h3 className="text-2xl font-display font-black text-[#292316]">
                  {quickViewProduct.name}
                </h3>

                <p className="text-xs text-[#292316]/80 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="space-y-1 text-xs font-mono text-[#292316]/70">
                  <div>✦ Ingredients: {quickViewProduct.ingredients || "100% Single-Estate Blend"}</div>
                  <div>✦ Brewing: {quickViewProduct.brewingTime || "Steep 3-4 mins at 90°C"}</div>
                  <div>✦ Net Weight: {quickViewProduct.weight || "250g"}</div>
                </div>

                <div className="text-2xl font-display font-black text-[#292316]">
                  ₹{quickViewProduct.price}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#292316]/20 rounded-2xl bg-[#FFFDF6] px-3 py-1.5">
                    <button
                      onClick={() => setQuickQty(Math.max(1, quickQty - 1))}
                      className="p-1 hover:text-[#A87908]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono font-bold text-sm">{quickQty}</span>
                    <button
                      onClick={() => setQuickQty(quickQty + 1)}
                      className="p-1 hover:text-[#A87908]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(quickViewProduct, quickQty)}
                    className="flex-1 py-3 rounded-2xl bg-[#292316] text-[#FFFDF6] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#A87908] transition"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quickQty} to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
