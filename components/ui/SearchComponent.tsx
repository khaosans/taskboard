'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const SearchComponent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setIsSearchOpen(true);
    }
    setLastTap(now);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} onTouchStart={handleDoubleTap}>
      {isSearchOpen ? (
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input type="text" placeholder="Search..." className="pl-8" />
        </div>
      ) : (
        <Search className="h-6 w-6 cursor-pointer" onClick={() => setIsSearchOpen(true)} />
      )}
    </div>
  );
};

export default SearchComponent;