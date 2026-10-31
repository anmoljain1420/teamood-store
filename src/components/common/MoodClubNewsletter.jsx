import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Check, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MoodClubNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to The Mood Club! Use code TEAMOOD15 for 15% off.');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAFAF2] text-[#1D3D2C] relative border-t border-[#1D3D2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-[#1D3D2C] text-[#FAFAF2] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-elevated">
          {/* Subtle glow circles */}
          <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-[#F5D36F]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#CFE9C5]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FAFAF2] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D36F]" />
              <span>THE MOOD CLUB</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black leading-tight tracking-tight text-white">
              Get 15% off your first artisan tea order.
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg mx-auto">
              Join 150,000+ tea lovers. Receive secret seasonal micro-lot drops, brewing masterclasses, and priority access to limited edition canisters.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-3xl bg-white/10 border border-[#F5D36F]/40 backdrop-blur-md space-y-2 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#83B579] text-[#1D3D2C] flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 text-[#1D3D2C]" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  You're on the VIP list!
                </h3>
                <p className="text-xs text-white/80">
                  Your welcome promo code is active:
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5D36F] text-[#1D3D2C] font-mono font-black text-sm">
                  <Tag className="w-4 h-4" />
                  <span>TEAMOOD15</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#F5D36F] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#F5D36F] hover:bg-white text-[#1D3D2C] font-display font-bold text-sm whitespace-nowrap transition transform active:scale-95 shadow-medium flex items-center justify-center gap-2"
                >
                  <span>Claim 15%</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] font-mono text-white/50">
              Zero spam. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
