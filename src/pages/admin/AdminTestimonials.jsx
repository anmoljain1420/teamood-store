import React, { useState } from 'react';
import { MessageSquareQuote, Plus, Trash2, Star, Check, X, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, deleteTestimonial, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: 'Student / Local Resident',
    location: 'Kota, Rajasthan',
    comment: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    published: true
  });

  const filtered = testimonials.filter(t => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const authorName = t.name || t.author || '';
    return (
      authorName.toLowerCase().includes(q) ||
      (t.comment && t.comment.toLowerCase().includes(q)) ||
      (t.location && t.location.toLowerCase().includes(q))
    );
  });

  const handleOpenAdd = () => {
    setForm({
      name: '',
      role: 'Student / Local Resident',
      location: 'Kota, Rajasthan',
      comment: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      published: true
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) {
      showToast('Please enter customer name and review text', 'error');
      return;
    }
    addTestimonial(form);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this customer testimonial?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Guest Testimonials
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Manage real community feedback displayed on the public homepage
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-deepGreen hover:bg-deepGreen/90 text-cream text-xs font-bold uppercase tracking-wider transition shadow-soft self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-3xl bg-white border border-lime/30 shadow-soft flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-deepGreen/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, quote, location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
          />
        </div>

        <span className="text-xs text-deepGreen/70 font-bold hidden sm:inline-block">
          Active Reviews: {testimonials.length}
        </span>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white border border-lime/30 shadow-soft hover:shadow-elevated transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="badge-lime text-[9px]">
                  {t.location || 'Kota, Rajasthan'}
                </span>
              </div>

              <p className="text-xs text-deepGreen/85 font-sans italic leading-relaxed">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-deepGreen/10 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-xs text-deepGreen">{t.name || t.author}</h4>
                <span className="text-[10px] text-deepGreen/60">{t.role}</span>
              </div>

              <button
                onClick={() => handleDelete(t.id)}
                className="p-1.5 rounded-lg text-coral hover:bg-red-50 transition"
                title="Delete Testimonial"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepGreen/60 backdrop-blur-sm animate-in fade-in">
          <div className="rounded-3xl bg-white max-w-md w-full p-6 sm:p-8 border border-lime/30 shadow-elevated space-y-5 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-deepGreen/50 hover:bg-cream-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-extrabold text-xl text-deepGreen">
              Add Customer Testimonial
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Kota Student"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Kota, Rajasthan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                  Review Comment *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Their feedback on the brew, atmosphere or snacks..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-full bg-cream-200 text-deepGreen font-bold text-xs uppercase hover:bg-cream-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-deepGreen text-cream font-bold text-xs uppercase hover:bg-deepGreen/90 shadow-soft"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
