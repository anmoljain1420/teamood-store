import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  Store,
  Printer,
  Shield,
  Receipt,
  Check,
  Globe,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { adminUser, showToast } = useApp();

  const [settings, setSettings] = useState({
    businessName: 'Teamood Cafe & Beverage Ventures LLP',
    gstin: '08AABCT1234F1Z5',
    kotaStoreAddress: 'Aerodrome Circle, Vigyan Nagar Road, Kota, Rajasthan 324005',
    contactPhone: '+91 98290 12345',
    contactEmail: 'hello@teamood.in',
    restaurantTaxRate: 5,
    retailTaxRate: 5,
    thermalPaperSize: '80mm',
    autoPrintReceipt: true,
    currencySymbol: '₹',
    receiptFooterMessage: 'TEAMOOD – SIP. SMILE. REPEAT. Tag us @teamoodofficial',
    seoMetaTitle: 'TEAMOOD CAFE | Sip. Smile. Repeat. – Modern 3D Tea & Lifestyle Brand',
    seoMetaDescription: 'Discover exciting flavours, refreshing experiences, and a whole new mood of chai at Teamood Cafe Kota.'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('System, POS & Business preferences saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
          System & Business Settings
        </h1>
        <p className="text-xs text-deepGreen/70 mt-1">
          Configure business legal profile, POS hardware, tax rates, SEO & invoice defaults
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Profile */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-lime/20">
            <Store className="w-5 h-5 text-deepGreen" />
            <h3 className="font-display font-bold text-lg text-deepGreen">
              Legal Business Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Registered Entity Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">GSTIN Identification</label>
              <input
                type="text"
                value={settings.gstin}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-bold text-deepGreen">Kota Flagship Address</label>
              <input
                type="text"
                value={settings.kotaStoreAddress}
                onChange={(e) => setSettings({ ...settings, kotaStoreAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Support Phone Number</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Official Support Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>
        </div>

        {/* Tax & Financial Defaults */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-lime/20">
            <Receipt className="w-5 h-5 text-deepGreen" />
            <h3 className="font-display font-bold text-lg text-deepGreen">
              GST Configuration & POS Defaults
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Restaurant GST Rate (%)</label>
              <input
                type="number"
                value={settings.restaurantTaxRate}
                onChange={(e) => setSettings({ ...settings, restaurantTaxRate: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Retail Packaged Tea GST (%)</label>
              <input
                type="number"
                value={settings.retailTaxRate}
                onChange={(e) => setSettings({ ...settings, retailTaxRate: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Currency Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>
        </div>

        {/* Thermal Hardware & Printing Defaults */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-lime/20">
            <Printer className="w-5 h-5 text-deepGreen" />
            <h3 className="font-display font-bold text-lg text-deepGreen">
              Thermal Receipt & POS Hardware
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Default Paper Roll Format</label>
              <select
                value={settings.thermalPaperSize}
                onChange={(e) => setSettings({ ...settings, thermalPaperSize: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none"
              >
                <option value="80mm">80mm Wide Thermal Roll (Recommended)</option>
                <option value="58mm">58mm Compact Mobile Thermal Printer</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-deepGreen">Receipt Footer Note</label>
              <input
                type="text"
                value={settings.receiptFooterMessage}
                onChange={(e) => setSettings({ ...settings, receiptFooterMessage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>
        </div>

        {/* SEO & Social Placeholders */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-lime/30 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-lime/20">
            <Globe className="w-5 h-5 text-deepGreen" />
            <h3 className="font-display font-bold text-lg text-deepGreen">
              SEO & Brand Social Media
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-deepGreen block mb-1">Homepage SEO Title</label>
              <input
                type="text"
                value={settings.seoMetaTitle}
                onChange={(e) => setSettings({ ...settings, seoMetaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>

            <div>
              <label className="font-bold text-deepGreen block mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={settings.seoMetaDescription}
                onChange={(e) => setSettings({ ...settings, seoMetaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-deepGreen text-cream font-bold text-xs uppercase tracking-wider hover:bg-deepGreen/90 transition shadow-soft"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
