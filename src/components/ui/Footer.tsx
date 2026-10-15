'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0f392b] text-emerald-50 border-t-2 border-agri-500/30 pt-12 pb-8 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-agri-500/20 border border-amber-400/40 flex items-center justify-center shadow-sm">
                <Sprout className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-wider">KRUSHI CONNECT</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
              "First Serve Farmers." A connected digital ecosystem unifying land leasing, labour community, crop intelligence, produce markets, schemes & precision farming.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-4">Core Modules</h4>
            <ul className="space-y-2 text-xs font-medium text-emerald-100">
              <li><Link href="/land-leasing" className="hover:text-amber-300 transition-colors">🌾 Land Leasing Platform</Link></li>
              <li><Link href="/labour-community" className="hover:text-amber-300 transition-colors">👨‍🌾 Labour Community</Link></li>
              <li><Link href="/crop-demand" className="hover:text-amber-300 transition-colors">📈 AI Crop Demand Predictor</Link></li>
              <li><Link href="/crop-market" className="hover:text-amber-300 transition-colors">🛒 Crop Market & Cold Storage</Link></li>
              <li><Link href="/schemes" className="hover:text-amber-300 transition-colors">₹1 Scheme & Insurance</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-4">Precision & Control</h4>
            <ul className="space-y-2 text-xs font-medium text-emerald-100">
              <li><Link href="/precision-farming" className="hover:text-amber-300 transition-colors">🛰 Precision Farming Command</Link></li>
              <li><Link href="/cultivation-monitoring" className="hover:text-amber-300 transition-colors">📊 Cultivation Monitoring</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-300 transition-colors">📱 Farmer Central OS</Link></li>
              <li><Link href="/admin" className="hover:text-amber-300 transition-colors">🛡 Admin Governance</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-4">Kisan Helpline & Support</h4>
            <div className="space-y-3 text-xs font-medium text-emerald-100">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>1800-180-1551 (Toll Free Kisan Call Center)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>support@krushiconnect.org</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>National Agritech Innovation Hub, India</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-emerald-700/50 text-center text-xs text-emerald-300/80 flex flex-col sm:flex-row items-center justify-between">
          <p>© 2026 KRUSHI CONNECT. All rights reserved. Empowering Indian Agriculture.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-medium">
            Crafted with <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> for Farmers
          </p>
        </div>
      </div>
    </footer>
  );
}
