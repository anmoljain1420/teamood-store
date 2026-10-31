import React, { useState } from 'react';
import { Store, Save, Sparkles, Check, Globe, Instagram, MapPin, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminBrands() {
  const { brands, updateBrand, showToast } = useApp();
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  const currentBrand = brands[selectedBrandIndex] || brands[0];
  const [formData, setFormData] = useState(currentBrand);

  const handleSelectBrand = (index) => {
    setSelectedBrandIndex(index);
    setFormData(brands[index]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateBrand(formData.id, formData);
    showToast(`Brand "${formData.name}" updated successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Brand Family Management
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Manage the Teamood Cafe identity, signature experience and public storytelling
          </p>
        </div>
      </div>

      {/* Brand Selection Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {brands.map((b, idx) => (
          <button
            key={b.id}
            onClick={() => handleSelectBrand(idx)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-soft whitespace-nowrap ${
              selectedBrandIndex === idx
                ? 'bg-deepGreen text-cream shadow-soft scale-105'
                : 'bg-white text-deepGreen hover:bg-cream-200 border border-lime/30'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{b.name}</span>
          </button>
        ))}
      </div>

      {/* Brand Edit Form */}
      <div className="rounded-3xl bg-white border border-lime/30 p-6 sm:p-8 shadow-soft">
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <div className="flex items-center justify-between border-b border-lime/20 pb-4">
            <div>
              <span className="badge-lime text-[10px]">{formData.name}</span>
              <h2 className="font-display font-bold text-xl text-deepGreen mt-1">
                Edit Concept Profile
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-deepGreen/60">Accent Color:</span>
              <span
                className="w-5 h-5 rounded-full inline-block border border-deepGreen/20"
                style={{ backgroundColor: formData.accentColor || '#B7E34B' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Brand Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Badge Headline</label>
              <input
                type="text"
                name="badge"
                value={formData.badge || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Editorial Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Signature Items</label>
              <input
                type="text"
                name="signature"
                value={formData.signature || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Locations / Format</label>
              <input
                type="text"
                name="locations"
                value={formData.locations || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">Hero Image URL</label>
            <input
              type="text"
              name="heroImage"
              value={formData.heroImage || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-deepGreen text-cream font-bold text-xs uppercase tracking-wider hover:bg-deepGreen/90 transition shadow-soft"
            >
              <Save className="w-4 h-4" />
              <span>Save Brand Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
