import React, { useState } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  RotateCcw,
  CreditCard,
  QrCode,
  Banknote,
  Sparkles,
  Receipt,
  CheckCircle2,
  X,
  FileDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function POS() {
  const { menuItems, products, createPosBill, showToast } = useApp();

  // Selected POS Cart
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Customer details for receipt
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNo, setTableNo] = useState('Counter / Takeaway');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Generated bill modal
  const [generatedBill, setGeneratedBill] = useState(null);
  const [printerWidth, setPrinterWidth] = useState('80mm'); // '80mm' or '58mm'

  const categories = [
    'All',
    'Classic Tea',
    'Special Tea',
    'Cold Tea',
    'Coffee',
    'Snacks',
    'Food and Combos'
  ];

  // Combine menu items and retail products
  const availableItems = [
    ...menuItems.map(m => ({ ...m, type: 'cafe' })),
    ...products.map(p => ({
      id: `retail-${p.id}`,
      name: p.name,
      category: p.category,
      price: p.price,
      image: p.image,
      type: 'retail'
    }))
  ].filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || item.name.toLowerCase().includes(q) || (item.category && item.category.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const addToPosCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.id === itemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const clearPosCart = () => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setDiscountPercent(0);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal - discountAmount) * 0.05; // 5% GST
  const grandTotal = Math.max(0, subtotal - discountAmount + taxAmount);

  // Complete Sale
  const handleCompleteSale = () => {
    if (cart.length === 0) {
      showToast('Please add items to bill before charging', 'error');
      return;
    }

    const bill = createPosBill({
      customerName: customerName.trim() || 'Counter Guest',
      customerPhone: customerPhone.trim() || 'N/A',
      tableNo,
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        type: i.type
      })),
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: grandTotal,
      paymentMethod
    });

    setGeneratedBill(bill);
    clearPosCart();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#83B579] block">
            Offline Quick Billing
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C]">
            Point of Sale (POS) Counter
          </h1>
          <p className="text-xs text-[#1D3D2C]/70 mt-1">
            Tap menu products, apply table discounts, generate GST invoices & print receipts
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CFE9C5] text-[#1D3D2C] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#83B579] animate-pulse" />
            <span>Terminal 01 • Kota Flagship</span>
          </span>
        </div>
      </div>

      {/* Main 2-Panel POS Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT PANEL: CATALOG & SEARCH ================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search Bar & Categories */}
          <div className="p-4 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D3D2C]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search kulhad chai, bun maska, chocolate, packaged tea..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-xs font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                      : 'bg-[#FAFAF2] text-[#1D3D2C]/70 hover:bg-[#CFE9C5]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1 scrollbar-none">
            {availableItems.map((item) => (
              <div
                key={item.id}
                onClick={() => addToPosCart(item)}
                className="p-3 rounded-2xl bg-white border border-[#1D3D2C]/10 hover:border-[#1D3D2C] shadow-soft hover:shadow-medium transition-all cursor-pointer flex flex-col justify-between group active:scale-95"
              >
                <div className="space-y-2">
                  <div className="h-24 rounded-xl overflow-hidden relative bg-[#FAFAF2]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/90 text-[#1D3D2C] text-[9px] font-mono font-bold">
                      {item.type === 'retail' ? 'Retail' : 'Cafe'}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-xs text-[#1D3D2C] line-clamp-1">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-2 mt-2 border-t border-[#1D3D2C]/10 flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#1D3D2C]">
                    ₹{item.price}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#CFE9C5] text-[#1D3D2C] font-bold flex items-center justify-center text-xs group-hover:bg-[#1D3D2C] group-hover:text-white transition">
                    +
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT PANEL: BILL & PAYMENT ================= */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-medium space-y-5 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1D3D2C]/10 pb-3">
            <h2 className="font-display font-bold text-base text-[#1D3D2C] flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#83B579]" />
              <span>Active Bill ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
            </h2>
            {cart.length > 0 && (
              <button
                onClick={clearPosCart}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Customer / Table Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-[#1D3D2C]/70 block mb-1">
                Guest Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Walk-in Guest"
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-[#1D3D2C]/70 block mb-1">
                Table / Channel
              </label>
              <select
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 font-semibold text-[#1D3D2C] focus:outline-none"
              >
                <option value="Counter / Takeaway">Counter / Takeaway</option>
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4 (Lounge)</option>
                <option value="Table 5">Table 5 (Terrace)</option>
              </select>
            </div>
          </div>

          {/* Cart Item Rows */}
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1 border-t border-b border-[#1D3D2C]/10 py-3 scrollbar-none">
            {cart.length === 0 ? (
              <p className="text-xs text-[#1D3D2C]/50 text-center py-6">
                Click items on the left to add to bill
              </p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-1">
                  <div className="overflow-hidden pr-2">
                    <p className="font-bold text-[#1D3D2C] truncate font-sans">{item.name}</p>
                    <span className="text-[10px] text-[#1D3D2C]/60">₹{item.price} each</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAFAF2] border border-[#1D3D2C]/10">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold w-14 text-right">
                      ₹{item.price * item.quantity}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Discount & Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1D3D2C]">Staff Discount:</span>
              <div className="flex items-center gap-1.5">
                {[0, 5, 10, 15].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDiscountPercent(d)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      discountPercent === d
                        ? 'bg-[#1D3D2C] text-[#FAFAF2]'
                        : 'bg-[#FAFAF2] text-[#1D3D2C]/80 hover:bg-[#CFE9C5]/40'
                    }`}
                  >
                    {d === 0 ? 'None' : `${d}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Pills */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { id: 'Cash', label: 'Cash' },
                { id: 'UPI', label: 'UPI QR' },
                { id: 'Card', label: 'Card' },
                { id: 'Split', label: 'Split' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`py-2 rounded-xl font-bold transition text-center ${
                    paymentMethod === m.id
                      ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                      : 'bg-[#FAFAF2] text-[#1D3D2C]/80 hover:bg-black/5 border border-[#1D3D2C]/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-1.5 text-[#1D3D2C]/80 pt-2 border-t border-[#1D3D2C]/10">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold">₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#83B579] font-bold">
                <span>Discount ({discountPercent}%):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (5% Composite):</span>
              <span>₹{taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#1D3D2C]/10">
              <span className="font-display font-bold text-sm text-[#1D3D2C]">Total to Charge:</span>
              <span className="font-display font-black text-2xl text-[#1D3D2C]">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Charge Button */}
          <button
            onClick={handleCompleteSale}
            disabled={cart.length === 0}
            className="w-full py-4 rounded-2xl bg-[#1D3D2C] hover:bg-[#173425] text-[#FAFAF2] font-display font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <CheckCircle2 className="w-4 h-4 text-[#F5D36F]" />
            <span>Complete Sale & Print Bill (₹{grandTotal.toFixed(2)})</span>
          </button>
        </div>
      </div>

      {/* ================= THERMAL RECEIPT MODAL (58mm / 80mm) ================= */}
      {generatedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="rounded-3xl bg-white max-w-md w-full p-6 border border-[#1D3D2C]/10 shadow-elevated space-y-4">
            <div className="flex items-center justify-between border-b border-[#1D3D2C]/10 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#83B579]" />
                <h3 className="font-display font-bold text-base text-[#1D3D2C]">
                  Invoice: {generatedBill.id}
                </h3>
              </div>
              <button
                onClick={() => setGeneratedBill(null)}
                className="p-1 rounded text-[#1D3D2C]/50 hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thermal Print Format Selector */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#1D3D2C]">Receipt Width:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPrinterWidth('80mm')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    printerWidth === '80mm' ? 'bg-[#1D3D2C] text-[#FAFAF2]' : 'bg-[#FAFAF2] text-[#1D3D2C]'
                  }`}
                >
                  80mm Standard
                </button>
                <button
                  onClick={() => setPrinterWidth('58mm')}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    printerWidth === '58mm' ? 'bg-[#1D3D2C] text-[#FAFAF2]' : 'bg-[#FAFAF2] text-[#1D3D2C]'
                  }`}
                >
                  58mm Thermal
                </button>
              </div>
            </div>

            {/* Printable Receipt Container */}
            <div
              id="printable-receipt"
              style={{ width: printerWidth === '58mm' ? '58mm' : '80mm' }}
              className="mx-auto bg-white p-4 border border-dashed border-black/30 text-black font-mono text-[11px] leading-tight select-all"
            >
              <div className="text-center space-y-1 mb-3">
                <h4 className="font-bold text-sm tracking-widest uppercase">TEAMOOD CAFE</h4>
                <p className="text-[10px]">Kota Flagship Lounge</p>
                <p className="text-[9px]">Aerodrome Circle, Kota, RJ 324007</p>
                <p className="text-[9px]">GSTIN: 08AAACT1234F1Z5</p>
                <p className="text-[9px]">Phone: +91 98290 00000</p>
              </div>

              <div className="border-t border-b border-dashed border-black py-1.5 my-2 space-y-0.5 text-[10px]">
                <div className="flex justify-between">
                  <span>Invoice #:</span>
                  <span className="font-bold">{generatedBill.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date/Time:</span>
                  <span>{new Date(generatedBill.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guest:</span>
                  <span>{generatedBill.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Channel:</span>
                  <span>{generatedBill.tableNo}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1 my-2">
                <div className="flex justify-between font-bold border-b border-black pb-0.5 text-[10px]">
                  <span>Item</span>
                  <span>Qty x Rate</span>
                  <span>Amt</span>
                </div>
                {generatedBill.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[10px]">
                    <span className="truncate max-w-[120px]">{it.name}</span>
                    <span>{it.quantity} x ₹{it.price}</span>
                    <span>₹{(it.quantity * it.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-dashed border-black pt-1.5 my-1 space-y-0.5 text-[10px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{generatedBill.subtotal.toFixed(2)}</span>
                </div>
                {generatedBill.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-₹{generatedBill.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{generatedBill.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xs border-t border-black pt-1 mt-1">
                  <span>GRAND TOTAL:</span>
                  <span>₹{generatedBill.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-0.5 text-[9px]">
                  <span>Payment:</span>
                  <span className="uppercase">{generatedBill.paymentMethod}</span>
                </div>
              </div>

              {/* Receipt Footer Message */}
              <div className="text-center pt-3 mt-3 border-t border-dashed border-black space-y-1">
                <p className="font-bold text-[10px]">Sip. Smile. Repeat.</p>
                <p className="text-[8px]">Thank you for visiting Teamood Cafe!</p>
                <p className="text-[8px]">Follow on Instagram @teamoodofficial</p>
              </div>
            </div>

            {/* Print and Close Actions */}
            <div className="flex items-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-2xl bg-[#1D3D2C] hover:bg-[#173425] text-[#FAFAF2] font-bold flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-[#F5D36F]" />
                <span>Print Bill (Browser / Thermal)</span>
              </button>
              <button
                onClick={() => setGeneratedBill(null)}
                className="px-5 py-3 rounded-2xl bg-[#FAFAF2] hover:bg-black/5 text-[#1D3D2C] font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
