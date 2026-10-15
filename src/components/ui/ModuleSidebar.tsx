'use client';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
interface SidebarItem { name: string; tabId: string; icon: LucideIcon; badge?: string; }
interface ModuleSidebarProps { moduleTitle: string; moduleSubtitle: string; moduleIcon: LucideIcon; moduleColor: string; items: SidebarItem[]; activeTab: string; onSelectTab: (tabId: string) => void; }
export default function ModuleSidebar({ moduleTitle, moduleSubtitle, items, activeTab, onSelectTab }: ModuleSidebarProps) {
  return <aside className="module-section-nav"><div className="module-nav-label"><span className="section-label">{moduleSubtitle}</span><Link href="/dashboard">Your dashboard <ArrowUpRight size={14} /></Link></div><nav aria-label={`${moduleTitle} sections`}>{items.map((item, index) => { const Icon = item.icon; const active = activeTab === item.tabId; return <button key={item.tabId} type="button" aria-current={active ? 'true' : undefined} onClick={() => onSelectTab(item.tabId)} className={active ? 'is-active' : ''}><span className="module-tab-index">0{index + 1}/</span><Icon size={17} strokeWidth={1.5} /><span>{item.name}</span>{item.badge && <span className="module-tab-badge">{item.badge}</span>}<ArrowUpRight className="module-tab-arrow" size={17}/></button>; })}</nav></aside>;
}
