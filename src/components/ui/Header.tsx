'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout, ChevronDown, Bell, MessageSquare, Shield, User,
  MapPin, Users, TrendingUp, ShoppingBag, Landmark, Compass, Activity, LayoutDashboard, X, CheckCircle
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { UserRole } from '@/lib/types';

export default function Header() {
  const pathname = usePathname();
  const { currentUser, switchUserRole, notifications, markNotificationRead, messages } = useApp();
  
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const unreadMsgCount = messages.filter(m => !m.read).length;

  const modulesList = [
    {
      name: 'Land Leasing',
      path: '/land-leasing',
      icon: MapPin,
      color: 'text-emerald-400',
      badge: 'Lease & Earn',
      desc: 'Connect idle agricultural land with active farmers.'
    },
    {
      name: 'Labour Community',
      path: '/labour-community',
      icon: Users,
      color: 'text-amber-400',
      badge: 'Workforce',
      desc: 'Hire skilled farm workers or offer agricultural labor.'
    },
    {
      name: 'Crop Demand AI',
      path: '/crop-demand',
      icon: TrendingUp,
      color: 'text-sky-400',
      badge: 'Intelligence',
      desc: 'Market trend prediction & optimal crop planning.'
    },
    {
      name: 'Crop Market',
      path: '/crop-market',
      icon: ShoppingBag,
      color: 'text-green-400',
      badge: 'Marketplace',
      desc: 'Direct produce sales and cold storage locator.'
    },
    {
      name: '₹1 Scheme',
      path: '/schemes',
      icon: Landmark,
      color: 'text-yellow-400',
      badge: 'Govt & Insurance',
      desc: 'Pradhan Mantri crop insurance enrollment & scheme advisor.'
    },
    {
      name: 'Precision Farming',
      path: '/precision-farming',
      icon: Compass,
      color: 'text-cyan-400',
      badge: 'Tech Command',
      desc: 'Soil N-P-K gauges, farm map visualizer & smart irrigation.'
    },
    {
      name: 'Cultivation Monitoring',
      path: '/cultivation-monitoring',
      icon: Activity,
      color: 'text-emerald-300',
      badge: 'Crop Timeline',
      desc: 'Farm growth stage tracking, tasks & pest alert center.'
    }
  ];

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'farmer', label: '🌾 Farmer', desc: 'Lease land, hire workers, sell crops & monitor farms' },
    { role: 'landowner', label: '🏞 Landowner', desc: 'List uncultivated land & manage lease proposals' },
    { role: 'worker', label: '👨‍🌾 Agri Worker', desc: 'Browse available jobs, apply & set daily rate' },
    { role: 'buyer', label: '🛒 Produce Buyer', desc: 'Procure bulk vegetables/fruits direct from farmers' },
    { role: 'admin', label: '🛡 Admin', desc: 'System management, moderation & platform analytics' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-agri-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-agri-600 via-agri-500 to-amber-400 p-0.5 shadow-glow-agri group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-agri-600 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-agri-950 flex items-center gap-1.5">
                KRUSHI CONNECT <span className="text-xs bg-amber-100 text-amber-800 border border-amber-300/80 px-2 py-0.5 rounded-full font-mono font-bold">v2.0</span>
              </span>
              <p className="text-[11px] font-bold text-agri-700 uppercase tracking-widest">First Serve Farmers</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === '/' ? 'bg-agri-600 text-white border-b-2 border-amber-400 shadow-sm' : 'text-agri-900 hover:text-agri-700 hover:bg-agri-50/80'
              }`}
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-colors ${
                pathname === '/dashboard' ? 'bg-agri-600 text-white border-b-2 border-amber-400 shadow-sm' : 'text-agri-900 hover:text-agri-700 hover:bg-agri-50/80'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${pathname === '/dashboard' ? 'text-amber-300' : 'text-agri-600'}`} />
              <span>Main Dashboard</span>
            </Link>

            {/* Mega-Menu Services Trigger */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-agri-900 hover:text-agri-700 hover:bg-agri-50/80 flex items-center space-x-1.5 transition-colors"
              >
                <span>7 Services</span>
                <ChevronDown className={`w-4 h-4 text-agri-600 transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega-Menu Dropdown */}
              {megaMenuOpen && (
                <div
                  onMouseLeave={() => setMegaMenuOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-3 w-[740px] bg-white/95 backdrop-blur-xl p-6 shadow-2xl z-50 grid grid-cols-2 gap-4 border border-agri-200 rounded-3xl animate-in fade-in slide-in-from-top-2 text-agri-950"
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-agri-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-agri-700 uppercase tracking-wider">Connected Agricultural Ecosystem Modules</span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">One Platform → 7 Applications</span>
                  </div>

                  {modulesList.map((m) => {
                    const Icon = m.icon;
                    return (
                      <Link
                        key={m.path}
                        href={m.path}
                        onClick={() => setMegaMenuOpen(false)}
                        className="flex items-start p-3 rounded-2xl hover:bg-agri-50 border border-transparent hover:border-agri-200 transition-all group"
                      >
                        <div className={`p-2.5 rounded-xl bg-agri-100 ${m.color} mr-3.5 group-hover:scale-110 transition-transform border border-agri-200`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-agri-950 group-hover:text-agri-700 text-sm">{m.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                              {m.badge}
                            </span>
                          </div>
                          <p className="text-xs text-agri-700/80 mt-1 line-clamp-1">{m.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Admin Link if Admin */}
            {currentUser.role === 'admin' && (
              <Link
                href="/admin"
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-1.5 transition-colors ${
                  pathname === '/admin' ? 'bg-amber-400 text-agri-950 font-bold border-b-2 border-agri-600 shadow-sm' : 'text-amber-700 hover:bg-amber-100/80 font-bold'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            )}
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Messages Button */}
            <Link
              href="/messages"
              className="relative p-2.5 rounded-xl bg-agri-50 border border-agri-200 text-agri-800 hover:text-agri-950 hover:bg-amber-50 hover:border-amber-400 transition-colors shadow-sm"
              title="Internal Messaging"
            >
              <MessageSquare className="w-5 h-5 text-agri-700" />
              {unreadMsgCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-agri-950 text-[10px] font-extrabold flex items-center justify-center shadow-md">
                  {unreadMsgCount}
                </span>
              )}
            </Link>

            {/* Notification Bell Button */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl bg-agri-50 border border-agri-200 text-agri-800 hover:text-agri-950 hover:bg-amber-50 hover:border-amber-400 transition-colors shadow-sm"
              >
                <Bell className="w-5 h-5 text-agri-700" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-agri-950 text-[10px] font-extrabold flex items-center justify-center animate-pulse shadow-md">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer */}
              {notifOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white/95 backdrop-blur-xl p-4 shadow-2xl z-50 border border-agri-200 rounded-3xl text-agri-950">
                  <div className="flex items-center justify-between pb-3 border-b border-agri-200">
                    <span className="font-bold text-agri-950 text-sm flex items-center gap-2">
                      <Bell className="w-4 h-4 text-agri-600" /> Global Notifications
                    </span>
                    <button onClick={() => setNotifOpen(false)} className="text-agri-600 hover:text-agri-900">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto mt-2 space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-agri-600 text-center py-6">No notifications yet.</p>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                            n.read ? 'bg-agri-50/50 border-agri-200 text-agri-700' : 'bg-amber-50 border-amber-300 text-agri-950 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span className="text-agri-800">{n.title}</span>
                            <span className="text-[10px] text-agri-600 font-normal">{n.timestamp}</span>
                          </div>
                          <p>{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-agri-50 border border-agri-200 hover:bg-amber-50 hover:border-amber-400 transition-colors shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-agri-100 border border-agri-400/40">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-agri-950 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-agri-700 capitalize font-semibold">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-agri-700" />
              </button>

              {roleMenuOpen && (
                <div
                  onMouseLeave={() => setRoleMenuOpen(false)}
                  className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl p-3 shadow-2xl z-50 border border-agri-200 rounded-3xl text-agri-950"
                >
                  <p className="text-[10px] font-bold uppercase text-agri-700 px-2 pb-2 border-b border-agri-200 mb-2">
                    Switch Role Perspective
                  </p>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          switchUserRole(r.role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currentUser.role === r.role ? 'bg-agri-600 text-white font-bold border border-agri-700 shadow-sm' : 'hover:bg-agri-50 text-agri-900 font-medium'
                        }`}
                      >
                        <div>
                          <p>{r.label}</p>
                          <p className={`text-[10px] font-normal ${currentUser.role === r.role ? 'text-amber-200' : 'text-agri-600'}`}>{r.desc}</p>
                        </div>
                        {currentUser.role === r.role && <CheckCircle className="w-3.5 h-3.5 text-amber-300" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
