import React, { useState } from 'react';
import {
  Warehouse,
  Search,
  AlertTriangle,
  Plus,
  Minus,
  RefreshCw,
  Package,
  Layers,
  ArrowUpDown,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Inventory() {
  const { products, adjustStock, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [adjustingProduct, setAdjustingProduct] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState(10);
  const [adjustType, setAdjustType] = useState('add'); // 'add' or 'subtract'

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase().trim()))
  );

  const lowStockCount = products.filter(p => p.stock <= (p.minStock || 5)).length;

  const handleApplyAdjustment = () => {
    if (!adjustingProduct) return;
    const delta = adjustType === 'add' ? Number(adjustAmount) : -Number(adjustAmount);
    adjustStock(adjustingProduct.id, delta);
    setAdjustingProduct(null);
    setAdjustAmount(10);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-deepGreen">
            Warehouse & Inventory Control
          </h1>
          <p className="text-xs text-deepGreen/70 mt-1">
            Real-time retail inventory tracking, stock intake logs & automatic stock alerts
          </p>
        </div>

        {lowStockCount > 0 && (
          <div className="px-4 py-2 rounded-2xl bg-coral/20 border border-coral/40 text-deepGreen text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-coral" />
            <span>{lowStockCount} Products Below Minimum Threshold</span>
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-3xl bg-white border border-lime/30 shadow-soft flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-deepGreen/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-100 border border-lime/30 text-xs font-semibold text-deepGreen focus:outline-none focus:border-deepGreen"
          />
        </div>

        <span className="text-xs text-deepGreen/70 font-bold hidden sm:inline-block">
          Total Products Monitored: {products.length}
        </span>
      </div>

      {/* Inventory Table */}
      <div className="rounded-3xl bg-white border border-lime/30 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-cream-100 text-deepGreen/70 border-b border-lime/20 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Current Stock</th>
                <th className="py-3 px-4">Low-Stock Alert Level</th>
                <th className="py-3 px-4">Inventory Health</th>
                <th className="py-3 px-4 text-right">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lime/10">
              {filtered.map((p) => {
                const isLow = p.stock <= (p.minStock || 5);
                return (
                  <tr key={p.id} className="hover:bg-cream-100/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        <span className="font-bold text-deepGreen">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-deepGreen/70">{p.sku}</td>
                    <td className="py-3 px-4 text-deepGreen">{p.category}</td>
                    <td className="py-3 px-4 font-display font-extrabold text-base text-deepGreen">
                      {p.stock}
                    </td>
                    <td className="py-3 px-4 text-deepGreen/70">
                      {p.minStock || 5} units
                    </td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="badge-coral text-[10px]">
                          Low Stock
                        </span>
                      ) : (
                        <span className="badge-lime text-[10px]">
                          Healthy
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setAdjustingProduct(p)}
                        className="px-3 py-1.5 rounded-xl bg-cream-200 text-deepGreen text-xs font-bold hover:bg-lime-electric transition"
                      >
                        Adjust +/-
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {adjustingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepGreen/60 backdrop-blur-sm animate-in fade-in">
          <div className="rounded-3xl bg-white max-w-md w-full p-6 sm:p-8 border border-lime/30 shadow-elevated space-y-5 relative">
            <button
              onClick={() => setAdjustingProduct(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-deepGreen/50 hover:bg-cream-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-xl text-deepGreen">
              Stock Intake / Adjustment
            </h3>

            <div className="p-3 rounded-2xl bg-cream-100 text-xs">
              <span className="font-bold text-deepGreen block">{adjustingProduct.name}</span>
              <span className="text-deepGreen/60">Current Stock: <strong>{adjustingProduct.stock} units</strong></span>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase text-deepGreen block">
                Adjustment Direction
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustType('add')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    adjustType === 'add'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-cream-200 text-deepGreen'
                  }`}
                >
                  + Add Stock (Intake)
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType('subtract')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    adjustType === 'subtract'
                      ? 'bg-coral text-white'
                      : 'bg-cream-200 text-deepGreen'
                  }`}
                >
                  - Remove Stock (Damaged/Audit)
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-deepGreen block mb-1">
                  Quantity Units:
                </label>
                <input
                  type="number"
                  min="1"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-100 border border-lime/30 text-xs font-bold text-deepGreen focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustingProduct(null)}
                  className="flex-1 py-3 rounded-full bg-cream-200 text-deepGreen font-bold text-xs uppercase hover:bg-cream-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyAdjustment}
                  className="flex-1 py-3 rounded-full bg-deepGreen text-cream font-bold text-xs uppercase hover:bg-deepGreen/90 shadow-soft"
                >
                  Save Adjustment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
