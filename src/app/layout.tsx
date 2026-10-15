import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: '🌾 KRUSHI CONNECT — "First Serve Farmers"',
  description: 'Connected digital agricultural ecosystem empowering farmers with land leasing, labour access, crop intelligence, produce markets, government schemes, and precision farming.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-emerald-50/80 via-green-50/40 to-amber-50/30 text-agri-950 min-h-screen flex flex-col antialiased selection:bg-agri-600 selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
