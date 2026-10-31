import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  ExternalLink,
  CheckCircle2,
  Loader2,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PublicPageHero from '../../components/common/PublicPageHero';

export default function Contact() {
  const { siteContent, submitContactEnquiry, showToast } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in your name, email, and message', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitContactEnquiry(form);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-[#FFFDF6] text-[#292316] min-h-screen pb-24">
      {/* 1. CONTACT HERO */}
      <PublicPageHero eyebrow="We love hearing from you" title="Let’s make" accent="a connection." description="Questions about the menu, an upcoming visit or a partnership? Send us a message. We would love to hear from you." image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85" imageAlt="Teamood Cafe interior" />

      {/* 2. CONTACT DETAILS & FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#292316]/10 shadow-soft space-y-6">
              <h2 className="text-2xl font-display font-black text-[#292316]">
                Flagship Lounge
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#292316]/80">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F3D77A] text-[#292316] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#292316] block">Address</span>
                    <span>Aerodrome Circle, Vigyan Nagar Road, Kota, Rajasthan 324007</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#D9A514] text-[#292316] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#292316] block">Phone / WhatsApp</span>
                    <span>+91 98290 00000</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F7E9C2] text-[#292316] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#292316] block">Email</span>
                    <span>hello@teamood.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F3B8C8] text-[#292316] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#292316] block">Lounge Hours</span>
                    <span>Monday – Sunday: 7:00 AM – 11:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div className="pt-4 border-t border-[#292316]/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#292316]">Follow Daily Brews</span>
                <a
                  href="https://www.instagram.com/teamoodofficial/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF6] border border-[#292316]/15 text-xs font-mono font-bold text-[#292316] hover:bg-[#292316] hover:text-white transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#D9A514]" />
                  <span>@teamoodofficial</span>
                </a>
              </div>
            </div>

            {/* Interactive Styled Google Map Mockup */}
            <div className="rounded-3xl overflow-hidden border border-[#292316]/10 shadow-soft bg-white p-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F3D77A]/30 flex flex-col items-center justify-center p-6 text-center space-y-2 border border-[#A87908]/30">
                <MapPin className="w-8 h-8 text-[#292316] animate-bounce" />
                <h3 className="font-display font-bold text-base text-[#292316]">
                  Teamood Cafe Lounge, Kota
                </h3>
                <p className="text-xs text-[#292316]/70 max-w-xs">
                  Aerodrome Circle, Near Allen Coaching Landmark, Kota, Rajasthan
                </p>
                <a
                  href="https://maps.google.com/?q=Kota+Rajasthan"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#292316] text-[#FFFDF6] text-xs font-mono font-bold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#292316]/10 shadow-medium">
              <div className="mb-8">
                <span className="text-xs font-mono font-bold text-[#A87908] uppercase tracking-wider block mb-1">
                  Send a Message
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-[#292316]">
                  How Can We Help You?
                </h2>
              </div>

              {submitted ? (
                <div className="p-8 rounded-3xl bg-[#F3D77A]/30 border border-[#A87908] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#A87908] text-[#292316] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-[#292316]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#292316]">
                    Thank You, {form.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#292316]/80 max-w-sm mx-auto">
                    Your message has been received and routed to our team. We usually respond within 4 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        phone: '',
                        email: '',
                        subject: 'General Enquiry',
                        message: ''
                      });
                    }}
                    className="mt-3 px-6 py-2.5 rounded-full bg-[#292316] text-[#FFFDF6] text-xs font-mono font-bold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="priya@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98290 XXXXX"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF6] border border-[#292316]/15 text-sm focus:outline-none focus:border-[#292316] font-mono"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Event Catering">Event & Wedding Catering</option>
                        <option value="Bulk Retail Order">Bulk Tea Canister Purchase</option>
                        <option value="Feedback">Lounge Experience Feedback</option>
                        <option value="Press & Media">Press & Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#292316] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows="4"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your note here..."
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
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 text-[#D9A514]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
