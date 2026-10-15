'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  Landmark, ShieldCheck, CheckCircle2, FileText, Search,
  ExternalLink, Sparkles, HelpCircle, ArrowRight
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { GovScheme } from '@/lib/types';

export default function SchemesPage() {
  const { currentUser, schemes, schemeApplications, applyScheme } = useApp();
  
  const [activeTab, setActiveTab] = useState('explorer');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Eligibility Checker Form
  const [elForm, setElForm] = useState({
    age: 38,
    state: 'Maharashtra',
    farmerType: 'Small & Marginal',
    landOwnership: 'Leased Cultivator',
    crop: 'Tomato & Vegetables',
    incomeCategory: 'Under ₹2.5 Lakhs'
  });

  const [elMatches, setElMatches] = useState<GovScheme[] | null>(null);

  const sidebarItems = [
    { name: 'Government Scheme Explorer', tabId: 'explorer', icon: Landmark, badge: `${schemes.length}` },
    { name: 'Instant Eligibility Checker', tabId: 'eligibility', icon: ShieldCheck, badge: 'Smart Advisor' },
    { name: 'My Scheme Applications', tabId: 'my_apps', icon: FileText, badge: `${schemeApplications.length}` }
  ];

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.benefits.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setElMatches(schemes);
  };

  return (
    <div className="module-app-layout">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="₹1 Scheme & Insurance"
        moduleSubtitle="Government Guidance Center"
        moduleIcon={Landmark}
        moduleColor="text-yellow-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Disclaimer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card-gold p-5 rounded-2xl">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-bold uppercase tracking-wider mb-1 border border-yellow-500/40">
              Information & Guidance Portal
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🌾 ₹1 Crop Insurance & Government Scheme Advisor
            </h2>
            <p className="text-xs text-gray-300 mt-0.5">
              Simplifying eligibility, document checklists, and application steps for agricultural welfare schemes.
            </p>
          </div>
        </div>

        {/* TAB 1: SCHEME EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-agri-300 bg-white/95 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-agri-950">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-agri-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search scheme name or benefit..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-agri-300 rounded-xl pl-10 pr-4 py-2 text-xs text-agri-950 font-medium focus:outline-none focus:border-agri-600 focus:ring-2 focus:ring-amber-300/40"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-white border border-agri-300 rounded-xl px-3 py-2 text-xs text-agri-950 font-bold focus:outline-none focus:border-agri-600"
              >
                <option value="All">All Categories</option>
                <option value="Insurance">Insurance & Loss Protection</option>
                <option value="Credit">Direct Credit Transfer</option>
                <option value="Soil & Water">Soil & Water Management</option>
              </select>
            </div>

            {/* Scheme Cards */}
            <div className="space-y-6">
              {filteredSchemes.map(s => (
                <div
                  key={s.id}
                  className={`glass-panel p-6 rounded-3xl transition-all duration-300 ${
                    s.is1RupeeScheme
                      ? 'border-2 border-amber-400 shadow-md bg-gradient-to-br from-amber-50 via-white to-agri-50 text-agri-950'
                      : 'bg-white border border-agri-200 hover:border-amber-400 hover:shadow-xl shadow-sm text-agri-950'
                  } space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-agri-200 pb-3">
                    <div>
                      {s.is1RupeeScheme && (
                        <span className="px-3 py-1 rounded-full bg-amber-400 text-agri-950 font-black text-[10px] uppercase border border-amber-500 mr-2 shadow-sm">
                          ★ ₹1 Token Enrollment Scheme
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-agri-700 uppercase">{s.category}</span>
                      <h3 className="text-xl font-black text-agri-950 mt-1">{s.title}</h3>
                    </div>

                    <a
                      href={`https://${s.officialSource}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-agri-100 border border-agri-300 text-agri-900 text-xs font-bold flex items-center space-x-1.5 hover:bg-agri-200 shrink-0"
                    >
                      <span>Official Portal: {s.officialSource}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-agri-600" />
                    </a>
                  </div>

                  <p className="text-xs text-agri-900 font-medium leading-relaxed">{s.benefits}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded-2xl bg-agri-50/80 border border-agri-200 space-y-1.5">
                      <span className="text-agri-950 font-black text-[11px] block">✅ ELIGIBILITY CRITERIA</span>
                      <ul className="space-y-1 text-agri-900 text-[11px] font-sans font-medium">
                        {s.eligibility.map((e, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-agri-600 font-bold">•</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                      <span className="text-amber-950 font-black text-[11px] block">📄 REQUIRED DOCUMENTS</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {s.requiredDocs.map((doc, idx) => (
                          <span key={idx} className="px-2 py-1 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-agri-700 font-medium">Target Group: <strong className="text-agri-950 font-bold">{s.targetGroup}</strong></span>

                    <button
                      onClick={() => applyScheme(s.id)}
                      className="px-4 py-2 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] shadow-sm"
                    >
                      Apply Guidance Wizard
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: ELIGIBILITY CHECKER */}
        {activeTab === 'eligibility' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-agri-950">
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-agri-950">Farmer Profile Eligibility Calculator</h3>
              <form onSubmit={handleCheckEligibility} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">State / Territory</label>
                  <input
                    type="text"
                    value={elForm.state}
                    onChange={e => setElForm({...elForm, state: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Farmer Type</label>
                    <select
                      value={elForm.farmerType}
                      onChange={e => setElForm({...elForm, farmerType: e.target.value})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    >
                      <option value="Small & Marginal">Small & Marginal (&lt; 2 Hectares)</option>
                      <option value="Large Farmer">Large Farmer (&gt; 2 Hectares)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Land Status</label>
                    <select
                      value={elForm.landOwnership}
                      onChange={e => setElForm({...elForm, landOwnership: e.target.value})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    >
                      <option value="Owner Cultivator">Owner Cultivator</option>
                      <option value="Leased Cultivator">Leased Cultivator</option>
                      <option value="Sharecropper">Sharecropper</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs shadow-sm hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all"
                >
                  Check Eligible Schemes
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {elMatches ? (
                <div className="space-y-3">
                  <h4 className="font-black text-agri-950 text-base">Matching Government Schemes ({elMatches.length})</h4>
                  {elMatches.map(m => (
                    <div key={m.id} className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 space-y-2 shadow-sm">
                      <h5 className="font-extrabold text-agri-950 text-sm">{m.title}</h5>
                      <p className="text-xs text-agri-800 font-medium">{m.benefits}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-12 text-center rounded-3xl bg-white border border-agri-300 shadow-sm">
                  <p className="text-agri-700 font-medium text-xs">Fill out form on left to view matched schemes.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MY SCHEME APPLICATIONS */}
        {activeTab === 'my_apps' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Your Submitted Guidance Requests</h3>
            {schemeApplications.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 shadow-sm">
                <p className="text-agri-700 font-medium text-sm">No applications submitted yet.</p>
              </div>
            ) : (
              schemeApplications.map(app => (
                <div key={app.id} className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 flex items-center justify-between shadow-sm text-agri-950">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-agri-700">REF: {app.referenceNo}</span>
                    <h4 className="font-extrabold text-agri-950 text-base mt-0.5">{app.schemeTitle}</h4>
                    <p className="text-xs text-agri-700 font-medium">Submitted: {app.submittedDate}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  );
}
