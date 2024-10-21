import React, { ReactNode } from 'react';
import TabBar from '@/components/TabBar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { usePathname } from 'next/navigation';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen bg-background text-foreground flex flex-col">
        <RobotTransformerWallpaper />
        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          {children}
        </main>
        {!isLandingPage && <TabBar />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
