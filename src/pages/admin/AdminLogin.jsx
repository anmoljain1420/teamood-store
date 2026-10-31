import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminLogin() {
  const { loginAdmin, adminUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@teamood.com');
  const [password, setPassword] = useState('teamood2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  // If already logged in, redirect to dashboard
  if (adminUser) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const success = loginAdmin(email, password);
    if (success) {
      const origin = location.state?.from?.pathname || '/admin/dashboard';
      navigate(origin, { replace: true });
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('manager.kota@teamood.com', 'teamood2026');
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF2] flex items-center justify-center p-4 selection:bg-[#F5D36F] selection:text-[#1D3D2C] text-[#1D3D2C]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-[#1D3D2C] text-[#F5D36F] font-display font-black text-2xl flex items-center justify-center shadow-soft">
              T
            </div>
            <div className="text-left">
              <span className="font-display text-2xl font-black tracking-tight text-[#1D3D2C] block leading-none">
                TEAMOOD
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#83B579]">
                ADMINISTRATION OS
              </span>
            </div>
          </Link>

          <p className="text-xs text-[#1D3D2C]/70 font-mono">
            Log in to manage cafe orders, POS counter billing, AI menu digitization, and enquiries.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#1D3D2C]/10 shadow-medium space-y-6">
          <div className="flex items-center justify-between border-b border-[#1D3D2C]/10 pb-4">
            <h2 className="font-display font-bold text-lg text-[#1D3D2C]">
              Staff Authentication
            </h2>
            <span className="px-2.5 py-1 rounded-full bg-[#CFE9C5] text-[#1D3D2C] text-[10px] font-mono font-bold">
              DEMO READY
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D3D2C] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#1D3D2C]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-xs font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                  placeholder="admin@teamood.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D3D2C] block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#1D3D2C]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#FAFAF2] border border-[#1D3D2C]/15 text-xs font-semibold text-[#1D3D2C] focus:outline-none focus:border-[#1D3D2C]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1D3D2C]/50 hover:text-[#1D3D2C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#1D3D2C]/30 text-[#1D3D2C] focus:ring-[#1D3D2C]"
                />
                <span className="text-[#1D3D2C]/70">Remember me</span>
              </label>

              <span className="text-[#1D3D2C]/50 text-[11px]">Demo: any credentials</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1D3D2C] hover:bg-[#173425] text-[#FAFAF2] font-bold text-xs uppercase tracking-wider transition shadow-soft flex items-center justify-center gap-2"
            >
              <span>Sign In To Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#F5D36F]" />
            </button>
          </form>

          {/* Quick Demo One-Click Login */}
          <div className="pt-2 border-t border-[#1D3D2C]/10 text-center">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-[#FAFAF2] hover:bg-[#CFE9C5] text-[#1D3D2C] font-mono font-bold text-xs transition flex items-center justify-center gap-2 border border-[#1D3D2C]/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1D3D2C]" />
              <span>One-Click Demo Manager Login</span>
            </button>
          </div>
        </div>

        <div className="text-center font-mono">
          <Link to="/" className="text-xs font-bold text-[#1D3D2C] hover:underline transition">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
