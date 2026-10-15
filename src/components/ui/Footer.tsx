import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return <footer className="kc-footer"><div className="footer-top"><p>Let’s grow<br />something good.</p><Link href="/dashboard" className="footer-cta" aria-label="Open your farming workspace"><ArrowUpRight size={42} strokeWidth={1} /></Link></div><div className="footer-links"><Link href="/land-leasing">Find land</Link><Link href="/labour-community">Find your people</Link><Link href="/crop-market">Explore the market</Link><Link href="/messages">Conversations</Link><Link href="/dashboard">Your workspace ↗</Link></div><div className="footer-wordmark">krushi<span>connect</span><sup>®</sup></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Krushi Connect</span><span>First serve farmers.</span><a href="#top">Back to top ↑</a></div></footer>;
}
