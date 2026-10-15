'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  Compass, Droplets, Sun, Wind, Thermometer, MapPin,
  CheckCircle, PlusCircle, Activity, Sparkles, X, RefreshCw
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { FarmZone } from '@/lib/types';

export default function PrecisionFarmingPage() {
  const { farms, addFarm } = useApp();
  
  const [activeTab, setActiveTab] = useState('command');
  const [selectedFarmId, setSelectedFarmId] = useState(farms[0]?.id || 'farm_1');

  // Add farm modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newFarm, setNewFarm] = useState({
    farmName: 'Baramati Green Sector Gamma',
    acreage: 5.5,
    crop: 'Capsicum & Chilli',
    soilMoisture: 38,
    soilpH: 6.5,
    nitrogenN: 135,
    phosphorusP: 32,
    potassiumK: 195,
    irrigationStatus: 'Optimal' as const,
    healthScore: 90,
    weatherForecast: 'Clear sky, high solar index.',
    tempC: 29,
    rainProbability: 15
  });

  const activeFarm = farms.find(f => f.id === selectedFarmId) || farms[0] || {
    id: 'demo',
    farmName: 'Demo Plot Alpha',
    acreage: 4.5,
    crop: 'Tomato',
    soilMoisture: 42,
    soilpH: 6.8,
    nitrogenN: 140,
    phosphorusP: 35,
    potassiumK: 210,
    irrigationStatus: 'Optimal' as const,
    healthScore: 92,
    weatherForecast: 'Partly cloudy.',
    tempC: 28,
    rainProbability: 25
  };

  const sidebarItems = [
    { name: 'Command Center Dashboard', tabId: 'command', icon: Compass, badge: 'Live GIS' },
    { name: 'Soil Health (N-P-K Gauges)', tabId: 'soil', icon: Activity },
    { name: 'Smart Irrigation & Weather', tabId: 'weather', icon: Droplets }
  ];

  const handleAddFarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFarm(newFarm);
    setAddModalOpen(false);
  };

  return (
    <div className="module-app-layout">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Precision Farming"
        moduleSubtitle="Smart Command Center"
        moduleIcon={Compass}
        moduleColor="text-cyan-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-agri-300 bg-white/95 shadow-sm text-agri-950">
          <div>
            <h2 className="text-2xl font-black text-agri-950 flex items-center gap-2">
              🛰 Precision Agriculture Command Center
            </h2>
            <p className="text-xs text-agri-700 font-medium mt-0.5">
              Real-time soil sensors, automated N-P-K nutrient monitoring, micro-climate weather forecasts, and drip irrigation control.
            </p>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center space-x-1.5 shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>+ Add Field Zone</span>
          </button>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {farms.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFarmId(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFarmId === f.id
                  ? 'bg-agri-600 text-white shadow-sm'
                  : 'bg-white border border-agri-200 text-agri-700 hover:text-agri-950'
              }`}
            >
              🌱 {f.farmName} ({f.acreage} Acres)
            </button>
          ))}
        </div>

        {/* TAB 1: COMMAND CENTER DASHBOARD */}
        {activeTab === 'command' && (
          <div className="space-y-6">
            
            {/* Interactive GIS Field Map Visualizer */}
            <div className="glass-panel p-6 rounded-3xl border border-agri-300 bg-white/95 space-y-4 shadow-sm text-agri-950">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-agri-700 uppercase tracking-widest font-mono">INTERACTIVE SATELLITE FIELD MAP</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-agri-100 text-agri-900 border border-agri-300 font-extrabold shadow-sm">
                  Health Score: {activeFarm.healthScore}/100
                </span>
              </div>

              {/* Simulated Map Grid */}
              <div className="relative w-full h-72 rounded-2xl bg-gradient-to-b from-agri-50 to-emerald-50 border border-agri-300 overflow-hidden flex flex-col justify-between p-4 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px]">
                <div className="flex items-center justify-between text-xs text-agri-950 font-mono font-bold">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-agri-300 shadow-sm">
                    📍 Zone: {activeFarm.farmName}
                  </span>
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-agri-300 shadow-sm">
                    Crop: {activeFarm.crop}
                  </span>
                </div>

                {/* Simulated Plots Overlay */}
                <div className="grid grid-cols-3 gap-3 my-auto max-w-lg mx-auto w-full">
                  <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-agri-300 text-center font-mono text-xs shadow-sm">
                    <p className="font-black text-agri-950">Plot A1</p>
                    <p className="text-[10px] text-agri-700 font-bold">Moisture: {activeFarm.soilMoisture}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/90 backdrop-blur-md border border-amber-300 text-center font-mono text-xs shadow-sm">
                    <p className="font-black text-amber-950">Plot A2</p>
                    <p className="text-[10px] text-amber-800 font-bold">pH: {activeFarm.soilpH}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/90 backdrop-blur-md border border-emerald-300 text-center font-mono text-xs shadow-sm">
                    <p className="font-black text-emerald-950">Plot B1</p>
                    <p className="text-[10px] text-emerald-800 font-bold">Temp: {activeFarm.tempC}°C</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-agri-700 font-mono font-bold">
                  <span>Lat: 18.5204° N, Lon: 73.8567° E</span>
                  <span className="text-agri-600 font-black">● Live Sensor Feed Connected</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm text-agri-950">
                <span className="text-[10px] font-mono font-bold text-agri-700">SOIL MOISTURE</span>
                <p className="text-2xl font-black text-agri-950">{activeFarm.soilMoisture}%</p>
                <p className="text-[10px] text-agri-700 font-medium">Status: {activeFarm.irrigationStatus}</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm text-agri-950">
                <span className="text-[10px] font-mono font-bold text-agri-700">SOIL pH LEVEL</span>
                <p className="text-2xl font-black text-amber-600">{activeFarm.soilpH}</p>
                <p className="text-[10px] text-agri-700 font-medium">Slightly Acidic (Optimal)</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm text-agri-950">
                <span className="text-[10px] font-mono font-bold text-agri-700">NITROGEN (N)</span>
                <p className="text-2xl font-black text-agri-600">{activeFarm.nitrogenN} kg/ha</p>
                <p className="text-[10px] text-agri-700 font-medium">Target: 140 kg/ha</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl bg-white border border-agri-200 space-y-1 shadow-sm text-agri-950">
                <span className="text-[10px] font-mono font-bold text-agri-700">POTASSIUM (K)</span>
                <p className="text-2xl font-black text-emerald-600">{activeFarm.potassiumK} kg/ha</p>
                <p className="text-[10px] text-agri-700 font-medium">Fruit Firmness High</p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SOIL HEALTH (N-P-K GAUGES) */}
        {activeTab === 'soil' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-agri-950">Automated N-P-K Nutrient Analysis for {activeFarm.farmName}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Nitrogen */}
              <div className="glass-panel p-6 rounded-3xl bg-white border border-agri-300 text-center space-y-3 shadow-sm text-agri-950">
                <span className="text-xs font-mono text-agri-700 uppercase font-black">NITROGEN (N)</span>
                <div className="w-24 h-24 rounded-full border-4 border-agri-600 bg-agri-50 flex items-center justify-center mx-auto text-xl font-black text-agri-950 shadow-sm">
                  {activeFarm.nitrogenN}
                </div>
                <p className="text-xs text-agri-800 font-medium">Sufficient for leafy shoot growth and chlorophyll development.</p>
              </div>

              {/* Phosphorus */}
              <div className="glass-panel p-6 rounded-3xl bg-white border border-amber-300 text-center space-y-3 shadow-sm text-agri-950">
                <span className="text-xs font-mono text-amber-800 uppercase font-black">PHOSPHORUS (P)</span>
                <div className="w-24 h-24 rounded-full border-4 border-amber-500 bg-amber-50 flex items-center justify-center mx-auto text-xl font-black text-amber-950 shadow-sm">
                  {activeFarm.phosphorusP}
                </div>
                <p className="text-xs text-agri-800 font-medium">Promotes strong root architecture and early flower setting.</p>
              </div>

              {/* Potassium */}
              <div className="glass-panel p-6 rounded-3xl bg-white border border-emerald-300 text-center space-y-3 shadow-sm text-agri-950">
                <span className="text-xs font-mono text-emerald-800 uppercase font-black">POTASSIUM (K)</span>
                <div className="w-24 h-24 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center mx-auto text-xl font-black text-emerald-950 shadow-sm">
                  {activeFarm.potassiumK}
                </div>
                <p className="text-xs text-agri-800 font-medium">Enhances drought tolerance, fruit weight, and disease resistance.</p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: SMART IRRIGATION & WEATHER */}
        {activeTab === 'weather' && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm text-agri-950">
              <div className="flex items-center justify-between border-b border-agri-200 pb-3">
                <h3 className="text-lg font-black text-agri-950 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" /> Weather & Smart Drip Scheduler
                </h3>
                <span className="text-xs text-agri-800 font-mono font-bold">Temp: {activeFarm.tempC}°C</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-4 rounded-2xl bg-agri-50 border border-agri-200 space-y-2">
                  <span className="font-black text-agri-950 text-sm">🌧 Rain Forecast</span>
                  <p className="text-agri-900">{activeFarm.weatherForecast}</p>
                  <p className="text-amber-800 font-mono font-bold">Rain Probability: {activeFarm.rainProbability}%</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <span className="font-black text-emerald-950 text-sm">💧 Automated Drip Irrigation</span>
                  <p className="text-emerald-900">Current Status: <strong className="text-emerald-950 font-bold">{activeFarm.irrigationStatus}</strong></p>
                  <button className="px-3.5 py-1.5 rounded-xl bg-agri-600 text-white font-bold text-xs mt-1 hover:bg-agri-500 shadow-sm">
                    Start 45 Min Drip Cycle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD FARM ZONE */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-agri-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-xl p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-2xl text-agri-950">
            <div className="flex items-center justify-between border-b border-agri-200 pb-3">
              <h3 className="text-lg font-black text-agri-950">Add Precision Farm Zone</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-agri-600 hover:text-agri-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFarmSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-agri-950 font-bold mb-1">Farm Zone Name</label>
                <input
                  type="text"
                  required
                  value={newFarm.farmName}
                  onChange={e => setNewFarm({...newFarm, farmName: e.target.value})}
                  className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Crop</label>
                  <input
                    type="text"
                    required
                    value={newFarm.crop}
                    onChange={e => setNewFarm({...newFarm, crop: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Acreage</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newFarm.acreage}
                    onChange={e => setNewFarm({...newFarm, acreage: parseFloat(e.target.value) || 1})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 rounded-xl bg-agri-100 text-agri-800 font-bold hover:bg-agri-200">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-agri-600 text-white font-extrabold hover:bg-agri-500 shadow-sm">
                  Save Zone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
