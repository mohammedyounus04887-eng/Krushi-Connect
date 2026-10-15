'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  MapPin, PlusCircle, Search, Filter, Phone, Star, ShieldCheck,
  Check, X, Eye, FileText, Sparkles, Building, Layers
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { LandListing } from '@/lib/types';

export default function LandLeasingPage() {
  const { currentUser, lands, leases, addLand, requestLease, updateLeaseStatus, sendMessage } = useApp();
  
  const [activeTab, setActiveTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  // Selected land modal state
  const [selectedLand, setSelectedLand] = useState<LandListing | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [proposedRent, setProposedRent] = useState(60000);
  const [durationYears, setDurationYears] = useState(3);
  const [leaseMessage, setLeaseMessage] = useState('');

  // Add land modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLand, setNewLand] = useState({
    title: '',
    location: '',
    district: 'Pune',
    state: 'Maharashtra',
    sizeAcres: 5.0,
    soilType: 'Black Soil' as const,
    waterSource: 'Drip Irrigation' as const,
    cropSuitability: ['Sugarcane', 'Tomato'],
    rentPerYear: 55000,
    description: '',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'],
    latitude: 18.5204,
    longitude: 73.8567
  });

  const sidebarItems = [
    { name: 'Browse Available Lands', tabId: 'browse', icon: Search, badge: `${lands.filter(l => l.status === 'available').length}` },
    { name: 'My Listed Lands', tabId: 'my_lands', icon: Building, badge: `${lands.filter(l => l.ownerId === currentUser.id).length}` },
    { name: 'Lease Requests', tabId: 'requests', icon: FileText, badge: `${leases.length}` },
    { name: 'Active Agreements', tabId: 'agreements', icon: Layers, badge: `${leases.filter(l => l.status === 'accepted' || l.status === 'active').length}` }
  ];

  const filteredLands = lands.filter(land => {
    const matchesSearch = land.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          land.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSoil = selectedSoil === 'All' || land.soilType === selectedSoil;
    return matchesSearch && matchesSoil;
  });

  const handleCreateLandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLand.title || !newLand.location) return;
    addLand(newLand);
    setAddModalOpen(false);
    setNewLand({
      title: '',
      location: '',
      district: 'Pune',
      state: 'Maharashtra',
      sizeAcres: 5.0,
      soilType: 'Black Soil',
      waterSource: 'Drip Irrigation',
      cropSuitability: ['Sugarcane', 'Tomato'],
      rentPerYear: 55000,
      description: '',
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'],
      latitude: 18.5204,
      longitude: 73.8567
    });
  };

  const handleSendLeaseRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLand) return;
    requestLease(selectedLand.id, proposedRent, durationYears, leaseMessage);
    setRequestModalOpen(false);
    setSelectedLand(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-2">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Land Leasing"
        moduleSubtitle="Uncultivated Land Platform"
        moduleIcon={MapPin}
        moduleColor="text-emerald-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-agri-300 bg-white/95 shadow-sm text-agri-950">
          <div>
            <h1 className="text-2xl font-black text-agri-950 flex items-center gap-2">
              🌾 Land Leasing Marketplace
            </h1>
            <p className="text-xs text-agri-700 font-medium mt-0.5">
              Connect idle uncultivated agricultural land with active farmers for long-term productivity.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center space-x-1.5 shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>+ List My Land</span>
          </button>
        </div>

        {/* Tab 1: BROWSE LANDS */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            
            {/* Search & Filters Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-agri-300 bg-white/95 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-agri-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search location, soil, district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-agri-300 rounded-xl pl-10 pr-4 py-2 text-xs text-agri-950 focus:outline-none focus:border-agri-600 focus:ring-2 focus:ring-amber-300/40"
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <select
                  value={selectedSoil}
                  onChange={(e) => setSelectedSoil(e.target.value)}
                  className="bg-white border border-agri-300 rounded-xl px-3 py-2 text-xs text-agri-950 font-bold focus:outline-none focus:border-agri-600"
                >
                  <option value="All">All Soil Types</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                </select>

                <div className="flex items-center bg-agri-50 p-1 rounded-xl border border-agri-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${viewMode === 'grid' ? 'bg-agri-600 text-white shadow-sm' : 'text-agri-700 hover:text-agri-950'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${viewMode === 'map' ? 'bg-agri-600 text-white shadow-sm' : 'text-agri-700 hover:text-agri-950'}`}
                  >
                    Map
                  </button>
                </div>
              </div>
            </div>

            {/* View Mode: MAP VIEW */}
            {viewMode === 'map' ? (
              <div className="glass-panel p-6 rounded-3xl border border-agri-300 bg-white/95 text-center space-y-4 shadow-sm">
                <div className="w-full h-80 rounded-2xl bg-gradient-to-b from-agri-50 to-emerald-50 border border-agri-300 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px]" />
                  <MapPin className="w-12 h-12 text-agri-600 animate-bounce mb-2" />
                  <p className="font-extrabold text-agri-950 text-base">Interactive Land Geolocation Map</p>
                  <p className="text-xs text-agri-700 font-medium max-w-md mt-1">
                    Showing GIS boundary coordinates for {filteredLands.length} verified listings across Maharashtra & Karnataka.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {filteredLands.map(l => (
                      <span key={l.id} className="px-3 py-1 rounded-full bg-white text-agri-900 text-xs font-bold border border-agri-300 shadow-sm">
                        📍 {l.title.substring(0, 20)}... ({l.sizeAcres} Acres)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode: GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLands.map((land) => (
                  <div
                    key={land.id}
                    className="bg-white/95 rounded-3xl border border-agri-200 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm text-agri-950"
                  >
                    {/* Land Image Banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-agri-100">
                      <img
                        src={land.images[0]}
                        alt={land.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-agri-300 text-[11px] font-black text-agri-900 shadow-sm">
                        {land.sizeAcres} Acres Plot
                      </div>
                      <div className="absolute top-3 right-3 bg-amber-400 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500 text-[11px] font-black text-agri-950 shadow-sm">
                        ₹{land.rentPerYear.toLocaleString()}/year
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-center text-xs text-agri-700 font-bold space-x-1 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-agri-600" />
                          <span>{land.location} ({land.state})</span>
                        </div>
                        <h3 className="text-lg font-black text-agri-950 line-clamp-1">{land.title}</h3>
                        <p className="text-xs text-agri-800/80 font-medium mt-1 line-clamp-2">{land.description}</p>
                      </div>

                      {/* Soil & Irrigation Tags */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2 rounded-xl bg-agri-50/80 border border-agri-200">
                          <span className="text-agri-700 text-[10px] block font-bold">SOIL TYPE</span>
                          <span className="text-agri-950 font-black">{land.soilType}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200">
                          <span className="text-emerald-800 text-[10px] block font-bold">WATER SOURCE</span>
                          <span className="text-emerald-950 font-black">{land.waterSource}</span>
                        </div>
                      </div>

                      {/* Suitable Crops */}
                      <div className="flex flex-wrap gap-1.5">
                        {land.cropSuitability.map((crop, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-100 text-[10px] font-bold text-amber-900 border border-amber-300">
                            🌱 {crop}
                          </span>
                        ))}
                      </div>

                      {/* Owner Info & Action Buttons */}
                      <div className="pt-3 border-t border-agri-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-agri-100 border border-agri-300 flex items-center justify-center text-agri-900 text-xs font-black">
                            {land.ownerName.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-agri-950 leading-none">{land.ownerName}</p>
                            <p className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5 mt-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {land.ownerRating} Owner Rating
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedLand(land);
                            setProposedRent(land.rentPerYear);
                            setRequestModalOpen(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-agri-600 text-white font-extrabold text-xs hover:bg-agri-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all shadow-sm"
                        >
                          Request Lease
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: MY LISTED LANDS */}
        {activeTab === 'my_lands' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Your Listed Farmland Properties</h3>

            {lands.filter(l => l.ownerId === currentUser.id).length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 space-y-3 shadow-sm">
                <p className="text-agri-700 font-medium text-sm">You haven't listed any land yet.</p>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-agri-600 text-white font-extrabold text-xs shadow-sm hover:bg-agri-500 transition-colors"
                >
                  + Add Your First Plot
                </button>
              </div>
            ) : (
              lands.filter(l => l.ownerId === currentUser.id).map(l => (
                <div key={l.id} className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-extrabold text-agri-950 text-base">{l.title}</h4>
                    <p className="text-xs text-agri-700 font-medium">{l.location} • {l.sizeAcres} Acres • ₹{l.rentPerYear.toLocaleString()}/yr</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold border border-agri-300 capitalize">
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: LEASE REQUESTS */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Lease Proposals & Enquiries ({leases.length})</h3>

            {leases.length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 shadow-sm">
                <p className="text-agri-700 font-medium text-sm">No lease requests found.</p>
              </div>
            ) : (
              leases.map(lease => (
                <div key={lease.id} className="glass-panel p-5 rounded-2xl bg-white border border-agri-200 space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        {lease.status.toUpperCase()}
                      </span>
                      <h4 className="font-extrabold text-agri-950 text-base mt-1">{lease.landTitle}</h4>
                      <p className="text-xs text-agri-700 font-medium">{lease.landLocation}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-agri-700">₹{lease.proposedRent.toLocaleString()} / year</p>
                      <p className="text-xs text-agri-800 font-semibold">{lease.durationYears} Years Term</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-agri-50 border border-agri-200 text-xs text-agri-900 space-y-1">
                    <p className="font-bold text-agri-950">Farmer: {lease.farmerName} ({lease.farmerPhone})</p>
                    <p className="italic text-agri-800 font-medium">"{lease.message}"</p>
                  </div>

                  {lease.status === 'pending' && (
                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => updateLeaseStatus(lease.id, 'accepted')}
                        className="px-3.5 py-1.5 rounded-xl bg-agri-600 text-white font-bold text-xs flex items-center space-x-1 hover:bg-agri-500 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-300" />
                        <span>Accept Lease Proposal</span>
                      </button>
                      <button
                        onClick={() => updateLeaseStatus(lease.id, 'rejected')}
                        className="px-3 py-1.5 rounded-xl bg-red-100 text-red-800 border border-red-300 text-xs font-bold hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: ACTIVE AGREEMENTS */}
        {activeTab === 'agreements' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Active Leased Agreements</h3>
            {leases.filter(l => l.status === 'accepted' || l.status === 'active').length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 shadow-sm">
                <p className="text-agri-700 font-medium text-sm">No active lease agreements found yet.</p>
              </div>
            ) : (
              leases.filter(l => l.status === 'accepted' || l.status === 'active').map(l => (
                <div key={l.id} className="glass-panel p-5 rounded-2xl border border-agri-300 space-y-2 bg-gradient-to-r from-agri-50 to-amber-50 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-agri-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-agri-600" /> Active Verified Contract
                    </span>
                    <span className="text-xs font-mono font-bold text-agri-700">Ref: {l.id}</span>
                  </div>
                  <h4 className="font-black text-agri-950 text-base">{l.landTitle}</h4>
                  <p className="text-xs text-agri-800 font-medium">Cultivator: {l.farmerName} • Rent: ₹{l.proposedRent.toLocaleString()}/yr</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* MODAL 1: LIST MY LAND (LANDOWNER FLOW) */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl bg-white border border-agri-300 space-y-4 animate-in fade-in zoom-in-95 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">List Your Agricultural Land</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLandSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Land Title / Property Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunny Riverside Black Soil Acreage"
                  value={newLand.title}
                  onChange={e => setNewLand({...newLand, title: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600 focus:ring-2 focus:ring-amber-300/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Location / Village</label>
                  <input
                    type="text"
                    required
                    placeholder="Baramati, Pune"
                    value={newLand.location}
                    onChange={e => setNewLand({...newLand, location: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newLand.sizeAcres}
                    onChange={e => setNewLand({...newLand, sizeAcres: parseFloat(e.target.value) || 1})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Soil Type</label>
                  <select
                    value={newLand.soilType}
                    onChange={e => setNewLand({...newLand, soilType: e.target.value as any})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  >
                    <option value="Black Soil">Black Soil</option>
                    <option value="Red Soil">Red Soil</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                    <option value="Clay">Clay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Expected Rent (₹/Year)</label>
                  <input
                    type="number"
                    value={newLand.rentPerYear}
                    onChange={e => setNewLand({...newLand, rentPerYear: parseInt(e.target.value) || 10000})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Description & Water Facilities</label>
                <textarea
                  rows={3}
                  placeholder="Describe irrigation borewell, road connectivity, soil health..."
                  value={newLand.description}
                  onChange={e => setNewLand({...newLand, description: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-medium focus:border-agri-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: REQUEST LEASE (FARMER FLOW) */}
      {requestModalOpen && selectedLand && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Lease Proposal Request</h3>
              <button onClick={() => setRequestModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-agri-50 border border-agri-200 text-xs">
              <p className="font-bold text-agri-950">{selectedLand.title}</p>
              <p className="text-agri-700 font-medium">{selectedLand.location} • Owner: {selectedLand.ownerName}</p>
            </div>

            <form onSubmit={handleSendLeaseRequest} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Proposed Annual Rent (₹/Year)</label>
                <input
                  type="number"
                  value={proposedRent}
                  onChange={e => setProposedRent(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Desired Lease Duration (Years)</label>
                <select
                  value={durationYears}
                  onChange={e => setDurationYears(parseInt(e.target.value))}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                >
                  <option value={1}>1 Year</option>
                  <option value={2}>2 Years</option>
                  <option value={3}>3 Years</option>
                  <option value={5}>5 Years</option>
                </select>
              </div>

              <div>
                <label className="block text-agri-950 font-bold mb-1">Message to Landowner</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain your proposed crops, drip setup, and payment schedule..."
                  value={leaseMessage}
                  onChange={e => setLeaseMessage(e.target.value)}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-medium focus:border-agri-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRequestModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm"
                >
                  Submit Lease Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
