'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from '../components/ui/page_loader';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <PageLoader />}
      <main className="flex-grow">{children}</main>
    </>
  );
}
