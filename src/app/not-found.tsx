import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return <section className="status-page"><span className="section-label">404 / A different path</span><h1>Good things<br />are this way.</h1><p>We couldn’t find that page. Explore our seven connected farming tools and find your next step.</p><Link href="/#ecosystem" className="pill-link">Explore the ecosystem <ArrowUpRight size={18} /></Link></section>;
}
