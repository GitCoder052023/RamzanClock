import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6 selection:bg-amber-200 selection:text-amber-900 font-sans">
    {children}
  </div>
);
