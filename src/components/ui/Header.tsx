'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Bell, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '@/lib/context';
import type { UserRole } from '@/lib/types';
const links = [['Land leasing','/land-leasing'],['Labour community','/labour-community'],['Crop intelligence','/crop-demand'],['Market & storage','/crop-market'],['Schemes & insurance','/schemes'],['Precision farming','/precision-farming'],['Cultivation monitoring','/cultivation-monitoring']];
const roles: UserRole[] = ['farmer','landowner','worker','buyer','admin'];
export default function Header() {
  const pathname = usePathname();
  const [panel,setPanel] = useState<'menu'|'notifications'|null>(null);
  const {currentUser,switchUserRole,notifications,markNotificationRead} = useApp();
  const close = () => setPanel(null);
  return <header className="kc-header" id="top"><div className="header-bar"><Link href="/" className="kc-logo" onClick={close}>krushi<span>connect</span><sup>®</sup></Link><nav className="desktop-nav" aria-label="Main navigation"><Link href="/#ecosystem">Ecosystem</Link><Link href="/#about">Our purpose</Link><Link href="/crop-market">Marketplace</Link></nav><div className="header-actions"><label className="role-select"><span className="sr-only">Choose demo role</span><select value={currentUser.role} onChange={e=>switchUserRole(e.target.value as UserRole)}>{roles.map(role=><option key={role} value={role}>{role.charAt(0).toUpperCase()+role.slice(1)}</option>)}</select><ChevronDown size={13}/></label><button className="header-icon notification-button" onClick={()=>setPanel(panel==='notifications'?null:'notifications')} aria-label="Notifications" aria-expanded={panel==='notifications'}><Bell size={19}/>{notifications.some(n=>!n.read)&&<span className="notification-dot"/>}</button><Link href="/dashboard" className="workspace-link">Workspace <ArrowUpRight size={16}/></Link><button className="header-icon" onClick={()=>setPanel(panel==='menu'?null:'menu')} aria-label={panel==='menu'?'Close navigation':'Open navigation'} aria-expanded={panel==='menu'}>{panel==='menu'?<X/>:<Menu/>}</button></div></div>
  {panel==='menu'&&<nav className="kc-menu" aria-label="All applications"><div className="menu-intro"><span className="section-label">Your connected ecosystem</span><p>What will<br />you grow next?</p><Link href="/dashboard" onClick={close}>Your dashboard ↗</Link><Link href="/messages" onClick={close}>Conversations ↗</Link>{currentUser.role==='admin'&&<Link href="/admin" onClick={close}>Administration ↗</Link>}</div><div>{links.map(([name,href],i)=><Link key={href} href={href} onClick={close} aria-current={pathname===href?'page':undefined}><span>0{i+1}/</span>{name}<ArrowUpRight size={20}/></Link>)}</div></nav>}
  {panel==='notifications'&&<div className="kc-notifications"><div className="notification-heading"><h2>Notifications</h2><button onClick={close} aria-label="Close notifications"><X size={18}/></button></div>{notifications.length===0?<p>You’re all caught up.</p>:notifications.map(n=><button className={n.read?'is-read':''} key={n.id} onClick={()=>markNotificationRead(n.id)}><strong>{n.title}</strong><span>{n.message}</span><small>{n.read?'Read':'Mark as read'}</small></button>)}</div>}
  </header>;
}
