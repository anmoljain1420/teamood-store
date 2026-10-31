import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartGrandTotal,
    placeOnlineOrder,
    showToast
  } = useApp();

  const [form, setForm] = useState({
    name: 'Rohit Verma',
    email: 'rohit.verma@example.com',
    phone: '+91 98290 12345',
    address: 'Flat 402, Coral Heights, Vigyan Nagar',
    city: 'Kota',
    state: 'Rajasthan',
    pincode: '324005'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFFDF6] text-[#292316] min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="p-8 rounded-3xl bg-white border border-[#292316]/10 text-center max-w-md shadow-soft space-y-4">
          <h2 className="text-2xl font-display font-black text-[#292316]">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-[#292316]/70">
            Please add tea blends to your bag before checking out.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-2xl bg-[#292316] text-[#FFFDF6] font-bold text-xs"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOnlineOrder({
        customer: form,
        paymentMethod: paymentMethod
      });

      setIsProcessing(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      navigate('/order-success', { state: { order } });
    }, 1200);
  };

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-16">
      <section className="relative isolate overflow-hidden bg-[#292316] py-10 text-white sm:py-14"><div className="absolute inset-0 -z-10"><img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" alt="" className="h-full w-full object-cover opacity-25"/><div className="absolute inset-0 bg-[#292316]/75"/></div><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">Teamood · Kota</p><h1 className="mt-3 text-4xl font-black uppercase tracking-[-.06em] sm:text-5xl">Almost time for chai</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/70">A few details and your Teamood favourites will be on their way.</p></div></section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold text-[#A87908] uppercase tracking-wider block">
            Express Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-[#292316]">
            Shipping & Payment
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Shipping Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Shipping Information Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-soft space-y-5">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#A87908]" />
                <h2 className="font-display font-black text-lg text-[#292316]">
                  1. Shipping Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-soft space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#A87908]" />
                <h2 className="font-display font-black text-lg text-[#292316]">
                  2. Select Payment Mode
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    paymentMethod === 'UPI'
                      ? 'bg-[#292316] text-[#FFFDF6] border-[#292316] shadow-soft'
                      : 'bg-[#FFFDF6] text-[#292316] border-[#292316]/10 hover:border-[#292316]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <QrCode className="w-5 h-5" />
                    <span className="text-[10px] font-mono font-bold uppercase">Instant</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs block">UPI / GPay / PhonePe</span>
                    <span className="text-[10px] opacity-70">Zero transaction fees</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    paymentMethod === 'Card'
                      ? 'bg-[#292316] text-[#FFFDF6] border-[#292316] shadow-soft'
                      : 'bg-[#FFFDF6] text-[#292316] border-[#292316]/10 hover:border-[#292316]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px] font-mono font-bold uppercase">Cards</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Credit / Debit Card</span>
                    <span className="text-[10px] opacity-70">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                    paymentMethod === 'COD'
                      ? 'bg-[#292316] text-[#FFFDF6] border-[#292316] shadow-soft'
                      : 'bg-[#FFFDF6] text-[#292316] border-[#292316]/10 hover:border-[#292316]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Truck className="w-5 h-5" />
                    <span className="text-[10px] font-mono font-bold uppercase">Cash</span>
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Pay on Delivery</span>
                    <span className="text-[10px] opacity-70">Available in select cities</span>
                  </div>
                </button>
              </div>

              {/* UPI QR Simulation Preview */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-2xl bg-[#F3D77A]/30 border border-[#A87908]/40 flex items-center gap-4 text-xs">
                  <div className="w-16 h-16 bg-white rounded-xl p-1.5 flex items-center justify-center border border-[#292316]/10 shrink-0">
                    <QrCode className="w-12 h-12 text-[#292316]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#292316] block">
                      Scan with any UPI app on the next step
                    </span>
                    <span className="text-[#292316]/70">
                      Supports Google Pay, PhonePe, Paytm, and BHIM UPI.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-medium space-y-6">
            <h2 className="font-display font-black text-xl text-[#292316]">
              Order Review
            </h2>

            {/* Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FFFDF6] border border-[#292316]/10 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-[#292316] block">{item.product.name}</span>
                      <span className="text-[10px] text-[#292316]/60 font-mono">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-[#292316]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 py-4 border-y border-[#292316]/10 text-xs font-mono">
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
                <span>GST (5%)</span>
                <span className="font-bold text-[#292316]">₹{cartTax}</span>
              </div>
              <div className="flex justify-between text-[#292316]/70">
                <span>Shipping</span>
                <span className="font-bold text-[#292316]">
                  {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#292316]/10 flex justify-between text-base font-bold text-[#292316]">
                <span>Grand Total</span>
                <span className="text-2xl font-black">₹{cartGrandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-sm hover:bg-[#173425] transition shadow-soft flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D9A514]" />
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#D9A514]" />
                  <span>Complete Order (₹{cartGrandTotal})</span>
                </>
              )}
            </button>

            <div className="text-[11px] font-mono text-[#292316]/60 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A87908]" />
              <span>256-bit Bank-Grade SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
