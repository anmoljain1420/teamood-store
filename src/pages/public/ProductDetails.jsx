import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Layers,
  Heart,
  Plus,
  Minus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("250g");

  const product = products.find(p => p.slug === slug) || products[0];
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const weights = ["100g Pouch", "250g Tin Canister", "500g Value Pack", "1kg Bulk Pack"];

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#292316]/70 hover:text-[#292316] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Blends</span>
        </Link>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Photo & Badges */}
          <div className="lg:col-span-6 space-y-4 lg:order-2">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#292316]/10 aspect-square shadow-soft p-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Product Details */}
          <div className="lg:col-span-6 space-y-6 lg:order-1">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#F3D77A] text-[#292316] text-xs font-mono font-bold inline-block mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-black text-[#292316] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-[#D9A514]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D9A514]" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-[#292316]">
                  {product.rating || 4.9} ({product.reviewsCount || 142} Reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 py-2 border-y border-[#292316]/10">
              <span className="text-3xl sm:text-4xl font-display font-black text-[#292316]">
                ₹{product.price}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-[#292316]/40 line-through font-mono">
                  ₹{product.discountPrice}
                </span>
              )}
              <span className="text-xs font-mono font-bold text-[#A87908]">
                Tax Included • Free shipping above ₹499
              </span>
            </div>

            <p className="text-sm text-[#292316]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Weight selector */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#292316]/70 block">
                Select Package Size
              </span>
              <div className="flex flex-wrap gap-2">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition border ${
                      selectedWeight === w
                        ? 'bg-[#292316] text-[#FFFDF6] border-[#292316]'
                        : 'bg-white text-[#292316] border-[#292316]/15 hover:bg-[#FFFDF6]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[#292316]/20 rounded-2xl bg-white px-3 py-2 shadow-soft">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#A87908]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#A87908]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-4 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-sm hover:bg-[#173425] transition shadow-soft flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#D9A514]" />
                <span>Add to Bag (₹{product.price * quantity})</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-4 rounded-2xl bg-[#D9A514] text-[#292316] font-display font-bold text-sm hover:bg-white transition shadow-soft"
              >
                Buy Now
              </button>
            </div>

            {/* Highlights bullet cards */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#292316]/10 text-xs text-[#292316]/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#A87908]" />
                <span>Fast Dispatch in 24 Hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A87908]" />
                <span>Aroma-Lock Canister Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#292316]/10">
            <h2 className="text-2xl font-display font-black text-[#292316] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/shop/${rel.slug}`}
                  className="p-4 rounded-3xl bg-white border border-[#292316]/10 shadow-soft hover:shadow-medium transition flex items-center gap-4 group"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFFDF6] shrink-0">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[#292316] group-hover:text-[#A87908] transition">
                      {rel.name}
                    </h3>
                    <span className="font-mono font-bold text-xs text-[#292316] block mt-1">
                      ₹{rel.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
