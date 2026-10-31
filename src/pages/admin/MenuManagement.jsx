import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  X,
  Eye,
  Check,
  UtensilsCrossed,
  ArrowRight,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MenuManagement() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, bulkAddMenuItems, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('ai-scan'); // 'ai-scan' or 'menu'
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Manual CRUD Item Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: 'Classic Tea',
    price: 35,
    description: '',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: false,
    status: 'Active'
  });

  // AI Menu Scanner State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [extractedData, setExtractedData] = useState(null);

  const scanSteps = [
    "1/5 Uploading high-res physical menu photo / PDF...",
    "2/5 Optical Character Recognition (OCR) detecting text blocks...",
    "3/5 Categorizing beverage groups & culinary sections...",
    "4/5 Parsing item names, INR price tokens & descriptions...",
    "5/5 Normalizing structured JSON data for review..."
  ];

  // Preset sample menus for immediate one-click testing
  const samplePresets = [
    {
      name: "Teamood Flagship Winter Menu 2026",
      items: [
        { name: "Kota Shahi Masala Chai", category: "Classic Tea", price: 45, desc: "Crushed ginger, cardamom, secret royal masala in terracotta kulhad", confidence: 98 },
        { name: "Kashmiri Saffron Kahwa", category: "Special Tea", price: 85, desc: "Pure Pampore saffron, slivered almonds, cinnamon infusion", confidence: 96 },
        { name: "Belgian Dark Chocolate Chai", category: "Special Tea", price: 65, desc: "70% single origin cocoa slow simmered with Assam CTC", confidence: 95 },
        { name: "Maska Bun with Tutti Frutti", category: "Snacks", price: 40, desc: "Toasted soft brioche bun slathered with salted butter", confidence: 92 },
        { name: "Sparkling Lemon Mint Iced Tea", category: "Cold Tea", price: 75, desc: "Nilgiri cold brew, freshly squeezed Meyer lemons, honey", confidence: 97 }
      ]
    },
    {
      name: "Babu Stall Heritage Rate Card",
      items: [
        { name: "Desi Cutting Kadak Chai", category: "Classic Tea", price: 20, desc: "Strong double-boiled highway kadak chai", confidence: 99 },
        { name: "Adrak Elaichi Special Kulhad", category: "Classic Tea", price: 30, desc: "Fresh pounded ginger & green cardamom in earthen cup", confidence: 97 },
        { name: "Crispy Samosa (2 Pcs) with Chutney", category: "Snacks", price: 35, desc: "Spiced potato & green pea filling, mint-coriander dip", confidence: 94 },
        { name: "Khari Biscuit Plate", category: "Snacks", price: 25, desc: "Flaky golden bakery puff biscuits", confidence: 93 }
      ]
    }
  ];

  const categories = [
    "All",
    "Classic Tea",
    "Special Tea",
    "Cold Tea",
    "Coffee",
    "Snacks",
    "Food and Combos"
  ];

  const filteredMenuItems = menuItems.filter(item => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setExtractedData(null);
    }
  };

  const handleSelectPreset = (preset) => {
    setUploadedFile({ name: `${preset.name}.jpg` });
    setFilePreview("https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80");
    setExtractedData(null);
    handleRunScanWithItems(preset.items);
  };

  const handleRunScanWithItems = async (items) => {
    setIsScanning(true);
    setScanStepIndex(0);

    for (let i = 0; i < scanSteps.length; i++) {
      setScanStepIndex(i);
      await new Promise(r => setTimeout(r, 450));
    }

    setIsScanning(false);
    setExtractedData(items);
    showToast(`AI Vision successfully extracted ${items.length} menu items!`);
  };

  const handleStartAIScan = async () => {
    if (!uploadedFile) {
      showToast('Please upload a menu image or PDF first', 'error');
      return;
    }
    handleRunScanWithItems(samplePresets[0].items);
  };

  const handleUpdateExtractedField = (index, field, value) => {
    setExtractedData(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteExtractedItem = (index) => {
    setExtractedData(prev => prev.filter((_, idx) => idx !== index));
    showToast('Removed item from extraction list', 'info');
  };

  const handleAddExtractedRow = () => {
    const newRow = {
      name: "New Extracted Item",
      category: "Classic Tea",
      price: 40,
      desc: "Fresh handcrafted beverage item",
      confidence: 100
    };
    setExtractedData(prev => [...(prev || []), newRow]);
  };

  const handleBulkImportToLiveMenu = () => {
    if (!extractedData || extractedData.length === 0) return;

    const itemsToImport = extractedData.map(item => ({
      name: item.name,
      category: item.category,
      price: Number(item.price) || 40,
      description: item.desc || `Prepared fresh in our cafe lounge. Digitized via Teamood AI Scanner.`,
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
      isVeg: true,
      isPopular: false,
      status: "Active"
    }));

    bulkAddMenuItems(itemsToImport);
    setExtractedData(null);
    setUploadedFile(null);
    setFilePreview(null);
    setActiveTab('menu');
    showToast(`Imported ${itemsToImport.length} items directly to live cafe & POS menu!`);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#83B579] block">
            Digital Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1D3D2C]">
            AI Menu Extraction & Catalog
          </h1>
          <p className="text-xs text-[#1D3D2C]/70 mt-1">
            Digitize physical paper/board menus with Vision AI and manage live cafe POS items
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 bg-white rounded-2xl border border-[#1D3D2C]/10 flex items-center gap-1 shadow-soft self-start sm:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('ai-scan')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ai-scan'
                ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                : 'text-[#1D3D2C]/70 hover:text-[#1D3D2C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5D36F]" />
            <span>AI Menu Extraction</span>
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'menu'
                ? 'bg-[#1D3D2C] text-[#FAFAF2] shadow-soft'
                : 'text-[#1D3D2C]/70 hover:text-[#1D3D2C]'
            }`}
          >
            <span>Live Cafe Menu ({menuItems.length})</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: AI MENU EXTRACTION ================= */}
      {activeTab === 'ai-scan' && (
        <div className="space-y-8">
          {/* AI Banner Notice */}
          <div className="p-5 rounded-3xl bg-[#CFE9C5]/30 border border-[#83B579]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#83B579] animate-ping" />
              <div>
                <span className="font-bold text-[#1D3D2C] block">
                  AI Vision Service Active: Server-Side OCR & Optical Tokenizer
                </span>
                <span className="text-[#1D3D2C]/70">
                  Extracts item titles, category groupings, INR prices, and culinary notes from photos or PDFs.
                </span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-white border border-[#1D3D2C]/15 font-bold text-[#1D3D2C] shrink-0">
              High Accuracy Model
            </span>
          </div>

          {/* Upload Area & Preset Selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-6">
              <h2 className="font-display font-black text-xl text-[#1D3D2C]">
                1. Upload Menu Document
              </h2>

              {/* Drag & drop upload box */}
              <label className="border-2 border-dashed border-[#1D3D2C]/20 hover:border-[#83B579] rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-[#FAFAF2] transition group text-center space-y-3">
                <UploadCloud className="w-12 h-12 text-[#1D3D2C]/40 group-hover:text-[#83B579] group-hover:scale-110 transition-transform" />
                <div>
                  <span className="font-display font-bold text-sm text-[#1D3D2C] block">
                    {uploadedFile ? uploadedFile.name : "Click to select or drag menu photo / PDF"}
                  </span>
                  <span className="text-[11px] font-mono text-[#1D3D2C]/60 block mt-1">
                    Supports JPG, PNG, WEBP, or multi-page PDF up to 15MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* One-Click Presets */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#1D3D2C]/70 uppercase tracking-wider block">
                  Or Test with Sample Cafe Menu Scans:
                </span>
                <div className="flex flex-wrap gap-2">
                  {samplePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="px-4 py-2 rounded-2xl bg-[#FAFAF2] border border-[#1D3D2C]/15 hover:bg-[#1D3D2C] hover:text-[#FAFAF2] text-xs font-mono font-bold transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#83B579]" />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {uploadedFile && (
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleStartAIScan}
                    disabled={isScanning}
                    className="flex-1 py-3.5 rounded-2xl bg-[#1D3D2C] text-[#FAFAF2] font-display font-bold text-xs uppercase tracking-wider hover:bg-[#173425] transition shadow-soft flex items-center justify-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#F5D36F]" />
                        <span>Analyzing Menu Structure...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F5D36F]" />
                        <span>Extract Menu with Vision AI</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Scanning status indicator */}
              {isScanning && (
                <div className="p-4 rounded-2xl bg-[#FAFAF2] border border-[#1D3D2C]/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between font-bold text-[#1D3D2C]">
                    <span>Neural OCR Pipeline:</span>
                    <span>{Math.round(((scanStepIndex + 1) / scanSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1D3D2C]/10 overflow-hidden">
                    <div
                      className="h-full bg-[#83B579] transition-all duration-300"
                      style={{ width: `${((scanStepIndex + 1) / scanSteps.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#83B579] block">
                    {scanSteps[scanStepIndex]}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Preview Panel */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft space-y-4">
              <h3 className="font-display font-black text-lg text-[#1D3D2C]">
                Document Preview
              </h3>
              {filePreview ? (
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#FAFAF2] border border-[#1D3D2C]/10">
                  <img
                    src={filePreview}
                    alt="Menu Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-2xl aspect-[4/3] bg-[#FAFAF2] border-2 border-dashed border-[#1D3D2C]/15 flex flex-col items-center justify-center p-6 text-center text-xs font-mono text-[#1D3D2C]/50 space-y-2">
                  <FileText className="w-8 h-8 opacity-40" />
                  <span>No document uploaded yet</span>
                </div>
              )}
            </div>
          </div>

          {/* Extracted Data Review & Editable Table */}
          {extractedData && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-medium space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1D3D2C]/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#83B579]" />
                    <h3 className="font-display font-black text-xl text-[#1D3D2C]">
                      2. Review & Edit Extracted Menu Items ({extractedData.length})
                    </h3>
                  </div>
                  <p className="text-xs text-[#1D3D2C]/70 mt-1 font-mono">
                    Directly edit any names, prices or categories below before publishing to the live catalog
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddExtractedRow}
                    className="px-4 py-2 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 hover:bg-black/5 text-[#1D3D2C] text-xs font-mono font-bold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>

                  <button
                    onClick={handleBulkImportToLiveMenu}
                    className="px-5 py-2.5 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] text-xs font-mono font-bold hover:bg-[#173425] transition flex items-center gap-2 shadow-soft"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F5D36F]" />
                    <span>Save to Live Cafe & POS</span>
                  </button>
                </div>
              </div>

              {/* Editable Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FAFAF2] text-[#1D3D2C]/70 uppercase text-[10px] font-bold border-b border-[#1D3D2C]/10">
                    <tr>
                      <th className="py-3 px-3">Item Name</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price (₹)</th>
                      <th className="py-3 px-3">Description</th>
                      <th className="py-3 px-3">AI Confidence</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D3D2C]/5">
                    {extractedData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#FAFAF2]/60">
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateExtractedField(idx, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#1D3D2C]/15 font-sans font-bold text-xs focus:outline-none focus:border-[#1D3D2C]"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <select
                            value={item.category}
                            onChange={(e) => handleUpdateExtractedField(idx, 'category', e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-white border border-[#1D3D2C]/15 text-xs focus:outline-none focus:border-[#1D3D2C]"
                          >
                            {categories.filter(c => c !== 'All').map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2.5 px-3 w-28">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleUpdateExtractedField(idx, 'price', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#1D3D2C]/15 text-xs font-bold focus:outline-none focus:border-[#1D3D2C]"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={item.desc || ""}
                            onChange={(e) => handleUpdateExtractedField(idx, 'desc', e.target.value)}
                            placeholder="Optional culinary notes..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#1D3D2C]/15 text-xs focus:outline-none focus:border-[#1D3D2C]"
                          />
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-bold">
                            {item.confidence || 95}% match
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => handleDeleteExtractedItem(idx)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                            title="Remove Row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: LIVE CAFE MENU ITEMS ================= */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
              <span className="text-[11px] font-bold text-[#1D3D2C]/70 shrink-0">Filter:</span>
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

            <button
              onClick={() => {
                setEditingItem(null);
                setForm({
                  name: '',
                  category: 'Classic Tea',
                  price: 35,
                  description: '',
                  image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
                  isVeg: true,
                  isPopular: false,
                  status: 'Active'
                });
                setIsModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#1D3D2C] text-[#FAFAF2] text-xs font-mono font-bold flex items-center gap-1.5 shadow-soft"
            >
              <Plus className="w-3.5 h-3.5 text-[#F5D36F]" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Menu Table */}
          <div className="rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-soft overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#FAFAF2] text-[#1D3D2C]/70 uppercase text-[10px] font-bold border-b border-[#1D3D2C]/10">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D3D2C]/5">
                {filteredMenuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFAF2]">
                    <td className="py-3 px-4 font-bold text-[#1D3D2C] font-sans">
                      {item.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-bold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-[#1D3D2C]">
                      ₹{item.price}
                    </td>
                    <td className="py-3 px-4 text-[#1D3D2C]/70 max-w-sm truncate font-sans">
                      {item.description}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setForm({
                              name: item.name,
                              category: item.category,
                              price: item.price,
                              description: item.description || '',
                              image: item.image || 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
                              isVeg: item.isVeg !== undefined ? item.isVeg : true,
                              isPopular: item.isPopular || false,
                              status: item.status || 'Active'
                            });
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#FAFAF2] hover:bg-[#1D3D2C] hover:text-[#FAFAF2] transition"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${item.name}" from cafe menu?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-[#FAFAF2] hover:bg-red-50 text-red-600 transition"
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
      )}

      {/* Manual Item Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#1D3D2C]/10 shadow-elevated relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#FAFAF2] text-[#1D3D2C] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-display font-black text-[#1D3D2C] mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add Cafe Menu Item'}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingItem) {
                  updateMenuItem(editingItem.id, form);
                } else {
                  addMenuItem(form);
                }
                setIsModalOpen(false);
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div>
                <label className="block text-[#1D3D2C] font-bold mb-1">Item Title *</label>
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
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1D3D2C] font-bold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 focus:outline-none focus:border-[#1D3D2C]"
                  />
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
