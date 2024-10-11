'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Link from 'next/link';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-900 text-white flex flex-col">
          {/* Single Top Bar */}
          <header className="bg-gray-800 shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-4">
                <Link href="/" className="text-2xl font-bold text-blue-400">Quantum Labs</Link>
                <div className="flex items-center space-x-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="text-gray-300 border-gray-600">Menu <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-700 text-gray-300">
                      <DropdownMenuItem>
                        <Link href="/dashboard" className="w-full">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/rag-upload" className="w-full">RAG Upload</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/settings" className="w-full">Settings</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative hidden md:block">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search" className="pl-8 bg-gray-700 text-gray-300 border-gray-600" />
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-300">
                    <Bell className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 text-gray-400 py-4">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2023 Quantum Labs. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}