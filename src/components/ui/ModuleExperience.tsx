'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowDown, ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import { ecosystem, photoUrl } from '@/lib/ecosystem';

export default function ModuleExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const index = ecosystem.findIndex(item => pathname === `/${item.slug}`);
  if (index === -1) {
    if (['/dashboard', '/messages', '/admin'].includes(pathname)) {
      return <div className="support-workspace module-app-layout">{children}</div>;
    }
    return <>{children}</>;
  }
  const item = ecosystem[index];
  const next = ecosystem[(index + 1) % ecosystem.length];
  return <div className="module-experience" key={pathname}>
    <section className="module-editorial-hero">
      <div className="module-breadcrumb"><Link href="/#ecosystem"><ArrowLeft size={14} /> The ecosystem</Link><span>0{index + 1} / 07 — {item.title}</span></div>
      <div className="module-hero-grid"><div><span className="section-label">{item.tag}</span><h1>{item.headline.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h1></div><div className="module-hero-aside"><p>{item.intro}</p><a href="#module-workspace" className="pill-link">{item.action}<ArrowDown size={18} /></a></div></div>
      <figure className="module-cover"><img src={photoUrl(item.image, 1800)} alt={item.alt} fetchPriority="high" /><figcaption><span>Krushi Connect / {item.title}</span><span>First serve farmers.</span></figcaption><span className="module-cover-number" aria-hidden="true">0{index + 1}/</span></figure>
    </section>
    <section className="module-how"><div><span className="section-label">A simple way forward</span><h2>Make it<br />work for you.</h2></div><div>{item.steps.map((step, i) => <details key={step} open={i === 0}><summary><span>0{i + 1}/</span>{['Explore the possibilities', 'Find your next step', 'Keep things moving'][i]}<Plus size={20} /></summary><p>{step}</p></details>)}</div></section>
    <section id="module-workspace" className="module-workspace"><div className="workspace-section-heading"><span className="section-label">0{index + 1} / Your workspace</span><h2>{item.title}<span>.</span></h2><p>Explore, compare and take your next step.</p></div>{children}</section>
    <section className="module-next"><div><span className="section-label">Keep exploring / 0{(index + 1) % ecosystem.length + 1}</span><Link href={`/${next.slug}`}><span>{next.title}</span><ArrowUpRight strokeWidth={1} /></Link></div><Link href={`/${next.slug}`} className="next-image" tabIndex={-1} aria-hidden="true"><img src={photoUrl(next.image, 700)} alt="" loading="lazy" /></Link></section>
  </div>;
}
