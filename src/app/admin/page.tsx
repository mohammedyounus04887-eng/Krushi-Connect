'use client';

import React, { useState } from 'react';
import {
  Shield, Users, MapPin, Briefcase, ShoppingBag, Landmark,
  BarChart3, Trash2, CheckCircle2, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { useApp } from '@/lib/context';
import Link from 'next/link';

export default function AdminPage() {
  const { currentUser, users, lands, jobs, produce, deleteLand, deleteJob } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'lands' | 'jobs'>('overview');

  if (currentUser.role !== 'admin') {
    return (
      <div className="glass-panel p-12 text-center rounded-3xl space-y-4 my-10 border border-amber-500/30">
        <Shield className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Administrator Access Required</h2>
        <p className="text-xs text-gray-400">Please switch your user role perspective to "Admin" using the top header menu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2 text-agri-950">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-white to-agri-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="p-2 rounded-xl bg-agri-100 border border-agri-300 text-agri-900 hover:bg-agri-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-agri-800" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-agri-950 flex items-center gap-2">
              🛡 Krushi Connect Admin Governance Console
            </h1>
            <p className="text-xs text-agri-800 font-medium">Ecosystem moderation, user management, and system analytics.</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-400 text-agri-950 text-xs font-mono font-black border border-amber-500 self-start sm:self-auto shadow-sm">
          ● SYSTEM HEALTH: 100% ONLINE
        </span>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center space-x-2 border-b border-agri-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview' ? 'bg-agri-600 text-white shadow-sm' : 'bg-white border border-agri-200 text-agri-700 hover:text-agri-950'
          }`}
        >
          Overview & KPIs
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'users' ? 'bg-agri-600 text-white shadow-sm' : 'bg-white border border-agri-200 text-agri-700 hover:text-agri-950'
          }`}
        >
          User Registry ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('lands')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'lands' ? 'bg-agri-600 text-white shadow-sm' : 'bg-white border border-agri-200 text-agri-700 hover:text-agri-950'
          }`}
        >
          Land Moderation ({lands.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jobs' ? 'bg-agri-600 text-white shadow-sm' : 'bg-white border border-agri-200 text-agri-700 hover:text-agri-950'
          }`}
        >
          Labour Jobs ({jobs.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & KPIS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-amber-700">TOTAL USERS</span>
              <p className="text-3xl font-black text-agri-950">{users.length}</p>
              <p className="text-[10px] text-agri-700 font-medium">Registered across 5 roles</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-agri-700">LISTED FARMLANDS</span>
              <p className="text-3xl font-black text-agri-950">{lands.length}</p>
              <p className="text-[10px] text-agri-700 font-medium">Active land leasing plots</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-emerald-700">LABOUR JOB POSTS</span>
              <p className="text-3xl font-black text-agri-950">{jobs.length}</p>
              <p className="text-[10px] text-agri-700 font-medium">Workforce requirements</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-amber-800">PRODUCE LISTINGS</span>
              <p className="text-3xl font-black text-agri-950">{produce.length}</p>
              <p className="text-[10px] text-agri-700 font-medium">Marketplace listings</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER REGISTRY */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm">
          <h3 className="text-lg font-black text-agri-950">Registered Ecosystem Accounts</h3>
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="p-3.5 rounded-2xl bg-agri-50/80 border border-agri-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-agri-100 border border-agri-300">
                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-extrabold text-agri-950">{u.name}</p>
                    <p className="text-[10px] text-agri-700 font-medium">{u.email} • {u.location}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black uppercase text-[10px] border border-amber-300">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LAND MODERATION */}
      {activeTab === 'lands' && (
        <div className="glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm">
          <h3 className="text-lg font-black text-agri-950">Moderate Land Listings</h3>
          <div className="space-y-3">
            {lands.map(l => (
              <div key={l.id} className="p-4 rounded-2xl bg-agri-50/80 border border-agri-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-agri-950">{l.title}</h4>
                  <p className="text-[11px] text-agri-700 font-medium">{l.location} • Owner: {l.ownerName} • Rent: ₹{l.rentPerYear}/yr</p>
                </div>
                <button
                  onClick={() => deleteLand(l.id)}
                  className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 font-bold flex items-center gap-1 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LABOUR JOBS */}
      {activeTab === 'jobs' && (
        <div className="glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm">
          <h3 className="text-lg font-black text-agri-950">Moderate Labour Job Listings</h3>
          <div className="space-y-3">
            {jobs.map(j => (
              <div key={j.id} className="p-4 rounded-2xl bg-agri-50/80 border border-agri-200 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-agri-950">{j.title}</h4>
                  <p className="text-[11px] text-agri-700 font-medium">{j.location} • Farmer: {j.farmerName} • Budget: ₹{j.budgetPerDay}/day</p>
                </div>
                <button
                  onClick={() => deleteJob(j.id)}
                  className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 font-bold flex items-center gap-1 hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
