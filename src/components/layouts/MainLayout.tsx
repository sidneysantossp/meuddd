import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SkipLinks from '@/components/common/SkipLinks';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SkipLinks />
      <Header />
      <main id="main-content" className="flex-1" role="main" aria-label="Conteúdo principal">
        {children}
      </main>
      <Footer />
    </div>
  );
}
