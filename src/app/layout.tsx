import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import ModuleExperience from '@/components/ui/ModuleExperience';

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
      <body className="min-h-screen flex flex-col antialiased">
        <AppProvider>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Header />
          <main className="site-main" id="main-content" tabIndex={-1}>
            <ModuleExperience>{children}</ModuleExperience>
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
