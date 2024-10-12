'use client';

import React from 'react';

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative inline-block text-left">
      {children}
    </div>
  );
};

export const DropdownMenuTrigger: React.FC<{ asChild: boolean; children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string; align?: 'start' | 'end'; forceMount?: boolean }> = ({ children, className }) => {
  return (
    <div className={`absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{ children: React.ReactNode, asChild?: boolean, onClick?: () => void }> = ({children, onClick}) => {
  return (
    <div className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" onClick={onClick}>
      {children}
    </div>
  );
};

export const DropdownMenuLabel: React.FC<{ children: React.ReactNode, className?: string }> = ({children}) => {
  return (
    <div className="px-4 py-2 text-sm font-medium text-gray-900">
      {children}
    </div>
  );
};

export const DropdownMenuSeparator: React.FC = () => {
  return (
    <div className="border-t border-gray-200 my-1" />
  );
};