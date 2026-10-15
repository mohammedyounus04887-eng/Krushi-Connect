'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  ShoppingBag, Warehouse, PlusCircle, Search, MapPin, Phone,
  Star, CheckCircle2, ShieldAlert, X, Tag, Package
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { ProduceListing } from '@/lib/types';

export default function CropMarketPage() {
  const { currentUser, produce, storages, addProduceListing, sendMessage } = useApp();
  
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sell produce modal state
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [newProduce, setNewProduce] = useState({
    cropName: 'Red Vine Tomato',
    category: 'Vegetables' as const,
    quantityKg: 2000,
    pricePerKg: 35,
    location: 'Baramati, Pune',
    harvestDate: '2026-08-28',
    quality: 'Grade A Premium' as const,
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
    description: '',
    storageOption: ''
  });

  const sidebarItems = [
    { name: 'Produce Marketplace', tabId: 'marketplace', icon: ShoppingBag, badge: `${produce.length}` },
    { name: 'Cold Storage Locator', tabId: 'storages', icon: Warehouse, badge: `${storages.length}` },
    { name: 'My Listed Produce', tabId: 'my_produce', icon: Package, badge: `${produce.filter(p => p.farmerId === currentUser.id).length}` }
  ];

  const filteredProduce = produce.filter(p => {
    const matchesSearch = p.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduceListing(newProduce);
    setSellModalOpen(false);
    setNewProduce({
      cropName: 'Red Vine Tomato',
      category: 'Vegetables',
      quantityKg: 2000,
      pricePerKg: 35,
      location: 'Baramati, Pune',
      harvestDate: '2026-08-28',
      quality: 'Grade A Premium',
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
      description: '',
      storageOption: ''
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-2">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Crop Market & Storage"
        moduleSubtitle="Produce Sales Platform"
        moduleIcon={ShoppingBag}
        moduleColor="text-green-400"
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
              🌽 Crop Marketplace & Cold Storage
            </h1>
            <p className="text-xs text-agri-700 font-medium mt-0.5">
              Direct B2B crop trade, spot price tracking, and cold storage booking network.
            </p>
          </div>

          <button
            onClick={() => setSellModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center space-x-1.5 shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>+ Sell Harvest Produce</span>
          </button>
        </div>

        {/* TAB 1: PRODUCE MARKETPLACE */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="glass-panel p-4 rounded-2xl border border-agri-300 bg-white/95 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-agri-950">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-agri-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search crop name or location..."
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
                <option value="All">All Produce Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
              </select>
            </div>

            {/* Produce Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProduce.map(p => (
                <div key={p.id} className="bg-white/95 rounded-3xl border border-agri-200 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm text-agri-950">
                  
                  {/* Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-agri-100">
                    <img src={p.images[0]} alt={p.cropName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-agri-300 text-[11px] font-black text-agri-900 shadow-sm">
                      {p.quality} Grade
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-400 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500 text-[11px] font-black text-agri-950 shadow-sm">
                      ₹{p.pricePerKg}/kg
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-agri-700 uppercase tracking-wide">{p.category}</span>
                      <h3 className="text-lg font-black text-agri-950 line-clamp-1">{p.cropName}</h3>
                      <p className="text-xs text-agri-700 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-agri-600" /> {p.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded-xl bg-agri-50 border border-agri-200">
                        <span className="text-agri-700 text-[10px] block font-bold">AVAILABLE QUANTITY</span>
                        <span className="text-agri-950 font-black">{p.quantityKg.toLocaleString()} kg</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="text-amber-800 text-[10px] block font-bold">HARVEST DATE</span>
                        <span className="text-amber-950 font-black">{p.harvestDate}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-agri-200 flex items-center justify-between">
                      <span className="text-xs text-agri-700 font-medium">Farmer: <strong className="text-agri-950 font-bold">{p.farmerName}</strong></span>

                      <button
                        onClick={() => sendMessage(p.farmerId, p.farmerName, `Hi ${p.farmerName}, I want to buy your produce: ${p.cropName}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-agri-600 text-white font-extrabold text-xs hover:bg-agri-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all shadow-sm"
                      >
                        Contact Farmer
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: COLD STORAGE LOCATOR */}
        {activeTab === 'storages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">Nearby Cold Storage & Warehouse Facilities</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storages.map(s => (
                <div key={s.id} className="glass-panel p-5 rounded-3xl bg-white border border-agri-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 space-y-4 shadow-sm text-agri-950">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-agri-100 text-agri-800 border border-agri-300 uppercase">
                        {s.type}
                      </span>
                      <h4 className="font-black text-agri-950 text-base mt-1">{s.name}</h4>
                      <p className="text-xs text-agri-700 font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-agri-600" /> {s.location} ({s.distanceKm} km away)
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-black text-amber-600">₹{s.pricePerTonMonth}</p>
                      <p className="text-[10px] text-agri-700 font-mono font-bold uppercase">Per Ton / Month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-agri-50 border border-agri-200">
                      <span className="text-agri-700 text-[10px] block font-bold">TOTAL CAPACITY</span>
                      <span className="text-agri-950 font-black">{s.capacityTons} Tons</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-800 text-[10px] block font-bold">AVAILABLE SPACE</span>
                      <span className="text-emerald-950 font-black">{s.availableTons} Tons</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-amber-700 font-bold flex items-center gap-1">★ {s.rating} Facility Rating</span>
                    <a
                      href={`tel:${s.phone}`}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-extrabold hover:bg-amber-200 transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-700" /> Book Capacity
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MY LISTED PRODUCE */}
        {activeTab === 'my_produce' && (
          <div className="space-y-4">
            <h3 className="text-lg font-black text-agri-950">My Listed Crop Produce Batches</h3>
            {produce.filter(p => p.farmerId === currentUser.id).length === 0 ? (
              <div className="glass-panel p-8 text-center rounded-3xl bg-white border border-agri-300 space-y-3 shadow-sm text-agri-950">
                <p className="text-agri-700 font-medium text-sm">No produce listed for sale yet.</p>
                <button onClick={() => setSellModalOpen(true)} className="px-4 py-2 rounded-xl bg-agri-600 text-white font-extrabold text-xs shadow-sm">
                  + Add Produce Listing
                </button>
              </div>
            ) : (
              produce.filter(p => p.farmerId === currentUser.id).map(p => (
                <div key={p.id} className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 flex items-center justify-between shadow-sm text-agri-950">
                  <div>
                    <h4 className="font-extrabold text-agri-950 text-base">{p.cropName}</h4>
                    <p className="text-xs text-agri-700 font-medium">{p.quantityKg} kg • ₹{p.pricePerKg}/kg • {p.location}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-xs font-bold border border-agri-300">
                    {p.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* MODAL: SELL PRODUCE */}
      {sellModalOpen && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Sell Produce Listing</h3>
              <button onClick={() => setSellModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSellSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Red Vine Tomato"
                  value={newProduce.cropName}
                  onChange={e => setNewProduce({...newProduce, cropName: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Category</label>
                  <select
                    value={newProduce.category}
                    onChange={e => setNewProduce({...newProduce, category: e.target.value as any})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                  </select>
                </div>

                <div>
                  <label className="block text-agri-950 font-bold mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    value={newProduce.quantityKg}
                    onChange={e => setNewProduce({...newProduce, quantityKg: parseInt(e.target.value) || 100})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Expected Price (₹/kg)</label>
                  <input
                    type="number"
                    value={newProduce.pricePerKg}
                    onChange={e => setNewProduce({...newProduce, pricePerKg: parseInt(e.target.value) || 10})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>

                <div>
                  <label className="block text-agri-950 font-bold mb-1">Harvest Date</label>
                  <input
                    type="date"
                    value={newProduce.harvestDate}
                    onChange={e => setNewProduce({...newProduce, harvestDate: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSellModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm"
                >
                  Publish Produce Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
