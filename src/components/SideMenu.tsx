'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <nav className="flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-4">Task-Flow</h2>
          <div className="space-y-4 flex-grow">
            <Link href="/settings" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link href="/help" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
              <HelpCircle className="h-5 w-5" />
              <span>Help & Support</span>
            </Link>
          </div>
          <Button variant="ghost" className="justify-start px-2">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}