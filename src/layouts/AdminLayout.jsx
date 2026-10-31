import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareQuote,
  Mail,
  Package,
  Layers,
  ShoppingBag,
  Warehouse,
  UtensilsCrossed,
  Receipt,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Bell,
  Search,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLayout() {
  const { adminUser, logoutAdmin, franchiseEnquiries, contactEnquiries, orders } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const newFranchiseCount = franchiseEnquiries.filter(e => e.status === 'New' || e.status === 'Pending').length;
  const newContactCount = contactEnquiries.filter(e => e.status === 'New').length;
  const pendingOrdersCount = orders.filter(o => o.orderStatus === 'Confirmed' || o.orderStatus === 'Processing').length;

  const navSections = [
    {
      title: "OVERVIEW",
      items: [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      title: "INQUIRIES",
      items: [
        {
          name: "Franchise Enquiries",
          path: "/admin/franchise-enquiries",
          icon: MessageSquareQuote,
          badge: newFranchiseCount > 0 ? newFranchiseCount : null
        },
        {
          name: "Contact Enquiries",
          path: "/admin/contact-enquiries",
          icon: Mail,
          badge: newContactCount > 0 ? newContactCount : null
        }
      ]
    },
    {
      title: "COMMERCE & CATALOG",
      items: [
        { name: "Product Management", path: "/admin/products", icon: Package },
        { name: "Categories", path: "/admin/categories", icon: Layers },
        {
          name: "Online Orders",
          path: "/admin/orders",
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : null
        },
        { name: "Inventory", path: "/admin/inventory", icon: Warehouse }
      ]
    },
    {
      title: "CAFE OPERATIONS",
      items: [
        {
          name: "AI Menu Extraction",
          path: "/admin/menu-management",
          icon: UtensilsCrossed,
          badgeText: "AI Vision"
        },
        { name: "Offline POS Billing", path: "/admin/pos", icon: Receipt },
        { name: "Sales Analytics", path: "/admin/sales", icon: TrendingUp }
      ]
    },
    {
      title: "CONTENT & SETTINGS",
      items: [
        { name: "Website Content (CMS)", path: "/admin/content", icon: FileText },
        { name: "Business Settings", path: "/admin/settings", icon: Settings }
      ]
    }
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF2] flex text-[#1D3D2C] font-sans selection:bg-[#F5D36F] selection:text-[#1D3D2C]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#1D3D2C]/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#1D3D2C]/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1D3D2C] text-[#F5D36F] font-display font-black text-lg flex items-center justify-center shadow-soft">
              T
            </div>
            <div>
              <span className="font-display text-lg font-black tracking-tight text-[#1D3D2C] block leading-none">
                TEAMOOD OS
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#83B579] block mt-0.5">
                BUSINESS ADMIN
              </span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#1D3D2C] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#1D3D2C]/40 px-3 tracking-wider uppercase">
                {sec.title}
              </span>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-[#1D3D2C] text-[#FAFAF2] font-bold shadow-soft'
                          : 'text-[#1D3D2C]/70 hover:bg-[#FAFAF2] hover:text-[#1D3D2C]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5D36F]' : 'text-[#1D3D2C]/50'}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isActive ? 'bg-[#F5D36F] text-[#1D3D2C]' : 'bg-[#1D3D2C] text-[#FAFAF2]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.badgeText && (
                        <span className="px-1.5 py-0.5 rounded bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-mono font-bold">
                          {item.badgeText}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer User info & Logout */}
        <div className="p-4 border-t border-[#1D3D2C]/10 bg-[#FAFAF2] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-[#1D3D2C] text-[#F5D36F] flex items-center justify-center font-bold text-xs shrink-0 shadow-soft">
              {adminUser.name[0]}
            </div>
            <div className="overflow-hidden">
              <span className="font-bold text-xs text-[#1D3D2C] block truncate">
                {adminUser.name}
              </span>
              <span className="text-[10px] font-mono text-[#83B579] block truncate">
                {adminUser.role}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-xl text-[#1D3D2C]/50 hover:text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#1D3D2C]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#1D3D2C] hover:bg-[#FAFAF2]"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#1D3D2C]/70 font-mono">
              <Link to="/" target="_blank" className="hover:text-[#83B579] flex items-center gap-1 font-bold transition">
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick POS Shortcut */}
            <Link
              to="/admin/pos"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D3D2C] text-[#FAFAF2] font-extrabold text-xs hover:bg-[#173425] transition shadow-soft"
            >
              <Receipt className="w-3.5 h-3.5 text-[#F5D36F]" />
              <span>Counter POS</span>
            </Link>

            <Link
              to="/admin/menu-management"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CFE9C5] text-[#1D3D2C] font-mono font-bold text-xs hover:bg-[#bce0b0] transition border border-[#1D3D2C]/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Menu Scanner</span>
            </Link>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#1D3D2C] text-[#F5D36F] flex items-center justify-center font-bold text-xs shadow-soft">
              {adminUser.name[0]}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
