'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Bell, Menu, X, ChevronDown, MessageSquare } from 'lucide-react';
import { useApp } from '@/lib/context';
import { ecosystem } from '@/lib/ecosystem';
import type { UserRole } from '@/lib/types';

const roles: UserRole[] = ['farmer', 'landowner', 'worker', 'buyer', 'admin'];
type Panel = 'menu' | 'notifications' | null;

export default function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { currentUser, switchUserRole, notifications, markNotificationRead, messages } = useApp();
  const ownNotifications = notifications.filter(item => item.userId === currentUser.id);
  const unreadCount = ownNotifications.filter(item => !item.read).length;
  const unreadMessages = messages.filter(item => item.receiverId === currentUser.id && !item.read).length;
  const close = () => setPanel(null);

  useEffect(() => { setPanel(null); }, [pathname, currentUser.id]);
  useEffect(() => {
    if (!panel) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    const dismissWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanel(null);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissWithEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissWithEscape);
    };
  }, [panel]);

  const togglePanel = (next: Exclude<Panel, null>, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setPanel(previous => previous === next ? null : next);
  };

  return <header className="kc-header" id="top" ref={headerRef}>
    <div className="header-bar">
      <Link href="/" className="kc-logo" onClick={close}>krushi<span>connect</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/#ecosystem" onClick={close}>Ecosystem</Link>
        <Link href="/#about" onClick={close}>Our purpose</Link>
        <Link href="/crop-market" onClick={close} aria-current={pathname === '/crop-market' ? 'page' : undefined}>Marketplace</Link>
      </nav>
      <div className="header-actions">
        <label className="role-select"><span className="sr-only">Choose demo role</span>
          <select value={currentUser.role} onChange={event => switchUserRole(event.target.value as UserRole)}>
            {roles.map(role => <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>)}
          </select><ChevronDown size={13} aria-hidden="true" />
        </label>
        <Link href="/messages" onClick={close} className="header-icon header-messages" aria-label={`Conversations${unreadMessages ? `, ${unreadMessages} unread` : ''}`}>
          <MessageSquare size={19} />{unreadMessages > 0 && <span className="notification-dot" />}
        </Link>
        <button className="header-icon notification-button" onClick={event => togglePanel('notifications', event.currentTarget)} aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`} aria-expanded={panel === 'notifications'} aria-controls="notification-panel">
          <Bell size={19} />{unreadCount > 0 && <span className="notification-dot" />}
        </button>
        <Link href="/dashboard" onClick={close} className="workspace-link">Workspace <ArrowUpRight size={16} /></Link>
        <button className="header-icon" onClick={event => togglePanel('menu', event.currentTarget)} aria-label={panel === 'menu' ? 'Close navigation' : 'Open navigation'} aria-expanded={panel === 'menu'} aria-controls="ecosystem-navigation">
          {panel === 'menu' ? <X /> : <Menu />}
        </button>
      </div>
    </div>
    {panel === 'menu' && <nav id="ecosystem-navigation" className="kc-menu" aria-label="All applications">
      <div className="menu-intro"><span className="section-label">Your connected ecosystem</span><p>What will<br />you grow next?</p>
        <Link href="/dashboard" onClick={close}>Your dashboard ↗</Link>
        <Link href="/messages" onClick={close}>Conversations ↗</Link>
        {currentUser.role === 'admin' && <Link href="/admin" onClick={close}>Administration ↗</Link>}
      </div>
      <div>{ecosystem.map((item, index) => <Link key={item.slug} href={`/${item.slug}`} onClick={close} aria-current={pathname === `/${item.slug}` ? 'page' : undefined}>
        <span>0{index + 1}/</span>{item.title}<ArrowUpRight size={20} />
      </Link>)}</div>
    </nav>}
    {panel === 'notifications' && <section id="notification-panel" className="kc-notifications" aria-label="Your notifications">
      <div className="notification-heading"><h2>Notifications</h2><button onClick={() => { close(); triggerRef.current?.focus(); }} aria-label="Close notifications"><X size={18} /></button></div>
      {ownNotifications.length === 0 ? <p>You’re all caught up.</p> : ownNotifications.map(item => <article className={`notification-item ${item.read ? 'is-read' : ''}`} key={item.id}>
        <strong>{item.title}</strong><span>{item.message}</span>
        <div className="notification-item-actions">
          {item.link && <Link href={item.link} onClick={() => { markNotificationRead(item.id); close(); }}>View update <ArrowUpRight size={13} /></Link>}
          {!item.read && <button onClick={() => markNotificationRead(item.id)}>Mark as read</button>}
          {item.read && <small>Read</small>}
        </div>
      </article>)}
    </section>}
  </header>;
}
