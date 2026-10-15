'use client';

import React, { useState } from 'react';
import ModuleSidebar from '@/components/ui/ModuleSidebar';
import {
  TrendingUp, Sparkles, AlertTriangle, ShieldCheck, BarChart3,
  Cpu, ArrowUpRight, CheckCircle2, Sliders, RefreshCw
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { calculateCropRecommendation } from '@/lib/store';
import { CropRecommendationOutput } from '@/lib/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CropDemandPage() {
  const { cropDemands } = useApp();
  const [activeTab, setActiveTab] = useState('scoreboard');
  const [selectedCropId, setSelectedCropId] = useState(cropDemands[0].id);

  // Recommendation Form State
  const [recInput, setRecInput] = useState({
    location: 'Baramati, Pune',
    landSizeAcres: 5.0,
    soilType: 'Black Soil',
    waterAvailability: 'Drip Irrigation',
    season: 'Kharif'
  });

  const [recOutput, setRecOutput] = useState<CropRecommendationOutput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const activeCrop = cropDemands.find(c => c.id === selectedCropId) || cropDemands[0];

  const sidebarItems = [
    { name: 'Crop Demand Scoreboard', tabId: 'scoreboard', icon: TrendingUp, badge: `${cropDemands.length} Crops` },
    { name: 'AI Crop Recommendation', tabId: 'recommendation', icon: Cpu, badge: 'Smart Engine' },
    { name: 'Historical Price Trends', tabId: 'trends', icon: BarChart3 }
  ];

  const handleRunRecommendation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      const result = calculateCropRecommendation(recInput);
      setRecOutput(result);
      setIsCalculating(false);
    }, 400);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-2">
      
      {/* Sub-App Sidebar */}
      <ModuleSidebar
        moduleTitle="Crop Demand AI"
        moduleSubtitle="Market Intelligence Engine"
        moduleIcon={TrendingUp}
        moduleColor="text-sky-400"
        items={sidebarItems}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Sub-App Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-sky-500/20">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              📈 AI Crop Demand Intelligence
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Predictive market demand modeling based on historical yield, seasonal weather trends, and wholesale mandis.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-agri-100 border border-agri-300 text-agri-800 text-xs font-mono font-black flex items-center gap-2 shrink-0">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>AI Model v4.2 Active</span>
          </div>
        </div>

        {/* TAB 1: MARKET DEMAND PREDICTION */}
        {activeTab === 'prediction' && (
          <div className="space-y-6">
            
            {/* Crops Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cropDemands.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                    selectedCropId === crop.id
                      ? 'bg-agri-50 border-2 border-agri-600 shadow-md text-agri-950'
                      : 'bg-white/95 border-agri-200 hover:border-amber-400 text-agri-950'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-agri-700">{crop.category}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      crop.priceChangePercent >= 0 ? 'bg-agri-100 text-agri-800 border border-agri-300' : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                      {crop.priceChangePercent >= 0 ? `+${crop.priceChangePercent}%` : `${crop.priceChangePercent}%`}
                    </span>
                  </div>

                  <h3 className="font-black text-agri-950 text-base line-clamp-1">{crop.cropName}</h3>
                  
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-agri-700">Demand Score</span>
                      <span className="font-black text-agri-700 text-sm">{crop.demandScore}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-agri-100 h-2.5 rounded-full overflow-hidden border border-agri-200">
                      <div
                        className="bg-gradient-to-r from-agri-600 via-emerald-500 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${crop.demandScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Crop Interactive Analytics Box */}
            <div className="glass-panel p-6 rounded-3xl border border-agri-300 bg-white/95 space-y-6 shadow-sm text-agri-950">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-agri-200 pb-4">
                <div>
                  <span className="text-xs font-black uppercase text-agri-700 font-mono tracking-wider">SELECTED ANALYTICS MODEL</span>
                  <h2 className="text-2xl font-black text-agri-950">{activeCrop.cropName}</h2>
                  <p className="text-xs text-agri-700 font-medium">Recommended Region: {activeCrop.recommendedRegion}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xl font-black text-agri-700">₹{activeCrop.currentPricePerKg} / kg</p>
                    <p className="text-[10px] text-agri-700 font-bold">Current Wholesale Mandi Rate</p>
                  </div>
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="space-y-2">
                <p className="text-xs font-black text-agri-950 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-agri-600" /> 5-Month Demand Score & Price Trajectory
                </p>

                <div className="w-full h-64 bg-agri-50/50 rounded-2xl p-4 border border-agri-200">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activeCrop.historicalDemand}>
                      <defs>
                        <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.7}/>
                          <stop offset="95%" stopColor="#eab308" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#bbf7d0" />
                      <XAxis dataKey="month" stroke="#14532d" fontSize={12} fontWeight="bold" />
                      <YAxis stroke="#14532d" fontSize={12} fontWeight="bold" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#16a34a', borderRadius: '12px', color: '#123d24', fontWeight: 'bold' }} />
                      <Area type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rationale & Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-agri-50 border border-agri-200 space-y-1">
                  <span className="text-agri-700 block text-[10px] font-bold">FORECAST TREND</span>
                  <span className="text-agri-950 font-black text-sm">{activeCrop.forecastTrend}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-amber-800 block text-[10px] font-bold">CULTIVATION SEASON</span>
                  <span className="text-amber-950 font-black text-sm">{activeCrop.season}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-emerald-800 block text-[10px] font-bold">RISK LEVEL</span>
                  <span className="font-black text-sm text-agri-950">
                    {activeCrop.riskLevel} Risk
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: AI CROP RECOMMENDATION */}
        {activeTab === 'recommendation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-agri-950">
            
            {/* Form Column */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl bg-white border border-agri-300 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 border-b border-agri-200 pb-3">
                <Sliders className="w-5 h-5 text-agri-600" />
                <h3 className="font-black text-agri-950 text-lg">Farm Specification Input</h3>
              </div>

              <form onSubmit={handleRunRecommendation} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-agri-950 font-bold mb-1">Farm Location / Region</label>
                  <input
                    type="text"
                    required
                    value={recInput.location}
                    onChange={e => setRecInput({...recInput, location: e.target.value})}
                    className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Land Size (Acres)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={recInput.landSizeAcres}
                      onChange={e => setRecInput({...recInput, landSizeAcres: parseFloat(e.target.value) || 1})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    />
                  </div>

                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Soil Type</label>
                    <select
                      value={recInput.soilType}
                      onChange={e => setRecInput({...recInput, soilType: e.target.value})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    >
                      <option value="Black Soil">Black Soil</option>
                      <option value="Red Soil">Red Soil</option>
                      <option value="Alluvial Soil">Alluvial Soil</option>
                      <option value="Clay">Clay</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Water Supply</label>
                    <select
                      value={recInput.waterAvailability}
                      onChange={e => setRecInput({...recInput, waterAvailability: e.target.value})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    >
                      <option value="Drip Irrigation">Drip Irrigation</option>
                      <option value="Borewell">Borewell</option>
                      <option value="Canal">Canal</option>
                      <option value="Rainfed">Rainfed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-agri-950 font-bold mb-1">Season</label>
                    <select
                      value={recInput.season}
                      onChange={e => setRecInput({...recInput, season: e.target.value})}
                      className="w-full bg-white border border-agri-300 rounded-xl px-3 py-2 text-agri-950 font-bold focus:border-agri-600"
                    >
                      <option value="Kharif">Kharif (Monsoon)</option>
                      <option value="Rabi">Rabi (Winter)</option>
                      <option value="Zaid">Zaid (Summer)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-3 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-sm hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Computing AI Prediction Matrix...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Generate AI Crop Recommendation</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-6 space-y-4">
              {recOutput ? (
                <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-agri-50 via-white to-amber-50 border border-agri-300 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-agri-200 pb-3">
                    <span className="text-xs font-black text-agri-700 uppercase tracking-widest font-mono">RECOMMENDED OPTIMAL CROP</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-agri-950 border border-amber-500 font-extrabold shadow-sm">
                      {recOutput.demandScore}% Match
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-agri-950">{recOutput.recommendedCrop}</h3>
                    <p className="text-xs text-agri-900 font-medium mt-2 leading-relaxed">{recOutput.rationale}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white border border-agri-200 shadow-sm">
                      <span className="text-agri-700 text-[10px] block font-bold">ESTIMATED REVENUE</span>
                      <span className="text-agri-950 font-black text-sm">₹{recOutput.estimatedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-amber-200 shadow-sm">
                      <span className="text-amber-800 text-[10px] block font-bold">EXPECTED PRICE</span>
                      <span className="text-amber-950 font-black text-sm">{recOutput.expectedPriceRange}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-agri-200 text-xs space-y-1 font-medium shadow-sm">
                    <p className="text-agri-800">Suggested Planting Period: <strong className="text-agri-950 font-bold">{recOutput.suggestedPlantingPeriod}</strong></p>
                    <p className="text-agri-800">Expected Yield: <strong className="text-agri-950 font-bold">{recOutput.expectedYieldTons} Tons</strong></p>
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-12 text-center rounded-3xl bg-white border border-agri-300 space-y-3 shadow-sm">
                  <Cpu className="w-12 h-12 text-agri-600 mx-auto" />
                  <p className="font-black text-agri-950 text-base">Ready to Run AI Recommendation</p>
                  <p className="text-xs text-agri-700 font-medium">
                    Fill in your land parameters on the left to compute the optimal high-return crop selection.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
