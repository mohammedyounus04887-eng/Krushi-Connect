import Link from 'next/link';
import EcosystemExplorer from '@/components/ui/EcosystemExplorer';
import { ArrowDown, ArrowUpRight, Sprout } from 'lucide-react';

export default function LandingPage() {
  return <div className="editorial-home">
    <section className="kc-hero">
      <div className="kc-eyebrow"><span><span className="status-dot" /> First serve farmers.</span><span>India · A connected agricultural ecosystem</span></div>
      <h1>Good things<br />grow <span className="hero-together">together<svg viewBox="0 0 760 32" aria-hidden="true"><path d="M5 23 Q350 0 750 17" /></svg></span><span className="hero-period">.</span></h1>
      <div className="hero-bottom"><a className="circle-link" href="#ecosystem" aria-label="Explore the ecosystem"><ArrowDown /></a><p>Land. People. Possibilities.<br />One place to move farming forward.</p><Link href="/dashboard" className="pill-link">Let’s get growing <ArrowUpRight size={19} /></Link></div>
    </section>
    <section className="field-story" aria-label="Connected to the land">
      <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85" alt="Open farmland and green fields stretching toward the horizon" fetchPriority="high" />
      <div className="field-caption"><span>Rooted in the land.<br />Ready for what’s next.</span><Sprout size={46} strokeWidth={1.2} /></div><span className="photo-label">01 / A fresh perspective</span>
    </section>
    <section className="intro-section" id="about"><span className="section-label">The idea is simple</span><div><h2>You grow the future.<br />We connect the dots.</h2><p>Great farming starts with opportunity. The right land, the right people, and the right information. Krushi Connect brings them together so you can spend more time on what matters: your next season.</p><Link className="text-link" href="/dashboard">Meet your workspace <ArrowUpRight size={20} /></Link></div></section>
    <EcosystemExplorer />
    <section className="change-section"><span className="section-label">A better season starts here</span><h2>Small steps.<br />Real possibility.</h2><div className="change-bottom"><p>Find land to cultivate. Build your team. Explore your market. Your next move is already connected.</p><Link href="/dashboard" className="pill-link dark-pill">Make your next move <ArrowUpRight size={20} /></Link></div></section>
    <section className="pathways"><div className="section-heading"><span className="section-label">Made for your everyday</span><h2>From field to future.</h2></div><div className="pathway-grid"><Link href="/land-leasing" className="pathway-card"><div className="pathway-photo land-photo" /><div><span>01 / Land & people</span><h3>A place for<br />your next chapter.</h3><ArrowUpRight /></div></Link><Link href="/crop-market" className="pathway-card"><div className="pathway-photo harvest-photo" /><div><span>02 / Produce & possibilities</span><h3>Good harvests.<br />New connections.</h3><ArrowUpRight /></div></Link></div></section>
  </div>;
}
