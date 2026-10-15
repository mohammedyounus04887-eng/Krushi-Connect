'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, LucideIcon } from 'lucide-react';

interface SidebarItem {
  name: string;
  tabId: string;
  icon: LucideIcon;
  badge?: string;
}

interface ModuleSidebarProps {
  moduleTitle: string;
  moduleSubtitle: string;
  moduleIcon: LucideIcon;
  moduleColor: string;
  items: SidebarItem[];
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export default function ModuleSidebar({
  moduleTitle,
  moduleSubtitle,
  moduleIcon: ModuleIcon,
  moduleColor,
  items,
  activeTab,
  onSelectTab,
}: ModuleSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 bg-white/95 backdrop-blur-xl p-5 space-y-6 border border-agri-200 rounded-3xl shadow-sm shrink-0 text-agri-950">
      
      {/* Return Launcher Link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center space-x-2 text-xs font-bold text-agri-700 hover:text-agri-900 transition-colors bg-agri-50 hover:bg-amber-50 px-3 py-1.5 rounded-xl border border-agri-200 hover:border-amber-400 shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-agri-600" />
        <span>Back to Krushi OS</span>
      </Link>

      {/* Module Title Branding */}
      <div className="flex items-center space-x-3 pt-2 pb-4 border-b border-agri-200">
        <div className={`p-3 rounded-2xl bg-agri-100 border border-agri-300 shadow-sm ${moduleColor}`}>
          <ModuleIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-extrabold text-agri-950 text-base leading-tight">{moduleTitle}</h2>
          <p className="text-[11px] font-semibold text-agri-700 mt-0.5">{moduleSubtitle}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tabId;
          return (
            <button
              key={item.tabId}
              onClick={() => onSelectTab(item.tabId)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                isActive
                  ? 'bg-agri-600 text-white border-l-4 border-amber-400 shadow-md shadow-agri-600/20'
                  : 'text-agri-900 hover:bg-agri-50/90 hover:text-agri-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-agri-600'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  isActive ? 'bg-amber-400 text-agri-950 border-amber-500' : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Help Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-agri-50 to-amber-50/80 border border-agri-200 text-xs space-y-1.5 shadow-sm">
        <p className="font-bold text-agri-900 flex items-center gap-1.5">
          <span className="text-amber-500">💡</span> Smart Tip
        </p>
        <p className="text-agri-800 text-[11px] font-medium leading-relaxed">
          All actions inside this module sync in real-time with your central Krushi Connect account.
        </p>
      </div>

    </aside>
  );
}
