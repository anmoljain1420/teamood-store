import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  TrendingUp,
  Store,
  HelpCircle,
  Phone,
  Mail,
  Loader2,
  ChevronDown,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Franchise() {
  const { submitFranchiseEnquiry, showToast } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // 9 Required Form Fields
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    investmentBudget: '₹25 Lakh - ₹40 Lakh',
    businessExperience: '1-3 Years Hospitality / Retail',
    outletPreference: 'Teamood Cafe Lounge',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

  const franchiseModels = [
    {
      name: "Teamood Cafe Lounge",
      badge: "Flagship Format",
      space: "400 - 800 sq.ft.",
      capex: "₹22 - 32 Lakhs",
      roi: "42% Avg ROI",
      payback: "12-16 Months",
      bgTag: "#F3D77A",
      desc: "Full experiential lifestyle destination with 3D tea bar, lounge seating, artisan bakery, and packaged loose tea retail."
    },

  ];

  const faqs = [
    {
      q: "What initial onboarding support is provided by the Teamood team?",
      a: "We provide end-to-end support including 3D architectural store design, kitchen & counter equipment sourcing, direct ingredient supply chains from Assam & Rajasthan, a 4-week intensive barista training program, automated POS billing software, and regional launch marketing."
    },
    {
      q: "What is the typical profit margin on tea beverages?",
      a: "Our standardized recipes achieve 68% to 74% gross beverage margins, allowing franchisees to achieve operational breakeven within 2 to 3 months of grand opening."
    },
    {
      q: "Can I choose my own outlet location?",
      a: "Yes. Our real-estate analytics team evaluates and approves your proposed site based on footfall heatmaps, visibility, proximity to college/tech clusters, and parking convenience."
    },
    {
      q: "Is prior food and beverage experience required?",
      a: "No prior restaurant experience is required. Over 65% of our successful franchise partners are first-time entrepreneurs who follow our structured Standard Operating Procedures (SOPs)."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.city) {
      showToast('Please fill in your name, phone number, and city.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitFranchiseEnquiry({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        city: form.city,
        state: form.state,
        budget: form.investmentBudget,
        brand: form.outletPreference,
        experience: form.businessExperience,
        message: form.message
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 700);
  };

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-[#292316] py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div className="relative z-10 space-y-5">
            <span className="inline-flex rounded-full border border-[#D9A514]/40 bg-[#D9A514]/15 px-4 py-2 text-[10px] font-black uppercase tracking-[.2em] text-[#F1C84B]">Franchise & partnership opportunity</span>
            <h1 className="text-5xl font-black uppercase leading-[.9] tracking-[-.06em] sm:text-7xl">Bring the<br/><span className="font-serif font-medium italic normal-case text-[#D9A514]">Teamood mood</span><br/>to your city.</h1>
            <p className="max-w-xl text-sm leading-8 text-white/70">Build a cafe experience around thoughtfully prepared tea, welcoming spaces and memorable hospitality. Explore the Teamood Cafe Lounge opportunity.</p>
            <a href="#application-form" className="inline-flex items-center gap-3 rounded-full bg-[#D9A514] px-7 py-4 text-xs font-black uppercase tracking-wider text-[#292316]">Start your enquiry <ArrowRight size={16}/></a>
          </div>
          <div className="group relative min-h-[300px] overflow-hidden rounded-[2rem] border border-white/15 sm:min-h-[420px]"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1300&q=90" alt="Warm cafe interior" className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#292316]/70 to-transparent"/><p className="absolute bottom-7 left-7 font-serif text-3xl italic text-white">A space made for good moments.</p></div>
        </div>
      </section>

      {/* 2. THREE FRANCHISE FORMATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
            The Teamood Cafe Lounge
          </h2>
          <p className="text-sm text-[#292316]/70 mt-2 font-mono">
            Scalable models customized for your capital, real-estate footprint, and target demographic
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {franchiseModels.map((m, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-soft hover:shadow-medium transition-all flex flex-col justify-between"
            >
              <div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#292316] inline-block mb-4"
                  style={{ backgroundColor: m.bgTag }}
                >
                  {m.badge}
                </span>

                <h3 className="text-2xl font-display font-black text-[#292316] mb-2">
                  {m.name}
                </h3>

                <p className="text-xs text-[#292316]/75 leading-relaxed mb-6">
                  {m.desc}
                </p>

                <div className="space-y-3 py-4 border-y border-[#292316]/10 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#292316]/60">Space Required:</span>
                    <span className="font-bold text-[#292316]">{m.space}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#292316]/60">Initial Investment:</span>
                    <span className="font-bold text-[#292316]">{m.capex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#292316]/60">Projected ROI:</span>
                    <span className="font-bold text-[#A87908]">{m.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#292316]/60">Payback Period:</span>
                    <span className="font-bold text-[#292316]">{m.payback}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#application-form"
                  onClick={() => setForm(f => ({ ...f, outletPreference: m.name }))}
                  className="w-full py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/20 text-[#292316] hover:bg-[#292316] hover:text-[#FFFDF6] font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Select {m.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. APPLICATION ENQUIRY FORM */}
      <section id="application-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#292316]/10 shadow-medium">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold text-[#A87908] uppercase tracking-wider block mb-1">
              Direct Franchise Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#292316]">
              Submit Your Expression of Interest
            </h2>
            <p className="text-xs sm:text-sm text-[#292316]/70 mt-1">
              Our business development team will review your application and schedule a discovery meeting within 48 business hours.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-8 rounded-3xl bg-[#F3D77A]/30 border border-[#A87908] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#A87908] text-[#292316] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#292316]" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#292316]">
                Application Received Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-[#292316]/80 max-w-md mx-auto">
                Thank you, <strong>{form.fullName}</strong>. Your enquiry for <strong>{form.outletPreference}</strong> in <strong>{form.city}</strong> has been assigned to our franchise manager.
              </p>
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setForm({
                    fullName: '',
                    phone: '',
                    email: '',
                    city: '',
                    state: '',
                    investmentBudget: '₹25 Lakh - ₹40 Lakh',
                    businessExperience: '1-3 Years Hospitality / Retail',
                    outletPreference: 'Teamood Cafe Lounge',
                    message: ''
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#292316] text-[#FFFDF6] text-xs font-mono font-bold"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    1. Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    2. Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98290 XXXXX"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                {/* 3. Email */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    3. Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                {/* 4. City */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    4. Proposed City *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Kota, Jaipur, Udaipur"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                {/* 5. State */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    5. State *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="e.g. Rajasthan, Gujarat, MP"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                  />
                </div>

                {/* 6. Investment Range */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    6. Investment Budget *
                  </label>
                  <select
                    value={form.investmentBudget}
                    onChange={(e) => setForm({ ...form, investmentBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316] font-mono"
                  >
                    <option value="₹25 Lakh - ₹40 Lakh">₹25 Lakh - ₹40 Lakh (Teamood Cafe Lounge)</option>
                    <option value="₹40 Lakh+">₹40 Lakh+ (Large Format / Multi-Unit)</option>
                  </select>
                </div>

                {/* 7. Business Experience */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    7. Business Experience *
                  </label>
                  <select
                    value={form.businessExperience}
                    onChange={(e) => setForm({ ...form, businessExperience: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316] font-mono"
                  >
                    <option value="First-Time Entrepreneur">First-Time Entrepreneur</option>
                    <option value="1-3 Years Hospitality / Retail">1-3 Years Hospitality / Retail</option>
                    <option value="3+ Years Business Owner">3+ Years Business Owner</option>
                  </select>
                </div>

                {/* 8. Outlet Preference */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                    8. Outlet Preference *
                  </label>
                  <select
                    value={form.outletPreference}
                    onChange={(e) => setForm({ ...form, outletPreference: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316] font-mono"
                  >
                    <option value="Teamood Cafe Lounge">Teamood Cafe Lounge (Flagship)</option>
                  </select>
                </div>
              </div>

              {/* 9. Message */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                  9. Message / Location Details
                </label>
                <textarea
                  rows="3"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share any specific property details, target opening timeline, or questions..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#292316] text-[#FFFDF6] font-display font-bold text-sm hover:bg-[#173425] transition shadow-soft flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#D9A514]" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Franchise Application</span>
                    <ArrowRight className="w-4 h-4 text-[#D9A514]" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#292316]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#292316]/10 overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-[#292316]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#A87908] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#292316]/80 leading-relaxed border-t border-[#292316]/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
