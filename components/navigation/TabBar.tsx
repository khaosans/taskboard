'use client';

import React from 'react';
import { Bot, BarChart, Users, Plus } from 'lucide-react'; // Ensure all icons are imported correctly
import Link from 'next/link'; // Ensure you import Link from next/link
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'AI Agents', href: '/ai-agents', icon: Bot },
  { name: 'Members', href: '/members', icon: Users }, // Keep Members link
  { name: 'Analytics', href: '/analytics', icon: BarChart }, // Keep Analytics link
  { name: 'Task Manager', href: '/task-manager', icon: Plus }, // Keep Task Manager link
  // Removed broken links
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <ul className="flex justify-around">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link href={tab.href} className={`flex flex-col items-center p-2 ${pathname === tab.href ? 'text-primary' : 'text-muted-foreground'}`}>
              {React.createElement(tab.icon, { className: "h-6 w-6" })} {/* Use React.createElement for dynamic icons */}
              <span className="text-xs mt-1">{tab.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}