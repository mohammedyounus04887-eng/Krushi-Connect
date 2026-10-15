'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { ecosystem, photoUrl } from '@/lib/ecosystem';

export default function EcosystemExplorer() {
  const [active, setActive] = useState<number | null>(0);
  return <section id="ecosystem" className="ecosystem-section interactive-ecosystem">
    <div className="section-heading"><span className="section-label">One ecosystem. Seven possibilities.</span><h2>Room to grow.</h2></div>
    <div className="ecosystem-accordions">{ecosystem.map((item, index) => {
      const expanded = active === index;
      return <article className={`ecosystem-item ${expanded ? 'is-expanded' : ''}`} key={item.slug}>
        <h3><button className="ecosystem-toggle" id={`ecosystem-trigger-${item.slug}`} aria-expanded={expanded} aria-controls={`ecosystem-panel-${item.slug}`} onClick={() => setActive(expanded ? null : index)}><span className="service-number">0{index + 1}/</span><span>{item.title}</span><span className="accordion-symbol">{expanded ? <Minus /> : <Plus />}</span></button></h3>
        <div id={`ecosystem-panel-${item.slug}`} role="region" aria-labelledby={`ecosystem-trigger-${item.slug}`} hidden={!expanded} className="ecosystem-panel">
          <Link href={`/${item.slug}`} className="ecosystem-preview-image" aria-label={`Explore ${item.title}`}><img src={photoUrl(item.image, 1000)} alt={item.alt} loading="lazy" /><span className="image-open"><ArrowUpRight /></span></Link>
          <div className="ecosystem-preview-copy"><span className="section-label">{item.tag}</span><h4>{item.headline.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h4><p>{item.intro}</p><Link className="pill-link dark-pill" href={`/${item.slug}`}>{item.action}<ArrowUpRight size={19} /></Link></div>
        </div>
      </article>;
    })}</div>
  </section>;
}
