import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  X,
  Package
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Categories() {
  const { categories, products, addCategory, updateCategory, deleteCategory, showToast } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingCat(null);
    setForm({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCat(c);
    setForm({ name: c.name, description: c.description || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      showToast('Category name is required', 'error');
      return;
    }

    if (editingCat) {
      updateCategory(editingCat.id, form);
    } else {
      addCategory(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Category Management
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Organize catalog classifications for the online store and inventory tracking
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-deepGreen hover:bg-deepGreen/90 text-cream text-xs font-bold uppercase tracking-wider transition shadow-soft self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => {
          const productCount = products.filter(p => p.category === c.name).length;
          return (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-white border border-lime/30 shadow-soft hover:shadow-elevated transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-lime-soft flex items-center justify-center text-deepGreen">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="badge-lime text-[10px]">
                    {productCount} Products
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-deepGreen pt-2">
                  {c.name}
                </h3>
                <p className="text-xs text-deepGreen/70 leading-relaxed">
                  {c.description || "Collection of premium whole tea blends."}
                </p>
              </div>

              <div className="pt-3 border-t border-deepGreen/10 flex items-center justify-between">
                <span className="text-[10px] text-deepGreen/50 font-mono">ID: {c.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1.5 rounded-lg bg-cream-200 text-deepGreen hover:bg-lime-electric transition"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-1.5 rounded-lg text-coral hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
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
              {editingCat ? 'Edit Category' : 'Create New Category'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Masala Tea"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the blend category..."
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
