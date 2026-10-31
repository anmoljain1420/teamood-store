import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Printer,
  Sparkles,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order || {
    id: `ORD-TMD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString(),
    customer: {
      name: "Rohit Verma",
      city: "Kota, Rajasthan"
    },
    items: [
      { product: { name: "Kota Shahi Masala Chai Blend", price: 340 }, quantity: 1 }
    ],
    totalAmount: 340,
    paymentMethod: "UPI"
  };

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-16">
      <section className="relative isolate overflow-hidden bg-[#292316] py-10 text-white sm:py-14"><div className="absolute inset-0 -z-10"><img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1800&q=85" alt="" className="h-full w-full object-cover opacity-25"/><div className="absolute inset-0 bg-[#292316]/75"/></div><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><p className="text-[10px] font-black uppercase tracking-[.24em] text-[#D9A514]">Teamood · Kota</p><h1 className="mt-3 text-4xl font-black uppercase tracking-[-.06em] sm:text-5xl">A little happiness is on its way</h1><p className="mt-3 max-w-xl text-sm leading-7 text-white/70">Your order details are below. Thank you for making Teamood part of your day.</p></div></section>
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 sm:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl border border-[#292316]/10 p-8 sm:p-12 shadow-elevated text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F3D77A] text-[#292316] flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-9 h-9 text-[#292316]" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-[#A87908] uppercase tracking-wider block mb-1">
            Order Confirmed & Paid
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-[#292316]">
            Thank you for choosing Teamood!
          </h1>
          <p className="text-xs sm:text-sm text-[#292316]/70 mt-2 max-w-md mx-auto">
            Your fresh tea package is being hand-blended and packed in our Kota facility.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 rounded-2xl bg-[#FFFDF6] border border-[#292316]/10 text-left space-y-4 text-xs font-mono">
          <div className="flex justify-between border-b border-[#292316]/10 pb-3">
            <span className="text-[#292316]/60">Order Reference:</span>
            <span className="font-bold text-[#292316]">{order.id}</span>
          </div>

          <div className="flex justify-between border-b border-[#292316]/10 pb-3">
            <span className="text-[#292316]/60">Payment Mode:</span>
            <span className="font-bold text-[#292316]">{order.paymentMethod} (Verified)</span>
          </div>

          <div className="flex justify-between border-b border-[#292316]/10 pb-3">
            <span className="text-[#292316]/60">Delivery To:</span>
            <span className="font-bold text-[#292316]">{order.customer?.name}, {order.customer?.city}</span>
          </div>

          <div className="flex justify-between font-bold text-sm text-[#292316] pt-1">
            <span>Total Paid:</span>
            <span className="text-base font-black">₹{order.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-[#292316]/20 text-[#292316] font-mono font-bold text-xs hover:bg-[#FFFDF6] transition flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-xs hover:bg-[#173425] transition flex items-center justify-center gap-2"
          >
            <span>Back to Shop</span>
            <ArrowRight className="w-4 h-4 text-[#D9A514]" />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
