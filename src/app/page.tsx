'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout, MapPin, Users, TrendingUp, ShoppingBag, Landmark,
  Compass, Activity, ArrowRight, ShieldCheck, Cpu, Database, CheckCircle2
} from 'lucide-react';
import AgriLandscape3D from '@/components/3d/AgriLandscape3D';

export default function LandingPage() {
  const modules = [
    {
      title: 'Land Leasing',
      subtitle: 'Uncultivated Land Utilization',
      path: '/land-leasing',
      icon: MapPin,
      color: 'from-emerald-500/20 to-agri-100',
      borderColor: 'border-emerald-300/60',
      badge: 'Module 1',
      desc: 'Connect vacant agricultural land with progressive farmers for seasonal or long-term lease agreements.'
    },
    {
      title: 'Labour Community',
      subtitle: 'Agricultural Workforce Network',
      path: '/labour-community',
      icon: Users,
      color: 'from-amber-500/20 to-amber-100/60',
      borderColor: 'border-amber-300/60',
      badge: 'Module 2',
      desc: 'Hire verified skilled agricultural workers for tillage, transplanting, spraying, and harvesting.'
    },
    {
      title: 'Crop Demand Prediction',
      subtitle: 'AI Market Intelligence',
      path: '/crop-demand',
      icon: TrendingUp,
      color: 'from-sky-500/20 to-agri-100',
      borderColor: 'border-sky-300/60',
      badge: 'Module 3',
      desc: 'Historical trend analytics and crop demand forecasting engine to prevent overproduction and boost profit.'
    },
    {
      title: 'Crop Market & Storage',
      subtitle: 'Direct Produce Sales',
      path: '/crop-market',
      icon: ShoppingBag,
      color: 'from-green-500/20 to-agri-100',
      borderColor: 'border-green-300/60',
      badge: 'Module 4',
      desc: 'Sell fruits & vegetables directly to buyers and find nearby temperature-controlled cold storages.'
    },
    {
      title: '₹1 Scheme & Insurance',
      subtitle: 'Government Assistance',
      path: '/schemes',
      icon: Landmark,
      color: 'from-yellow-500/20 to-amber-100/60',
      borderColor: 'border-yellow-400/60',
      badge: 'Module 5',
      desc: 'Pradhan Mantri crop insurance enrollment guidance for token ₹1 fee and instant scheme eligibility checker.'
    },
    {
      title: 'Precision Farming',
      subtitle: 'Command Center',
      path: '/precision-farming',
      icon: Compass,
      color: 'from-teal-500/20 to-agri-100',
      borderColor: 'border-teal-300/60',
      badge: 'Module 6',
      desc: 'Interactive field map, N-P-K soil gauges, automated weather engine & smart drip irrigation scheduler.'
    },
    {
      title: 'Cultivation Monitoring',
      subtitle: 'Growth Timeline & Tasks',
      path: '/cultivation-monitoring',
      icon: Activity,
      color: 'from-emerald-500/20 to-agri-100',
      borderColor: 'border-emerald-300/60',
      badge: 'Module 7',
      desc: 'Crop growth stage tracker from seed planting to harvest, task checklist, and automated pest alert system.'
    }
  ];

  const stats = [
    { label: 'Cultivated Land Leased', value: '1,450+ Acres' },
    { label: 'Active Skilled Workers', value: '3,200+ People' },
    { label: 'Crop AI Prediction Score', value: '94.2% Accuracy' },
    { label: 'Direct Market Value Traded', value: '₹4.8 Cr+' }
  ];

  return (
    <div className="space-y-20 py-4">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* Hero Left Text */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-agri-100 border border-agri-300 text-agri-900 text-xs font-bold shadow-sm">
            <Sprout className="w-4 h-4 text-agri-600 animate-bounce" />
            <span>Digital Agricultural Operating System</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-agri-950 tracking-tight leading-tight">
              🌾 KRUSHI <br />
              <span className="bg-gradient-to-r from-agri-700 via-emerald-600 to-amber-500 bg-clip-text text-transparent">
                CONNECT
              </span>
            </h1>
            <p className="text-xl font-black text-amber-600 tracking-wide font-mono">
              "First Serve Farmers."
            </p>
          </div>

          <p className="text-agri-900/90 text-sm sm:text-base leading-relaxed font-medium">
            A connected digital ecosystem empowering farmers with smarter land utilization, labour access, crop intelligence, direct produce markets, government schemes, and precision farming.
          </p>

          <div className="p-4 rounded-2xl bg-white/95 border border-agri-300 text-xs text-agri-900 font-bold font-mono flex items-center gap-3 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>ONE WEBSITE → MULTIPLE AGRICULTURAL APPLICATIONS → ONE CONNECTED ECOSYSTEM</span>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-6 py-3.5 rounded-2xl bg-agri-600 hover:bg-agri-500 text-white font-extrabold text-sm hover:shadow-[0_0_25px_rgba(234,179,8,0.45)] transition-all flex items-center space-x-2 group shadow-md"
            >
              <span>Launch Farmer Central OS</span>
              <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#modules"
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-amber-50 text-agri-950 font-bold text-sm border border-agri-300 hover:border-amber-400 shadow-sm transition-all"
            >
              Explore 7 Modules
            </a>
          </div>

        </div>

        {/* Hero Right 3D Visualizer */}
        <div className="lg:col-span-6">
          <AgriLandscape3D />
        </div>

      </section>

      {/* Ecosystem Statistics Counter */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="glass-panel p-5 text-center space-y-1 border border-agri-300/70 hover:border-amber-400 transition-all hover:shadow-md">
            <p className="text-2xl sm:text-3xl font-black text-agri-700 tracking-tight">{s.value}</p>
            <p className="text-xs text-agri-900 font-bold uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </section>

      {/* 7 Modules Applications Grid */}
      <section id="modules" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-agri-950 tracking-tight">
            Integrated Agricultural Mini-Applications
          </h2>
          <p className="text-agri-800 text-sm font-medium">
            Each module is designed with its own workflow, dashboard, visuals, and interactive data while staying unified inside Krushi Connect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.path}
                href={m.path}
                className={`bg-white/95 p-6 rounded-3xl border ${m.borderColor} glass-panel-hover flex flex-col justify-between group space-y-4 shadow-sm`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${m.color} border border-agri-300 text-agri-700 group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wide">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-agri-950 group-hover:text-agri-700 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 mb-2">{m.subtitle}</p>
                  <p className="text-xs text-agri-800/90 leading-relaxed font-medium">{m.desc}</p>
                </div>

                <div className="pt-4 border-t border-agri-200 flex items-center justify-between text-xs font-extrabold text-agri-700 group-hover:text-agri-900">
                  <span>Enter Application</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-amber-500" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Core Objective & Problems Solved */}
      <section className="glass-panel p-8 sm:p-12 rounded-3xl border border-agri-300 space-y-8 bg-gradient-to-br from-agri-50/90 via-white to-amber-50/70 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase text-agri-700 tracking-widest font-mono">MISSION STATEMENT</span>
          <h2 className="text-3xl font-black text-agri-950">Transforming Indian Agriculture Through Unified Technology</h2>
          <p className="text-sm text-agri-900 leading-relaxed font-medium">
            Krushi Connect bridges structural gaps in rural farming by unifying land leasing, labour availability, AI crop recommendations, direct market access, and precision soil analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-agri-200 space-y-2 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-agri-600" />
            <h4 className="font-extrabold text-agri-950 text-sm">Land Utilization</h4>
            <p className="text-xs text-agri-700 font-medium">Eliminates uncultivated farmland by connecting owners with verified lease cultivators.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-agri-200 space-y-2 shadow-sm">
            <Cpu className="w-6 h-6 text-emerald-600" />
            <h4 className="font-extrabold text-agri-950 text-sm">AI Demand Forecast</h4>
            <p className="text-xs text-agri-700 font-medium">Prevents crop overproduction and price crashes with intelligent market score modeling.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-agri-200 space-y-2 shadow-sm">
            <Database className="w-6 h-6 text-amber-500" />
            <h4 className="font-extrabold text-agri-950 text-sm">₹1 Scheme Access</h4>
            <p className="text-xs text-agri-700 font-medium">Educates and guides farmers through government insurance & subsidy enrollment.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
