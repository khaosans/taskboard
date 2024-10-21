'use client';

import React from 'react';
import { Bot, BarChart, Users, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const tabs = [
  { name: 'AI Agents', icon: Bot },
  { name: 'Members', icon: Users },
  { name: 'Analytics', icon: BarChart },
  { name: 'Task Manager', icon: Plus },
];

export default function TabBar() {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <ul className="flex justify-around">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <div className={`flex flex-col items-center p-2 cursor-not-allowed opacity-50 ${pathname === tab.name.toLowerCase().replace(' ', '-') ? 'text-primary' : 'text-muted-foreground'}`}>
              {React.createElement(tab.icon, { className: "h-6 w-6" })}
              <span className="text-xs mt-1">{tab.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
