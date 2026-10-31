import React, { useState } from 'react';
import {
  FileText,
  Save,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Star,
  Store,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WebsiteContent() {
  const { siteContent, updateSiteSection, testimonials, addTestimonial, deleteTestimonial, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'about', 'contact', 'testimonials', 'footer'

  // Local state for editing hero
  const [heroForm, setHeroForm] = useState({
    badge: siteContent?.hero?.badge || 'EST. 2020 • KOTA & RAJASTHAN',
    headline: siteContent?.hero?.headline || 'Find Your Tea. Find Your Mood.',
    subheadline: siteContent?.hero?.subheadline || 'Discover a world of flavours, little rituals and good moods.',
    ctaPrimary: 'Explore Our Collection',
    ctaSecondary: 'Shop Retail Blends'
  });

  // Local state for editing about
  const [aboutForm, setAboutForm] = useState({
    storyTitle: siteContent?.about?.storyTitle || 'Born in Kota. Brewed for the world.',
    storyParagraph1: siteContent?.about?.storyParagraph1 || 'At Teamood Cafe, we believe tea is the sacred pause in modern chaos — an invitation to breathe, taste, and smile.',
    storyParagraph2: siteContent?.about?.storyParagraph2 || 'We bypass middlemen to harvest directly from single family estates in Assam and the Himalayan foothills.',
    mission: siteContent?.about?.mission || 'To elevate Indian chai from rushed compromises into an inspiring, clean sensory ritual.'
  });

  // Local state for editing contact
  const [contactForm, setContactForm] = useState({
    address: siteContent?.contact?.address || 'Aerodrome Circle, Vigyan Nagar Road, Kota, Rajasthan 324007',
    phone: siteContent?.contact?.phone || '+91 98290 00000',
    email: siteContent?.contact?.email || 'hello@teamood.in',
    hours: siteContent?.contact?.hours || 'Monday – Sunday: 7:00 AM – 11:30 PM',
    instagram: 'https://www.instagram.com/teamoodofficial/'
  });

  // New testimonial form state
  const [newTestimonial, setNewTestimonial] = useState({
    author: '',
    role: '',
    location: '',
    comment: '',
    rating: 5
  });

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateSiteSection('hero', heroForm);
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateSiteSection('about', aboutForm);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateSiteSection('contact', contactForm);
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.author || !newTestimonial.comment) {
      showToast('Please fill in both author and comment', 'error');
      return;
    }
    addTestimonial(newTestimonial);
    setNewTestimonial({ author: '', role: '', location: '', comment: '', rating: 5 });
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#83B579] block">
            Content Management System
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C]">
            Website Content & Brand Copy
          </h1>
          <p className="text-xs text-[#1D3D2C]/70 mt-1">
            Edit live headlines, brand philosophy, lounge information, and testimonials
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-3xl border border-[#1D3D2C]/10 shadow-soft w-max font-mono text-xs">
        {[
          { id: 'hero', label: 'Homepage Hero' },
          { id: 'about', label: 'Brand Story' },
          { id: 'contact', label: 'Contact & Social' },
          { id: 'testimonials', label: 'Testimonials' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-2xl font-bold transition ${
              activeTab === t.id ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft' : 'text-[#1D3D2C]/70 hover:text-[#1D3D2C]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HERO */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-6 max-w-3xl font-mono text-xs">
          <div className="border-b border-[#1D3D2C]/10 pb-4">
            <span className="px-3 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-bold">
              HERO TWO REVOLVING CUPS SECTION
            </span>
            <h3 className="font-display font-bold text-xl text-[#1D3D2C] mt-2">
              Hero Headlines & CTA
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Top Pill Badge Text
              </label>
              <input
                type="text"
                value={heroForm.badge}
                onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={heroForm.headline}
                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Sub-Headline Description
              </label>
              <textarea
                rows="3"
                value={heroForm.subheadline}
                onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Primary CTA Button
                </label>
                <input
                  type="text"
                  value={heroForm.ctaPrimary}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaPrimary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Secondary CTA Button
                </label>
                <input
                  type="text"
                  value={heroForm.ctaSecondary}
                  onChange={(e) => setHeroForm({ ...heroForm, ctaSecondary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D3D2C]/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold flex items-center gap-2 hover:bg-[#173425] transition"
            >
              <Save className="w-4 h-4 text-[#F5D36F]" />
              <span>Publish Hero Updates</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: ABOUT */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-6 max-w-3xl font-mono text-xs">
          <div className="border-b border-[#1D3D2C]/10 pb-4">
            <span className="px-3 py-1 rounded-full bg-[#F5D36F] text-[#1D3D2C] text-[10px] font-bold">
              ABOUT PAGE & FOUNDER STORY
            </span>
            <h3 className="font-display font-bold text-xl text-[#1D3D2C] mt-2">
              Brand Narrative & Mission
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Story Title
              </label>
              <input
                type="text"
                value={aboutForm.storyTitle}
                onChange={(e) => setAboutForm({ ...aboutForm, storyTitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Paragraph 1 (Origin)
              </label>
              <textarea
                rows="3"
                value={aboutForm.storyParagraph1}
                onChange={(e) => setAboutForm({ ...aboutForm, storyParagraph1: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Paragraph 2 (Sourcing)
              </label>
              <textarea
                rows="3"
                value={aboutForm.storyParagraph2}
                onChange={(e) => setAboutForm({ ...aboutForm, storyParagraph2: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Brand Mission Statement
              </label>
              <textarea
                rows="2"
                value={aboutForm.mission}
                onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D3D2C]/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold flex items-center gap-2 hover:bg-[#173425] transition"
            >
              <Save className="w-4 h-4 text-[#F5D36F]" />
              <span>Publish Story Updates</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: CONTACT */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-6 max-w-3xl font-mono text-xs">
          <div className="border-b border-[#1D3D2C]/10 pb-4">
            <span className="px-3 py-1 rounded-full bg-[#FFDCCB] text-[#1D3D2C] text-[10px] font-bold">
              CONTACT & SOCIAL
            </span>
            <h3 className="font-display font-bold text-xl text-[#1D3D2C] mt-2">
              Outlet Coordinates & Socials
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                Kota Flagship Lounge Address
              </label>
              <input
                type="text"
                value={contactForm.address}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Lounge Operating Hours
                </label>
                <input
                  type="text"
                  value={contactForm.hours}
                  onChange={(e) => setContactForm({ ...contactForm, hours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#1D3D2C] block mb-1">
                  Instagram Profile Link
                </label>
                <input
                  type="text"
                  value={contactForm.instagram}
                  onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1D3D2C]/10 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold flex items-center gap-2 hover:bg-[#173425] transition"
            >
              <Save className="w-4 h-4 text-[#F5D36F]" />
              <span>Publish Contact Info</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl">
          {/* Left: Add Testimonial */}
          <form onSubmit={handleAddTestimonial} className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-4 font-mono text-xs">
            <h3 className="font-display font-bold text-lg text-[#1D3D2C]">
              Add Guest Testimonial
            </h3>

            <div>
              <label className="block text-[#1D3D2C] font-bold mb-1">Guest Name *</label>
              <input
                type="text"
                required
                value={newTestimonial.author}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15"
              />
            </div>

            <div>
              <label className="block text-[#1D3D2C] font-bold mb-1">Role / Designation</label>
              <input
                type="text"
                value={newTestimonial.role}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                placeholder="e.g. Food Blogger / Regular Guest"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15"
              />
            </div>

            <div>
              <label className="block text-[#1D3D2C] font-bold mb-1">City / Location</label>
              <input
                type="text"
                value={newTestimonial.location}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                placeholder="e.g. Kota, Rajasthan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15"
              />
            </div>

            <div>
              <label className="block text-[#1D3D2C] font-bold mb-1">Review Quote *</label>
              <textarea
                rows="3"
                required
                value={newTestimonial.comment}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold hover:bg-[#173425] transition"
            >
              Add To Live Testimonials
            </button>
          </form>

          {/* Right: Existing Testimonials */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-lg text-[#1D3D2C]">
              Active Testimonials ({testimonials.length})
            </h3>
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-white border border-[#1D3D2C]/10 shadow-soft flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1D3D2C]">{t.author}</span>
                      <span className="text-[10px] text-[#83B579] font-mono">({t.location})</span>
                    </div>
                    <p className="text-xs text-[#1D3D2C]/80 italic">"{t.comment}"</p>
                  </div>
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
