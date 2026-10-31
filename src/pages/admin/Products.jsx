import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Star,
  Eye,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Products() {
  const { products, categories, addProduct, updateProduct, deleteProduct, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Chai Patti',
    price: '',
    discountPrice: '',
    weight: '250g',
    sku: '',
    stock: 25,
    minStock: 5,
    description: '',
    ingredients: '',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: false,
    published: true
  });

  const sampleImages = [
    { label: "Assam Estate Leaves", url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80" },
    { label: "Spiced Masala Tin", url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80" },
    { label: "Himalayan Green Tea", url: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80" },
    { label: "Lemon Iced Tea", url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" },
    { label: "Berry Hibiscus Bloom", url: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80" }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      category: categories[0]?.name || 'Chai Patti',
      price: '',
      discountPrice: '',
      weight: '250g',
      sku: `TMD-${Math.floor(100 + Math.random() * 900)}`,
      stock: 30,
      minStock: 8,
      description: '',
      ingredients: 'Pure Assam CTC & Indian Botanicals',
      image: sampleImages[0].url,
      featured: false,
      bestseller: false,
      published: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      category: p.category,
      price: p.price,
      discountPrice: p.discountPrice || '',
      weight: p.weight || '250g',
      sku: p.sku || '',
      stock: p.stock,
      minStock: p.minStock || 5,
      description: p.description || '',
      ingredients: p.ingredients || '',
      image: p.image || sampleImages[0].url,
      featured: p.featured || false,
      bestseller: p.bestseller || false,
      published: p.published !== undefined ? p.published : true
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, form);
    } else {
      addProduct(form);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete product "${name}"? It will also be removed from the online shop.`)) {
      deleteProduct(id);
    }
  };

  const togglePublish = (p) => {
    updateProduct(p.id, { published: !p.published });
    showToast(`Product ${p.published ? 'unpublished' : 'published'} in online store!`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#83B579] block">
            Catalog Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C]">
            Product Management
          </h1>
          <p className="text-xs text-[#1D3D2C]/70 mt-1">
            Create, update, manage prices, stock levels, and store visibility
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1D3D2C] hover:bg-[#173425] text-[#FAFAF2] text-xs font-bold uppercase tracking-wider transition shadow-soft self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F5D36F]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D3D2C]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product name, SKU..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-xs font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-[#1D3D2C]/70 shrink-0">Category:</span>
          {['All', ...categories.map(c => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                  : 'bg-[#FAFAF2] text-[#1D3D2C]/70 hover:bg-[#CFE9C5]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAFAF2] text-[#1D3D2C]/70 border-b border-[#1D3D2C]/10 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D3D2C]/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAFAF2] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAF2] shrink-0 border border-[#1D3D2C]/10">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-[#1D3D2C] block font-sans">{p.name}</span>
                        <span className="text-[10px] text-[#1D3D2C]/60">{p.sku || p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-bold">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-black text-[#1D3D2C]">₹{p.price}</span>
                    {p.discountPrice && (
                      <span className="text-[10px] text-[#1D3D2C]/50 block line-through">₹{p.discountPrice}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#1D3D2C]/80">{p.weight || '250g'}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${p.stock <= 5 ? 'text-red-600' : 'text-[#83B579]'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.published !== false
                          ? 'bg-[#CFE9C5] text-[#1D3D2C]'
                          : 'bg-black/10 text-[#1D3D2C]/60'
                      }`}
                    >
                      {p.published !== false ? 'Live on Store' : 'Draft / Hidden'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-[#FAFAF2] hover:bg-[#1D3D2C] hover:text-[#FAFAF2] transition"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-[#FAFAF2] hover:bg-red-50 text-red-600 transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#1D3D2C]/10 shadow-elevated relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#FAFAF2] text-[#1D3D2C] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-display font-black text-[#1D3D2C] mb-4">
              {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Product'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[#1D3D2C] font-bold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Weight / Volume</label>
                  <input
                    type="text"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  />
                </div>

                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    value={form.discountPrice}
                    onChange={(e) => setForm({ ...form, discountPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  />
                </div>

                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  />
                </div>
              </div>

              {/* Image URL & Preset Picker */}
              <div>
                <label className="block text-[#1D3D2C] font-bold mb-1">Product Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C] mb-2"
                />
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-[10px] text-[#1D3D2C]/60 shrink-0">Presets:</span>
                  {sampleImages.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setForm({ ...form, image: s.url })}
                      className="px-2 py-1 rounded bg-[#FAFAF2] border border-[#1D3D2C]/15 text-[10px] hover:bg-[#CFE9C5] whitespace-nowrap"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#1D3D2C] font-bold mb-1">Description</label>
                <textarea
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="accent-[#1D3D2C]"
                  />
                  <span>Published in Store</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-[#1D3D2C]"
                  />
                  <span>Featured Blend</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#1D3D2C]/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#FAFAF2] text-[#1D3D2C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
