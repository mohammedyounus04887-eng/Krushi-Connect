'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="status-page"><span className="section-label">A moment to regroup</span><h1>Let’s take<br />another look.</h1><p>This page couldn’t finish loading. Try again, or return to the ecosystem to keep exploring.</p><div><button className="pill-link" onClick={reset}>Try again <ArrowUpRight size={18} /></button><Link className="text-link" href="/">Back to the ecosystem <ArrowUpRight size={18} /></Link></div></section>;
}
