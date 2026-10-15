'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout, MapPin, Users, TrendingUp, ShoppingBag, Landmark,
  Compass, Activity, ArrowUpRight, AlertTriangle, CheckCircle, Clock, PlusCircle
} from 'lucide-react';
import { useApp } from '@/lib/context';

export default function DashboardPage() {
  const { currentUser, farms, tasks, alerts, lands, jobs, produce, applications } = useApp();

  const totalFarmAcreage = farms.reduce((acc, f) => acc + f.acreage, 0);
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const listedProduceValue = produce.filter(item => item.status === 'available')
    .reduce((total, item) => total + item.quantityKg * item.pricePerKg, 0);
  const pendingApplications = applications.filter(item => item.status === 'pending').length;

  return (
    <div className="space-y-8 py-2">
      
      {/* Welcome Banner */}
      <div className="workspace-welcome flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-400 text-agri-950 text-xs font-black border border-amber-500 shadow-sm">
            <span>Role:</span>
            <span className="capitalize">{currentUser.role}</span>
          </div>
          <h1>
            Good to see you,<br />{currentUser.name}.
          </h1>
          <p className="text-sm text-agri-800">
            Your land, your people, your next season. All connected.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/cultivation-monitoring"
            className="px-4 py-2.5 rounded-xl bg-amber-400 text-agri-950 font-black text-xs hover:bg-amber-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all flex items-center space-x-1.5 shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-agri-950" />
            <span>Manage Farms</span>
          </Link>

          <Link
            href="/messages"
            className="px-4 py-2.5 rounded-xl bg-white/95 text-agri-950 text-xs font-bold hover:bg-amber-50 border border-agri-300 transition-colors shadow-sm"
          >
            Open Chat
          </Link>
        </div>
      </div>

      {/* Central Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1 */}
        <div className="glass-panel p-5 rounded-2xl border border-agri-300 space-y-3 shadow-sm hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-agri-700 uppercase tracking-wider">🌾 MY FARMS</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 border border-agri-300 font-bold">Field overview</span>
          </div>
          <div>
            <p className="text-2xl font-black text-agri-950">{farms.length} Active Zones</p>
            <p className="text-xs text-agri-700 font-medium mt-0.5">{totalFarmAcreage} Total Acres under monitoring</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card-gold p-5 rounded-2xl space-y-3 shadow-sm hover:border-amber-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider">Listed produce value</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-agri-950 font-black border border-amber-500">Available listings</span>
          </div>
          <div>
            <p className="text-2xl font-black text-agri-950">₹{listedProduceValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-amber-900 font-bold mt-0.5">{produce.length} Listed Produce Batches</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-5 rounded-2xl border border-agri-300 space-y-3 shadow-sm hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider">👨‍🌾 LABOUR</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">{pendingApplications} Pending</span>
          </div>
          <div>
            <p className="text-2xl font-black text-agri-950">{jobs.length} Job Requirements</p>
            <p className="text-xs text-agri-700 font-medium mt-0.5">Active hiring in progress</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel p-5 rounded-2xl border border-agri-300 space-y-3 shadow-sm hover:border-amber-400 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-agri-700 uppercase tracking-wider">🏞 LAND LEASES</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 border border-agri-300 font-bold">Available</span>
          </div>
          <div>
            <p className="text-2xl font-black text-agri-950">{lands.length} Listings</p>
            <p className="text-xs text-agri-700 font-medium mt-0.5">Explore available land plots</p>
          </div>
        </div>

      </div>

      {/* Main Grid: Alerts & Quick Module Launchers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Alerts & Tasks */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Alerts */}
          <div className="glass-panel p-6 rounded-3xl border border-agri-300 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-agri-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Active Farm Alerts
              </h3>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">{alerts.length} Warnings</span>
            </div>

            <div className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className={`p-4 rounded-2xl border text-xs flex items-start justify-between ${
                    a.severity === 'critical'
                      ? 'bg-red-50 border-red-300 text-red-950 font-medium'
                      : a.severity === 'warning'
                      ? 'bg-amber-50 border-amber-300 text-agri-950 font-medium'
                      : 'bg-emerald-50 border-emerald-300 text-agri-950 font-medium'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 font-bold">
                      <span className="text-agri-950">{a.farmName}</span>
                      <span className="text-[10px] opacity-75 font-normal">({a.timestamp})</span>
                    </div>
                    <p className="font-extrabold text-agri-900">{a.title}</p>
                    <p className="opacity-90 leading-relaxed">{a.message}</p>
                  </div>

                  <Link
                    href="/precision-farming"
                    className="px-2.5 py-1 rounded-lg bg-agri-600 border border-agri-700 text-[10px] font-extrabold text-white hover:bg-agri-500 shrink-0 shadow-sm"
                  >
                    Action
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="glass-panel p-6 rounded-3xl border border-agri-300 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-agri-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-agri-600" /> Pending Farm Tasks ({pendingTasks})
              </h3>
              <Link href="/cultivation-monitoring" className="text-xs font-bold text-agri-700 hover:text-amber-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="p-3.5 rounded-xl bg-agri-50/70 border border-agri-200 text-xs flex items-center justify-between">
                  <div>
                    <p className="font-bold text-agri-950">{t.title}</p>
                    <p className="text-[11px] text-agri-700 font-medium">{t.farmName} • Due: {t.dueDate}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    t.priority === 'High' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-agri-100 text-agri-800 border border-agri-300'
                  }`}>
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: 7 Module Launcher Navigation */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-black text-agri-950 px-1">Ecosystem Mini-Applications</h3>

          <div className="space-y-3">
            
            <Link
              href="/land-leasing"
              className="p-4 rounded-2xl bg-white border border-emerald-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-agri-700">1. Land Leasing</h4>
                  <p className="text-xs text-agri-700 font-medium">List or request agricultural land</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/labour-community"
              className="p-4 rounded-2xl bg-white border border-amber-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-amber-800">2. Labour Community</h4>
                  <p className="text-xs text-agri-700 font-medium">Agricultural worker marketplace</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/crop-demand"
              className="p-4 rounded-2xl bg-white border border-sky-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800 border border-sky-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-sky-800">3. Crop Demand Prediction</h4>
                  <p className="text-xs text-agri-700 font-medium">AI market demand & forecasting</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/crop-market"
              className="p-4 rounded-2xl bg-white border border-green-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-agri-100 text-agri-800 border border-agri-300">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-agri-700">4. Crop Market & Storage</h4>
                  <p className="text-xs text-agri-700 font-medium">Marketplace & cold storage map</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/schemes"
              className="p-4 rounded-2xl bg-white border border-yellow-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-yellow-100 text-yellow-900 border border-yellow-300">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-amber-800">5. ₹1 Scheme & Insurance</h4>
                  <p className="text-xs text-agri-700 font-medium">Govt scheme eligibility advisor</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/precision-farming"
              className="p-4 rounded-2xl bg-white border border-teal-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 border border-teal-300">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-teal-800">6. Precision Farming</h4>
                  <p className="text-xs text-agri-700 font-medium">N-P-K soil gauges & drip weather</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/cultivation-monitoring"
              className="p-4 rounded-2xl bg-white border border-emerald-300/80 hover:border-amber-400 hover:shadow-md flex items-center justify-between group transition-all"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-agri-950 text-sm group-hover:text-agri-700">7. Cultivation Monitoring</h4>
                  <p className="text-xs text-agri-700 font-medium">Growth stage timeline & checklist</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
}
