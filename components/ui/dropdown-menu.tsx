'use client';

import React, { ReactNode } from 'react';

interface DropdownMenuProps {
  children: ReactNode;
}

interface DropdownMenuContentProps extends DropdownMenuProps {
  className?: string;
}

interface DropdownMenuItemProps extends DropdownMenuProps {
  onClick: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <div className="relative">{children}</div>
);

export const DropdownMenuTrigger: React.FC<DropdownMenuProps> = ({ children }) => (
  <div>{children}</div>
);

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children, className }) => (
  <div className={`absolute mt-2 bg-white shadow-lg rounded ${className}`}>{children}</div>
);

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ children, onClick }) => (
  <div onClick={onClick} className="p-2 hover:bg-gray-100 cursor-pointer">
    {children}
  </div>
);

export const DropdownMenuLabel: React.FC<DropdownMenuProps> = ({ children }) => (
  <div className="p-2 font-bold">{children}</div>
);

export const DropdownMenuSeparator: React.FC = () => <div className="border-t my-1" />;
