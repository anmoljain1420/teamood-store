import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Check,
  X,
  Plus,
  Minus,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput.trim());
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <>
      <section className="relative isolate overflow-hidden bg-[#292316] py-10 text-white sm:py-14"><div className="absolute inset-0 -z-10"><img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" alt="" className="h-full w-full object-cover opacity-25"/><div className="absolute inset-0 bg-[#292316]/75"/></div><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">Teamood · Kota</p><h1 className="mt-3 text-4xl font-black uppercase tracking-[-.06em] sm:text-5xl">Your chai bag</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/70">Your selected favourites, ready for the next step.</p></div></section>
      <div className="bg-[#FFFDF6] text-[#292316] min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#292316]/10 text-center max-w-md shadow-soft space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F3D77A] text-[#292316] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-[#292316]" />
          </div>
          <h2 className="text-2xl font-display font-black text-[#292316]">
            Your Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#292316]/70">
            Looks like you haven't added any artisan tea blends or merchandise yet.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-xs hover:bg-[#173425] transition shadow-soft"
            >
              <span>Explore Tea Blends</span>
              <ArrowRight className="w-4 h-4 text-[#D9A514]" />
            </Link>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-16">
      <section className="relative isolate overflow-hidden bg-[#292316] py-10 text-white sm:py-14"><div className="absolute inset-0 -z-10"><img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" alt="" className="h-full w-full object-cover opacity-25"/><div className="absolute inset-0 bg-[#292316]/75"/></div><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">Teamood · Kota</p><h1 className="mt-3 text-4xl font-black uppercase tracking-[-.06em] sm:text-5xl">Your chai bag</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/70">Your selected favourites, ready for the next step.</p></div></section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#292316]/10">
          <div>
            <span className="text-xs font-mono font-bold text-[#A87908] uppercase tracking-wider block">
              Shopping Cart
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-[#292316]">
              Your Tea Bag ({cart.reduce((a, b) => a + b.quantity, 0)} Items)
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-mono text-[#292316]/60 hover:text-red-600 transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-[#292316]/10 shadow-soft">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
            <span>
              {cartSubtotal >= freeShippingThreshold
                ? '🎉 Congratulations! You have unlocked Free Nationwide Shipping.'
                : `Add ₹${freeShippingThreshold - cartSubtotal} more for Free Nationwide Shipping!`}
            </span>
            <span>{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#FFFDF6] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#A87908] transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-5 rounded-3xl bg-white border border-[#292316]/10 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#FFFDF6] shrink-0 border border-[#292316]/5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#A87908] block">
                      {item.product.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#292316]">
                      {item.product.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#292316]">
                      ₹{item.product.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#292316]/15 rounded-xl bg-[#FFFDF6] px-2.5 py-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:text-[#A87908]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-mono font-bold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:text-[#A87908]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-mono font-black text-base text-[#292316] w-20 text-right">
                    ₹{item.product.price * item.quantity}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 rounded-xl text-[#292316]/40 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#292316] hover:text-[#A87908] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-medium space-y-6">
            <h2 className="font-display font-black text-xl text-[#292316]">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F3D77A]/40 border border-[#A87908] text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#292316] font-bold">
                    <Tag className="w-3.5 h-3.5 text-[#292316]" />
                    <span>{appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#292316]/60 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Promo Code (TEAMOOD15)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#FFFDF6] border border-[#292316]/15 text-xs font-mono focus:outline-none focus:border-[#292316]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#292316] text-[#FFFDF6] font-mono font-bold text-xs hover:bg-[#173425] transition"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-3 py-4 border-y border-[#292316]/10 text-xs font-mono">
              <div className="flex justify-between text-[#292316]/70">
                <span>Subtotal</span>
                <span className="font-bold text-[#292316]">₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#A87908] font-bold">
                  <span>Discount</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-[#292316]/70">
                <span>GST (5% Composite)</span>
                <span className="font-bold text-[#292316]">₹{cartTax}</span>
              </div>

              <div className="flex justify-between text-[#292316]/70">
                <span>Nationwide Shipping</span>
                <span className="font-bold text-[#292316]">
                  {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#292316]/10 flex justify-between text-base font-bold text-[#292316]">
                <span>Total Amount</span>
                <span className="text-xl font-black">₹{cartGrandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-sm hover:bg-[#173425] transition shadow-soft flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D9A514]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
